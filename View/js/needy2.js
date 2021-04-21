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
        url: "/NeedyAccounts/getNeedyAccounts",
        contentType: "application/json",
        data: JSON.stringify({
            doc_id_msgs: $("#doct_id").val(),
            NeedyId: null,
            NeedyAccountId: null
        }),
        dataType: "json",
        success: function (data) {
            console.log('ss')
            console.log(data + ' BaseTypeCode')
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

btnnew.addEventListener('click', () => {
    console.log('hi')
    const AccountNumber = document.getElementById("AccountNumber").value;
    const BankIdd = document.getElementById("BankId").value;
    const OwnerName = document.getElementById("OwnerName").value;
    const CardNumber = document.getElementById("CardNumber").value;
    const AccountName = document.getElementById("AccountName").value;
    const numberAccountshaba = document.getElementById("numberAccountshaba").value;
    const NeedyIdd = document.getElementById("NeedyAccountId").value;

    if (AccountNumber == "" || BankId == "" || OwnerName == "" || CardNumber == "" || AccountName == "" || numberAccountshaba == "") {
        alert("epmty")
    } else {
        let NeedyId = parseInt(NeedyIdd)
        let BankId = parseInt(BankIdd)
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
        });
        // location.reload();

    }
    check()
})
btnEdit.addEventListener('click', () => {
    const AccountNumber = document.getElementById("AccountNumber").value;
    const BankId = document.getElementById("BankId").value;
    const OwnerName = document.getElementById("OwnerName").value;
    const CardNumber = document.getElementById("CardNumber").value;
    const AccountName = document.getElementById("AccountName").value;
    const numberAccountshaba = document.getElementById("numberAccountshaba").value;
    const NeedyAccountId = document.getElementById("NeedyAccountId").value;

    if (AccountNumber == "" || BankId == "" || OwnerName == "" || CardNumber == "" || AccountName == "" || numberAccountshaba == "" || NeedyAccountId == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "PUT",
            url: "/NeedyAccounts/updateNeedyAccounts",
            contentType: "application/json",
            data: JSON.stringify({
                AccountNumber: AccountNumber,
                BankId: BankId,
                OwnerName: OwnerName,
                CardNumber: CardNumber,
                AccountName: AccountName,
                numberAccountshaba: numberAccountshaba,
                NeedyAccountId: NeedyAccountId
            }),
            dataType: "json",
        });
        // location.reload();

    }
    check()
})
btnDelete.addEventListener('click', () => {
    const numberAccountshaba = document.getElementById("numberAccountshaba").value;

    if (numberAccountshaba == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "Delete",
            url: "/NeedyAccounts/deleteNeedyAccounts",
            contentType: "application/json",
            data: JSON.stringify({
                NeedyAccountId: NeedyAccountId
            }),
            dataType: "json",
        });
        // location.reload();

    }
    check()
})
