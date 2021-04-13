
const tblCharityAccountsModel = require('../Models/tblCharityAccountsModel')




var express = require('express')
var bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

module.exports.getTblCharityAccountsController = function(request,response){
        let findRequest = {...request.body}
        
    tblCharityAccountsModel.getTblCharityAccounts(findRequest).then(result =>{ 
        
            
                if(result == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
        })
    }


    module.exports.insertTblCharityAccountsController = function(request,response){

        let findRequest = {...request.body}
   
        tblCharityAccountsModel.insertTblCharityAccounts(findRequest).then(result => 
            
            response.json(result[0][0].CharityAccountId)
        ).catch (error=>
        
        response.json({error:"رکورد مورد نظر ثبت نمیشود"})
        )
    }

    module.exports.updateTblCharityAccountsController = function(request,response){
        let findRequest = {...request.body}
   
        tblCharityAccountsModel.updateTblCharityAccounts(findRequest).then(result =>{
            
            if(result==null){
                response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
            }else{

            response.json(result[0])
            }
            
        })
    }

    module.exports.deleteTblCharityAccountsController = function(request,response){
        let findRequest = {...request.body}
   
        tblCharityAccountsModel.deleteTblCharityAccounts(findRequest).then(result =>{

        if (result == 1 ){
            response.json({message:"عملیات حذف با موفقیت انجام شد"})
        }else{
            response.json({error : "عملیات حذف با موفقیت انجام نشد"})
        }
     
     })

    }

