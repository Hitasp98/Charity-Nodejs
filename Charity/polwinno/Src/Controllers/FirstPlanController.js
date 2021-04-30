const PlanModel = require("../Models/FirstPlanModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports.loadPlan = async function(request, response) {
  try {
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
      error: "رکوردی موجود نیست",
    });
  }
};

module.exports.createPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
   
    if (
      findRequest.PlanName !== null &&
      findRequest.PlanNature !== null 
    ) {
      if (1==1) {
        let findIndex = {
            
          PlanName: findRequest.PlanName,
          PlanNature: findRequest.PlanNature,
          ParentPlanId: findRequest.ParentPlanId,
        };
       
        
        let resultGet = await PlanModel.ws_loadPlan(findIndex);
       
       
        if (resultGet[0] == null) {
          

            await PlanModel.ws_createPlan(findRequest).then(result => 
                
             
               response.json(result[0].PlanId)
              ).catch (error =>
                response.json({error:"رکورد مورد نظر درج نشد"})
              )  
           
          } else {
            response.json({ error: "ورودی ها یکتا نیستند  " });
          }
        
      } else {
        response.json({ error: " مدت پایان باید از مدت شروع بیشتر باشد"  });
      }
    } else {
      response.json({ error: " فیلدهای اجباری را پر کنید " });
    }
  } catch (error) {
    response.json({ error: "رکورد مورد نظر درج نشد" });
  }
};

module.exports.UpdatePlan = async function(request, response) {
  try {
    if (
      findRequest.PlanId!=null&&
      findRequest.PlanName != null &&
      findRequest.PlanNature != null )
     {
        let findById = await PlanModel.ws_loadPlan({PlanId : findRequest.PlanId}); 

        if(findById[0] != null){
            let findIndex = {
                PName: findRequest.PlanName,
                PlanId: findRequest.PlanId,
                ParentPlanId: findRequest.ParentPlanId,
              };
              let resultGet = await PlanModel.ws_loadPlan(findIndex);
              if (resultGet[0] == null || (resultGet[0] != null && resultGet[0].PlanId == findRequest.PlanId)) {
                await PlanModel.ws_UpdatePlan(findRequest).then(result => {
                    response.json(result[0])}
        
                ).catch(error=>

                 response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                
                )
                //!error here
                // requestApi.post(
                //   {
                //     url:
                //       "http://localhost:8090/tblCommonBaseData/tblNonCashAssistanceDetail ",
                //     form: { findRequest: findRequest.PlanId },
                //   },
                //   async function(err, res, body) {
                //     //امكان تغيير ماهيت  وجود ندارد
                //     if ((await JSON.parse(body).PlanId) == findRequest.PlanId) {
                //       let Nature = {
                //         PlandId: findRequest.PlanId,
                //         PlanNature: findRequest.PlanNature,
                //       };
                //       //check PlanNature is here database
                //       //ارسال ماهیت و شناسه برای تشخیص 
                //       let resultPlanNature = await PlanModel.ws_loadPlan(Nature);
                //       //اگر چيزي برگردوند يعني ماهيت طرح را نميخواهد تغيير دهد
                //       //یعنی فیلد عوض نشده 
                //       if (resultPlanNature != null) {
                //         //!error here
                //         requestApi.post(
                //           {
                //             url:
                //               "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans   ",
                //             form: { PlanId: findRequest.PlanId },
                //           },
                //           async function(err, res, body) {
                //             //!اينجا در نظر داشته باشيد اگه برگرده برابر باشد نميتوان تغيير داد تاريخ را ولي در درست نبودن شرط ميتوان تغيير داد
                //             if ((await JSON.parse(body).PlanId) == findRequest.PlanId) {
                //               let date = {
                //                 PlanId: findRequest.PlanId,
                //                 fdate: findRequest.Fdate,
                //                 tdate: findRequest.Tdate,
                //               };
        
                //               //check in Fdate and Tdate base
                //               let resultDate = await PlanModel.ws_loadPlan(date);
        
                //               if (resultDate != null) {
                //                 if (findRequest.Fdate < findRequest.Tdate) {
                //                   //update
                //                   await PlanModel.ws_UpdatePlan(
                //                     findRequest
                //                   ).then(result => {
                //                     if (result != null) {
                //                       response.json(result);
                //                     } else {
                //                       response.json({
                //                         error: " قابل تغییر نیست ",
                //                       });
                //                     }
                //                   });
                //                 } else {
                //                   response.json({
                //                     error: "تاریخ شروع و پایان  را چك كنيد ",
                //                   });
                //                 }
                //               } else {
                //                 response.json({
                //                   error: "تاریخ شروع و پایان قابل تغییر نیست ",
                //                 });
                //               }
                //               //!!اينجا امكان تغيير تاريخ وجود دارد
                //             } else {
                //               if (findRequest.Fdate < findRequest.Tdate) {
                //                 //update
                //                 await PlanModel.ws_UpdatePlan(
                //                   findRequest
                //                 ).then(result => {
                //                   if (result != null) {
                //                     response.json(result);
                //                   } else {
                //                     response.json({
                //                       error: " قابل تغییر نیست ",
                //                     });
                //                   }
                //                 });
                //               } else {
                //                 response.json({
                //                   error: "تاریخ شروع و پایان  را چك كنيد ",
                //                 });
                //               }
                //             }
                //           }
                //         );
                //       } else {
                //         response.json({ error: "ماهیت را نمیتوان تغییر داد" });
                //       }
                //     } else {
                //       //امكان تغيير ماهيت وجود دارد
                //       requestApi.post(
                //         {
                //           url:
                //             "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans   ",
                //           form: { findRequest: findRequest.planId },
                //         },
                //         async function(err, res, body) {
                //           //!اينجا در نظر داشته باشيد اگه برگرده برابر باشد نميتوان تغيير داد تاريخ را ولي در درست نبودن شرط ميتوان تغيير داد
                //           if ((await JSON.parse(body).PlanId) == findRequest.PlanId) {
                //             let date = {
                //               PlanId: findRequest.PlanId,
                //               fdate: findRequest.Fdate,
                //               tdate: findRequest.Tdate,
                //             };
        
                //             //check in Fdate and Tdate base
                //             let resultDate = await PlanModel.ws_loadPlan(date);
        
                //             if (resultDate != null) {
                //               if (findRequest.Fdate < findRequest.Tdate) {
                //                 //update
                //                 await PlanModel.ws_UpdatePlan(
                //                   findRequest
                //                 ).then(result => {
                //                   if (result != null) {
                //                     response.json(result);
                //                   } else {
                //                     response.json({
                //                       error: " قابل تغییر نیست ",
                //                     });
                //                   }
                //                 });
                //               } else {
                //                 response.json({
                //                   error: "تاریخ شروع و پایان  را چك كنيد ",
                //                 });
                //               }
                //             } else {
                //               response.json({
                //                 error: "تاریخ شروع و پایان قابل تغییر نیست ",
                //               });
                //             }
                //             //امكان تغيير تاريخ وجود دارد
                //           } else {
                //             //!!اينجا امكان تغيير تاريخ وجود دارد
                //             if (findRequest.Fdate < findRequest.Tdate) {
                //               //update
                //               await PlanModel.ws_UpdatePlan(
                //                 findRequest
                //               ).then(result => {
                //                 if (result != null) {
                //                   response.json(result);
                //                 } else {
                //                   response.json({
                //                     error: " قابل تغییر نیست ",
                //                   });
                //                 }
                //               });
                //             } else {
                //               response.json({
                //                 error: "تاریخ شروع و پایان  را چك كنيد ",
                //               });
                //             }
                //           }
                //         }
                //       );
                //     }
                //   }
                // );
        }else{
            response.json({ error: "رکورد ویرایش شده یکتا نیست " });
        }
      
      }else{
        response.json({ error: " چنین رکوردی برای ویرایش موجود نیست " });
      }
    } else {
      response.json({ error: " فیلدهای اجباری را پر کنید " });
    }
  } catch (error) {
    response.json({ error: " عملیات ویرایش انجام نشد" });
  }
};










module.exports.deletePlan = async function(request, response) {
  try {
    // requestApi.post(
    //   {
    //     url: "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans",
    //     form: { findRequest: findRequest.planId },
    //   },
    //   async function(err, res, body) {
    //     if ((await JSON.parse(body).PlanId) != findRequest.PlanId) {
    //       requestApi.post(
    //         {
    //           url:
    //             "http://localhost:8090/tblCommonBaseData/tblCashAssistanceDetail",
    //           form: { findRequest: findRequest.planId },
    //         },
    //         async function(err, res, body) {
    //           if ((await JSON.parse(body).PlanId) != findRequest.PlanId) {
    //             requestApi.post(
    //               {
    //                 url:
    //                   "http://localhost:8090/tblCommonBaseData/tblNonCashAssistanceDetail ",
    //                 form: { findRequest: findRequest.planId },
    //               },
    //               async function(err, res, body) {
    //                 if ((await JSON.parse(body).PlanId) != findRequest.PlanId) {
        let resultGet = await PlanModel.ws_deletePlan({PlanId : findRequest.PlanId}) 
   
        if (resultGet[0] != null){
            await PlanModel.ws_deletePlan(findRequest).then(result =>{
    
                if (result == 1 ){
                    response.json({message:"عملیات حذف با موفقیت انجام شد"})
                }else{
                    response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
                }})
        }else{
            response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
        }                  


                    
    //                 } else {
    //                   response.json({
    //                     error:
    //                       "به علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
    //                   });
    //                 }
    //               }
    //             );
    //           } else {
    //             response.json({
    //               error: "به علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
    //             });
    //           }
    //         }
    //       );
    //     } else {
    //       response.json({
    //         error: "به علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود",
    //       });
    //     }
    //   }
    // );
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};