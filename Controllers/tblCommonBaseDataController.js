

const tblCommonBaseDataModel = require('../Models/tblCommonBaseDataModel')





var express = require('express')
var bodyParser = require('body-parser')
const requestApi = require('request')

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

module.exports.getTblCommonBaseDataController = function(request,response){
    let findRequest = {...request.body}
   
    tblCommonBaseDataModel.getTblCommonBaseData(findRequest).then(result =>{ 
        
        
                if(result == null){
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
        console.log(findRequest)

        //for creating code check commonBaseTypeId
       
        if (findRequest.CommonBaseTypeId != ''){
       
        //create common base code 6 char
        //check correct commonBaseType
       
       await requestApi.post({url:'http://localhost:8090/tblCommonBaseType/getTblCommonBaseType', form: {CommonBaseTypeId : findRequest.CommonBaseTypeId}},async function(err,res,body){
           let resultGet = JSON.parse(body).BaseTypeCode
        
        console.log(resultGet)
           //if create BaseCode it will insert data
            
           if (resultGet != '' ){
                await tblCommonBaseDataModel.insertTblCommonBaseData(findRequest).then(result => 
                
                    response.json(result[0].CommonBaseDataId)
                ).catch (error=>
                
                response.json({error:"رکورد مورد نظر ثبت نشد دوباره سعی کنید"})
                )
            }else{
                response.json({error:"صحیح وارد نشده است commonBaseTypeId "})
            }
        })}else{
            response.json({error:"فیلد اجباری را پرکنید  "}) 
        }
        

        }catch (error){
            response.json({error:"  رکورد مورد نظر ثبت نشد دوباره سعی کنید"})
            }  

    }
//update    
//////////////////////////////////////////////////////////////////////////////////////////////////////////
    
module.exports.updateTblCommonBaseDataController = async function(request,response){
try{
    let findRequest = {...request.body}
     if (findRequest.CommonBaseTypeId != null && findRequest.CommonBaseDataId != null){
    // request to commonBaseTypeId
        
    let findGet = await tblCommonBaseDataModel.getTblCommonBaseData({CommonBaseDataId : findRequest.CommonBaseDataId})
       
        if(findGet[0] != null){
            await requestApi.post({url:'http://localhost:8090/tblCommonBaseType/getTblCommonBaseType', form: {CommonBaseTypeId : findRequest.CommonBaseTypeId}},async function(err,res,body){
                let resultGet = JSON.parse(body).BaseTypeCode
                    
    // check commonBaseTypeId for create code
                    
                if(resultGet != null){
                     await tblCommonBaseDataModel.updateTblCommonBaseData(findRequest).then(result =>{
                        
                            if(result==null){
                                response.json({error:" دوباره سعی کنید عملیات ویرایش با موفقیت انجام نشد"})
                            }else{
                
                            response.json(result[0])
                            }
                            
                        })}else{
                            response.json({error:"صحیح وارد نشده است commonBaseTypeId"})
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

    module.exports.deleteTblCommonBaseDataController = async function(request,response){
    try{

        let findRequest = {...request.body}
     
            if (findRequest.CommonBaseDataId != null){
                let findGet = await tblCommonBaseDataModel.getTblCommonBaseData({CommonBaseDataId : findRequest.CommonBaseDataId})
                   
                    if(findGet[0] != null){
                        requestApi.post({url:'http://localhost:8090/tblCharityAccounts/getTblCharityAccounts', form: {BankId : findRequest.CommonBaseDataId,
                        BaseTypeCode : findRequest.BaseTypeCode}},async function(err,res,body){
                           
                                if (await JSON.parse(body)[0] !=null && await JSON.parse(body)[0].BankId == findRequest.CommonBaseDataId){
                                    response.json({error : "امکان حذف بدليل وابستگي امکان پذير نمي باشد"})
                                }else{
                                    await tblCommonBaseDataModel.deleteTblCommonBaseData(findRequest).then(result =>{
                            
                                        if (result == 1 ){
                                            response.json({message:"عملیات حذف با موفقیت انجام شد"})
                                        }else{
                                            response.json({error : "دوباره سعی کنید عملیات حذف با موفقیت انجام نشد"})
                                        }
                                        
                                    })
                                
                                }
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
            