const PlanSettelmentModelModel  = require("../Models/SettelmentModel");
var express           = require("express");
var bodyParser        = require("body-parser");

const requestApi      = require('request');




var app               = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





module.exports.loadPayment = async function (request, response) {
  try {

    
  } catch (error) {
    response.json({


      error: "کد نوع را وارد کنید"


    });
  }
};

module.exports.loadCashAssistanceDetail = async function (request, response) {
  try {


  } catch (error) {


    response.json({error: "کد نوع را وارد کنید"});


  }
};

module.exports.Settelment = async function (request, response) {
  try{


  } catch (error) {
    response.json({error: "کد نوع را وارد کنید"})

  }
}

module.exports.UpdatePayment = async function (request, response) {
    try {
  
  
    } catch (error) {
  
  
      response.json({error: "کد نوع را وارد کنید"});
  
  
    }
  };
  
module.exports.deletePayment = async function (request, response) {
    try{
  
  
    } catch (error) {
      response.json({error: "کد نوع را وارد کنید"})
  
    }
  }