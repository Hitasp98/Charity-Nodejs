const express = require('express')
const bodyParser = require('body-parser')
var mysql = require('mysql')
const app = express()
var model=require('../model/basetype/Model')
const db = require('../model/config')
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)





exports.ws_loadBaseType = (req, res) => {
  if (req.body.CommonBaseTypeId === null &&req.body.BaseTypeCode === null && req.body.BaseTypeTitle === null  ) {
        var d_msg ='SELECT `CommonBaseTypeId`, `BaseTypeTitle`, `BaseTypeCode` FROM `tblcommonbasetype` WHERE 1'
        var d_msgs=[req.body.doc_id_msgs]
        db.query(d_msg, d_msgs, (err, rows) => {
        if (err) {
            console.log('error ', err)
          } else {
           res.send(rows)
          }
    })
//  var respon=model(d_msgs)
//  res.send(respon)
  } else if (req.body.CommonBaseTypeId !== null &&req.body.BaseTypeCode === null &&req.body.BaseTypeTitle === null) {
    var d_msg ='SELECT * FROM `tblcommonbasetype` WHERE CommonBaseTypeId=' +req.body.CommonBaseTypeId
    var d_msgs = [req.body.doc_id_msgs]
    db.query(d_msg, d_msgs, (err, rows) => {
      if (err) {
        console.log('error ', err)
      } else {
        res.send(rows)
      }
    })
  } else if (req.body.CommonBaseTypeId === null &&req.body.BaseTypeCode !== null &&req.body.BaseTypeTitle === null) {
    var d_msg ='SELECT * FROM `tblcommonbasetype` WHERE BaseTypeCode=' +req.body.BaseTypeCode
    var d_msgs = [req.body.doc_id_msgs]
    db.query(d_msg, d_msgs, (err, rows) => {
      if (err) {
        console.log('error ', err)
      } else {
        res.send(rows)
      }
    })
  } else if (req.body.CommonBaseTypeId === null &&req.body.BaseTypeCode === null &&req.body.BaseTypeTitle !== null) {
     var d_msg ='SELECT * FROM `tblcommonbasetype` WHERE BaseTypeTitle=' +req.body.BaseTypeTitle
    var d_msgs = [req.body.doc_id_msgs]
    db.query(d_msg, d_msgs, (err, rows) => {
      if (err) {
        console.log('error ', err)
      } else {
        res.send(rows)
      }
    })
  }
}



exports.ws_CreateBaseType = (req, res) => {
  if (req.body.BaseTypeCode !== null && req.body.BaseTypeTitle !== null) {
    //Todo :creat random number
    var CommonBaseTypeId
    var j = []
    for (let i = 0; i < 3; i++) {
      CommonBaseTypeId += Math.floor(Math.random() * 100)

      if (i == 1) {
        CommonBaseTypeId += Math.floor(Math.random() * 999) + 100
      }
      if (i == 2) {
        //Todo:check random number in CommonBaseTypeId
        var d_msg ='SELECT * FROM `tblcommonbasetype` WHERE CommonBaseTypeId=' +CommonBaseTypeId
        var d_msgs = [req.body.doc_id_msgs]
        db.query(d_msg, d_msgs, (err, rows) => {
          if (err) {
            console.log('error ', err)
          } else {
            j.push(rows)
            if (j.length > 0) {
              i = 0
            }
          }
        })
      }
      console.log(i)
    }

    //Todo:insrt
    db.query(
      'INSERT INTO `tblcommonbasetype` (BaseTypeCode, BaseTypeTitle,CommonBaseTypeId ) VALUES ("' +
        req.body.BaseTypeCode +
        '","' +
        req.body.BaseTypeTitle +
        '","' +
        CommonBaseTypeId +
        '")',
      (err, rows) => {
        if (err) {
          res.send('was insert ')
          console.log('error', err)
        } else {
          console.log('insert')
        }
      }
    )
  } else {
    console.log('is null')
  }
}
exports.ws_UpdateBaseType = (req, res) => {
  var i = 0
  varj = []
  //Todo:check
  var d_msg =
    'SELECT * FROM `tblcommonbasetype` WHERE CommonBaseTypeId=' +
    req.body.CommonBaseTypeId
  var d_msgs = [req.body.doc_id_msgs]
  db.query(d_msg, d_msgs, (err, rows) => {
    if (err) {
      console.log('error ', err)
    } else {
      j.push(rows)
      if (j.length > 0) {
        i = 1
      }
    }
  })
  if (i === 0) {
    db.query(
      "UPDATE `tblcommonbasetype` SET `BaseTypeTitle`='" +
        req.body.BaseTypeTitle +
        ',`BaseTypeCode`=' +
        req.body.BaseTypeCode +
        "' WHERE  `CommonBaseTypeId`='" +
        req.body.CommonBaseTypeId
    ),
      (err, rows) => {
        if (err) {
          console.log('error ', err)
        } else {
          console.log('Update')
        }
      }
  } else {
    console.log('not was insert ')
  }
}
exports.ws_DeleteBaseType = (req, res) => {
  var i = 0
  varj = []
  //Todo:check
  var d_msg =
    'SELECT * FROM `tblcommonbasetype` WHERE CommonBaseTypeId=' +
    req.body.CommonBaseTypeId
  var d_msgs = [req.body.doc_id_msgs]
  db.query(d_msg, d_msgs, (err, rows) => {
    if (err) {
      console.log('error ', err)
    } else {
      j.push(rows)
      if (j.length > 0) {
        i = 1
      }
    }
  })
  if (i === 0) {
    db.query(
      'DELETE FROM `tblcommonbasetype` WHERE `CommonBaseTypeId`=' +
        req.body.CommonBaseTypeId +
        ''
    ),
      (err, rows) => {
        if (err) {
          console.log('error ', err)
        } else {
          console.log('Delete')
        }
      }
  }
}

exports.searchTbBasetype = (req, res) => {
  db.query(
    'SELECT * FROM `tblcommonbasetype` WHERE BaseTypeCode  LIKE ' +
      req.body.BaseTypeCode,
    (err, rows) => {
      if (err) {
        console.log('error ', err)
      } else {
        res.send(rows)
      }
    }
  )
}

exports.searchTbBaseTypeTitle = (req, res) => {
  db.query(
    'SELECT * FROM `tblcommonbasetype` WHERE BaseTypeTitle LIKE  ' +
      req.body.BaseTypeTitle,
    (err, rows) => {
      if (err) {
        console.log('error ', err)
      } else {
        res.send(rows)
      }
    }
  )
}
