const paymentModel = require("../Models/PaymentModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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



