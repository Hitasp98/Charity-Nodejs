"use strict";

var db = {
  user: "sa",
  password: 'A12345678n',
  server: 'localhost',
  database: "CharityDB",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    },
    instancename: "DESKTOP-H5QIT0E"
  },
  port: 1433
};
module.exports = db; // var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword"
// });
// module.exports=con;