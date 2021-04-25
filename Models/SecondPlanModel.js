var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_loadNeedyForPlan(findRequest) {
  try{
    let pool = await sql.connect(config);

  }catch (error) {
    console.log(error.message);
  }
}
async function  ws_AssignNeedyToPlan(findRequest) {
  try {    let pool = await sql.connect(config);
  } catch (error) {

    console.log(error.message);


  }
}
async function ws_deleteNeedyFromPlan(findRequest) {
  try{    let pool = await sql.connect(config);
  } catch (error) {

    console.log(error.message);

  }
}

module.exports = {

    ws_loadNeedyForPlan: ws_loadNeedyForPlan,
    ws_AssignNeedyToPlan: ws_AssignNeedyToPlan,
    ws_deleteNeedyFromPlan: ws_deleteNeedyFromPlan,

};