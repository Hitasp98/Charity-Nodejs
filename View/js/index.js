//button table one
const btnNew = document.querySelector('#new')
const btnClose = document.querySelector('#close')
const btnEdit = document.querySelector('#edit')
const btnClose1 = document.querySelector('#close1')
const btnDelete = document.querySelector('#delet')
const btnClose2 = document.querySelector('#close2')
const btnInsert = document.querySelector('#btnSave')
const btnUpdate = document.querySelector('#btnupdate')
const btnDel = document.querySelector('#btnDelete')
//button table tow
const btnNewTwo = document.querySelector('#newTwo')
const btnCloseTwo = document.querySelector('#closeTwo')
const btnEditTwo1 = document.querySelector('#editTwo')
const btnCloseTwo1 = document.querySelector('#closeTwo1')
const btnDeleteTwo1 = document.querySelector('#deleteTwo')
const btnCloseTwo2 = document.querySelector('#closeTwo2')
const btnInsertTwo = document.querySelector('#btnSaveTwo')
const btnUpdateTwo = document.querySelector('#btnUpdateTwo')
const btnDeTow = document.querySelector('#btnDeleteTwo')
const btnSearch = document.querySelector('#btnSearch')

//!!:show data base on table
function ws_loadBaseType(
  BaseTypeCode = null,
  BaseTypeTitle = null,
  CommonBaseTypeId = null
) {
  $.ajax({
    type: 'POST',
    url: '/tblCommonBaseType/getTblCommonBaseType',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),
      //TODO:send server
      CommonBaseTypeId: CommonBaseTypeId,
      BaseTypeTitle: BaseTypeTitle,
      BaseTypeCode: BaseTypeCode
    }),
    dataType: 'json',
    success: function (data) {
      for (row of data) {
        //TODO append table
        $('#msg_q').append(
          '<tr>' +
          '<td>' +
          row.BaseTypeTitle +
          '</td>' +
          '<td>' +
          row.CommonBaseTypeId +
          ' </td>' +
          '<tr>'
        )
      }
    }
  })
}
ws_loadBaseType()
//ajax db select
function ws_loadBaseValue(
  CommonBaseDataId = null,
  BaseCode = null,
  BaseValue = null,
  CommonBaseTypeID = null
) {
  //one try
  $.ajax({
    type: 'POST',
    url: '/tblCommonBaseData/getTblCommonBaseData',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),
      CommonBaseDataId: CommonBaseDataId,
      BaseValue: BaseValue,
      BaseCode: BaseCode,
      CommonBaseTypeID: CommonBaseTypeID
    }),
    dataType: 'json',
    success: function (data) {
      for (row of data) {
        $('#dbdataTwo').append(
          '<tr>' +
          '<td>' +
          row.BaseCode +
          '</td>' +
          '<td>' +
          row.BaseValue +
          ' </td>' +
          '<tr>'
        )
      }
    }
  })
}
ws_loadBaseValue()
//!show insert input
btnNew.addEventListener('click', () => {
  document.getElementById('vsave').style.visibility = 'inherit'
  document.getElementById('vsave1').style.visibility = 'hidden'

  document.getElementById('vsave2').style.visibility = 'hidden'
})
btnNewTwo.addEventListener('click', () => {
  document.getElementById('vsaveTwo').style.visibility = 'inherit'
  document.getElementById('vsaveTwo1').style.visibility = 'hidden'

  document.getElementById('vsaveTwo2').style.visibility = 'hidden'
})
//!hidden insert input
btnClose.addEventListener('click', () => {
  document.getElementById('vsave').style.visibility = 'hidden'
})
btnCloseTwo.addEventListener('click', () => {
  document.getElementById('vsaveTwo').style.visibility = 'hidden'
})
//!show edit input

btnEdit.addEventListener('click', () => {
  document.getElementById('vsave1').style.visibility = 'inherit'
  document.getElementById('vsave').style.visibility = 'hidden'
  document.getElementById('vsave2').style.visibility = 'hidden'
})
btnEditTwo1.addEventListener('click', () => {
  document.getElementById('vsaveTwo1').style.visibility = 'inherit'
  document.getElementById('vsaveTwo').style.visibility = 'hidden'
  document.getElementById('vsaveTwo2').style.visibility = 'hidden'
})
//!hidden edit input

btnClose1.addEventListener('click', () => {
  document.getElementById('vsave1').style.visibility = 'hidden'
})
btnCloseTwo1.addEventListener('click', () => {
  document.getElementById('vsaveTwo1').style.visibility = 'hidden'
})
//!show delete input
btnDelete.addEventListener('click', () => {
  document.getElementById('vsave2').style.visibility = 'inherit'
  document.getElementById('vsave1').style.visibility = 'hidden'
  document.getElementById('vsave').style.visibility = 'hidden'
})
btnDeleteTwo1.addEventListener('click', () => {
  document.getElementById('vsaveTwo2').style.visibility = 'inherit'
  document.getElementById('vsaveTwo1').style.visibility = 'hidden'
  document.getElementById('vsaveTwo').style.visibility = 'hidden'
})
//!hidden delete input

btnCloseTwo2.addEventListener('click', () => {
  document.getElementById('vsaveTwo2').style.visibility = 'hidden'
})
//!send value inset on server

function ws_CreateBaseType(BaseTypeCode, BaseTypeTitle) {
  const CommonBaseTypeId = Math.floor(Math.random() * 999) + 100
  if (BaseTypeTitle == '' || BaseTypeCode == '') {
    alert('epmty')
  } else {
    $.ajax({
      type: 'POST',
      url: '/tblCommonBaseType/insertTblCommonBaseType',
      contentType: 'application/json',
      data: JSON.stringify({
        // BaseTypeCode: BaseTypeCode,
        BaseTypeTitle: BaseTypeTitle
      }),
      dataType: 'json',
      success: function (data) {
        console.log(data)
        // for (row of data) {
        //     console.log(row.IdNumber)
           
        // }
    },
    })
  }
}
function ws_UpdateBaseType(BaseTypeCode, BaseTypeTitle, CommonBaseTypeId) {
  if (BaseTypeTitle == '' || BaseTypeCode == '') {
    alert('epmty')
  } else {
    $.ajax({
      type: 'patch',
      url: '/tblCommonBaseType/updateTblCommonBaseType',
      contentType: 'application/json',
      data: JSON.stringify({
        BaseTypeTitle: BaseTypeTitle,
        BaseTypeCode: BaseTypeCode,
        CommonBaseTypeId: CommonBaseTypeId
      }),
      dataType: 'json'
    })
    location.reload()
  }
}
function ws_DeleteBaseType(CommonBaseTypeId) {
  $.ajax({
    type: 'delete',
    url: '/tblCommonBaseType/deleteTblCommonBaseType',
    contentType: 'application/json',
    data: JSON.stringify({
      CommonBaseTypeId: CommonBaseTypeId
    }),
    dataType: 'json'
  })
  location.reload()
}

btnInsert.addEventListener('click', () => {
  const vname = document.getElementById('nameone').value
  const vcode = document.getElementById('codeone').value
  ws_CreateBaseType(vcode, vname)
})

btnUpdate.addEventListener('click', () => {
  const vname = document.getElementById('nameone1').value
  const vcode = document.getElementById('codeone1').value
  var code
  var sumBaseTypeTitle = []
  // //TODO:Give a BaseTypeCode
  $.ajax({
    type: 'POST',
    url: '/productcommonbasetype/searchTbBasetype',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),

      BaseTypeCode: vcode
    }),
    dataType: 'json',
    success: function (data) {
      for (row of data) {
        code = row.CommonBaseTypeId
      }
    }
  })
  //Todo : check data for uqiun
  $.ajax({
    type: 'POST',
    url: '/productcommonbasetype/searchTbBaseTypeTitle',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),
      //Todo : send BaseTypeTitle
      BaseTypeTitle: vname
    }),
    dataType: 'json',
    success: function (data) {
      for (row of data) {
        sumBaseTypeTitle += row
      }
    }
  })
  if (sumBaseTypeTitle === 0) {
    ws_UpdateBaseType(vcode, vname, code)
  } else {
    alert('was insert ')
  }
})

btnDel.addEventListener('click', () => {
  const CommonBaseTypeId = document.getElementById('codeone2').value
  // var code
  if (CommonBaseTypeId == '') {
    alert('epmty')
  } else {
    // $.ajax({
    //     type: 'POST',
    //     url: '/productcommonbasetype/searchTbBasetype',
    //     contentType: 'application/json',
    //     data: JSON.stringify({
    //         doc_id_msgs: $('#doct_id').val(),

    //         BaseTypeCode: vcode
    //     }),
    //     dataType: 'json',
    //     success: function (data) {
    //         for (row of data) {
    //             code = row.CommonBaseTypeId
    //         }
    //     }
    // })
    ws_DeleteBaseType(CommonBaseTypeId)
  }
})

//table two
function ws_createBaseValue(BaseValue, BaseCode, CommonBaseTypeId) {
  $.ajax({
    type: 'POST',
    url: '/tblCommonBaseData/addBasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      BaseValue: BaseValue,
      BaseCode: BaseCode,
      CommonBaseTypeId: CommonBaseTypeId
    }),
    dataType: 'json'
  })
  location.reload()
}
function ws_updateBaseValue(
  BaseCode,
  BaseValue,
  CommonBaseTypeId,
  CommonBaseDataId
) {
  $.ajax({
    type: 'patch',
    url: '/tblCommonBaseData/UpdateBasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      BaseCode: BaseCode,
      BaseValue: BaseValue,
      CommonBaseTypeId: CommonBaseTypeId,
      CommonBaseDataId: CommonBaseDataId
    }),
    dataType: 'json'
  })
}
function ws_deleteBaseValue(CommonBaseDataId) {
  $.ajax({
    type: 'delete',
    url: '/tblCommonBaseData/DeleteBasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      CommonBaseDataId: CommonBaseDataId
    }),
    dataType: 'json'
  })
}
btnInsertTwo.addEventListener('click', () => {
  const vname = document.getElementById('nameoneTwo').value
  const vcode = document.getElementById('codeoneTwo').value
  sNumber = vcode.toString()
  randnumber = []
  insertnumber = []
  for (var i = 0, len = sNumber.length; i < len; i += 1) {
    randnumber.push(+sNumber.charAt(i))
  }

  var rand = Math.floor(Math.random() * 999) + 100
  var random = rand.toString()
  console.log(random)
  var ins = ''
  for (let j = 0; j < 3; j++) {
    ins += randnumber[j]
  }
  ins += random
  if (vname == '' || vcode == '') {
    alert('epmty')
  } else {
    ws_createBaseValue(vname, vcode, ins)
  }
})

btnUpdateTwo.addEventListener('click', () => {
  console.log('up')
  const vname = document.getElementById('nameoneTwo1').value
  const vcode = document.getElementById('codeoneTwo1').value

  if (vname == '' || vcode == '') {
    alert('epmty')
  } else {
    sNumber = vcode.toString()
    randnumber = []
    insertnumber = []
    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      randnumber.push(+sNumber.charAt(i))
    }

    var rand = Math.floor(Math.random() * 999) + 100
    var random = rand.toString()
    console.log(random)
    var ins = ''
    for (let j = 0; j < 3; j++) {
      ins += randnumber[j]
    }
    ins += random
    ws_updateBaseValue(vname, vcode, CommonBaseTypeId, ins)
    location.reload()
  }
})

btnDeTow.addEventListener('click', () => {
  const vcode = document.getElementById('codeoneTwo2').value
  if (vcode == '') {
    alert('epmty')
  } else {
    ws_deleteBaseValue(vcode)
    location.reload()
  }
})

//!serach
// btnSearch.addEventListener('click', () => {
//     const CommonBaseTypeId = document.getElementById('inputSearch').value
//     console.log(CommonBaseTypeId)

//     if (CommonBaseTypeId == '') {
//         $.ajax({
//             type: 'POST',
//             url: '/productcommonbasetype/selecttblcommonbasetype',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 doc_id_msgs: $('#doct_id').val()
//             }),
//             dataType: 'json',
//             success: function (data) {
//                 for (row of data) {
//                     $('#msg_q').append(
//                         '<tr>' +
//                         '<td>' +
//                         row.BaseTypeTitle +
//                         '</td>' +
//                         '<td>' +
//                         row.CommonBaseTypeId +
//                         ' </td>' +
//                         '<tr>'
//                     )
//                 }
//             }
//         })
//     } else {
//         $.ajax({
//             type: 'POST',
//             url: '/productcommonbasetype/searchBasetype',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 CommonBaseTypeId: CommonBaseTypeId,
//                 doc_id_msgs: $('#doct_id').val()
//             }),
//             dataType: 'json',
//             success: function (data) {
//                 for (row of data) {
//                     document.getElementById('msg_q').textContent = row.BaseTypeTitle
//                 }
//             }
//         })
//         // location.reload();
//     }
// })
