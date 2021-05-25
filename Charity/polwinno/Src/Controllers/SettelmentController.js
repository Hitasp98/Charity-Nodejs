const settelmentModel = require("../Models/SettelmentModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//getPayment
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getPayment = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    await settelmentModel.ws_loadPayment(findRequest).then(result => {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getCashAssistanceDetail = async function(request, response) {
    try {
      let findRequest = { ...request.body };
      await settelmentModel.ws_loadCashAssistanceDetail(findRequest).then(result => {
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
//insert Settelment
//////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.insertSettelment = async function(request, response) {
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
        let getCashAssistanceDetail = await settelmentModel.ws_loadCashAssistanceDetail({CashAssistanceDetailId : findRequest.CashAssistanceDetailId
       })
    
        if(getCashAssistanceDetail[0] != null){
          
      

          let findA = {
            CashAssistanceDetailId : findRequest.CashAssistanceDetailId,
            CharityAccountId : null,
            PaymentStatus : findRequest.PaymentStatus
          }
          
          let C = getCashAssistanceDetail[0].NeededPrice 
          let A = await settelmentModel.paymentPriceSum(findA)
         
          if (findRequest.CharityAccountId == null && findRequest.PaymentStatus == "پرداخت موفق" && getCashAssistanceDetail[0] != null){
             
              
             
            
              if(findRequest.PaymentPrice == A  && A<C){
                  await settelmentModel.ws_Settelment(findRequest).then(result => 
                  response.json(result)
                  ).catch (error =>
                   response.json({error:"رکورد مورد نظر درج نشد"})
                  )  
              }else{
                response.json({ error: "  مبلغ وارد شده بیشتر از نیاز است یا مبلغ پرداختی خیریه باید دقیقا برابر با مبلغ پرداختی خیرین باشد " });
              }
          }else if(findRequest.CharityAccountId != null && findRequest.PaymentStatus == "پرداخت موفق" && getCashAssistanceDetail[0] != null){
                  if(getCashAssistanceDetail[0].AssignNeedyPlanId == null){
                    let findB = {
                      CashAssistanceDetailId : findRequest.CashAssistanceDetailId,
                      CharityAccountId : findRequest.CharityAccountId,
                      PaymentStatus : findRequest.PaymentStatus
                    }  
                    let B = await settelmentModel.paymentPriceSum(findB)
                    B = B + findRequest.PaymentPrice 
  
                    if (B<C && B<A){
                      
                      await settelmentModel.ws_Settelment(findRequest).then(result => 
                        response.json(result)
                        ).catch (error =>
                        response.json({error:"رکورد مورد نظر درج نشد"})
                        ) 
                    }else{
                      response.json({error:"مقدار پرداخت شده از مقدار مجاز بیشتر است"})
                    }
                  }else{
                    
                    response.json({error:"جزییات پرداخت دارای نیازمند نسبت داده شده به طرح است"})
                  }
                   
                  
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
//update settelment
//////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.updateSettelment = async function(request, response) {
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
      let findById = await settelmentModel.checkPayment({PaymentId : findRequest.PaymentId })
      if(findById != null){
        if(findRequest.CharityAccountId != null && findRequest.PaymentStatus != "پرداخت موفق" && findRequest.TargetAccountNumber !=null ){
          let getCashAssistanceDetail = await paymentModel.ws_loadCashAssistanceDetail({CashAssistanceDetailId : findRequest.CashAssistanceDetailId})
    
          if(getCashAssistanceDetail[0] != null){
            let findA = {
              CashAssistanceDetailId : findRequest.CashAssistanceDetailId,
              CharityAccountId : null,
              PaymentStatus : findRequest.PaymentStatus
            }
            let C = getCashAssistanceDetail[0].NeededPrice 
            let A = await settelmentModel.paymentPriceSum(findA)
           
                    if(getCashAssistanceDetail[0].AssignNeedyPlanId == null){
                      let findB = {
                        CashAssistanceDetailId : findRequest.CashAssistanceDetailId,
                        CharityAccountId : findRequest.CharityAccountId,
                        PaymentStatus : findRequest.PaymentStatus
                      }  
                      let B = await settelmentModel.paymentPriceSum(findB)
                      B = B + findRequest.PaymentPrice 
    
                      if (B<C && B<A){
                        
                        await settelmentModel.ws_UpdatePayment(findRequest).then(result => 
                          response.json(result)
                          ).catch (error =>
                          response.json({error:"رکورد مورد نظر ویرایش نشد"})
                          ) 
                      }else{
                        response.json({error:"مقدار پرداخت شده از مقدار مجاز بیشتر است"})
                      }
                    }else{
                      
                      response.json({error:"جزییات پرداخت دارای نیازمند نسبت داده شده به طرح است"})
                    }
         }else{
          response.json({ error: " مقدار پارامتر کمک نقدی صحیح نیست " });
         }
        }else{
          response.json({ error: " عملیات ویرایش فقط برای کمک هایی که حساب خیریه ندارند و شماره حساب مقصد دارند و پرداخت موفق نیست امکان پذیر است " });
        }
      }else{
        response.json({ error: " چنین رکوردی برای ویرایش موجود نیست " });
      } 
    } else {
      response.json({ error: " فیلدهای اجباری را پر کنید " });
    }
  } catch (error) {
    response.json({ error: "رکورد مورد نظر ویرایش نشد" });
  }
};
//delete settelment
//////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deletePayment = async  function (request, response) {
  try {
    let findRequest = { ...request.body };
    let findById = await settelmentModel.checkPayment({PaymentId : findRequest.PaymentId })
    if(findById[0] != null){
        await settelmentModel.ws_deletePayment(findRequest).then(result =>{
    
            if (result == 1 ){
                response.json({message:"عملیات حذف با موفقیت انجام شد"})
            }else{
                response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
            }})
    }else{
        response.json({
            error: "چنین رکوردی برای حذف موجود نیست"
          })
    }
  } catch (error) {
    response.json({
      error: "رکورد مورد نظر خذف نشد"
    })

  }
}















