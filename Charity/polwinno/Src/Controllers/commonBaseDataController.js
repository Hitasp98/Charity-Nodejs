


const tblCommonBaseDataModel = require('../Models/commonBaseDataModel')
const api = require('../Utils/urlConfig')




var express = require('express')
var bodyParser = require('body-parser')
const requestApi = require('request')

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
//get controller
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getTblCommonBaseDataController = function(request,response){
    let findRequest = {...request.body}
   
    tblCommonBaseDataModel.ws_loadBaseValue(findRequest).then(result =>{ 
        
        
                if(result[0] == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
                
            
            

        })
    
    }
//insert data
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    module.exports.insertTblCommonBaseDataController = async function(request,response){
      try{
        let findRequest = {...request.body}
       
        //for creating code check commonBaseTypeId
        //for checking mandatory
        if (findRequest.CommonBaseTypeId != null){
       
        //create common base code 6 char
        //check correct commonBaseType
       
       await requestApi.post({url: api.url+'/CommonBaseType/getCommonBaseType', form: {CommonBaseTypeId : findRequest.CommonBaseTypeId}},async function(err,res,body){
           
           //if create BaseCode it will insert data
           
           if (JSON.parse(body)[0] != null ){
                await tblCommonBaseDataModel.ws_createBaseValue(findRequest).then(result => 
                
                    response.json(result[0][0].CommonBaseDataId)
                ).catch (error=>
                
                response.json({error:"رکورد مورد نظر ثبت نشد دوباره سعی کنید"})
                )
            }else{
                response.json({error:"شناسه نوع صحیح وارد نشده است "})
            }
        })}else{
            response.json({error:"فیلد اجباری را پرکنید  "}) 
        }
        

        }catch (error){
            response.json({error:"  رکورد مورد نظر ثبت نشد دوباره سعی کنید"})
            }  

    }
//update controller   
//////////////////////////////////////////////////////////////////////////////////////////////////////////
    
module.exports.updateTblCommonBaseDataController = async function(request,response){
try{
    let findRequest = {...request.body}
     if (findRequest.CommonBaseTypeId != null && findRequest.CommonBaseDataId != null){
    // request to commonBaseTypeId
        
    let findGet = await tblCommonBaseDataModel.ws_loadBaseValue({CommonBaseDataId : findRequest.CommonBaseDataId})
    
        if(findGet[0] != null){
            await requestApi.post({url: api.url +'/CommonBaseType/getCommonBaseType', form: {CommonBaseTypeId : findRequest.CommonBaseTypeId}},async function(err,res,body){
           
                    
    // check commonBaseTypeId for create code
                    
                if(JSON.parse(body)[0] != null){
                     await tblCommonBaseDataModel.ws_updateBaseValue(findRequest).then(result =>{
                        
                            if(result==null){
                                response.json({error:" دوباره سعی کنید عملیات ویرایش با موفقیت انجام نشد"})
                            }else{
                
                            response.json(result[0])
                            }
                            
                        })}else{
                            response.json({error:"شناسه نوع صحیح وارد نشده است"})
                        }
                    
                    
                })
            }else{
                response.json({error:"چنین رکوردی برای ویرایش موجود نمیباشد"})
            }

        }else{
            response.json({error:"فیلدهای اجباری را پرکنید"})
        }
            
           
        }catch (error){
                    response.json({error:" دوباره سعی کنید عملیات ویرایش با موفقیت انجام نشد"})
                    
            }  
       
    }
//delete controller    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    module.exports.deleteTblCommonBaseDataController = async function(request,response){
    try{

        let findRequest = {...request.body}
     
            if (findRequest.CommonBaseDataId != null){
                let findGet = await tblCommonBaseDataModel.ws_loadBaseValue({CommonBaseDataId : findRequest.CommonBaseDataId})
                   
                    if(findGet[0] != null){
                        //check dependency
                        requestApi.post({url: api.url +'/CharityAccounts/checkCharityAccounts', form: {BankId : findRequest.CommonBaseDataId
                        }},async function(err,res,body){
                             let findCharity = await JSON.parse(body)[0]
                            requestApi.post({url: api.url +'/NeedyAccounts/checkNeedyAccounts', form: {BankId : findRequest.CommonBaseDataId
                            }},async function(err,res,body){
                                let findNeedyAccount = await JSON.parse(body)[0]
                               
                                if (findCharity != null || findNeedyAccount != null ){
                                    response.json({error : "امکان حذف بدليل وابستگي امکان پذير نمي باشد"})
                                }else{
                                    await tblCommonBaseDataModel.ws_deleteBaseValue(findRequest).then(result =>{
                            
                                        if (result == 1 ){
                                            response.json({message:"عملیات حذف با موفقیت انجام شد"})
                                        }else{
                                            response.json({error : "دوباره سعی کنید عملیات حذف با موفقیت انجام نشد"})
                                        }
                                        
                                    })
                                
                                }
                            })
                                       
                        })
                    }else{
                        response.json({error : "چنین رکوردی موجود نیست"})
                    }       
                       

        }else{
            response.json({error : "فیلد های اجباری را پر کنید"})
        }

    }catch (error){
        response.json({error:" دوباره سعی کنید عملیات حذف با موفقیت انجام نشد"})
        
        }     
        
    }
            