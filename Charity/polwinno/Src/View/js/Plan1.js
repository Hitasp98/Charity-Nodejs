document.querySelector("#newShow").addEventListener("click", () => {
  console.log("aa");
  document.getElementById("bord1").style.visibility = "inherit";
  document.getElementById("bord2").style.visibility = "hidden";
  document.getElementById("bord3").style.visibility = "hidden";
});
document.querySelector("#close").addEventListener("click", () => {
  document.getElementById("bord2").style.visibility = "hidden";
  document.getElementById("bord1").style.visibility = "hidden";
  document.getElementById("bord3").style.visibility = "hidden";
});
document.querySelector("#editShow").addEventListener("click", () => {
  console.log("aa");
  document.getElementById("bord2").style.visibility = "inherit";
  document.getElementById("bord1").style.visibility = "hidden";
  document.getElementById("bord3").style.visibility = "hidden";
});

document.querySelector("#close1").addEventListener("click", () => {
  document.getElementById("bord1").style.visibility = "hidden";
  document.getElementById("bord2").style.visibility = "hidden";
  document.getElementById("bord3").style.visibility = "hidden";
});
document.querySelector("#deleteShow").addEventListener("click", () => {
  document.getElementById("bord3").style.visibility = "inherit";
  document.getElementById("bord2").style.visibility = "hidden";
  document.getElementById("bord1").style.visibility = "hidden";
});
document.querySelector("#close2").addEventListener("click", () => {
  document.getElementById("bord1").style.visibility = "hidden";
  document.getElementById("bord2").style.visibility = "hidden";
  document.getElementById("bord3").style.visibility = "hidden";
});
//connect selector
function getmsgs1() {
  $.ajax({
    type: "POST",
    url: "/FirstPlan/getPlan",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
    }),
    dataType: "json",
    success: function(data) {
      console.log(data);
      for (row of data) {
        $("#msg_q").append("<tr>" + "<td>" + row.PlanName + " </td>" + "</tr>");
      }
    },
  });
}
getmsgs1();

document.querySelector("#insert").addEventListener("click", () => {
  let PlanName = document.getElementById("PlanName").value;
  let Description = document.getElementById("Description").value;
  let PlanNature1 = document.getElementById("PlanNature1");
  let PlanNature2 = document.getElementById("PlanNature2");
  let ParentPlanId = document.getElementById("ParentPlanId").value;
  let icon = document.getElementById("icon").value;
  let Tdate = document.getElementById("Tdate").value;
  let Fdate = document.getElementById("Fdate").value;
  let neededLogin = document.getElementById("neededLogin").value;
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
        icon: null,
        Fdate: Fdate,
        Tdate: Tdate,
        neededLogin: neededLogin,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
});
document.querySelector("#edit").addEventListener("click", () => {
  const PlanIdd = document.getElementById("PlanId2").value;
  let PlanName = document.getElementById("PlanName1").value;
  let Description = document.getElementById("Description1").value;
  let PlanNature1 = document.getElementById("PlanNature21");
  let PlanNature2 = document.getElementById("PlanNature22");
  let ParentPlanId = document.getElementById("ParentPlanId1").value;
  let icon = document.getElementById("icon1").value;
  let Tdate = document.getElementById("Tdate1").value;
  let Fdate = document.getElementById("Fdate1").value;
  let neededLogin = document.getElementById("neededLogin1").checked;
  let PlanNature;

  neededLogin=neededLogin.toString()

  if (PlanNature1.checked) {
    PlanNature = true;
  } else if (PlanNature2.checked){
    PlanNature = false;
  }
  PlanNature = PlanNature.toString();
  PlanName = PlanName.toString();
  ParentPlanId = parseInt(ParentPlanId);
  PlanId = parseInt(PlanIdd);
  if (PlanId==""||
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
      type: "put",
      url: "/FirstPlan/updatePlan",
      contentType: "application/json",
      data: JSON.stringify({
        PlanId: PlanId,
        PlanName: PlanName,
        Description: Description,
        PlanNature: PlanNature,
        ParentPlanId: ParentPlanId,
        icon: null,
        Fdate: Fdate,
        Tdate: Tdate,
        neededLogin: neededLogin,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
  }
});
document.querySelector("#delete").addEventListener("click", () => {
  let PlanId = document.getElementById("PlanId1").value;
  console.log(PlanId)
  if (PlanId==""
) {
  alert("epmty");
} else {
  PlanId=parseInt(PlanId)
  $.ajax({
    type: "delete",
    url: "/FirstPlan/deletePlan",
    contentType: "application/json",
    data: JSON.stringify({
      PlanId: PlanId,
  
    }),
    dataType: "json",
    success: function(data) {
      alert(JSON.stringify(data));
    },
  });
}
});
