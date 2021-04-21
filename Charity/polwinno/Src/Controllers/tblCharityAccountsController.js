
const tblCharityAccountsModel = require('../Models/tblCharityAccountsModel')




var express = require('express')
var bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

module.exports.getTblCharityAccountsController = async function(request,response){
    try{
        let findRequest = {...request.body}
        if (findRequest.BaseTypeCode != null){
            await tblCharityAccountsModel.getTblCharityAccounts(findRequest).then(result =>{ 
            
                
                if(result[0] == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
            })
        }else{
            response.json({error:"کد نوع را وارد کنید"})
        }
        
    }catch (error){
            response.json({error:" رکوردی یافت نشد"})
        }
       
}


    module.exports.insertTblCharityAccountsController = async function(request,response){
    try{
        let findRequest = {...request.body}
        let findIndex = {
            AccountNumber : findRequest.AccountNumber,
            BaseTypeCode : findRequest.BaseTypeCode
            }
        if(findRequest.AccountNumber != null && findRequest.BaseTypeCode !=null && findRequest.BankId != null && findRequest.OwnerName != null && findRequest.BranchName !=null){

            let resultGet = await tblCharityAccountsModel.getTblCharityAccounts(findIndex)
            
                if (resultGet[0] == null){
                    await delete findRequest.BaseTypeCode
                    
                    await tblCharityAccountsModel.insertTblCharityAccounts(findRequest).then(result => 
                
                        response.json(result[0][0].CharityAccountId)
                    ).catch (error=>
                    
                        response.json({error:"رکورد مورد نظر درج نشد"})
                        )
                }else{
                    response.json({error : "رکورد مورد نظر تکراری میباشد"})}

        }else{
            response.json({error:"فیلد های اجباری وارد شود"})
        }
      
        }catch (error){
            response.json({error:"1رکورد مورد نظر درج نشد"})
        }

    }   

    module.exports.updateTblCharityAccountsController = async function(request,response){
        try{
            let findRequest = {...request.body}
            
            if(findRequest.AccountNumber != null && findRequest.BaseTypeCode !=null && findRequest.BankId != null && findRequest.OwnerName != null && findRequest.BranchName !=null){
                
                let findById = await tblCharityAccountsModel.getTblCharityAccounts({CharityAccountId : findRequest.CharityAccountId,
                    BaseTypeCode : findRequest.BaseTypeCode})
                
                if (findById[0] != null){
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
                    
                            response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                    )}else{
                        response.json({error:"شماره حساب یکتا نیست"})
                    }  
                }else{
                   
                    response.json({error:"چنین رکوردی برای ویرایش موجود نیست"})
                }
                }else{
                    response.json({error:"فیلد های اجباری وارد شود"})
                }

               
               
        }catch (error){
            response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
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
                        response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
                    }})
            }else{
                response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
            }
          
         
      }catch (error){
            response.json({error:"عملیات حذف انجام نشد دوباره سعی کنید"})
        }
     }
       

    

