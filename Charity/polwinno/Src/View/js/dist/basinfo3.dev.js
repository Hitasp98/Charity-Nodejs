"use strict";

var btnnew = document.querySelector('#new');
var btnEdit = document.querySelector('#edit');
var btnDelete = document.querySelector('#delete'); //connect selector]

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
      doc_id_msgs: $("#doct_id").val()
    }),
    dataType: "json",
    success: function success(data) {
      console.log(data);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          row = _step.value;
          $("#msg_q").append("<tr>" + "<td>" + row.CharityAccountId + " </td>" + "<td>" + row.OwnerName + " </td>" + "<td>" + row.CardNumber + " </td>" + "<td>" + row.AccountName + " </td>" + "<td>" + row.AccountNumber + " </td>" + "<td>" + row.BranchName + " </td>" + "</tr>");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  });
}

getmsgs1();
btnnew.addEventListener('click', function () {
  var bankId = document.getElementById("bankId").value;
  var nameBank = document.getElementById("namebank").value;
  var nameNumberAccount = document.getElementById("nameNumberAccunt").value;
  var numberCart = document.getElementById("numberCart").value;
  var nameAccount = document.getElementById("nameAccount").value;
  var numberAccount = document.getElementById("numberAccount").value;

  if (bankId == "" || nameBank == "" || nameNumberAccount == "" || nameAccount == "" || numberCart == "" || numberAccount == "") {
    alert("epmty");
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
        numberCart: numberCart
      }),
      dataType: "json"
    }); // location.reload();
  }

  check();
});
btnEdit.addEventListener('click', function () {
  var charityAccountId = document.getElementById("chnumber").value;
  var namePlace = document.getElementById("bankId").value;
  var nameBank = document.getElementById("namebank").value;
  var nameNumberAccount = document.getElementById("nameNumberAccunt").value;
  var numberCart = document.getElementById("numberCart").value;
  var numberAccount = document.getElementById("numberAccount").value;

  if (namePlace == "" || nameBank == "" || nameNumberAccount == "" || numberCart == "" || numberAccount == "") {
    alert("epmty");
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
      dataType: "json"
    }); // location.reload();
  }

  check();
});
btnDelete.addEventListener('click', function () {
  var chNumber = document.getElementById("chnumber").value;

  if (chNumber == "") {
    alert("epmty");
  } else {
    $.ajax({
      type: "Delete",
      url: "/tblCharityAccounts/deleteTblCharityAccounts",
      contentType: "application/json",
      data: JSON.stringify({
        charityAccountId: chNumber
      }),
      dataType: "json"
    }); // location.reload();
  }

  check();
});