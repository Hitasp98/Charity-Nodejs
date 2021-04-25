const btnnew = document.querySelector('#new')
const btnEdit = document.querySelector('#edit')
const btnDelete = document.querySelector('#delete')
//connect selector]
function check() {
    var xhr = new XMLHttpRequest();
    var file = "http://localhost:8090/tblCharityAccounts";
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, true);
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
        url: "/tblCharityAccounts/getTblCharityAccounts",
        contentType: "application/json",
        data: JSON.stringify({
            doc_id_msgs: $("#doct_id").val(),

        }),
        dataType: "json",
        success: function (data) {
            console.log(data)
            for (row of data) {                
                $("#msg_q").append(
                    "<tr>" +
                    "<td>" +
                    row.CharityAccountId +
                    " </td>" +
                    "<td>" +
                    row.OwnerName +
                    " </td>" + "<td>" +
                    row.CardNumber +
                    " </td>" + "<td>" +
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

btnnew.addEventListener('click', () => {

    const bankId = document.getElementById("bankId").value;
    const nameBank = document.getElementById("namebank").value;
    const nameNumberAccount = document.getElementById("nameNumberAccunt").value;
    const numberCart = document.getElementById("numberCart").value;
    const nameAccount = document.getElementById("nameAccount").value;
    const numberAccount = document.getElementById("numberAccount").value;

    if (bankId == "" || nameBank == "" || nameNumberAccount == "" || nameAccount == "" || numberCart == "" || numberAccount == "") {
        alert("epmty")
    } else {
        $.ajax({
            type: "POST",
            url: "/tblCharityAccounts/insertTblCharityAccounts",
            contentType: "application/json",
            data: JSON.stringify({

                bankId: bankId,
                nameBank: nameBank,
                nameAccount: nameAccount,
                nameNumberAccount: nameNumberAccount,
                numberAccount: numberAccount,
                numberCart: numberCart,

            }),
            dataType: "json",
        });
        // location.reload();

    }
    check()
})
btnEdit.addEventListener('click', () => {
    const charityAccountId = document.getElementById("chnumber").value;

    const namePlace = document.getElementById("bankId").value;
    const nameBank = document.getElementById("namebank").value;
    const nameNumberAccount = document.getElementById("nameNumberAccunt").value;
    const numberCart = document.getElementById("numberCart").value;
    const numberAccount = document.getElementById("numberAccount").value;
    if (namePlace == "" || nameBank == "" || nameNumberAccount == "" || numberCart == "" || numberAccount == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "PUT",
            url: "/tblCharityAccounts/updateTblCharityAccounts",
            contentType: "application/json",
            data: JSON.stringify({
                charityAccountId: charityAccountId,
                bankId: bankId,
                nameBank: nameBank,
                nameAccount: nameAccount,
                nameNumberAccount: nameNumberAccount,
                numberCart: numberCart,
                numberAccount: numberAccount
            }),
            dataType: "json",
        });
        // location.reload();

    }
    check()
})
btnDelete.addEventListener('click', () => {
    const chNumber = document.getElementById("chnumber").value;

    if (chNumber == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "Delete",
            url: "/tblCharityAccounts/deleteTblCharityAccounts",
            contentType: "application/json",
            data: JSON.stringify({
                charityAccountId: chNumber,

            }),
            dataType: "json",
        });
        // location.reload();

    }
    check()
})
