function LoadPlan1() {
    $.ajax({
      type: "POST",
      url: "http://localhost:8090/FirstPlan/getPlan",
      contentType: "application/json",
      data: JSON.stringify({
        doc_id_msgs: $("#doct_id").val(),
      }),
      dataType: "json",
      success: function(data) {
        console.log(data);
        for (row of data) {
          $("#plan1").append("<tr Pclick(this)>" + "<td>" + row.PlanName + " </td>" + "</tr>");
          planid = row.PlanId;
        }
      },
    });
  }
  LoadPlan1();

  function ShowHideDiv1() {
    var chkYes = document.getElementById("PlanNature1");
    var dvPassport = document.getElementById("dvPassport1");
    dvPassport.style.display = chkYes.checked ? "block" : "none";
  }
  function ShowHideDiv2() {
    var chkYes = document.getElementById("flexRadioDefault11");
    var dvPassport = document.getElementById("dvPassport11");
    dvPassport.style.display = chkYes.checked ? "block" : "none";
  }


  let rowJavascript;
let rowjQuery;

function Pclick(element) {
  rowJavascript = element.parentNode.parentNode;
  rowjQuery = $(element).closest("tr");
  RQ.push(rowjQuery[0].rowIndex - 1);
}   
function insert(){
  let PlanName = document.getElementById("PlanName").value;
  let Description = document.getElementById("Description").value;
  let PlanNature1 = document.getElementById("PlanNature1");
  let PlanNature2 = document.getElementById("PlanNature2");
  let ParentPlanId = document.getElementById("ParentPlanId").value;
  // let icon = document.getElementById("icon").value;
  let Tdate = document.getElementById("Tdate").value;
  let Fdate = document.getElementById("Fdate").value;
  let neededLogin = document.getElementById("neededLogin");
  // let PlanIdd = document.getElementById("PlanId").value;
  if (neededLogin.checked) {
    neededLogin = "true";
  } else {
    neededLogin = "false";
  }
  // planid = parseInt(PlanIdd);
  console.log(planid);
  let PlanNature;
  console.log(Tdate);
  if (PlanNature1.checked) {
    PlanNature = false;
  } else {
    PlanNature = true;
  }

  PlanNature = PlanNature.toString();
  PlanName = PlanName.toString();
  ParentPlanId = parseInt(ParentPlanId);
  if (
    planid == "" ||
    PlanName == "" ||
    Description == "" ||
    ParentPlanId == "" ||
    Tdate == "" ||
    Fdate == "" ||
    neededLogin == "" ||
    PlanNature == ""
  ) {
    alert("epmty");
  } else {
    $.ajax({
      type: "POST",
      url: "/FirstPlan/insertPlan",
      contentType: "application/json",
      data: JSON.stringify({
        PlanName: PlanName,
        Description: Description,
        PlanNature: PlanNature,
        ParentPlanId: ParentPlanId,
        icon: 1,
        Fdate: Fdate,
        Tdate: Tdate,
        neededLogin: neededLogin,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));

        planid = data;
      },
    });
    // location.reload();
  }
}