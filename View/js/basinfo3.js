const btnnew = document.querySelector('#new')
const btnEdit = document.querySelector('#edit')
const btnDelete = document.querySelector('#delete')
//connect selector
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
    var charityAccountId = '610'
    for (let i = 0; i < 6; i++) {
        var rnadom = Math.floor(Math.random() * 9);

        charityAccountId += rnadom.toString()
    }

    charityAccountID = parseInt(charityAccountId)
    var rand = Math.floor(Math.random() * 10) + 100
    if (bankId == "" || nameBank == "" || nameNumberAccount == "" || nameAccount == "" || numberCart == "" || numberAccount == "") {
        alert("epmty")
    } else {
        $.ajax({
            type: "POST",
            url: "/tblCharityAccounts/insertTblCharityAccounts",
            contentType: "application/json",
            data: JSON.stringify({
                charityAccountId: charityAccountID,
                bankId: bankId,
                nameBank: nameBank,
                nameAccount: nameAccount,
                nameNumberAccount: nameNumberAccount,
                numberAccount: numberAccount,
                numberCart: numberCart,

            }),
            dataType: "json",
        });
        location.reload();

    }
})
btnEdit.addEventListener('click', () => {
    const namePlace = document.getElementById("bankId").value;
    const nameBank = document.getElementById("namebank").value;
    const nameNumberAccount = document.getElementById("nameNumberAccunt").value;
    const numberCart = document.getElementById("numberCart").value;
    const numberAccount = document.getElementById("numberAccount").value;
    if (namePlace == "" || nameBank == "" || nameNumberAccount == "" || numberCart == "" || numberAccount == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "POST",
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
        location.reload();

    }
})
btnDelete.addEventListener('click', () => {
    const chNumber = document.getElementById("chnumber").value;

    if (chNumber == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "POST",
            url: "/tblCharityAccounts/deleteTblCharityAccounts",
            contentType: "application/json",
            data: JSON.stringify({
                charityAccountId: chNumber,

            }),
            dataType: "json",
        });
        location.reload();

    }
})
