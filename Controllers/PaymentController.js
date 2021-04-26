const PaymentModel  = require("../Models/PaymentModel");
var express           = require("express");
var bodyParser        = require("body-parser");

const requestApi      = require('request');




var app               = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





module.exports.Payment = async function (request, response) {
  try {
    let findRequest = {...request.body}

    let Cc=await PaymentModel.ws_loadCashAssistanceDetail(findRequest.CashAssistanceDetailId)
    let C=Cc.NeededPrice 
    let Aa=await PaymentModel.ws_loadPayment(findRequest.CashAssistanceDetailId,findRequest.PaymentStatus,findRequest.CharityAccountId=null)
    let A=Aa.PaymentPrice

        
  } catch (error) {
    response.json({


      error: "کد نوع را وارد کنید"


    });
  }
};

module.exports.loadPayment = async function (request, response) {
  try {

    let findRequest = {...request.body}

        await PaymentModel.ws_loadPayment(findRequest).then(result =>{ 
        
            
            if(result[0] == null){
                response.json({error:"هیچ رکوردی موجود نیست"})
            }else{
                response.json(result)
            }
        })
 
  } catch (error) {


    response.json({error:" رکوردی یافت نشد"})


  }
};

module.exports.loadCashAssistanceDetail = async function (request, response) {
  try{
    let findRequest = {...request.body}

    await PaymentModel.ws_loadCashAssistanceDetail(findRequest).then(result =>{ 
    
        
        if(result[0] == null){
            response.json({error:"هیچ رکوردی موجود نیست"})
        }else{
            response.json(result)
        }
    })


  } catch (error) {
    response.json({error: "کد نوع را وارد کنید"})

  }
}
