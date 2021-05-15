const PlanModel = require("../Models/FirstPlanModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var checkDate = require("../Utils/compareDate");
const api = require('../Utils/urlConfig')


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//get plan
//////////////////////////////////////////////////////////////////////////////////////////////////////
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
//insert plan
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.createPlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
   //check mandatory
    if (
      findRequest.PlanName != null &&
      findRequest.PlanNature != null &&
      findRequest.neededLogin != null
    ) {

    //check date  
      if (checkDate.datechack(findRequest.Fdate,findRequest.Tdate)) {
        let findIndex = {
            
          PlanName: findRequest.PlanName,
          PlanNature: findRequest.PlanNature,
          ParentPlanId: findRequest.ParentPlanId,
        };
       
        //check index
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
        response.json({ error: " تاریخ پایان باید از تاریخ شروع بیشتر باشد"  });
      }
    } else {
      response.json({ error: " فیلدهای اجباری را پر کنید " });
    }
  } catch (error) {
    response.json({ error: "رکورد مورد نظر درج نشد" });
  }
};
//update
/////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.UpdatePlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    if (
      findRequest.PlanId!=null&&
      findRequest.PlanName != null &&
      findRequest.PlanNature != null )
     {
        let findById = await PlanModel.ws_loadPlan({PlanId : findRequest.PlanId}); 

        if(findById[0] != null){
         
                  if (checkDate.datechack(findRequest.Fdate,findRequest.Tdate)) {
                    await requestApi.post({url: api.url +'/Succor/loadCashAssistanceDetail', form : { PlanId : findRequest.PlanId}},async function(err,res,body){
                         
                        if(await JSON.parse(body)[0] == null || (findById[0].PlanNature == findRequest.PlanNature )){
                         
                          await requestApi.post({url: api.url +'/SecondPlan/getPlan', form : { PlanId : findRequest.PlanId}},async function(err,res,body){ 
                                
                               if(await JSON.parse(body)[0] == null || (findById[0].Fdate == findRequest.Fdate && findById[0].Tdate == findRequest.Tdate)){
                                  
                                let findIndex = {
                                    PlanName: findRequest.PlanName,
                                    PlanNature: findRequest.PlanNature,
                                    ParentPlanId: findRequest.ParentPlanId,
                                  };
                                  let resultGet = await PlanModel.ws_loadPlan(findIndex);
                                
                                  if (resultGet[0] == null || (resultGet[0].PlanId == findRequest.PlanId)) {
                                    await PlanModel.ws_UpdatePlan(findRequest).then(result => {
                                        response.json(result[0])}
                            
                                    ).catch(error=>
              
                                    response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                                    
                                    )
                                  }else{
                                    response.json({ error: "رکورد ویرایش شده یکتا نیست " });
                                  }
                                }else{
                                  response.json({ error: "  به دلیل وابستگی ویرایش تاریخ شروع یا پایان امکان پذیر نمیباشد " });
                                }
                                   

                            })             
                      }else{
                        response.json({ error: "  به دلیل وابستگی ویرایش ماهيت طرح امکان پذیر نمیباشد " });
                      }
                    })
                }else{
                    response.json({ error: "تاریخ پایان باید از تاریخ شروع بیشتر باشد " });
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
//delete plan
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deletePlan = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    
      
      if(findRequest.PlanId != null ){
        
          let resultGet = await PlanModel.ws_loadPlan({PlanId : findRequest.PlanId}) 
     
          if (resultGet[0] != null){

            // await requestApi.post({url:'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData', form : { PlanId : findRequest.PlanId}},async function(err,res,body){
            //   if (await JSON.parse(body)[0] != null){

            //     await requestApi.post({url:'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData', form : { PlanId : findRequest.PlanId}},async function(err,res,body){
            //         if(await JSON.parse(body)[0] != null){
                      await PlanModel.ws_deletePlan(findRequest).then(result =>{
                        
                        if (result == 1 ){
                            response.json({message:"عملیات حذف با موفقیت انجام شد"})
                        }else{
                            response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
                        }})
            //         }else{
            //           response.json({error : "به دلیل وابستگی عمل حذف امکان پذیر نمیباشد"})
            //         }

            //     })
                
            //   }else{
            //     response.json({error : "به دلیل وابستگی عمل حذف امکان پذیر نمیباشد"})
            //   }
            // })
          }else{
              response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
          }                  

        }else{
          response.json({error : "فیلد های ضروری را پر کنید"})
        }
  } catch (error) {
    response.json({ error: "رکورد مورد نظز پاک نشد" });
  }
};