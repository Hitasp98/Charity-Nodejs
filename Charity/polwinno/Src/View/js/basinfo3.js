let btnNewShow = document.querySelector("#newshow");
let btnEditShow = document.querySelector("#editshow");
let btnDeleteShow = document.querySelector("#deleteshow");
let tblinsert = document.querySelector("#tblinsert");
let tbledit = document.querySelector("#tbledit");
let tbldelete = document.querySelector("#tbldelete");
let btnclose = document.querySelector("#close");
let btnclose1 = document.querySelector("#close1");

let btnnew =document.querySelector("#new")
let btnedit =document.querySelector("#edit")
let btnDelete =document.querySelector("#delete")

function getmsgs1() {
  $.ajax({
    type: "POST",
    url: "/CharityAccounts/getCharityAccounts",
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
            row.CharityAccountId +
            " </td>" +
            "<td>" +
            row.OwnerName +
            " </td>" +
            "<td>" +
            row.CardNumber +
            " </td>" +
            "<td>" +
            row.AccountName +
            " </td>" +
            "<td>" +
            row.AccountNumber +
            " </td>" +
            "<td>" +
            row.BranchName +
            " </td>" +
            "</tr>"
        );
      }
    },
  });
}
getmsgs1();
btnclose.addEventListener("click", () => {
  tblinsert.style.visibility = "hidden";
  tbledit.style.visibility = "hidden";
  tbldelete.style.visibility = "hidden";
});
btnclose1.addEventListener("click", () => {
  tblinsert.style.visibility = "hidden";
  tbledit.style.visibility = "hidden";
  tbldelete.style.visibility = "hidden";
});
btnNewShow.addEventListener("click", () => {
  tblinsert.style.visibility = "inherit";
  tbledit.style.visibility = "hidden";
  tbldelete.style.visibility = "hidden";
});
btnEditShow.addEventListener("click", () => {
  tblinsert.style.visibility = "hidden";
  tbledit.style.visibility = "inherit";
  tbldelete.style.visibility = "hidden";
});
btnDeleteShow.addEventListener("click", () => {
  tblinsert.style.visibility = "hidden";
  tbledit.style.visibility = "hidden";
  tbldelete.style.visibility = "inherit";
});
btnnew.addEventListener('click',()=>{

  let BankId = document.getElementById("BankId").value;
  const BranchName = document.getElementById("BranchName").value;
  const OwnerName = document.getElementById("OwnerName").value;
  const CardNumber = document.getElementById("CardNumber").value;
  const AccountNumber = document.getElementById("AccountNumber").value;
  const AccountName = document.getElementById("AccountName").value;
  console.log(BankId)

  // const CharityAccountIdd = document.getElementById("CharityAccountId").value;
  BankId = parseInt(BankId);
  // CharityAccountId=parseInt(CharityAccountIdd)
  if (
    BankId == "" ||
    BranchName == "" ||
    OwnerName == "" ||
    CardNumber == "" ||
    AccountNumber == "" ||
    AccountName == ""
  ) {
    alert("epmty");
  } else {
    $.ajax({
      type: "POST",
      url: "/CharityAccounts/insertCharityAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        BankId: BankId,
        BranchName: BranchName,
        OwnerName: OwnerName,
        CardNumber: CardNumber,
        AccountNumber: AccountNumber,
        AccountName: AccountName,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
  // check()
})
btnedit.addEventListener('click',()=>{

  let BankId = document.getElementById("BankId1").value;
  const BranchName = document.getElementById("BranchName1").value;
  const OwnerName = document.getElementById("OwnerName1").value;
  const CardNumber = document.getElementById("CardNumber1").value;
  const AccountNumber = document.getElementById("AccountNumber1").value;
  const AccountName = document.getElementById("AccountName1").value;
  const CharityAccountIdd = document.getElementById("CharityAccountId").value;
  console.log(BankId)

  BankId = parseInt(BankId);
  CharityAccountId = parseInt(CharityAccountIdd);
  if (
    BankIdd == "" ||
    BranchName == "" ||
    OwnerName == "" ||
    CardNumber == "" ||
    AccountNumber == "" ||
    AccountName == "" ||
    CharityAccountIdd == ""
  ) {
    alert("epmty");
  } else {
    $.ajax({
      type: "PUT",
      url: "/CharityAccounts/updateCharityAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        CharityAccountId: CharityAccountId,
        BankId: BankId,
        BranchName: BranchName,
        OwnerName: OwnerName,
        CardNumber: CardNumber,
        AccountNumber: AccountNumber,
        AccountName: AccountName,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
})
btnDelete.addEventListener("click", () => {
  const CharityAccountIdd = document.getElementById("CharityAccountId1").value;
  CharityAccountId = parseInt(CharityAccountIdd);
  console.log(CharityAccountIdd)

  if (CharityAccountIdd == "") {
    alert("epmty");
  } else {
    $.ajax({
      type: "Delete",
      url: "/CharityAccounts/deleteCharityAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        CharityAccountId: CharityAccountId,
      }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
});





