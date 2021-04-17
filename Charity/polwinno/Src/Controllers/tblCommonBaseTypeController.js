 const tblCommonBaseTypeModel = require('../Models/tblCommonBaseTypeModel')

var express = require('express')
var bodyParser = require('body-parser')
const requestApi = require('request');

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

module.exports.getTblCommonBaseTypeController = function(request,response){
    try{

        let findRequest = {...request.body}
   
        tblCommonBaseTypeModel.getTblCommonBaseType(findRequest).then(result =>{ 
        
            
                if(result == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
        })

    }catch (error){
        response.json({error:"رکورد مورد نظر یافت نشد"})
        } 
    }


    module.exports.insertTblCommonBaseTypeController = async function(request,response){
        try{
            let findRequest = {...request.body}

       if(findRequest.BaseTypeTitle != null){

       
        let resultGet = await tblCommonBaseTypeModel.getTblCommonBaseType({BaseTypeTitle : findRequest.BaseTypeTitle})
   
            if(resultGet == null){
                tblCommonBaseTypeModel.insertTblCommonBaseType(findRequest).then(result => 
            
                    response.json(result[0][0].CommonBaseTypeId)
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

    module.exports.updateTblCommonBaseTypeController = async function(request,response){
        let findRequest = {...request.body}
      
        if(findRequest.BaseTypeTitle != null && findRequest.BaseTypeCode.trim().length == 3 && findRequest.CommonBaseTypeId !=null){
            let findGet = []
                findGet[0] = await tblCommonBaseTypeModel.getTblCommonBaseType({BaseTypeTitle : findRequest.BaseTypeTitle})
                
                findGet[1] = await tblCommonBaseTypeModel.getTblCommonBaseType({BaseTypeCode : findRequest.BaseTypeCode})
           
                    if ((findGet[0] == null || (findGet[0].CommonBaseTypeId == findRequest.CommonBaseTypeId && findGet[0] != null) ) && ( findGet[1] == null || (findGet[1].CommonBaseTypeId == findRequest.CommonBaseTypeId && findGet[1] != null ))){
                        tblCommonBaseTypeModel.updateTblCommonBaseType(findRequest).then(result =>{
                
                            if(result==null){
                                response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                            }else{
                    
                            response.json(result[0])
                            }
                            
                        })
            }else{
                response.json({error:"رکورد ویرایش شده در عنوان یا کد یکتا نیست"})
            }
        }else{
            response.json({error:"فیلدهای اجباری را با در نظر گرفتن کد سه حرفی پر کنید"})
        }

    }

    module.exports.deleteTblCommonBaseTypeController = async function(request,response){

        
        let findRequest = {...request.body}
        
        
       
          
        await requestApi.post({url:'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData', form: {CommonBaseTypeId : findRequest.CommonBaseTypeId}},async function(err,res,body){
            

                if (await JSON.parse(body).CommonBaseTypeId == findRequest.CommonBaseTypeId){
                    response.json({error : "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است"})
                }else{
                   
                    tblCommonBaseTypeModel.deleteTblCommonBaseType(findRequest).then(result =>{

                        if (result == 1 ){
                            response.json({message:"عملیات حذف با موفقیت انجام شد"})
                        }else{
                            response.json({error : "رکورد مورد نظر قبلا حذف شده"})
                        }
                        
                        })
                }
               

            })
        
         
        
        
        

    }

