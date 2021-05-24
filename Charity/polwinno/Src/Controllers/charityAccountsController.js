
const tblCharityAccountsModel = require('../Models/charityAccountsModel')
const requestApi = require('request')
const api = require('../Utils/urlConfig')
var fnCheckCardNumber = require('../Utils/cardNumberChecker');


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
           
            let cardNumberChecker = await fnCheckCardNumber.fnCheckCartDigit(findRequest.CardNumber)
            
            if(cardNumberChecker == true){
                let findIndex = {
                    AccountNumber : findRequest.AccountNumber,
                    }
                // check index    
                let resultGet = await tblCharityAccountsModel.checkCharity(findIndex)
                
                    if (resultGet[0] == null){
                    
                        
                        await tblCharityAccountsModel.ws_CreateCharityAccounts(findRequest).then(result => 
                    
                            response.json(result[0][0].CharityAccountId)
                        ).catch (error=>
                        
                            response.json({error:"رکورد مورد نظر درج نشد"})
                            )
                    }else{
                        response.json({error : "رکورد مورد نظر  یکتا نیست"})}
            }else{
                response.json({error:"شماره کارت صحیح نیست"})
            }
           

        }else{
            response.json({error:"فیلد های اجباری وارد شود"})
        }
      
        }catch (error){
            response.json({error:" ورودی ها را صحیح وارد کنید رکورد مورد نظر درج نشد"})
        }

    }
//update charity accounts       
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    module.exports.updateTblCharityAccountsController = async function(request,response){
        try{
            let findRequest = {...request.body}
            
            if(findRequest.AccountNumber != null  && findRequest.BankId != null && findRequest.OwnerName != null && findRequest.BranchName !=null){
                //check id for update
                let findById = await tblCharityAccountsModel.checkCharity({CharityAccountId : findRequest.CharityAccountId })
                
                if (findById[0] != null){
                    //check card number
                    let cardNumberChecker = await fnCheckCardNumber.fnCheckCartDigit(findRequest.CardNumber)
                    if(cardNumberChecker == true){
                        let findIndex = {
                            AccountNumber : findRequest.AccountNumber
                        }
                        
                        let resultGet = await tblCharityAccountsModel.checkCharity(findIndex)
                        
                        if(resultGet[0] == null || (resultGet[0].CharityAccountId == findRequest.CharityAccountId && resultGet[0] != null )){
                          
                           await tblCharityAccountsModel.ws_updateCharityAccounts(findRequest).then(result =>{
                            
                                response.json(result[0])}
                                
                            ).catch(error=>
                        
                                response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                        )}else{
                            response.json({error:"شماره حساب یکتا نیست"})
                        } 
                    }else{
                        response.json({error:"شماره کارت صحیح نیست"})
                    }
                   
                }else{
                   
                    response.json({error:"چنین رکوردی برای ویرایش موجود نیست"})
                }
                }else{
                    response.json({error:"فیلد های اجباری وارد شود"})
                }

               
               
        }catch (error){
            response.json({error:"عملیات ویرایش با موفقیت انجام نشد ورودی هارا صحیح وارد کنید  "})
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
            
            
              let resultGet = await tblCharityAccountsModel.checkCharity(findIndex)
              if (resultGet[0] != null){
                  //check dependency
                    requestApi.post({url: api.url +'/Payment/getPayment', form: {CharityAccountId : findRequest.CharityAccountId
                    }},async function(err,res,body){
                       
                                if(await JSON.parse(body)[0] == null){
                                
                                        await tblCharityAccountsModel.ws_deleteCharityAccounts(findRequest).then(result =>{
                            
                                            if (result == 1 ){
                                                response.json({message:"عملیات حذف با موفقیت انجام شد"})
                                            }else{
                                                response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
                                            }})
                                }else{
                                    response.json({error : "به دلیل وابستگی امکان حذف وجود ندارد"})
                                }
                        })
            }else{
                 response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
            }
            
      }catch (error){
            response.json({error:"عملیات حذف انجام نشد دوباره سعی کنید"})
        }
     }
//get for other tables       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.checkCharityController = async function(request,response){
    try{
        let findRequest = {...request.body}
       
            await tblCharityAccountsModel.checkCharity(findRequest).then(result =>{ 
      
                    response.json(result)
                
            })
    }catch (error){
            response.json({error:" رکوردی یافت نشد"})
        }
       
}  

