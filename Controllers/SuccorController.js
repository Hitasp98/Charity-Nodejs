const Succor = require("../Models/SuccorModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//تست نشده
//join این متد مانند متد های معملولی قبلی گیت معمولی به علاوه
module.exports.loadCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    await Succor.ws_loadCashAssistanceDetail(findRequest).then(result => {
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
//تست نشده

module.exports.createCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = [...request.body];
    if (
      (findRequest.AssignNeedyPlanId !== null &&
        findRequest.PlanId !== null &&
        findRequest.NeededPrice !== null &&
        findRequest.MinPrice !== null &&
        findRequest.Description !== null) ||
      (findRequest.AssignNeedyPlanId !== undefined &&
        findRequest.PlanId !== undefined &&
        findRequest.NeededPrice !== undefined &&
        findRequest.MinPrice !== undefined &&
        findRequest.Description !== undefined)
    ) {
      if ((findRequest.MinPrice = null)) {
        findRequest.MinPrice = 0;
      }
      if (findRequest.MinPrice <= findRequest.NeededPrice) {
        //ترکيب شناسه طرح و نيازمند طرح کليد يکتا را مي سازد
        let findindex = {
          AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
          //?داخل سند فقط گفته شد شناسه طرح و نیاز مند طرح

          PlanId: findRequest.PlanId,
        };
        let findId = await Succor.ws_loadCashAssistanceDetail(findindex);
        if (findId == null) {
          //در نهایت درج
          await Succor.ws_createCashAssistanceDetail(
            findRequest
          ).then(result => {
            if (result != null) {
              response.json(result);
            } else {
              response.json({ error: "درج نشد " });
            }
          });
        } else {
          response.json({
            error: "رکورد تکراری",
          });
        }
      } else {
        response.json({
          error: "حداقل مبلغ بايد از مبلغ مورد نياز کوچکتر يا مساوي باشد.",
        });
      }
    } else {
      response.json({ error: "ورودی هارو چک کنید" });
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
//تست نشده

module.exports.updateCashAssistanceDetail = async function(request, response) {
  try {
    if (
      (findRequest.AssignNeedyPlanId !== null &&
        findRequest.PlanId !== null &&
        findRequest.NeededPrice !== null &&
        findRequest.MinPrice !== null &&
        findRequest.Description !== null) ||
      (findRequest.AssignNeedyPlanId !== undefined &&
        findRequest.PlanId !== undefined &&
        findRequest.NeededPrice !== undefined &&
        findRequest.MinPrice !== undefined &&
        findRequest.Description !== undefined)
    ) {
      if ((findRequest.MinPrice = null)) {
        findRequest.MinPrice = 0;
      }
      if (findRequest.MinPrice <= findRequest.NeededPrice) {
        let findindex = {
          AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
          //?داخل سند فقط گفته شد شناسه طرح و نیاز مند طرح

          PlanId: findRequest.PlanId,
        };
        let findId = await Succor.ws_loadCashAssistanceDetail(findindex);
        if (findId != null) {
          // tblPayment اگر به ازاء شناسه جزئيات رکوردي در جدول  وجود داشته باشد
          //باشد امکان تغييرات روي دو مبلغ وجود ندارد

          requestApi.post(
            {
              url: "Api tblPayment ",
              form: {
                CashAssistanceDetailId: findRequest.CashAssistanceDetailId,
              },
            },
            async function(err, res, body) {
              if ((await JSON.parse(body).CashAssistanceDetailId) != null) {
                //tblCashAssistanceDetail براساس شناسه جزئيات ابتدا رکورد مد نظر از جدول  واکشي مي شود
                let findCashAssistanceDetailId = await Succor.ws_loadCashAssistanceDetail(
                  findRequest.CashAssistanceDetailId
                );
                if (findCashAssistanceDetailId != null) {
                  await Succor.ws_updateCashAssistanceDetail(
                    findRequest
                  ).then(result => {
                    if (result != null) {
                      response.json(result);
                    } else {
                      response.json({ error: "ویرایش نشد " });
                    }
                  });
                } else {
                  response.json({
                    error: "رکورد وجود ندارد",
                  });
                }
              } else {
                response.json({
                  error: "باشد امکان تغييرات روي دو مبلغ وجود ندارد",
                });
              }
            }
          );
        } else {
          response.json({
            error: "رکورد وجود ندارد",
          });
        }
      }
    } else {
      response.json({ error: "ورودی هارو چک کنید" });
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
//تست نشده

module.exports.deleteCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = [...request.body];
    if (
      findRequest.CashAssistanceDetailId !== null ||
      findRequest.CashAssistanceDetailId !== undefined
    ) {
      //tblCashAssistanceDetailبراساس شناسه جزئيات  ابتدا رکورد مد نظر از جدول  واکشي مي شود

      let findCashAssistanceDetailId = await Succor.ws_loadCashAssistanceDetail(
        findRequest.CashAssistanceDetailId
      );
      if (findCashAssistanceDetailId != null) {
        //tblPayment ,CashAssistanceDetailIdبراساس شناسه جزئيات  جدول  داراي رکورد باشد
        requestApi.post(
          {
            url: "Api tblPayment ",
            form: {
              CashAssistanceDetailId: findRequest.CashAssistanceDetailId,
            },
          },
          async function(err, res, body) {
            if ((await JSON.parse(body).CashAssistanceDetailId) == null) {
              //سپس درصورت عدم وابستگي اطلاعات عمل حذف انجام مي شود
              await Succor.ws_deleteCashAssistanceDetail(
                findRequest
              ).then(result => {
                if (result != null) {
                  response.json(result);
                } else {
                  response.json({ error: "رکورد حذف نشد " });
                }
              });
            } else {
              response.json({
                error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
              });
            }
          }
        );
      } else {
        response.json({ error: " رکورد وجود ندارد " });
      }
    } else {
      response.json({ error: "ورودی را چک کنید " });
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
