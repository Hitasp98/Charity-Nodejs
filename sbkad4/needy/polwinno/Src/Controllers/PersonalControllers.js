const PersonalModels = require("../Models/PersonalModels");
var express = require("express");
var bodyParser = require("body-parser");
var md5 = require("md5");
var createHash = require('hash-generator');
const requestApi = require('request');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.getPersonalController = async function (request, response) {
  try {
    let findRequest = {
      ...request.body
    };

    await PersonalModels.ws_loadPersonal(findRequest).then(result => {
      if (result == '') {
        console.log(result + 'result')
        response.json({
          error: "هیچ رکوردی موجود نیست"
        });
      } else {
        console.log(result)

        response.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.insertPersonalController = async function (request, response) {
  try {
    let findRequest = { ...request.body };
    // findRequest[0].PersonType = createHash(findRequest[0].PersonType);
    if (
      findRequest[0].PersonId == null &&
      findRequest[0].Name == null &&
      findRequest[0].Family == null &&
      findRequest[0].NationalCode == null &&
      findRequest[0].IdNumber == null &&
      findRequest[0].Sex == null &&
      findRequest[0].BirthPlace == null &&
      findRequest[0].PersonType == null &&
      findRequest[0].PersonPhoto == null &&
      findRequest[0].SecretCode == null &&
      findRequest[0].BirthDate == null
    ) {
      response.json("ورودی ها خالی است");
    }
    else {

      let loadPersonal = await PersonalModels.ws_loadPersonal(findRequest);
      console.log(loadPersonal[0] + 'loadPersonal')
      if (loadPersonal[0] == null) {
        console.log("this PersonId");
        await PersonalModels.ws_createPersonal(findRequest)
          .then(result => {
            if (result == null) {
              response.json({
                error: "عملیات درج با موفقیت انجام نشد"
              });
            } else {
              response.json(result);
            }
          })
          .catch(error => response.json({
            error: "رکورد مورد نظر ثبت نمیشود"
          }));
      }
      else {

        response.json("قبلا درج شده");
      }

    }

  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });
  }
};

module.exports.updatePersonalController = async function (request, response) {
  try {
    let findRequest = {
      ...request.body
    };
    if (
      findRequest[0].PersonId == null &&
      findRequest[0].Name == null &&
      findRequest[0].Family == null &&
      findRequest[0].NationalCode == null &&
      findRequest[0].IdNumber == null &&
      findRequest[0].Sex == null &&
      findRequest[0].BirthPlace == null &&
      findRequest[0].PersonType == null &&
      findRequest[0].PersonPhoto == null &&
      findRequest[0].SecretCode == null &&
      findRequest[0].BirthDate == null
    ) {
      response.json("ورودی ها خالی است");
    } else {
      let checked = await PersonalModels.ws_loadPersonal(findRequest);
      if (checked[0] != ' ') {
        await PersonalModels.ws_updatePersonal(findRequest).then(result => {
          if (result == null) {
            response.json({
              error: "عملیات ویرایش با موفقیت انجام نشد"
            });
          } else {
            response.json(result);
          }
        });
      } else {
        response.json(checked[0].PersonId + "1عملیات ویرایش با موفقیت انجام نشد");
      }
    }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });
  }
};

module.exports.deletePersonalController = function (request, response) {
  try {
    let findRequest = { ...request.body }
    if (
      findRequest[0].PersonId == null &&
      findRequest[0].Name == null &&
      findRequest[0].Family == null &&
      findRequest[0].NationalCode == null &&
      findRequest[0].IdNumber == null &&
      findRequest[0].Sex == null &&
      findRequest[0].BirthPlace == null &&
      findRequest[0].PersonType == null &&
      findRequest[0].PersonPhoto == null &&
      findRequest[0].SecretCode == null &&
      findRequest[0].BirthDate == null
    ) {
      response.json("ورودی ها خالی است");
    }
    else {


      // request for checking Fk in others table 
      requestApi.post({ url: 'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData', form: { PersonId: findRequest[0].PersonId }, url: 'http://localhost:8090/tblCommonBaseData/tblPayment', form: { PersonId: findRequest[0].PersonId }, url: 'http://localhost:8090/tblCommonBaseData/tblDistributionGoods', form: { PersonId: findRequest[0].PersonId }, url: 'http://localhost:8090/tblCommonBaseData/tblNonCashRequest', form: { PersonId: findRequest[0].PersonId }, url: 'http://localhost:8090/tblCommonBaseData/tblNeedyAccounts', form: { PersonId: findRequest[0].PersonId }, }, async function (err, res, body) {

        if (await JSON.parse(body).CommonBaseTypeId == findRequest[0].PersonId) {

          response.json({ error: "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است" })
        } else {
          let checked = await PersonalModels.ws_loadPersonal(findRequest);
          if (checked[0] != ' ') {
            console.log('else')

            await tblCommonBaseTypeModel.deletePersonalController(findRequest).then(result => {

              if (result == 1) {
                response.json({ message: "عملیات حذف با موفقیت انجام شد" })
              } else {
                response.json({ error: "رکورد مورد نظر موجود نیست" })
              }

            })
          } else {
            response.json({ error: "رکورد مورد نظر موجود نیست" })
          }
        }
      })
    }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    })

  }
}
