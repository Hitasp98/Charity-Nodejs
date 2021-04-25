const PlanModel  = require("../Models/FirstPlanModel");
var express           = require("express");
var bodyParser        = require("body-parser");

const requestApi      = require('request');




var app               = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





module.exports.loadPlan = async function (request, response) {
  try {
    let pool = await sql.connect(config)

    let findRequest = {...request.body}
await PlanModel.ws_loadPlan(findRequest).then(result=>{
  if(result[0] == null){
    response.json({error:"هیچ رکوردی موجود نیست"})
}else{
    response.json(result)
}
})
    
  } catch (error) {
    response.json({


      error: "کد نوع را وارد کنید"


    });
  }
};

module.exports.createPlan = async function (request, response) {
  try {


  } catch (error) {


    response.json({error: "کد نوع را وارد کنید"});


  }
};

module.exports.UpdatePlan = async function (request, response) {
  try{


  } catch (error) {
    response.json({error: "کد نوع را وارد کنید"})

  }
}
module.exports.deletePlan = async function (request, response) {
    try{
  
  
    } catch (error) {
      response.json({error: "کد نوع را وارد کنید"})
  
    }
  }