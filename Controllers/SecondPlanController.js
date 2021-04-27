const PlanModel = require("../Models/SecondPlanModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports.loadNeedyForPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    await PlanModel.ws_loadNeedyForPlan(findRequest).then(result => {
      if (result[0] == null) {
        response.json({ error: "هیچ رکوردی موجود نیست" });
      } else {
        response.json(result);
      }
    });
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید",
    });
  }
};

module.exports.AssignNeedyToPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    if (
      (PlanId !== null &&
        Fdate !== null &&
        Tdate !== null &&
        NeedyId !== null) ||
      (PlanId !== undefined &&
        Fdate !== undefined &&
        Tdate !== undefined &&
        NeedyId !== undefined)
    ) {
if(findRequest.Fdate<findRequest.Tdate){
  // تاريخ هاروئ بگيريم  tblPlans در اينجا بايد از جدول  
}else {
  response.json({ error: "تاریخ شروع و پایان را چک کنید " });

}
    }else{
      response.json({ error: " ورودی ها رو چک کنید " });

    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};

module.exports.deleteNeedyFromPlan = async function(request, response) {
  try {
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
