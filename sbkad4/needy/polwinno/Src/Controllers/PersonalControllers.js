const PersonalModels = require("../Models/PersonalModels");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports.getPersonalController = function(request, response) {
  let findRequest = { ...request.body };

  PersonalModels.ws_loadPersonal(findRequest).then(result => {
    if (result == null) {
      response.json({ error: "هیچ رکوردی موجود نیست" });
    } else {
      response.json(result);
    }
  });
};

module.exports.insertPersonalController =async function(request, response) {
  let findRequest = { ...request.body };
  //  findRequest[0].PersonId=number

  PersonalModels.check(findRequest).then(result => {
    console.log(result+" this res")
    if (result == null) {      
          console.log("this PersonId ")
      PersonalModels.ws_createPersonal(findRequest)
        .then(result => {
          console.log(findRequest[0].PersonId+"this PersonId ")
          if (result[0].PersonId== null) {
            response.json({ error: "عملیات درج با موفقیت انجام نشد" });
          } else {
            response.json(result[0].PersonId);
          }
        })
        .catch(error => response.json({ error: "رکورد مورد نظر ثبت نمیشود" }));
    } else {
      response.json("قبلا درج شده");
    }
  });
};

module.exports.updatePersonalController = function(request, response) {
  let findRequest = { ...request.body };
  PersonalModels.ws_loadPersonal(findRequest).then(result => {
    if (result == null) {
      response.json({ error: "هیچ رکوردی موجود نیست" });
      PersonalModels.ws_updatePersonal(findRequest).then(result => {
        if (result == null) {
          response.json({ error: "عملیات ویرایش با موفقیت انجام نشد" });
        } else {
          response.json(result[0][0]);
        }
      });
    } else {
      response.json(result);
    }
  });
};

module.exports.deletePersonalController = function(request, response) {
  let findRequest = { ...request.body };

  PersonalModels.ws_deletePersonal(findRequest).then(result => {
    if (result == 1) {
      response.json({ message: "عملیات حذف با موفقیت انجام شد" });
    } else {
      response.json({ error: "عملیات حذف با موفقیت انجام نشد" });
    }
  });
};
