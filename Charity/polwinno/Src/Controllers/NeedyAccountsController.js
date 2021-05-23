const NeedyAccountsModels = require("../Models/NeedyAccountsModel");
const requestApi = require('request');
// create url for example http://localhost:8090
const api = require('../Utils/urlConfig')



var express = require("express");
var bodyParser = require("body-parser");



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//get neede accounts
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getNeedyAccountsController = async function (request, response) {
  try {
   
    let findRequest = { ...request.body };
    // base on document limit input
    findRequest = {
      BaseTypeCode : findRequest.BaseTypeCode,
      NeedyAccountId : findRequest.NeedyAccountId,
      NeedyId : findRequest.NeedyId
    }
 
    await NeedyAccountsModels.ws_loadNeedyAccount(findRequest).then(result => {

      if (result[0] == null) {


        response.json({ error: "هیچ رکوردی موجود نیست" });


      } else {


        response.json(result);



      }
    });
  } catch (error) {


    response.json({ error: "هیچ رکوردی موجود نیست" });


  }
};



//insert Needy accounts
/////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.insertNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };

    if (
      findRequest.NeedyId != null &&
      findRequest.BankId != null &&
      findRequest.OwnerName != null &&
      findRequest.AccountNumber != null &&
      findRequest.ShebaNumber != null) {

// find by index 
      let resultGetSheba = await NeedyAccountsModels.checkNeedyAccount({
         ShebaNumber: findRequest.ShebaNumber})
      let resultGetAccount =  await NeedyAccountsModels.checkNeedyAccount({
        AccountNumber: findRequest.AccountNumber,
        NeedyId : findRequest.NeedyId})
      
// condition before insert           
        if(resultGetSheba[0] == null && resultGetAccount[0] == null){
          await requestApi.post({url: api.url + '/Personal/getPersonal', form : { PersonType : 2,
          personId : findRequest.NeedyId}},async function(err,res,body){
            if(await JSON.parse(body)[0] != null){
              await NeedyAccountsModels.ws_createNeedyAccount(findRequest)
              .then(result => 
                response.json(result[0][0].NeedyAccountId)
                ).catch (error=>
                    response.json({error:"رکورد مورد نظر درج نشد"})
                ) 
            }else{
              response.json({error:" شخص انتخاب شده نیازمند نیست"})
            }
                

          })

                   

      }else{
          response.json({ error: "ورودی ها یکتا نیستند" }); 
      }      
    }else{
        response.json({ error: "فیلدهای اجباری را پر کنید" });
    }
  } catch (error) {


    response.json({ error: "عملیات درج صورت نگرفت" });



  };
}

//update NeedyAccounts
///////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.updateNeedyAccountsController = async function (request, response) {
try {
    let findRequest = { ...request.body };
   

    if (
        findRequest.NeedyAccountId != null &&
        findRequest.NeedyId != null &&
        findRequest.BankId != null &&
        findRequest.OwnerName != null &&
        findRequest.AccountNumber != null &&
        findRequest.ShebaNumber != null) {
          //find by id before edit
            let findById = await NeedyAccountsModels.checkNeedyAccount({
                NeedyAccountId : findRequest.NeedyAccountId})
            if(findById[0] != null){
              //find by index for unique input  
                let resultGetSheba = await NeedyAccountsModels.checkNeedyAccount({
                   
                    ShebaNumber: findRequest.ShebaNumber,})
                let resultGetAccount =  await NeedyAccountsModels.checkNeedyAccount({
                    
                    AccountNumber: findRequest.AccountNumber,
                    NeedyId : findRequest.NeedyId})
                    
                    if((resultGetSheba[0] == null || ( resultGetSheba[0].NeedyAccountId == findRequest.NeedyAccountId)) && (resultGetAccount[0] == null || (  resultGetAccount[0].NeedyAccountId == findRequest.NeedyAccountId))){
                      await requestApi.post({url: api.url + '/Personal/getPersonal', form : { PersonType : 2,
                        personId : findRequest.NeedyId}},async function(err,res,body){

                          if(await JSON.parse(body)[0] != null){
                            await NeedyAccountsModels.ws_UpdateNeedyAccount(findRequest).then(result => {
                              response.json(result[0])}
                  
                           ).catch(error=>
          
                           response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                           )
                          }else{
                            response.json({error:" شخص ویرایش شده نیازمند نیست"})
                          }         
                        })
                       
                                    
                    
                                    
                        }else{
                        response.json({error : "رکورد ویرایش شده یکتا نیست"});
                    }
                            
                }else{
                response.json({error : "چنین رکوردی برای ویرایش موجود نیست"});
            }       
        }else{
        response.json({errror :"فیلدهای ضروری را پر کنید"});
        }
  } catch (error) {
    response.json({
      error: "عملیات ویرایش انجام نشد"
    })
  }
};



// delete Needy Accounts
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deleteNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = {...request.body}
            

    let findIndex = {
        NeedyAccountId : findRequest.NeedyAccountId
      
    }
    

    
    let resultGet = await NeedyAccountsModels.checkNeedyAccount(findIndex) 
   
        if (resultGet[0] != null){
          requestApi.post({url: api.url +'/Payment/getPayment', form: {CharityAccountId : findRequest.CharityAccountId,
            NeedyId : findRequest.NeedyId
          }},async function(err,res,body){
            
            if(await JSON.parse(body)[0] == null){
                await NeedyAccountsModels.ws_deleteNeedyAccount(findIndex).then(result =>{

                  if (result == 1 ){
                      response.json({message:"عملیات حذف با موفقیت انجام شد"})
                  }else{
                      response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
                  }})
            }else{

            }
            
          })
              
    }else{
        response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
    }
  
  } catch (error) {
    response.json({
      error: "رکورد مورد نظر حذف نشد"
    })

  }
}
//check Needy Accounts
///////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.checkNeedyAccountsController = async function (request, response) {
  try {
   
    let findRequest = { ...request.body };
 
    await NeedyAccountsModels.checkNeedyAccount(findRequest).then(result => {

      if (result[0] == null) {

        response.json({ error: "هیچ رکوردی موجود نیست" });

      } else {

        response.json(result);

      }
    });
  } catch (error) {

    response.json({ error: "هیچ رکوردی موجود نیست" });

  }
};