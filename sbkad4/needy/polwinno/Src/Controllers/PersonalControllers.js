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

module.exports.insertPersonalController = function(request, response) {
  
  let findRequest = { ...request.body };
  PersonalModels.ws_createPersonal(findRequest)
    .then(result => {
      if (result == null) {
        response.json({ error: "عملیات درج با موفقیت انجام نشد" });
      } else {
        response.json(result[0][0].CharityAccountId);
      }
    })
  // PersonalModels.ws_loadPersonal(findRequest).then(result => {
  //   if (result == null) {
  //     let findRequest = { ...request.body };
  //     PersonalModels.ws_createPersonal(findRequest)
  //       .then(result => {
  //         if (result == null) {
  //           response.json({ error: "عملیات درج با موفقیت انجام نشد" });
  //         } else {
  //           response.json(result[0][0].CharityAccountId);
  //         }
  //       })
  //       .catch(error => response.json({ error: "رکورد مورد نظر ثبت نمیشود" }));
  //   } else {
  //     response.json("قبلا درج شده");
  //   }
  // });
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
          response.json(result[0]);
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
