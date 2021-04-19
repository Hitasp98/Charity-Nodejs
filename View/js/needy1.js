const btnnew = document.querySelector('#new')
const btnEdit = document.querySelector('#edit')
const btnDelete = document.querySelector('#delete')
const btnSearch = document.querySelector('#btnSearch')

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
        success: function (data) {
            for (row of data) {
                console.log(row.IdNumber)
                $("#msg_q").append(
                    "<tr>" +
                    "<td>" +
                    row.IdNumber +
                    " </td>" +
                    "<td>" +
                    row.sex +
                    " </td>" + "<td>" +
                    row.Family +
                    " </td>" + "<td>" +
                    row.NAME +
                    " </td>" +

                    "</tr>"
                );
            }
        },
    });
}
getmsgs1();


btnnew.addEventListener('click', () => {
    const Name = document.getElementById("Name").value;
    const Family = document.getElementById("Family").value;
    const PersonTypee = document.getElementById("PersonType").value;
    const NationalCode = document.getElementById("NationalCode").value;
    const BirthDate = document.getElementById("BirthDate").value;
    const BirthPlace = document.getElementById("BirthPlace").value;
    const PersonPhoto = document.getElementById("PersonPhoto").value;
    const SecretCode = document.getElementById("SecretCode").value;
    const IdNumber = document.getElementById("IdNumber").value;
    // let IdNumber=parseInt(IdNumbere)
    // // const SecretCode = "admin"
    // let SecretCode=parseInt(SecretCodee)
    let PersonType=parseInt(PersonTypee)
    let male = document.getElementById('male').checked;
    let female = document.getElementById('female').checked;
    var checked; 
    if (male == true) {
        checked = true
    } else {
        checked = false
    }
    let PersonId = '610422'
    for (let i = 0; i < 6; i++) {
        var rnadom = Math.floor(Math.random() * 0) + 9;

        PersonId += rnadom.toString()
    }
    PersonId += '5298'
    let rand = Math.floor(Math.random() * 10) + 100
    if (Name == "" || Family == "" && PersonType == "" && NationalCode == "" && BirthDate == "" && BirthPlace == "" && SecretCode == "" ) {
        alert("epmty")
    } else {
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
                BirthPlace: BirthPlace,
                PersonType: PersonType,
                PersonPhoto: null,
                SecretCode:SecretCode,
                BirthDate:BirthDate
            }),
            dataType: "json",
            success: function (data) {
                console.log(data)
                // for (row of data) {
                //     console.log(row.IdNumber)
                   
                // }
            },
        });
        // location.reload();

    }
})
btnEdit.addEventListener('click', () => {
    console.log('test edit')
    const PersonId = document.getElementById("PersonId").value;
    const Name = document.getElementById("Name").value;
    const Family = document.getElementById("Family").value;
    const PersonTypee = document.getElementById("PersonType").value;
    const NationalCode = document.getElementById("NationalCode").value;
    const BirthDate = document.getElementById("BirthDate").value;
    const BirthPlace = document.getElementById("BirthPlace").value;
    const PersonPhoto = document.getElementById("PersonPhoto").value;
    const SecretCode = document.getElementById("SecretCode").value;
    const IdNumber = document.getElementById("IdNumber").value;
    if (Name == "" || Family == "" && PersonType == "" && NationalCode == "" && BirthDate == "" && BirthPlace == "" && SecretCode == "" ) {

        alert("epmty")
    } else {
        let PersonType=parseInt(PersonTypee)
        let male = document.getElementById('male').checked;
        let female = document.getElementById('female').checked;
        var checked;
        if (male == true) {
            checked = true
        } else {
            checked = false
        }
        $.ajax({
            type: "PUT",
            url: "/Personal/updatePersonal",
            contentType: "application/json",
            data: JSON.stringify({
                PersonId:PersonId,
                Name: Name,
                Family: Family,
                NationalCode: NationalCode,
                IdNumber: IdNumber,
                Sex: checked,
                BirthPlace: BirthPlace,
                PersonType: PersonType,
                PersonPhoto: null,
                SecretCode:SecretCode,
                BirthDate:BirthDate
            }),
            dataType: "json",
            success: function (data) {
                console.log(data)
                // for (row of data) {
                //     console.log(row.IdNumber)
                   
                // }
            },
        });
        // location.reload();

    }
})
btnDelete.addEventListener('click', () => {
    const PersonId = document.getElementById("PersonId").value;

    if (PersonId == "") {

        alert("epmty")
    } else {
        $.ajax({
            type: "Delete",
            url: "/Personal/deletePersonal",
            contentType: "application/json",
            data: JSON.stringify({
                PersonId: PersonId,

            }),
            dataType: "json",
            success: function (data) {
                console.log(data)
                // for (row of data) {
                //     console.log(row.IdNumber)
                   
                // }
            },
        });
        // location.reload();

    }
})
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