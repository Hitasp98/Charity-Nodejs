const paymentModel = require("../Models/PaymentModel");
var express = require("express");
var bodyParser = require("body-parser");


const requestApi = require("request");

// create url for example http://localhost:8090
const api = require('../Utils/urlConfig')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//getPayment
/////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getPayment = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    await paymentModel.ws_loadPayment(findRequest).then(result => {
      if (result[0] == null) {
        response.json({ error: "هیچ رکوردی موجود نیست" });
      } else {
        response.json(result);
      }
    });
  } catch (error) {
    response.json({
      error: "رکوردی موجود نیست",
    });
  }
};
//getCashAssistanceDetail
////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getCashAssistanceDetail = async function(request, response) {
    try {
      let findRequest = { ...request.body };
      await paymentModel.ws_loadCashAssistanceDetail(findRequest).then(result => {
        if (result[0] == null) {
          response.json({ error: "هیچ رکوردی موجود نیست" });
        } else {
          response.json(result);
        }
      });
    } catch (error) {
      response.json({
        error: "رکوردی موجود نیست",
      });
    }
  };


//insert payment
////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.insertPayment = async function(request, response) {
  try {
    let findRequest = { ...request.body };
   //check mandatory
    if (
      findRequest.CashAssistanceDetailId != null &&
      findRequest.PaymentPrice != null &&
      findRequest.PaymentDate != null &&
      findRequest.PaymentTime != null &&
      findRequest.PaymentStatus != null &&
      findRequest.TargetAccountNumber != null &&
      findRequest.FollowCode != null
    ) {
        let getCashAssistanceDetail = await paymentModel.ws_loadCashAssistanceDetail({CashAssistanceDetailId : findRequest.CashAssistanceDetailId})
    
        if(getCashAssistanceDetail[0] != null){
          let findA = {
            CashAssistanceDetailId : findRequest.CashAssistanceDetailId,
            CharityAccountId : findRequest.CharityAccountId,
            PaymentStatus : findRequest.PaymentStatus
          }
          let C = getCashAssistanceDetail[0].NeededPrice 
          
          if (findRequest.CharityAccountId == null && findRequest.PaymentStatus == "پرداخت موفق" && getCashAssistanceDetail[0] != null){
              let A = await paymentModel.paymentPriceSum(findA)
              
              A = A + findRequest.PaymentPrice
            
              if(A < C ){
                  await paymentModel.ws_Payment(findRequest).then(result => 
                  response.json(result)
                  ).catch (error =>
                   response.json({error:"رکورد مورد نظر درج نشد"})
                  )  
              }else{
                response.json({ error: " جمع مبالغ پرداختی از مبلغ مورد نیاز بیشتر میشود " });
              }
          }else if(findRequest.CharityAccountId != null && findRequest.PaymentStatus == "پرداخت موفق" && getCashAssistanceDetail[0] != null){
            requestApi.post({url: api.url +'/CharityAccounts/checkCharityAccounts', form: {CharityAccountId : findRequest.CharityAccountId
            }},async function(err,res,body){
              if ( await JSON.parse(body)[0] != null){
                await paymentModel.ws_Payment(findRequest).then(result => 
                  response.json(result)
                  ).catch (error =>
                  response.json({error:"رکورد مورد نظر درج نشد"})
                  )
              }else{
                response.json({ error: " خیریه چنین حسابی ندارد " });
              }
            })   
            
              
          }else{
            response.json({ error: " پرداخت موفق نیست " });
          }
       }else{
        response.json({ error: " مقدار پارامتر کمک نقدی صحیح نیست " });
       }
        
    } else {
      response.json({ error: " فیلدهای اجباری را پر کنید " });
    }
  } catch (error) {
    response.json({ error: "رکورد مورد نظر درج نشد" });
  }
};
