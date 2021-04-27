const PaymentModel = require("../Models/PaymentModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require('request');




var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





module.exports.Payment = async function (request, response) {
  try {
    let findRequest = { ...request.body }
    let findindex = {
      CashAssistanceDetailId: findRequest.CashAssistanceDetailId
    }
    let resultGet = await PaymentModel.ws_loadCashAssistanceDetail(findindex)
    let C = resultGet[0].NeededPrice




    let findindex2 ={
     CashAssistanceDetailId:findRequest.CashAssistanceDetailId,
     PaymentStatus:'greate',
     CharityAccountId:null

        }
    let resultGet2 = await PaymentModel.ws_loadCashAssistanceDetail(findindex2)
    let A = resultGet2[0].PaymentPrice


    
  } catch (error) {
    response.json({


      error: "کد نوع را وارد کنید"


    });
  }
};

module.exports.loadPayment = async function (request, response) {
  try {

    let findRequest = { ...request.body }

    await PaymentModel.ws_loadPayment(findRequest).then(result => {


      if (result[0] == null) {
        response.json({ error: "هیچ رکوردی موجود نیست" })
      } else {
        response.json(result)
      }
    })

  } catch (error) {


    response.json({ error: " رکوردی یافت نشد" })


  }
};

module.exports.loadCashAssistanceDetail = async function (request, response) {
  try {
    let findRequest = { ...request.body }

    await PaymentModel.ws_loadCashAssistanceDetail(findRequest).then(result => {


      if (result[0] == null) {
        response.json({ error: "هیچ رکوردی موجود نیست" })
      } else {
        response.json(result)
      }
    })


  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" })

  }
}
