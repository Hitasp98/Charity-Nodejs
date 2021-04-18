const NeedyAccountsModels = require("../Models/NeedyAccountsModels");
const PersonalModels = require("../Models/NeedyAccountsModels");

var express = require("express");
var bodyParser = require("body-parser");
var md5 = require("md5");
var createHash = require("hash-generator");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.getNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = {
      ...request.body
    };

    await NeedyAccountsModels.ws_loadNeedyAccount(findRequest).then(result => {
      if (result == null) {
        response.json({
          error: "هیچ رکوردی موجود نیست"
        });
      } else {
        response.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.insertNeedyAccountsController = async function (request, response) {
  try {
    if (
      findRequest[0].NeedyId == null &&
      findRequest[0].BankId == null &&
      findRequest[0].OwnerName == null &&
      findRequest[0].CardNumber == null &&
      findRequest[0].AccountNumber == null &&
      findRequest[0].AccountName == null &&
      findRequest[0].ShebaNumber == null) {
      response.json("ورودی ها خالی است");
    } else {
      console.log("this PersonId ");
      let loadNeedyAccount = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest)
      if (loadNeedyAccount[0] == null) {
        await NeedyAccountsModels.ws_createNeedyAccount(findRequest)
          .then(result => {
            if (result == null) {
              response.json({
                error: "عملیات درج با موفقیت انجام نشد"
              });
            } else {
              response.json(result);
            }
          })
      } else {
        response.json("قبلا درج شده");
      }


    }


  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });

  };
}
module.exports.updateNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };
    if (
      findRequest[0].NeedyAccountId == null &&
      findRequest[0].NeedyId == null &&
      findRequest[0].BankId == null &&
      findRequest[0].OwnerName == null &&
      findRequest[0].CardNumber == null &&
      findRequest[0].AccountNumber == null &&
      findRequest[0].AccountName == null &&
      findRequest[0].ShebaNumber == null) {
      response.json("ورودی ها خالی است");
    } else {
      let checked = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest);
      if (checked[0] != ' ') {
        await NeedyAccountsModels.ws_UpdateNeedyAccount(findRequest).then(result => {
          if (result == null) {
            response.json({
              error: "عملیات ویرایش با موفقیت انجام نشد"
            });
          } else {
            response.json(result);
          }
        });
      } else {
        response.json(checked[0] + "1عملیات ویرایش با موفقیت انجام نشد");
      }
    }

  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });
  }
};

module.exports.deleteNeedyAccountsController = function (request, response) {
  try {
    let findRequest = { ...request.body }
    if (
      findRequest[0].NeedyAccountId == null &&
      findRequest[0].NeedyId   == null &&
      findRequest[0].AccountNumber == null 
    ) {
      response.json("ورودی ها خالی است");
    }
    else {


      // request for checking Fk in others table 
      requestApi.post({ url: 'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData', form: { findRequest: findRequest } }, async function (err, res, body) {

        if (await JSON.parse(body).NeedyId == findRequest[0].NeedyId) {

          response.json({ error: "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است" })
        } else {
          let checked = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest);
          if (checked[0] != ' ') {
            console.log('else')

            await NeedyAccountsModels.ws_deleteNeedyAccount(findRequest).then(result => {

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