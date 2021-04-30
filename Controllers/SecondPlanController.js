const PlanModel = require("../Models/SecondPlanModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");
const { json } = require("express");
const date = require("../Utils/date");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//تست نشده
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
//تست نشده

module.exports.AssignNeedyToPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    console.log(findRequest.PlanId);
    if (
      (findRequest.PlanId !== null &&
        findRequest.Fdate !== null &&
        findRequest.Tdate !== null &&
        findRequest.NeedyId !== null) ||
      (findRequest.PlanId !== undefined &&
        findRequest.Fdate !== undefined &&
        findRequest.Tdate !== undefined &&
        findRequest.NeedyId !== undefined)
    ) {
      console.log(findRequest.PlanId);
      console.log(findRequest.Fdate);
      console.log(findRequest.Tdate);
      let checkDate = date.datechack(findRequest.Fdate, findRequest.Tdate);
      if (checkDate == true) {
        // تاريخ هاروئ بگيريم  tblPlans در اينجا بايد از جدول
        //ادرس درست است
        requestApi.post(
          {
            url: "http://localhost:8090/FirstPlan/loadPlan",
            from: {
              PlanId: findRequest.PlanId,
              Fdate: findRequest.Fdate,
              Tdate: findRequest.Tdate,
            },
          },
          async function(err, res, body) {
            let fPlan = await JSON.parse(body);
            console.log(fPlan[0].Fdate);
            //در اینجا رنج تاریخ را چک میکنیم
            //ابتدا تاریخ شروع کوچک تر را تاریخ جدول پلن یک میگیریم
            let startdate = date.datechack(fPlan[0].Fdate, findRequest.Fdate);
            if (startdate == true) {
              //در اینجا تاریخ پایان پلن دو رو کوچک تر درنظر میگیریم
              let finshdate = date.datechack(findRequest.Tdate, fPlan[0].Tdate);
              if (finshdate == true) {
                //در اینجا باید ابتدا چک کنیم در رنج تاریخ است
                //!مشکل اینجا این است تاریخ ها بصورت رشته ای است نه عددی برای مقایسه حتما باید چک کنیم عدد هستش
                //!میتونی شرط عدد بودن بگذاریم

                //چک برای اینه تکراری نباشه
                //شناسه هارو اینجا فقط میفرستیم طبق سند گفته شده شناسه ها  ترکیب یکتا باشند
                let fNeedyId = {
                  NeedyId: findRequest.NeedyId,
                  PlanId: findRequest.PlanId,
                };

                let findNeedyId = await PlanModel.ws_loadNeedyForPlan(fNeedyId);
                if (findNeedyId == null) {
                  await PlanModel.ws_AssignNeedyToPlan(
                    findRequest
                  ).then(result => {
                    if (result != null) {
                      response.json(result);
                    } else {
                      response.json({ error: "درج نشد   " });
                    }
                  });
                } else {
                  response.json({ error: " درج تکراری  " });
                }
              } else {
                response.json({
                  error: " تاریخ شروع و پایان را چک کنید در رنج نست",
                });
              }
            } else {
              response.json({
                error: " تاریخ شروع و پایان را چک کنید در رنج نست",
              });
            }
          }
        );
      } else {
        response.json({ error: "تاریخ شروع و پایان را چک کنید " });
      }
    } else {
      response.json({ error: " ورودی ها رو چک کنید " });
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
//تست نشده

module.exports.deleteNeedyFromPlan = async function(request, response) {
  try {
    let findRequest = [...request.body];
    if (findRequest.PlanId !== null || findRequest.PlanId !== undefined) {
      ///درصورتيکه شناسه طرح حاوي مقدار باشد و شناسه تخصيص نداشته باشيم
      //، بايد ابتدا متد فراخواني کنيم و سپس ليست شناسه تخصيص نيازمند به طرح را درآوريم
      //!!!!!!!!!!!!!!!در اینجا میتوانید کل تشخیص وجود مقدار در جدول را چک کنید
      //فعلا فقط مقدار که سند گفته شده ریختم اگر هم نباشد خالی میشود
      if (
        findRequest.AssignNeedyPlanId !== null ||
        findRequest.AssignNeedyPlanId !== undefined
      ) {
        let findAssignNeedyPlanId = await PlanModel.ws_loadNeedyForPlan(
          findRequest.PlanId
        );
        findRequest.AssignNeedyPlanId=findAssignNeedyPlanId[0].AssignNeedyPlanId
      }
      //درصورتيکه شناسه تخصيص حاوي مقدار باشد، براساس شناسه تخصيص نيازمند
      //! ============================>اولویت ابتدای امر با شناسه تخصيص نيازمند به طرح در صورت نداشتن  شناسه طرح مهم)
      if (
        findRequest.AssignNeedyPlanId != null ||
        findRequest.AssignNeedyPlanId != undefined
      ) {
        //api اینجا اررو هست دلیل نداشتن
        requestApi.post(
          {
            //tblNonCashAssistanceDetail
            url: "tblCashAssistanceDetail",
            from: {
              // در این قسمت در  داخل سند نوشته شد بود
              AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
            },
          },
          async function(err, res, body) {
            let fPlan = await JSON.parse(body);
            console.log(fPlan[0]);
            if (fPlan[0] == null) {
              requestApi.post(
                {
                  //tblNonCashAssistanceDetail
                  url: " tblNonCashAssistanceDetail ",
                  from: {
                    // در این قسمت در  داخل سند نوشته شد بود

                    AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
                  },
                },
                async function(err, res, body) {
                  let fPlan2 = await JSON.parse(body);
                  console.log(fPlan2[0]);
                  if (fPlan2[0] == null) {
                    let findPlanId = await PlanModel.ws_loadNeedyForPlan(
                      findRequest.AssignNeedyPlanId
                    );
                    if (findPlanId != null) {
                      //حذف نهایی
                      await PlanModel.ws_deleteNeedyFromPlan(
                        findRequest.AssignNeedyPlanId
                      ).then(result => {
                        if (result != null) {
                          response.json("حذف شد");
                        } else {
                          response.json({ error: "حذف نشد" });
                        }
                      });
                    } else {
                      response.json({ error: "رکورد یافت نشد " });
                    }
                  } else {
                    response.json({
                      error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
                    });
                  }
                }
              );
            } else {
              response.json({
                error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
              });
            }
          }
        );
      } else {
        //براساس شناسه تخصيص اگر مقدار داشت اگر مقدار نبود براساس شناسه طرح  ابتدا رکورد
      
  
            let findPlanId = await PlanModel.ws_loadNeedyForPlan(
              findRequest.PlanId
            );
            if (findPlanId != null) {
              //حذف نهایی
              await PlanModel.ws_deleteNeedyFromPlan(
                findRequest.PlanId
              ).then(result => {
                if (result != null) {
                  response.json("حذف شد");
                } else {
                  response.json({ error: "حذف نشد" });
                }
              });
            } else {
              response.json({ error: "رکورد یافت نشد " });
            }
          } 
          
        }else {
          response.json({error:"ورودی هارو چک کنید "})
        }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};
