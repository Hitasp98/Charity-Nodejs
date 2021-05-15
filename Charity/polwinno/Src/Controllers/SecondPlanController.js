const PlanModel = require("../Models/SecondPlanModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");
const { json } = require("express");
const checkDate = require("../Utils/compareDate");

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
      error: "رکورد مورد نظر یافت نشد",
    });
  }
};


module.exports.AssignNeedyToPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
  
    if (
        findRequest.PlanId != null &&
        findRequest.Fdate != null &&
        findRequest.Tdate != null &&
        findRequest.NeedyId != null
      ) {
        
      // let Fdate = date.changed(findRequest.Fdate);
      // findRequest.Fdate = Fdate.toString();
      // let Tdate = date.changed(findRequest.Tdate);
      // findRequest.Tdate = Tdate.toString();
      // let checkDate = date.datechack(findRequest.Fdate, findRequest.Tdate);
      
      if (checkDate.datechack(findRequest.Fdate,findRequest.Tdate)) {
        // تاريخ هاروئ بگيريم  tblPlans در اينجا بايد از جدول
        //ادرس درست است

        requestApi.post(
          {
            url: "http://localhost:8090/FirstPlan/getPlan",
            form : {
              PlanId : findRequest.PlanId
            }
          },
          async function(err, res, body) {
            let fPlan = await JSON.parse(body);
           if(fPlan[0] != null){
               // //در اینجا رنج تاریخ را چک میکنیم
            // //ابتدا تاریخ شروع کوچک تر را تاریخ جدول پلن یک میگیریم
            let startdate = checkDate.datechack(fPlan[0].Fdate, findRequest.Fdate);
            let finshdate = checkDate.datechack(findRequest.Tdate, fPlan[0].Tdate);

            if (startdate == true && finshdate == true) {
                let flag
                for (let i=0;i<findRequest.NeedyId.length;i++){
                    let fNeedyId = {
                      NeedyId: findRequest.NeedyId[i],
                      PlanId: findRequest.PlanId,
                    };
                  
                    let findNeedyId = await PlanModel.ws_loadNeedyForPlan(fNeedyId);
                          flag = 0
                          if(findNeedyId[0] != null){
                           break
                          }else{
                            flag = 1
                          }

                 }
                
                if(flag == 1 ){
                  await PlanModel.ws_AssignNeedyToPlan(
                    findRequest
                  ).then(result => {
                    if (result[0] != null) {
                      response.json(result[0]);
                    } else {
                      response.json({ error: " رکورد مورد نظر درج نشد  " });
                    }
                  });
                }else{
                  response.json({ error: " رکورد مورد نظر یکتا نیست  " });
                }
            } else {
              response.json({
                error: " تاریخ شروع و پایان را چک کنید در رنج نیست",
              });
            }
           }else{
            response.json({
              error: " چنین طرحی برای درج رکورد موجود نمیباشد",
            });
           }
           
          }
        );
      } else {
        response.json({ error: "تاریخ شروع قبل تاریخ پایان باید باشد " });
      }
     } else {
       response.json({ error: "فیلدهای ضروری را پر کنید " });
     }
  } catch (error) {
    response.json({
      error: "رکورد مورد نظر درج نشد",
    });
  }
};


module.exports.deleteNeedyFromPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
      if (findRequest.PlanId != null && findRequest.AssignNeedyPlanId ==null) {
        let findAssignNeedyPlanId = await PlanModel.ws_loadNeedyForPlan({PlanId : findRequest.PlanId});
        let deleteAssignNeedyPlanId = []
        for (let i=0; i<findAssignNeedyPlanId.length;i++){
           deleteAssignNeedyPlanId.push(findAssignNeedyPlanId[i].AssignNeedyPlanId)
        }
            let deleteRecord = 0
            let notDeleteRecord = 0
            for(let j=0 ; j<deleteAssignNeedyPlanId.length ;j++){

              await PlanModel.ws_deleteNeedyFromPlan({AssignNeedyPlanId : deleteAssignNeedyPlanId[j]}).then(result =>{
                if (result == 1 ){
                  deleteRecord = deleteRecord + 1
              }else{
                notDeleteRecord = notDeleteRecord +1
              }
            })
         
        }
          response.json({message:`${deleteRecord} رکورد حذف شد `})
      }else if(findRequest.PlanId == null && findRequest.AssignNeedyPlanId != null) {
                   // await requestApi.post({url: api.url +'/CashAssistanceDetail/getCashAssistanceDetail', form : { PlanId : findRequest.PlanId}},async function(err,res,body){
                         
                    //     if(await JSON.parse(body)[0] == null || (await JSON.parse(body)[0].PlanNature == findRequest.PlanNature )){
                    //         await requestApi.post({url: api.url +'/SecondPlan/getPlan', form : { PlanId : findRequest.PlanId}},async function(err,res,body){ 
                                
                               // if(await JSON.parse(body)[0] == null || (await JSON.parse(body)[0].PlanNature == findRequest.PlanNature)){
                                let findIndex = {
                                 AssignNeedyPlanId : findRequest.AssignNeedyPlanId
                                };
                                let resultGet = await PlanModel.ws_loadNeedyForPlan(findIndex);
                             
                                if (resultGet[0] != null ) {
               
                                   await PlanModel.ws_deleteNeedyFromPlan(findRequest).then(result => {
                                    if (result == 1 ){
                                      response.json({message:"عملیات حذف با موفقیت انجام شد"})
                                  }else{
                                      response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
                                  }})  
                                }else{
                                  response.json({ error: "هیچ رکوردی برای حذف موجود نیست" });
                                }
                              // }else{
                              //   response.json({ error: "  به دلیل وابستگی ویرایش تاریخ شروع یا پایان امکان پذیر نمیباشد " });
                              // }
                                 

                  //         })             
                  //   }else{
                  //     response.json({ error: "  به دلیل وابستگی ویرایش ماهيت طرح امکان پذیر نمیباشد " });
                  //   }
                  // })
      }
    }catch (error) {
          response.json({
            error: "عملیات حذف انجام نشد",
          });
        } 
};

















//  ///درصورتيکه شناسه طرح حاوي مقدار باشد و شناسه تخصيص نداشته باشيم
//       //، بايد ابتدا متد فراخواني کنيم و سپس ليست شناسه تخصيص نيازمند به طرح را درآوريم
//       //!!!!!!!!!!!!!!!در اینجا میتوانید کل تشخیص وجود مقدار در جدول را چک کنید
//       //فعلا فقط مقدار که سند گفته شده ریختم اگر هم نباشد خالی میشود
//       if (
//         findRequest.AssignNeedyPlanId == null ||
//         findRequest.AssignNeedyPlanId == undefined
//       ) {
//         let findAssignNeedyPlanId = await PlanModel.ws_loadNeedyForPlan(
//           findRequest.PlanId
//         );
//         findRequest.AssignNeedyPlanId =
//           findAssignNeedyPlanId[0].AssignNeedyPlanId;
//       }

//       //درصورتيکه شناسه تخصيص حاوي مقدار باشد، براساس شناسه تخصيص نيازمند
//       //! ============================>اولویت ابتدای امر با شناسه تخصيص نيازمند به طرح در صورت نداشتن  شناسه طرح مهم)
//       if (
//         findRequest.AssignNeedyPlanId != null ||
//         findRequest.AssignNeedyPlanId != undefined
//       ) {
//         //api اینجا اررو هست دلیل نداشتن
//         requestApi.post(
//           {
//             //tblNonCashAssistanceDetail
//             url: "tblCashAssistanceDetail",
//             from: {
//               // در این قسمت در  داخل سند نوشته شد بود
//               AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
//             },
//           },
//           async function(err, res, body) {
//             let fPlan = await JSON.parse(body);
//             if (fPlan[0] == null) {
//               requestApi.post(
//                 {
//                   //tblNonCashAssistanceDetail
//                   url: " tblNonCashAssistanceDetail ",
//                   from: {
//                     // در این قسمت در  داخل سند نوشته شد بود

//                     AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
//                   },
//                 },
//                 async function(err, res, body) {
//                   let fPlan2 = await JSON.parse(body);
//                   if (fPlan2[0] == null) {
//                     let findPlanId = await PlanModel.ws_loadNeedyForPlan(
//                       findRequest.AssignNeedyPlanId
//                     );
//                     if (findPlanId != null) {
//                       //حذف نهایی
//                       await PlanModel.ws_deleteNeedyFromPlan(
//                         findRequest.AssignNeedyPlanId
//                       ).then(result => {
//                         if (result != null) {
//                           response.json("حذف شد");
//                         } else {
//                           response.json({ error: "حذف نشد" });
//                         }
//                       });
//                     } else {
//                       response.json({ error: "رکورد یافت نشد " });
//                     }
//                   } else {
//                     response.json({
//                       error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
//                     });
//                   }
//                 }
//               );
//             } else {
//               response.json({
//                 error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
//               });
//             }
//           }
//         );
//       } else {
//         //براساس شناسه تخصيص اگر مقدار داشت اگر مقدار نبود براساس شناسه طرح  ابتدا رکورد

//         let findPlanId = await PlanModel.ws_loadNeedyForPlan(
//           findRequest.PlanId
//         );
//         if (findPlanId != null) {
//           //حذف نهایی
//           await PlanModel.ws_deleteNeedyFromPlan(
//             findRequest.PlanId
//           ).then(result => {
//             if (result != null) {
//               response.json("حذف شد");
//             } else {
//               response.json({ error: "حذف نشد" });
//             }
//           });
//         } else {
//           response.json({ error: "رکورد یافت نشد " });
//         }
//       }
//     } else {
//       response.json({ error: "ورودی هارو چک کنید " });
//     }
//   } catch (error) {
//     response.json({
//       error: "اشتباه",
//     });
//   }