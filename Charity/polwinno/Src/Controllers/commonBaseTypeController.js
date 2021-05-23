 const tblCommonBaseTypeModel = require('../Models/commonBaseTypeModel')
 // create url for example http://localhost:8090
 const api = require('../Utils/urlConfig')

var express = require('express')
var bodyParser = require('body-parser')
const requestApi = require('request');
const { json } = require('body-parser');

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get controller
module.exports.getTblCommonBaseTypeController = function(request,response){
    try{

        let findRequest = {...request.body}
   
        tblCommonBaseTypeModel.ws_loadBaseType(findRequest).then(result =>{ 
        
            
                if(result[0] == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
        })

    }catch (error){
        response.json({error:"رکورد مورد نظر یافت نشد"})
        } 
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//insert controller
    module.exports.insertTblCommonBaseTypeController = async function(request,response){
        try{
            let findRequest = {...request.body}
//for checking mandatory
       if(findRequest.BaseTypeTitle != null){
//first get for cecking index property
        let resultGet = await tblCommonBaseTypeModel.ws_loadBaseType({BaseTypeTitle : findRequest.BaseTypeTitle})
   
            if(resultGet[0] == null){
                tblCommonBaseTypeModel.ws_CreateBaseType(findRequest).then(result => 
            
                    response.json(result)
                ).catch (error=>
                
                   response.json({error:"رکورد مورد نظر ثبت نشد"})
                )
            }else{
                response.json({error:"عنوان یکتا نیست"})
            }
       
       }else{

        response.json({error:"فیلدهای اجباری را پر کنید"})
        
     }}catch (error){
        response.json({error:"رکورد مورد نظر ثبت نشد"})
        }  
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//update controller
    module.exports.updateTblCommonBaseTypeController = async function(request,response){
        let findRequest = {...request.body}
     //for checking mandatory 
        if(findRequest.BaseTypeTitle != null  && findRequest.CommonBaseTypeId !=null){
     //for checking indexes        
            let findGet = []
                findGet = await tblCommonBaseTypeModel.ws_loadBaseType({BaseTypeTitle : findRequest.BaseTypeTitle})
             
              
           
                    if ((findGet[0] == null || (findGet[0].CommonBaseTypeId == findRequest.CommonBaseTypeId && findGet[0] != null))){
                     
                        tblCommonBaseTypeModel.ws_UpdateBaseType({CommonBaseTypeId : findRequest.CommonBaseTypeId,
                        BaseTypeTitle : findRequest.BaseTypeTitle  
                        }).then(result =>{
                            
                            if(result == null){
                                response.json({error:"رکوردی برای ویرایش یافت نشد"})
                            }else{
                    
                            response.json(result)
                            }
                            
                        }).catch (error=>
                
                            response.json({error:"رکورد مورد نظر ویرایش نشد"})
                         )
            }else{
                response.json({error:"رکورد ویرایش شده در عنوان  یکتا نیست"})
            }
        }else{
            response.json({error:"فیلدهای اجباری را پر کنید"})
        }

    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
//delete controller
    module.exports.deleteTblCommonBaseTypeController = async function(request,response){

        
        let findRequest = {...request.body}
        
      // request for checking Fk in others table   
       if(findRequest.CommonBaseTypeId != null){
            let findGet = await tblCommonBaseTypeModel.ws_loadBaseType({CommonBaseTypeId : findRequest.CommonBaseTypeId})
              
                if(findGet[0] != null){
                    await requestApi.post({url: api.url + '/CommonBaseData/getCommonBaseData', form : { CommonBaseTypeId : findRequest.CommonBaseTypeId}},async function(err,res,body){
                        
                        if (await JSON.parse(body)[0] !=null && await JSON.parse(body)[0].CommonBaseTypeId == findRequest.CommonBaseTypeId){
                            response.json({error : "امکان حذف بدليل وابستگي امکان پذير نمي باشد"})
                        
                        }else{
                    
                            await tblCommonBaseTypeModel.ws_DeleteBaseType(findRequest).then(result =>{

                                if (result == 1 ){
                                    response.json({message:"عملیات حذف با موفقیت انجام شد"})
                                }else{
                                    response.json({error : "دوباره سعی کنید عملیات حذف انجام نشد"})
                                }
                                
                            })
                        }   
                

                    })
                }else{
                     response.json({error:"چنین رکوردی موجود نیست"}) 
                }
            }else{
                response.json({error:"فیلدهای اجباری را پر کنید"})
            }
                       
                
    }

