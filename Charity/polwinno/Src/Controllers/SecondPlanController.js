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
//AssignNeedyToPlan
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            
            let startdate = checkDate.datechack(fPlan[0].Fdate, findRequest.Fdate);
            let finshdate = checkDate.datechack(findRequest.Tdate, fPlan[0].Tdate);

            if (startdate == true && finshdate == true) {
              //check index  
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
//deleteNeedyFromPlan
//////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deleteNeedyFromPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
      if (findRequest.PlanId != null && findRequest.AssignNeedyPlanId == null) {
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
                   await requestApi.post({url: api.url +'/Succor/loadCashAssistanceDetail', form : { AssignNeedyPlanId : findRequest.AssignNeedyPlanId}},async function(err,res,body){
                         
                        if(await JSON.parse(body)[0] == null){
                           
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
                                          
                    }else{
                      response.json({ error: "  به دلیل وابستگی ویرایش ماهيت طرح امکان پذیر نمیباشد " });
                    }
                  })
      }
    }catch (error) {
          response.json({
            error: "عملیات حذف انجام نشد",
          });
        } 
};
















