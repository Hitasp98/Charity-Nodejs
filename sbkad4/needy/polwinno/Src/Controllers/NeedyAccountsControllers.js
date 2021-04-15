const PersonalModels = require("../Models/PersonalModels");
var express = require("express");
var bodyParser = require("body-parser");
var md5 = require("md5");
var createHash = require('hash-generator');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports.getNeedyAccountsController = async function(request, response) {
  try {
    let findRequest = { ...request.body };

    await PersonalModels.ws_loadNeedyAccount(findRequest).then(result => {
      if (result == null) {
        response.json({ error: "هیچ رکوردی موجود نیست" });
      } else {
        response.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.insertNeedyAccountsController = async function(request, response) {
  try {
    let findRequest = { ...request.body };
  
    let checked = await PersonalModels.check(findRequest);
    if (checked[0] == null) {
      console.log("this PersonId ");
      await PersonalModels.ws_createNeedyAccount(findRequest)
        .then(result => {
          if (result == null) {
            response.json({ error: "عملیات درج با موفقیت انجام نشد" });
          } else {
            response.json(result);
          }
        })
        .catch(error => response.json({ error: "رکورد مورد نظر ثبت نمیشود" }));
    } else {
      response.json("قبلا درج شده");
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};

module.exports.updateNeedyAccountsController = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    let checked = await PersonalModels.check(findRequest);
    if (checked != null) {
      await PersonalModels.ws_UpdateNeedyAccount(findRequest).then(result => {
        if (result == null) {
          response.json({ error: "عملیات ویرایش با موفقیت انجام نشد" });
        } else {
          response.json(result);
        }
      });
    } else {
      response.json(checked[0].PersonId + "1عملیات ویرایش با موفقیت انجام نشد");
    }
  } catch (error) {
    response.json({ error: "کد نوع را وارد کنید" });
  }
};

module.exports.ws_deleteNeedyAccount = function(request, response) {
  let findRequest = { ...request.body };

  PersonalModels.ws_deletePersonal(findRequest).then(result => {
    if (result == 1) {
      response.json({ message: "عملیات حذف با موفقیت انجام شد" });
    } else {
      response.json({ error: "عملیات حذف با موفقیت انجام نشد" });
    }
  });
};
