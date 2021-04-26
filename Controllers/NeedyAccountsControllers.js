//NeedAccountsControllers
// it's connect on db NeedAccounts
//have get , insert , update and delete




const NeedyAccountsModels = require("../Models/NeedyAccountsModels");





var express = require("express");
var bodyParser = require("body-parser");



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





module.exports.getNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };


    await NeedyAccountsModels.ws_loadNeedyAccount(findRequest).then(result => {

      if (result == null) {


        response.json({ error: "هیچ رکوردی موجود نیست" });


      } else {


        response.json(result[0]);



      }
    });
  } catch (error) {


    console.log(error.message);


  }
};





module.exports.insertNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };



    if (
      findRequest.NeedyId === null &&
      findRequest.BankId === null &&
      findRequest.OwnerName === null &&
      findRequest.CardNumber === null &&
      findRequest.AccountNumber === null &&
      findRequest.AccountName === null &&
      findRequest.ShebaNumber === null) {



      response.json("ورودی ها خالی است");




    } else {



      let ShebaNumber = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest.ShebaNumber)


      if (ShebaNumber === null) {
        let number = findRequest.AccountNumber + findRequest.NeedyId

        let number = await NeedyAccountsModels.ws_loadNeedyAccount(number)

        if (number === null) {

          let checked = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest);
          if (checked === null) {
            await NeedyAccountsModels.ws_createNeedyAccount(findRequest)
              .then(result => {
                console.log(result + ' is insert')
                if (result == '') {

                  response.json({ error: "عملیات درج با موفقیت انجام نشد" });



                } else {




                  response.json(result.NeedyAccountId);



                }
              })
          }
          else {
            response.json("قبلا درج شده");

          }
        } else {
          response.json("قبلا درج شده");

        }
      } else {



        response.json("قبلا درج شده");


      }



    }


  } catch (error) {


    response.json({ error: "کد نوع را وارد کنید" });



  };
}





module.exports.updateNeedyAccountsController = async function (request, response) {
  try {
    let findRequest = { ...request.body };
    console.log(findRequest)

    if (
      findRequest.NeedyAccountId == null &&
      findRequest.NeedyId == null &&
      findRequest.BankId == null &&
      findRequest.OwnerName == null &&
      findRequest.CardNumber == null &&
      findRequest.AccountNumber == null &&
      findRequest.AccountName == null &&
      findRequest.ShebaNumber == null) {
      response.json("ورودی ها خالی است");
    } else {


      let ShebaNumber = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest.ShebaNumber)


      if (ShebaNumber == null) {
        let AccountNumber = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest.AccountNumber)
        if (AccountNumber == null) {
          requestApi.post({ url: 'http://localhost:8090/tblPayment/tblPayment ', form: { findRequest: findRequest } }, async function (err, res, body) {
            if (await JSON.parse(body).AccountNumber == findRequest.AccountNumber) {

              let checked = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest);
              if (checked[0] != ' ') {
                await NeedyAccountsModels.ws_UpdateNeedyAccount(findRequest).then(result => {
                  if (result == '') {
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
            } else {
              response.json({
                error: "امکان ويرايش وجود ندارد عملیات ویرایش با موفقیت انجام نشد"
              });
            }
          })
        }
      } else {
        response.json("قبلا درج شده");

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
      findRequest.NeedyAccountId == null
    ) {
      response.json("ورودی ها خالی است");
    }
    else {

      // request for checking Fk in others table 
      requestApi.post({ url: 'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData', form: { findRequest: findRequest.BankId } }, async function (err, res, body) {

        if (await JSON.parse(body).CommonBaseDataId == findRequest.NeedyAccountId) {

          response.json({ error: "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است" })
        } else {
          requestApi.post({ url: 'http://localhost:8090/Personal/getPersonal', form: { findRequest: findRequest.NeedyId } }, async function (err, res, body) {
            if (await JSON.parse(body).PersonId == findRequest.NeedyId) {

              response.json({ error: "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است" })
            } else {
              let checked = await NeedyAccountsModels.ws_loadNeedyAccount(findRequest);
              if (checked[0] != ' ') {
                console.log('else')

                await NeedyAccountsModels.ws_deleteNeedyAccount(findRequest).then(result => {

                  if (result == '') {
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

      })
    }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    })

  }
}