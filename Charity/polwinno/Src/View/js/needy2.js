const btnnew = document.querySelector("#new");
const btnEdit = document.querySelector("#edit");
const btnDelete = document.querySelector("#delete");
const btnnewShow = document.querySelector("#newShow");
const btnEditShow = document.querySelector("#editShow");
const btnDeleteShow = document.querySelector("#deleteShow");
const close = document.querySelector("#close");
const close1 = document.querySelector("#close1");
const close2 = document.querySelector("#close2");
//connect selector]

btnnewShow.addEventListener("click", () => {
  document.getElementById("main").style.visibility = "inherit";
  document.getElementById("main1").style.visibility = "hidden";
  document.getElementById("main2").style.visibility = "hidden";
});
btnEditShow.addEventListener("click", () => {
  document.getElementById("main1").style.visibility = "inherit";
  document.getElementById("main").style.visibility = "hidden";
  document.getElementById("main2").style.visibility = "hidden";
});
btnDeleteShow.addEventListener("click", () => {
  document.getElementById("main2").style.visibility = "inherit";
  document.getElementById("main1").style.visibility = "hidden";
  document.getElementById("main").style.visibility = "hidden";
});
close.addEventListener("click", () => {
  console.log("colse");
  document.getElementById("main1").style.visibility = "hidden";
  document.getElementById("main").style.visibility = "hidden";
  document.getElementById("main2").style.visibility = "hidden";
});
close1.addEventListener("click", () => {
  document.getElementById("main1").style.visibility = "hidden";
  document.getElementById("main").style.visibility = "hidden";
  document.getElementById("main2").style.visibility = "hidden";
});
close2.addEventListener("click", () => {
  document.getElementById("main1").style.visibility = "hidden";
  document.getElementById("main").style.visibility = "hidden";
  document.getElementById("main2").style.visibility = "hidden";
});
function check() {
  var xhr = new XMLHttpRequest();
  var file = "http://localhost:8090/tblCharityAccounts";
  var randomNum = Math.round(Math.random() * 10000);
  xhr.open("HEAD", file + "?rand=" + randomNum, true);
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);
  function processRequest(e) {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 304) {
        alert("connection exists!");
      } else {
        alert("connection doesn't exist!");
      }
    }
  }
}
function getmsgs1() {
  $.ajax({
    type: "POST",
    url: "/NeedyAccounts/getNeedyAccounts",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
      BaseTypeCode: "IkM",

    }),

    dataType: "json",

    success: function(data) {
      console.log(data);
      for (row of data) {
        $("#msg_q").append(
          "<tr>" +
            "<td>" +
            row.CardNumber +
            " </td>" +
            "<td>" +
            row.OwnerName +
            " </td>" +
            "<td>" +
            row.BankId +
            " </td>" +
            "</tr>"
        );
      }
    },
  });
}
getmsgs1();

btnnew.addEventListener("click", () => {
  const AccountNumber = document.getElementById("AccountNumber").value;
  let BankId = document.getElementById("BankId").value;
  const OwnerName = document.getElementById("OwnerName").value;
  const CardNumber = document.getElementById("CardNumber").value;
  const AccountName = document.getElementById("AccountName").value;
  const numberAccountshaba = document.getElementById("numberAccountshaba")
    .value;
  let NeedyId = document.getElementById("NeedyId").value;

  if (
    AccountNumber == "" ||
    BankId == "" ||
    OwnerName == "" ||
    CardNumber == "" ||
    AccountName == "" ||
    numberAccountshaba == ""
  ) {
    alert("epmty");
  } else {
    NeedyId = parseInt(NeedyId);
    BankId = parseInt(BankId);
    $.ajax({
      type: "POST",
      url: "/NeedyAccounts/insertNeedyAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        BankId: BankId,
        NeedyId: NeedyId,
        OwnerName: OwnerName,
        CardNumber: CardNumber,
        AccountNumber: AccountNumber,
        AccountName: AccountName,
        ShebaNumber: numberAccountshaba,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
  check();
});
btnEdit.addEventListener("click", () => {
  const AccountNumber = document.getElementById("AccountNumber1").value;
  let BankId = document.getElementById("BankId1").value;
  const OwnerName = document.getElementById("OwnerName1").value;
  const CardNumber = document.getElementById("CardNumber1").value;
  const AccountName = document.getElementById("AccountName1").value;
  const numberAccountshaba = document.getElementById("numberAccountshaba1")
    .value;
  let NeedyId = document.getElementById("NeedyId1").value;
  let NeedyAccountId = document.getElementById("NeedyAccountId1").value;

  NeedyId = parseInt(NeedyId);
  NeedyAccountId = parseInt(NeedyAccountId);
  BankId = parseInt(BankId);
  if (
    AccountNumber == "" ||
    BankId == "" ||
    OwnerName == "" ||
    CardNumber == "" ||
    AccountName == "" ||
    numberAccountshaba == "" ||
    NeedyAccountId == ""
  ) {
    alert("epmty");
  } else {
    $.ajax({
      type: "PUT",
      url: "/NeedyAccounts/updateNeedyAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        NeedyAccountId: NeedyAccountId,
        BankId: BankId,
        NeedyId: NeedyId,
        OwnerName: OwnerName,
        CardNumber: CardNumber,
        AccountNumber: AccountNumber,
        AccountName: AccountName,
        ShebaNumber: numberAccountshaba,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
  check();
});
btnDelete.addEventListener("click", () => {
  const NeedyAccountIdd = document.getElementById("NeedyAccountId").value;

  if (NeedyAccountIdd == "") {
    alert("epmty");
  } else {
    let NeedyAccountId = parseInt(NeedyAccountIdd);

    $.ajax({
      type: "Delete",
      url: "/NeedyAccounts/deleteNeedyAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        NeedyAccountId: NeedyAccountId,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
  check();
});
