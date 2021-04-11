"use strict";

//button table one
var btnNew = document.querySelector('#new');
var btnClose = document.querySelector('#close');
var btnEdit = document.querySelector('#edit');
var btnClose1 = document.querySelector('#close1');
var btnDelete = document.querySelector('#delet');
var btnClose2 = document.querySelector('#close2');
var btnInsert = document.querySelector('#btnSave');
var btnUpdate = document.querySelector('#btnupdate');
var btnDel = document.querySelector('#btnDelete'); //button table tow

var btnNewTwo = document.querySelector('#newTwo');
var btnCloseTwo = document.querySelector('#closeTwo');
var btnEditTwo1 = document.querySelector('#editTwo');
var btnCloseTwo1 = document.querySelector('#closeTwo1');
var btnDeleteTwo1 = document.querySelector('#deleteTwo');
var btnCloseTwo2 = document.querySelector('#closeTwo2');
var btnInsertTwo = document.querySelector('#btnSaveTwo');
var btnUpdateTwo = document.querySelector('#btnUpdateTwo');
var btnDeTow = document.querySelector('#btnDeleteTwo');
var btnSearch = document.querySelector('#btnSearch'); //!!:show data base on table

function ws_loadBaseType() {
  var BaseTypeCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var BaseTypeTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var CommonBaseTypeId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  $.ajax({
    type: 'POST',
    url: '/commonbasetype/selecttblcommonbasetype',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),
      //TODO:send server
      CommonBaseTypeId: CommonBaseTypeId,
      BaseTypeTitle: BaseTypeTitle,
      BaseTypeCode: BaseTypeCode
    }),
    dataType: 'json',
    success: function success(data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          row = _step.value;
          //TODO append table
          $('#msg_q').append('<tr>' + '<td>' + row.BaseTypeTitle + '</td>' + '<td>' + row.CommonBaseTypeId + ' </td>' + '<tr>');
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

ws_loadBaseType(); //ajax db select

function ws_loadBaseValue() {
  var CommonBaseDataId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var BaseCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var BaseValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var CommonBaseTypeID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  //one try
  $.ajax({
    type: 'POST',
    url: '/commonbasedata/selecttblcommonbasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),
      CommonBaseDataId: CommonBaseDataId,
      BaseValue: BaseValue,
      BaseCode: BaseCode,
      CommonBaseTypeID: CommonBaseTypeID
    }),
    dataType: 'json',
    success: function success(data) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          row = _step2.value;
          $('#dbdataTwo').append('<tr>' + '<td>' + row.BaseCode + '</td>' + '<td>' + row.BaseValue + ' </td>' + '<tr>');
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  });
}

ws_loadBaseValue(); //!show insert input

btnNew.addEventListener('click', function () {
  document.getElementById('vsave').style.visibility = 'inherit';
  document.getElementById('vsave1').style.visibility = 'hidden';
  document.getElementById('vsave2').style.visibility = 'hidden';
});
btnNewTwo.addEventListener('click', function () {
  document.getElementById('vsaveTwo').style.visibility = 'inherit';
  document.getElementById('vsaveTwo1').style.visibility = 'hidden';
  document.getElementById('vsaveTwo2').style.visibility = 'hidden';
}); //!hidden insert input

btnClose.addEventListener('click', function () {
  document.getElementById('vsave').style.visibility = 'hidden';
});
btnCloseTwo.addEventListener('click', function () {
  document.getElementById('vsaveTwo').style.visibility = 'hidden';
}); //!show edit input

btnEdit.addEventListener('click', function () {
  document.getElementById('vsave1').style.visibility = 'inherit';
  document.getElementById('vsave').style.visibility = 'hidden';
  document.getElementById('vsave2').style.visibility = 'hidden';
});
btnEditTwo1.addEventListener('click', function () {
  document.getElementById('vsaveTwo1').style.visibility = 'inherit';
  document.getElementById('vsaveTwo').style.visibility = 'hidden';
  document.getElementById('vsaveTwo2').style.visibility = 'hidden';
}); //!hidden edit input

btnClose1.addEventListener('click', function () {
  document.getElementById('vsave1').style.visibility = 'hidden';
});
btnCloseTwo1.addEventListener('click', function () {
  document.getElementById('vsaveTwo1').style.visibility = 'hidden';
}); //!show delete input

btnDelete.addEventListener('click', function () {
  document.getElementById('vsave2').style.visibility = 'inherit';
  document.getElementById('vsave1').style.visibility = 'hidden';
  document.getElementById('vsave').style.visibility = 'hidden';
});
btnDeleteTwo1.addEventListener('click', function () {
  document.getElementById('vsaveTwo2').style.visibility = 'inherit';
  document.getElementById('vsaveTwo1').style.visibility = 'hidden';
  document.getElementById('vsaveTwo').style.visibility = 'hidden';
}); //!hidden delete input

btnCloseTwo2.addEventListener('click', function () {
  document.getElementById('vsaveTwo2').style.visibility = 'hidden';
}); //!send value inset on server

function ws_CreateBaseType(BaseTypeCode, BaseTypeTitle) {
  var CommonBaseTypeId = Math.floor(Math.random() * 999) + 100;

  if (BaseTypeTitle == '' || BaseTypeCode == '') {
    alert('epmty');
  } else {
    $.ajax({
      type: 'POST',
      url: '/commonbasetype/addBasetype',
      contentType: 'application/json',
      data: JSON.stringify({
        BaseTypeCode: BaseTypeCode,
        BaseTypeTitle: BaseTypeTitle
      }),
      dataType: 'json'
    });
  }
}

function ws_UpdateBaseType(BaseTypeCode, BaseTypeTitle, CommonBaseTypeId) {
  if (BaseTypeTitle == '' || BaseTypeCode == '') {
    alert('epmty');
  } else {
    $.ajax({
      type: 'patch',
      url: '/commonbasetype/UpdateBasetype',
      contentType: 'application/json',
      data: JSON.stringify({
        BaseTypeTitle: BaseTypeTitle,
        BaseTypeCode: BaseTypeCode,
        CommonBaseTypeId: CommonBaseTypeId
      }),
      dataType: 'json'
    });
    location.reload();
  }
}

function ws_DeleteBaseType(CommonBaseTypeId) {
  $.ajax({
    type: 'delete',
    url: '/commonbasetype/DeleteBasetype',
    contentType: 'application/json',
    data: JSON.stringify({
      CommonBaseTypeId: CommonBaseTypeId
    }),
    dataType: 'json'
  });
  location.reload();
}

btnInsert.addEventListener('click', function () {
  var vname = document.getElementById('nameone').value;
  var vcode = document.getElementById('codeone').value;
  ws_CreateBaseType(vcode, vname);
});
btnUpdate.addEventListener('click', function () {
  var vname = document.getElementById('nameone1').value;
  var vcode = document.getElementById('codeone1').value;
  var code;
  var sumBaseTypeTitle = []; // //TODO:Give a BaseTypeCode

  $.ajax({
    type: 'POST',
    url: '/productcommonbasetype/searchTbBasetype',
    contentType: 'application/json',
    data: JSON.stringify({
      doc_id_msgs: $('#doct_id').val(),
      BaseTypeCode: vcode
    }),
    dataType: 'json',
    success: function success(data) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          row = _step3.value;
          code = row.CommonBaseTypeId;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }); //Todo : check data for uqiun

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
    success: function success(data) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          row = _step4.value;
          sumBaseTypeTitle += row;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  });

  if (sumBaseTypeTitle === 0) {
    ws_UpdateBaseType(vcode, vname, code);
  } else {
    alert('was insert ');
  }
});
btnDel.addEventListener('click', function () {
  var CommonBaseTypeId = document.getElementById('codeone2').value; // var code

  if (CommonBaseTypeId == '') {
    alert('epmty');
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
    ws_DeleteBaseType(CommonBaseTypeId);
  }
}); //table two

function ws_createBaseValue(BaseValue, BaseCode, CommonBaseTypeId) {
  $.ajax({
    type: 'POST',
    url: '/commonbasedata/addBasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      BaseValue: BaseValue,
      BaseCode: BaseCode,
      CommonBaseTypeId: CommonBaseTypeId
    }),
    dataType: 'json'
  });
  location.reload();
}

function ws_updateBaseValue(BaseCode, BaseValue, CommonBaseTypeId, CommonBaseDataId) {
  $.ajax({
    type: 'patch',
    url: '/commonbasedata/UpdateBasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      BaseCode: BaseCode,
      BaseValue: BaseValue,
      CommonBaseTypeId: CommonBaseTypeId,
      CommonBaseDataId: CommonBaseDataId
    }),
    dataType: 'json'
  });
}

function ws_deleteBaseValue(CommonBaseDataId) {
  $.ajax({
    type: 'delete',
    url: '/commonbasedata/DeleteBasedata',
    contentType: 'application/json',
    data: JSON.stringify({
      CommonBaseDataId: CommonBaseDataId
    }),
    dataType: 'json'
  });
}

btnInsertTwo.addEventListener('click', function () {
  var vname = document.getElementById('nameoneTwo').value;
  var vcode = document.getElementById('codeoneTwo').value;
  sNumber = vcode.toString();
  randnumber = [];
  insertnumber = [];

  for (var i = 0, len = sNumber.length; i < len; i += 1) {
    randnumber.push(+sNumber.charAt(i));
  }

  var rand = Math.floor(Math.random() * 999) + 100;
  var random = rand.toString();
  console.log(random);
  var ins = '';

  for (var j = 0; j < 3; j++) {
    ins += randnumber[j];
  }

  ins += random;

  if (vname == '' || vcode == '') {
    alert('epmty');
  } else {
    ws_createBaseValue(vname, vcode, ins);
  }
});
btnUpdateTwo.addEventListener('click', function () {
  console.log('up');
  var vname = document.getElementById('nameoneTwo1').value;
  var vcode = document.getElementById('codeoneTwo1').value;

  if (vname == '' || vcode == '') {
    alert('epmty');
  } else {
    sNumber = vcode.toString();
    randnumber = [];
    insertnumber = [];

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
      randnumber.push(+sNumber.charAt(i));
    }

    var rand = Math.floor(Math.random() * 999) + 100;
    var random = rand.toString();
    console.log(random);
    var ins = '';

    for (var j = 0; j < 3; j++) {
      ins += randnumber[j];
    }

    ins += random;
    ws_updateBaseValue(vname, vcode, CommonBaseTypeId, ins);
    location.reload();
  }
});
btnDeTow.addEventListener('click', function () {
  var vcode = document.getElementById('codeoneTwo2').value;

  if (vcode == '') {
    alert('epmty');
  } else {
    ws_deleteBaseValue(vcode);
    location.reload();
  }
}); //!serach
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