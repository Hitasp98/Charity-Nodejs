 const tblCommonBaseTypeModel = require('../Models/tblCommonBaseTypeModel')

var express = require('express')
var bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

module.exports.getTblCommonBaseTypeController = function(request,response){
    let findRequest = {...request.body}
   
    tblCommonBaseTypeModel.getTblCommonBaseType(findRequest).then(result =>{ 
        
            
                if(result == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
                
            
            

        })
    
    }


    module.exports.insertTblCommonBaseTypeController = function(request,response){

        let findRequest = {...request.body}
   
        tblCommonBaseTypeModel.insertTblCommonBaseType(findRequest).then(result => 
            
            response.json(result[0][0].CommonBaseTypeId)
        ).catch (error=>
        
           response.json({error:"رکورد مورد نظر موجود میباشد"})
        )
    }

    module.exports.updateTblCommonBaseTypeController = function(request,response){
        let findRequest = {...request.body}
   
    tblCommonBaseTypeModel.updateTblCommonBaseType(findRequest).then(result =>{
        
        if(result==null){
            response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
        }else{

        response.json(result[0])
        }
        
     })
    }

    module.exports.deleteTblCommonBaseTypeController = function(request,response){
        let findRequest = {...request.body}
   
        tblCommonBaseTypeModel.deleteTblCommonBaseType(findRequest).then(result =>{

        if (result == 1 ){
            response.json({message:"عملیات حذف با موفقیت انجام شد"})
        }else{
            response.json({error : "عملیات حذف با موفقیت انجام نشد"})
        }
        
        })
        

    }

