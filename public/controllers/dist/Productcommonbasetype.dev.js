"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mysql = require('mysql');

var app = express();

var db = require('../../my-database/config');

app.use(bodyParser.urlencoded({
  extended: true
}));

exports.ws_loadBaseType = function (req, res) {
  if (req.body.CommonBaseTypeId === null && req.body.BaseTypeCode === null && req.body.BaseTypeTitle === null) {
    var d_msg = 'SELECT `CommonBaseTypeId`, `BaseTypeTitle`, `BaseTypeCode` FROM `tblcommonbasetype` WHERE 1';
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseTypeId !== null && req.body.BaseTypeCode === null && req.body.BaseTypeTitle === null) {
    var d_msg = 'SELECT * FROM `tblcommonbasetype` WHERE CommonBaseTypeId=' + req.body.CommonBaseTypeId;
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseTypeId === null && req.body.BaseTypeCode !== null && req.body.BaseTypeTitle === null) {
    var d_msg = 'SELECT * FROM `tblcommonbasetype` WHERE BaseTypeCode=' + req.body.BaseTypeCode;
    var d_msgs = [req.body.doc_id_msgs];
    db.query(d_msg, d_msgs, function (err, rows) {
      if (err) {
        console.log('error ', err);
      } else {
        res.send(rows);
      }
    });
  } else if (req.body.CommonBaseTypeId === null && req.body.BaseTypeCode === null && req.body.BaseTypeTitle !== null) {
    var d_msg = 'SELECT * FROM `tblcommonbasetype` WHERE BaseTypeTitle=' + req.body.BaseTypeTitle;
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

exports.ws_CreateBaseType = function (req, res) {
  if (req.body.BaseTypeCode !== null && req.body.BaseTypeTitle !== null) {
    //Todo :creat random number
    var CommonBaseTypeId;
    var j = [];

    for (var i = 0; i < 3; i++) {
      CommonBaseTypeId += Math.floor(Math.random() * 100);

      if (i == 1) {
        CommonBaseTypeId += Math.floor(Math.random() * 999) + 100;
      }

      if (i == 2) {
        //Todo:check random number in CommonBaseTypeId
        var d_msg = 'SELECT * FROM `tblcommonbasetype` WHERE CommonBaseTypeId=' + CommonBaseTypeId;
        var d_msgs = [req.body.doc_id_msgs];
        db.query(d_msg, d_msgs, function (err, rows) {
          if (err) {
            console.log('error ', err);
          } else {
            j.push(rows);

            if (j.length > 0) {
              i = 0;
            }
          }
        });
      }

      console.log(i);
    } //Todo:insrt


    db.query('INSERT INTO `tblcommonbasetype` (BaseTypeCode, BaseTypeTitle,CommonBaseTypeId ) VALUES ("' + req.body.BaseTypeCode + '","' + req.body.BaseTypeTitle + '","' + CommonBaseTypeId + '")', function (err, rows) {
      if (err) {
        res.send('was insert ');
        console.log('error', err);
      } else {
        console.log('insert');
      }
    });
  } else {
    console.log('is null');
  }
};

exports.ws_UpdateBaseType = function (req, res) {
  db.query("UPDATE `tblcommonbasetype` SET `BaseTypeTitle`='" + req.body.BaseTypeTitle + "' WHERE  `BaseTypeCode`=" + req.body.BaseTypeCode), function (err, rows) {
    if (err) {
      console.log('error ', err);
    } else {
      console.log('Update');
    }
  };
};

exports.ws_DeleteBaseType = function (req, res) {
  db.query('DELETE FROM `tblcommonbasetype` WHERE `CommonBaseTypeId`=' + req.body.CommonBaseTypeId + ''), function (err, rows) {
    if (err) {
      console.log('error ', err);
    } else {
      console.log('Delete');
    }
  };
};

exports.searchTbBasetype = function (req, res) {
  db.query('SELECT * FROM `tblcommonbasetype` WHERE BaseTypeCode  LIKE ' + req.body.BaseTypeCode, function (err, rows) {
    if (err) {
      console.log('error ', err);
    } else {
      res.send(rows);
    }
  });
};

exports.searchTbBaseTypeTitle = function (req, res) {
  db.query('SELECT * FROM `tblcommonbasetype` WHERE BaseTypeTitle LIKE  ' + req.body.BaseTypeTitle, function (err, rows) {
    if (err) {
      console.log('error ', err);
    } else {
      res.send(rows);
    }
  });
};