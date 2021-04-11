var mysql = require('mysql');
var db = mysql.createConnection({
  host: "localhost",
  user: "admin" /* replace these with real values. */,
  password: "admin" /* replace these with real values. */,
  database: "model_data" /* replace these with real values. */,
});
module.exports=db;