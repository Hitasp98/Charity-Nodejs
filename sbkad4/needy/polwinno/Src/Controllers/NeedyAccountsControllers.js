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
    let findRequest = {...request.body};
    let checked = await NeedyAccountsModels.check(findRequest);
    let sumAccNid=findRequest[0].NeedyId+findRequest[0].AccountNumber

    if (checked[0] == null) {
      let shabacheker = NeedyAccountsModels.checker("ShebaNumber", findRequest[0].ShebaNumber);
      let AccountNumber = NeedyAccountsModels.checker('AccountNumber', sumAccNid)
      if (shabacheker[0] == null) {
//todo:check AccountNumber
        if (AccountNumber[0] == null) {
          console.log("this PersonId ");
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
            .catch(error =>
              response.json({
                error: "رکورد مورد نظر ثبت نمیشود"
              })
            );
        } else {
          response.json("شماره کارت قبلا درج شده ");
        }
      } else {
        response.json("شبا قبلا درج شده ");
      }
    } else {
      response.json("قبلا درج شده");
    }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });
  }
};

module.exports.updateNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = {...request.body};
    let checked = await NeedyAccountsModels.check(findRequest);
    //Todo:sum NeedId+AccountNumber
    let sumAccNid=findRequest[0].NeedyId+findRequest[0].AccountNumber
    if(checked != null) {
      let shabaCheker = NeedyAccountsModels.checker("ShebaNumber", findRequest[0].ShebaNumber);
      let AccountNumber = NeedyAccountsModels.checker('AccountNumber',sumAccNid )
      let NeedyAccountId=NeedyAccountsModels.checker('AccountNumber',NeedyAccountId)
      if (shabaCheker[0] == null) {
        //todo:check AccountNumber
        if (AccountNumber[0] == null) {
          if(NeedyAccountId[0]==null){
          await NeedyAccountsModels.ws_UpdateNeedyAccount(findRequest).then(result => {
            if (result == null) {
              response.json({
                error: "عملیات ویرایش با موفقیت انجام نشد"
              });
            } else {
              response.json(result);
            }
          });
        }else {
          response.json("امکان ويرايش وجود ندارد ");
        }} else {
          response.json("شماره حساب قبلا درج شده ");
        }
      } else {
        response.json("شبا قبلا درج شده ");
      }
    } else {
      response.json(checked[0].PersonId + "1عملیات ویرایش با موفقیت انجام نشد");
    }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });
  }
};

module.exports.deleteNeedyAccountsController = function (request, response) {
  let findRequest = {...request.body};

  NeedyAccountsModels.ws_deletePersonal(findRequest).then(result => {
    if (result == 1) {
      response.json({
        message: "عملیات حذف با موفقیت انجام شد"
      });
    } else {
      response.json({
        error: "عملیات حذف با موفقیت انجام نشد"
      });
    }
  });
};