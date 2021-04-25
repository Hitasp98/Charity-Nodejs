const PlanModel  = require("../Models/SecondPlanModel");
var express           = require("express");
var bodyParser        = require("body-parser");

const requestApi      = require('request');




var app               = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





module.exports.loadCashAssistanceDetail = async function (request, response) {
  try {

    
  } catch (error) {
    response.json({


      error: "کد نوع را وارد کنید"


    });
  }
};

module.exports.createCashAssistanceDetail = async function (request, response) {
  try {


  } catch (error) {


    response.json({error: "کد نوع را وارد کنید"});


  }
};

module.exports.updateCashAssistanceDetail = async function (request, response) {
  try{


  } catch (error) {
    response.json({error: "کد نوع را وارد کنید"})

  }
}
module.exports.deleteCashAssistanceDetail = async function (request, response) {
    try{
  
  
    } catch (error) {
      response.json({error: "کد نوع را وارد کنید"})
  
    }
  }