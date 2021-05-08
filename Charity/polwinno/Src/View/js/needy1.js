// const { json } = require("express");

const btnnew = document.querySelector("#new");
const btnEdit = document.querySelector("#edit");
const btnDelete = document.querySelector("#delete");
const btnSearch = document.querySelector("#btnSearch");

//connect selector
function getmsgs1() {
  $.ajax({
    type: "POST",
    url: "/Personal/getPersonal",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
    }),
    dataType: "json",
    success: function(data) {
      console.log(data);
      for (row of data) {
        console.log(row.IdNumber);
        $("#msg_q").append(
          "<tr>" +
            "<td>" +
            row.IdNumber +
            " </td>" +
            "<td>" +
            row.sex +
            " </td>" +
            "<td>" +
            row.Family +
            " </td>" +
            "<td>" +
            row.NAME +
            " </td>" +
            "</tr>"
        );
      }
    },
  });
}
getmsgs1();

btnnew.addEventListener("click", () => {
  const Name = document.getElementById("Name").value;
  const Family = document.getElementById("Family").value;
  const NationalCode = document.getElementById("NationalCode").value;
  const IdNumber = document.getElementById("IdNumber").value;
  const BirthDate = document.getElementById("BirthDate").value;
  const BirthPlace = document.getElementById("BirthPlace").value;

  const PersonTypee = document.getElementById("PersonType").value;
  const PersonPhoto = document.getElementById("PersonPhoto").value;
  const SecretCode = document.getElementById("SecretCode").value;

  let PersonType = parseInt(PersonTypee);
  let male = document.getElementById("male").checked;
  let female = document.getElementById("female").checked;

  let checked;

  if (male == true) {
    checked = true;
  } else {
    checked = false;
  }

  if (
    Name == "" ||
    (Family == "" &&
      PersonType == "" &&
      NationalCode == "" &&
      BirthDate == "" &&
      BirthPlace == "" &&
      SecretCode == "")
  ) {
    alert("epmty");
  } else {
    checked=checked.toString()
    $.ajax({
      type: "POST",
      url: "/Personal/insertPersonal",
      contentType: "application/json",
      data: JSON.stringify({
        Name: Name,
        Family: Family,
        NationalCode: NationalCode,
        IdNumber: IdNumber,
        Sex: checked,
        BirthDate: BirthDate,
        BirthPlace: BirthPlace,
        PersonType: PersonType,
        PersonPhoto: null,
        // SecretCode: SecretCode,
      }),

      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },
    });
    // location.reload();
  }
  // check();
});
btnEdit.addEventListener("click", () => {
  const PersonIdd = document.getElementById("PersonId").value;
  const Name = document.getElementById("Name").value;
  const Family = document.getElementById("Family").value;
  const NationalCode = document.getElementById("NationalCode").value;
  const IdNumber = document.getElementById("IdNumber").value;
  const BirthDate = document.getElementById("BirthDate").value;
  const BirthPlace = document.getElementById("BirthPlace").value;

  const PersonTypee = document.getElementById("PersonType").value;
  const PersonPhoto = document.getElementById("PersonPhoto").value;
  const SecretCode = document.getElementById("SecretCode").value;
  PersonId=parseInt(PersonIdd)
  let PersonType = parseInt(PersonTypee);
  let male = document.getElementById("male").checked;
  let female = document.getElementById("female").checked;
  let checked;
  if (male == true) {
    checked = true;
  } else {
    checked = false;
  }
  if (
    Name == "" ||
    (Family == "" &&
      PersonType == "" &&
      NationalCode == "" &&
      BirthDate == "" &&
      BirthPlace == "" &&
      SecretCode == "")
  ) {
    alert("epmty");
  } else {

    checked=checked.toString()

 
    $.ajax({
      type: "PUT",
      url: "/Personal/updatePersonal",
      contentType: "application/json",
      data: JSON.stringify({
        PersonId: PersonId,
        Name: Name,
        Family: Family,
        NationalCode: NationalCode,
        IdNumber: IdNumber,
        Sex: checked,
        BirthDate: BirthDate,
        BirthPlace: BirthPlace,
        PersonType: PersonType,
        PersonPhoto: null,
        SecretCode: null,
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
  const PersonId = document.getElementById("PersonId").value;

  if (PersonId == "") {
    alert("epmty");
  } else {
    $.ajax({
      type: "Delete",
      url: "/Personal/deletePersonal",
      contentType: "application/json",
      data: JSON.stringify({
        PersonId: PersonId,
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
// btnSearch.addEventListener('click', () => {
//     const inputSearch = document.getElementById("inputSearch").value;
//     console.log(inputSearch)

//     if (inputSearch == "") {

//         alert("epmty")
//     } else {
//         $.ajax({
//             type: "POST",
//             url: "/search",
//             contentType: "application/json",
//             data: JSON.stringify({
//                 inputSearch: inputSearch,
//                 doc_id_msgs: $("#doct_id").val(),
//             }),
//             dataType: "json",
//             success: function (data) {
//                 for (row of data) {
//                     // $('#setSearch').value(row.NAME)
//                     document.getElementById('msg_q').textContent=row.NAME
//                 }
//             }
//         });
//         // location.reload();

//     }
// })
