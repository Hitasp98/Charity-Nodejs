const PlanModel  = require("../Models/SecondPlanModel");
var express           = require("express");
var bodyParser        = require("body-parser");

const requestApi      = require('request');




var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





module.exports.loadNeedyForPlan = async function (request, response) {
  try {

    
  } catch (error) {
    response.json({


      error: "کد نوع را وارد کنید"


    });
  }
};

module.exports.AssignNeedyToPlan = async function (request, response) {
  try {


  } catch (error) {


    response.json({error: "کد نوع را وارد کنید"});


  }
};

module.exports.deleteNeedyFromPlan = async function (request, response) {
  try{


  } catch (error) {
    response.json({error: "کد نوع را وارد کنید"})

  }
}
