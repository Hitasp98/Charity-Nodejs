"use strict";

var sql = require('../config');

var bodyParser = require('body-parser');

var mysql = require('mysql');

var bcrypt = require('bcryptjs');

function select(newUser) {
  var query = sql.query('SELECT `CommonBaseTypeId`, `BaseTypeTitle`, `BaseTypeCode` FROM `tblcommonbasetype` WHERE 1', newUser, function (err, res) {
    console.log(query);

    if (err) {
      console.log('error');
    } else {
      return res;
    }
  });
}

module.exports = select;