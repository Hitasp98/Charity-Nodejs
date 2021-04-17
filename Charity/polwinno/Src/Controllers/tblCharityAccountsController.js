
const tblCharityAccountsModel = require('../Models/tblCharityAccountsModel')




var express = require('express')
var bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

module.exports.getTblCharityAccountsController = async function(request,response){
    try{
        let findRequest = {...request.body}
        
        await tblCharityAccountsModel.getTblCharityAccounts(findRequest).then(result =>{ 
            
                
                    if(result[0] == null){
                        response.json({error:"هیچ رکوردی موجود نیست"})
                    }else{
                        response.json(result)
                    }
            })
    }catch (error){
            response.json({error:"کد نوع را وارد کنید"})
        }
       
}


    module.exports.insertTblCharityAccountsController = async function(request,response){
        try{
            let findRequest = {...request.body}
        
       let findIndex = {
           AccountNumber : findRequest.AccountNumber,
           BaseTypeCode : findRequest.BaseTypeCode
        }
       let resultGet = await tblCharityAccountsModel.getTblCharityAccounts(findIndex)
      
       if (resultGet[0] == null){
           await delete findRequest.BaseTypeCode
        
           await tblCharityAccountsModel.insertTblCharityAccounts(findRequest).then(result => 
       
               response.json(result[0][0].CharityAccountId)
           ).catch (error=>
        
            response.json({error:"فیلد های اجباری وارد شود"})
            )
            }else{
               response.json({error : "رکورد مورد نظر تکراری میباشد"})}
        }catch (error){
            response.json({error:"کد نوع را وارد کنید"})
        }

    }   

    module.exports.updateTblCharityAccountsController = async function(request,response){
        try{
            let findRequest = {...request.body}

            let findIndex = {
                AccountNumber : findRequest.AccountNumber,
                BaseTypeCode : findRequest.BaseTypeCode
             }
            
            
            let resultGet = await tblCharityAccountsModel.getTblCharityAccounts(findIndex)
            
   
            if(resultGet[0] == null || (resultGet[0].CharityAccountId == findRequest.CharityAccountId && resultGet[0] != null )){
               await delete findRequest.BaseTypeCode
               await tblCharityAccountsModel.updateTblCharityAccounts(findRequest).then(result =>{
                
                    response.json(result[0])}
                    
                ).catch(error=>
            
                    response.json({error:"فیلد های اجباری وارد شود"})
            )}else{
                response.json({error:"عملیات ویرایش به دلیل شماره حساب تکراری یا عدم وجود رکورد برای ویرایش انجام نشد"})
            }  
        }catch (error){
            response.json({error:"کد نوع را وارد کنید"})
        }
          
       
    }

    module.exports.deleteTblCharityAccountsController = async function(request,response){
        try {
            let findRequest = {...request.body}
            

            let findIndex = {
                CharityAccountId : findRequest.CharityAccountId,
                BaseTypeCode : findRequest.BaseTypeCode
             }
            
            
            let resultGet = await tblCharityAccountsModel.getTblCharityAccounts(findIndex) 
            if (resultGet[0] != null){
                await tblCharityAccountsModel.deleteTblCharityAccounts(findRequest).then(result =>{
    
                    if (result == 1 ){
                        response.json({message:"عملیات حذف با موفقیت انجام شد"})
                    }else{
                        response.json({error : "عملیات حذف به دلیل استفاده به عنوان کلید خارجی انجام نشد"})
                    }})
            }else{
                response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
            }
          
         
      }catch (error){
            response.json({error:"کد نوع را وارد کنید"})
        }
     }
       

    

