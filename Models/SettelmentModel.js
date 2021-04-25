var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_loadPayment(findRequest) {
  try{
    let pool = await sql.connect(config);

  }catch (error) {
    console.log(error.message);
  }
}
async function  ws_loadCashAssistanceDetail(findRequest) {
  try {    let pool = await sql.connect(config);
  } catch (error) {

    console.log(error.message);


  }
}
async function ws_Settelment(findRequest) {
  try{    let pool = await sql.connect(config);
  } catch (error) {

    console.log(error.message);

  }
}
async function ws_UpdatePayment(findRequest) {
    try{    let pool = await sql.connect(config);
    } catch (error) {
  
      console.log(error.message);
  
    }
  }
async function ws_deletePayment(findRequest) {
    try{    let pool = await sql.connect(config);
    } catch (error) {
  
      console.log(error.message);
  
    }
  }
module.exports = {

    ws_loadPayment: ws_loadPayment,
    ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
    ws_Settelment: ws_Settelment,
    ws_UpdatePayment:ws_UpdatePayment,
    ws_deletePayment,ws_deletePayment
};