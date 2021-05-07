
const tblCharityAccountsModel = require('../Models/charityAccountsModel')
const api = require('../Utils/urlConfig')



var express = require('express')
var bodyParser = require('body-parser')


var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
//get charity accounts
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getTblCharityAccountsController = async function(request,response){
    try{
        let findRequest = {...request.body}
        if (findRequest.BaseTypeCode != null){
            await tblCharityAccountsModel.ws_loadCharityAccounts(findRequest).then(result =>{ 
            
                
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
//insert charity accounts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    module.exports.insertTblCharityAccountsController = async function(request,response){
    try{
        let findRequest = {...request.body}
        // check mandatory fields
        if(findRequest.AccountNumber != null  && findRequest.BankId != null && findRequest.OwnerName != null && findRequest.BranchName !=null){
            let findIndex = {
                AccountNumber : findRequest.AccountNumber,
                }
            // check index    
            let resultGet = await tblCharityAccountsModel.getForInsert(findIndex)
            
                if (resultGet[0] == null){
                   // await delete findRequest.BaseTypeCode
                    
                    await tblCharityAccountsModel.ws_CreateCharityAccounts(findRequest).then(result => 
                
                        response.json(result[0][0].CharityAccountId)
                    ).catch (error=>
                    
                        response.json({error:"رکورد مورد نظر درج نشد"})
                        )
                }else{
                    response.json({error : "رکورد مورد نظر  یکتا نیست"})}

        }else{
            response.json({error:"فیلد های اجباری وارد شود"})
        }
      
        }catch (error){
            response.json({error:"رکورد مورد نظر درج نشد"})
        }

    }
//update charity accounts       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    module.exports.updateTblCharityAccountsController = async function(request,response){
        try{
            let findRequest = {...request.body}
            
            if(findRequest.AccountNumber != null  && findRequest.BankId != null && findRequest.OwnerName != null && findRequest.BranchName !=null){
                
                let findById = await tblCharityAccountsModel.getForInsert({CharityAccountId : findRequest.CharityAccountId })
                
                if (findById[0] != null){
                    let findIndex = {
                        AccountNumber : findRequest.AccountNumber
                        
                    }
                    
                    
                    let resultGet = await tblCharityAccountsModel.getForInsert(findIndex)
                    
           
                    if(resultGet[0] == null || (resultGet[0].CharityAccountId == findRequest.CharityAccountId && resultGet[0] != null )){
                      // await delete findRequest.BaseTypeCode
                       await tblCharityAccountsModel.ws_updateCharityAccounts(findRequest).then(result =>{
                        
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
//delete charity accounts    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    module.exports.deleteTblCharityAccountsController = async function(request,response){
    try {
            let findRequest = {...request.body}
            

            let findIndex = {
                CharityAccountId : findRequest.CharityAccountId
                
            }
            
            
            let resultGet = await tblCharityAccountsModel.getForInsert(findIndex) 
            if (resultGet[0] != null){
                await tblCharityAccountsModel.ws_deleteCharityAccounts(findRequest).then(result =>{
    
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
//get for other tables       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getForOtherTablesController = async function(request,response){
    try{
        let findRequest = {...request.body}
       
            await tblCharityAccountsModel.getForInsert(findRequest).then(result =>{ 
      
                    response.json(result)
                
            })
    }catch (error){
            response.json({error:" رکوردی یافت نشد"})
        }
       
}  

