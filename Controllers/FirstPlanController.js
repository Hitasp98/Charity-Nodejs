const PlanModel = require("../Models/FirstPlanModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports.loadPlan = async function(request, response) {
  try {
    let pool = await sql.connect(config);

    let findRequest = { ...request.body };
    await PlanModel.ws_loadPlan(findRequest).then(result => {
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

module.exports.createPlan = async function(request, response) {
  try {
    if (findRequest.Fdate < findRequest.Tdate) {
      let findIndex = {
        PName: findRequest.PlanName,
        PlanNature: findRequest.PlanNature,
        ParentPlanId: findRequest.ParentPlanId,
      };
      let loadPlan = await PlanModel.ws_loadPlan(findIndex);
      if (loadPlan == null) {
        await PlanModel.ws_createPlan(findRequest).then(result => {
          if (result == null) {
            //not insert
          } else {
            response.json(result.PlanId);
          }
        });
      }
    } else {
      response.json({ error: "تاریخ شروع و پایان را چک کنید " });
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};

module.exports.UpdatePlan = async function(request, response) {
  try {
    if (findRequest.Fdate < findRequest.Tdate) {
      let findIndex = {
        PName: findRequest.PlanName,
        PlanNature: findRequest.PlanNature,
        ParentPlanId: findRequest.ParentPlanId,
      };
      let loadPlan = await PlanModel.ws_loadPlan(findIndex);
      if (loadPlan == null) {
        //!error here
        requestApi.post(
          {
            url:
              "http://localhost:8090/tblCommonBaseData/tblNonCashAssistanceDetail ",
            form: { findRequest: findRequest.PlanId },
          },
          async function(err, res, body) {
            if ((await JSON.parse(body).PlanId) == findRequest.PlanId) {
              if (findRequest.PlanNature === null) {
                //!error here
                requestApi.post(
                  {
                    url:
                      "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans   ",
                    form: { findRequest: findRequest.planId },
                  },
                  async function(err, res, body) {
                    if (
                      findRequest.Fdate === null ||
                      findRequest.Tdate === null
                    ) {
                    } else {
                      response.json({
                        error: "تاریخ شروع و پایان قابل تغییر نیست ",
                      });
                    }
                  }
                );
              } else {
                response.json({ error: "ماهیت را نمیتوان تغییر داد" });
              }
            }
          }
        );
      }
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
module.exports.deletePlan = async function(request, response) {
  try {
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
