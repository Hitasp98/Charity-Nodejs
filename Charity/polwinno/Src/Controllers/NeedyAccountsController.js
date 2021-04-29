const NeedyAccountsModels = require("../Models/NeedyAccountsModel");





var express = require("express");
var bodyParser = require("body-parser");



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





module.exports.getNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };


    await NeedyAccountsModels.ws_loadNeedyAccount(findRequest).then(result => {

      if (result == null) {


        response.json({ error: "هیچ رکوردی موجود نیست" });


      } else {


        response.json(result);



      }
    });
  } catch (error) {


    response.json({ error: "هیچ رکوردی موجود نیست" });


  }
};





module.exports.insertNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };

    if (
      findRequest.NeedyId != null &&
      findRequest.BankId != null &&
      findRequest.OwnerName != null &&
      findRequest.AccountNumber != null &&
      findRequest.ShebaNumber != null) {


      let resultGetSheba = await NeedyAccountsModels.ws_loadNeedyAccount({
         BaseTypeCode : findRequest.BaseTypeCode,
         ShebaNumber: findRequest.ShebaNumber,})
      let resultGetAccount =  await NeedyAccountsModels.ws_loadNeedyAccount({
        BaseTypeCode : findRequest.BaseTypeCode,
        AccountNumber: findRequest.AccountNumber,
        NeedyId : findRequest.NeedyId})   
        if(resultGetSheba[0] == null && resultGetAccount[0] == null){
            await delete findRequest.BaseTypeCode
            await NeedyAccountsModels.ws_createNeedyAccount(findRequest)
              .then(result => 
                response.json(result[0][0].NeedyAccountId)
                ).catch (error=>
                    response.json({error:"رکورد مورد نظر درج نشد"})
                )  

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





module.exports.updateNeedyAccountsController = async function (request, response) {
try {
    let findRequest = { ...request.body };
   

    if (
        findRequest.NeedyId != null &&
        findRequest.BankId != null &&
        findRequest.OwnerName != null &&
        findRequest.AccountNumber != null &&
        findRequest.ShebaNumber != null) {
            let findById = await NeedyAccountsModels.ws_loadNeedyAccount({
                BaseTypeCode : findRequest.BaseTypeCode,
                NeedyAccountId : findRequest.NeedyAccountId,})
            if(findById[0] != null){
                let resultGetSheba = await NeedyAccountsModels.ws_loadNeedyAccount({
                    BaseTypeCode : findRequest.BaseTypeCode,
                    ShebaNumber: findRequest.ShebaNumber,})
                let resultGetAccount =  await NeedyAccountsModels.ws_loadNeedyAccount({
                    BaseTypeCode : findRequest.BaseTypeCode,
                    AccountNumber: findRequest.AccountNumber,
                    NeedyId : findRequest.NeedyId})
                    if((resultGetSheba[0] == null || (resultGetSheba[0] != null && resultGetSheba[0].NeedyAccountId == findRequest.NeedyAccountId)) && (resultGetSheba[0] == null || (resultGetAccount[0] != null && resultGetAccount[0].NeedyAccountId == findRequest.NeedyAccountId))){
                       
                        //requestApi.post({ url: 'http://localhost:8090/Payment/getPayment ', form: { findRequest: findRequest } }, async function (err, res, body) {
                                //if (await JSON.parse(body).AccountNumber == findRequest.AccountNumber) {
                    
                                //let checked = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest);
                                // if (checked[0] != ' ') {
                                    await delete findRequest.BaseTypeCode
                                    await NeedyAccountsModels.ws_UpdateNeedyAccount(findRequest).then(result => {
                                        response.json(result[0])}
                            
                                     ).catch(error=>
                    
                                     response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
                    
                                    
                        )}else{
                        response.json("رکورد ویرایش شده یکتا نیست");
                    }
                            
                }else{
                response.json("چنین رکوردی برای ویرایش موجود نیست");
            }       
        }else{
        response.json("فیلدهای ضروری را پر کنید");
        }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    })
  }
};





module.exports.deleteNeedyAccountsController = function (request, response) {
  try {
    let findRequest = {...request.body}
            

    let findIndex = {
        NeedyAccountId : findRequest.NeedyAccountId,
        BaseTypeCode : findRequest.BaseTypeCode
    }
    
    
    let resultGet = await NeedyAccountsModels.ws_loadNeedyAccount(findIndex) 
    if (resultGet[0] != null){
        await NeedyAccountsModels.ws_deleteNeedyAccount(findRequest).then(result =>{

            if (result == 1 ){
                response.json({message:"عملیات حذف با موفقیت انجام شد"})
            }else{
                response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
            }})
    }else{
        response.json({error : "هیچ رکوردی برای حذف موجود نیست"})
    }
  
  } catch (error) {
    response.json({
      error: "رکورد مورد نظر حذف نشد"
    })

  }
}