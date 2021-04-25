var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

async function  ws_loadCashAssistanceDetail(findRequest) {
  try{
    let pool = await sql.connect(config);

  }catch (error) {
    console.log(error.message);
  }
}

async function ws_createCashAssistanceDetail(findRequest) {
  try{    let pool = await sql.connect(config);
  } catch (error) {

    console.log(error.message);

  }
}
async function  ws_updateCashAssistanceDetail(findRequest) {
    try {    let pool = await sql.connect(config);
    } catch (error) {
  
      console.log(error.message);
  
  
    }
  }
async function  ws_deleteCashAssistanceDetail(findRequest) {
    try {    let pool = await sql.connect(config);
    } catch (error) {
  
      console.log(error.message);
  
  
    }
  }

  module.exports = {

    ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
    ws_createCashAssistanceDetail: ws_createCashAssistanceDetail,
    ws_updateCashAssistanceDetail: ws_updateCashAssistanceDetail,
    ws_deleteCashAssistanceDetail:ws_deleteCashAssistanceDetail
};