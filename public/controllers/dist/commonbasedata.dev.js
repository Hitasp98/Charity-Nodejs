"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mysql = require('mysql');

var app = express();

var db = require('../model/config');

app.use(bodyParser.urlencoded({
  extended: true
}));

exports.ws_loadBaseValue = function (req, res) {
  if (req.body.CommonBaseDataId === null && req.body.BaseCode === null && req.body.BaseValue === null && req.body.CommonBaseTypeID === null) {
    var d_msg = 'SELECT `CommonBaseDataId`, `BaseCode`, `BaseValue`, `CommonBaseTypeID` FROM `tblcommonbasedata` WHERE 1';
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseDataId !== null && req.body.BaseCode === null && req.body.BaseValue === null && req.body.CommonBaseTypeID === null) {
    var d_msg = 'SELECT * FROM `tblcommonbasedata` WHERE CommonBaseDataId=' + req.body.CommonBaseDataId;
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseDataId === null && req.body.BaseCode !== null && req.body.BaseValue === null && req.body.CommonBaseTypeID === null) {
    var d_msg = 'SELECT * FROM `tblcommonbasedata` WHERE BaseCode=' + req.body.BaseCode;
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseDataId === null && req.body.BaseCode === null && req.body.BaseValue !== null && req.body.CommonBaseTypeID === null) {
    var d_msg = 'SELECT * FROM `tblcommonbasedata` WHERE BaseValue=' + req.body.BaseValue;
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseDataId === null && req.body.BaseCode === null && req.body.BaseValue === null && req.body.CommonBaseTypeID !== null) {
    var d_msg = 'SELECT * FROM `tblcommonbasedata` WHERE CommonBaseTypeID=' + req.body.CommonBaseTypeID;
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  }
};

exports.ws_createBaseValue = function (req, res) {
  db.query('INSERT INTO `tblcommonbasedata` (BaseCode,BaseValue, CommonBaseDataId ) VALUES ("' + req.body.codeone + '","' + req.body.nameone + '","' + req.body.idrandom + '")', function (err, rows) {
    if (err) {
      console.log('error ', err);
    } else {
      console.log('insert');
    }
  });
};

exports.ws_updateBaseValue = function (req, res) {
  db.query("UPDATE `tblcommonbasedata` SET `BaseValue`='" + req.body.BaseValue + "',CommonBaseDataId='" + req.body.CommonBaseDataId + "' where `BaseCode`=" + req.body.BaseCode + '"CommonBaseTypeId ="' + req.body.CommonBaseTypeId), function (err, rows) {
    if (err) {
      console.log('error ', err);
    } else {
      console.log('Update');
    }
  };
};

exports.ws_deleteBaseValue = function (req, res) {
  var sum;
  var tb = ['tblCharityAccounts', 'tblAssignEducationToNeedy', 'tblNeedyFamily', 'tblNeedyHousing', 'tblNeedySickness', 'tblNeedyAccounts', 'tblNonCashRequest', 'tblRequestFlow'];

  for (var i = 0; i <= tb.length; i++) {
    db.query('SELECT * FROM ' + tb[i] + ' WHERE CommonBaseDataId = ' + req.body.CommonBaseDataId + '', function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        sum++;
      }
    });
  }

  if (sum === 0) {
    db.query('DELETE FROM `tblcommonbasedata` WHERE `CommonBaseDataId`=' + req.body.CommonBaseDataId + ''), function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        console.log('Delete');
      }
    };
  } else {
    console.log("foreign key");
  }
}; // exports.selectTbSearch = (req, res) => {
//   db.query(
//     'SELECT * FROM `tblcommonbasedata` WHERE ' +
//       req.body.filter +
//       '  LIKE ' +
//       req.body.value,
//     (err, rows) => {
//       if (err) {
//         console.log('error ', err)
//       } else {
//         res.send(rows)
//       }
//     }
//   )
// }