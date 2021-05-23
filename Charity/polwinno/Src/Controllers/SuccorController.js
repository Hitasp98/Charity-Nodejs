const succorModel = require("../Models/SuccorModel");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//get CashAssistanceDetail
///////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.loadCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    await succorModel.ws_loadCashAssistanceDetail(findRequest).then(result => {
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
//insert CashAssistanceDetail 
/////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.createCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    if ( findRequest.PlanId != null && findRequest.NeededPrice != null)
      
     {
      if (findRequest.MinPrice == null) {
        findRequest.MinPrice = 0;
      }
     
      if (findRequest.MinPrice <= findRequest.NeededPrice) {
       
        let findindex = {
          AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
          PlanId: findRequest.PlanId
        };
        let resultGet = await succorModel.checkCashAssistanceDetail(findindex);
       
        if (resultGet[0] == null) {
          
          await succorModel.ws_createCashAssistanceDetail(
            findRequest
          ).then(result => {
            if (result != null) {
              response.json(result);
            } else {
              response.json({ error: "رکورد مورد نظر درج نشد " });
            }
          });
        } else {
          response.json({
            error: "رکورد مورد نظر یکتا نیست",
          });
        }
      } else {
        response.json({
          error: "حداقل مبلغ بايد از مبلغ مورد نياز کوچکتر يا مساوي باشد",
        });
      }
    } else {
      response.json({ error: "فیلدهای اجباری را پر کنید" });
    }
  } catch (error) {
    response.json({error: "رکورد مورد نظر درج نشد" });
  }
};

//update CashAssistanceDetail 
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.updateCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = { ...request.body };

    if(findRequest.PlanId != null && findRequest.NeededPrice != null && findRequest.CashAssistanceDetailId !=null){
     
      let findById = {
        CashAssistanceDetailId : findRequest.CashAssistanceDetailId
       
      }
      
 
      let findCashAssistanceDetailId = await succorModel.checkCashAssistanceDetail(findById);
     
      if (findCashAssistanceDetailId[0] != null) {
       
        if(findRequest.MinPrice == null) {
          findRequest.MinPrice = 0;
        }
      
        if (findRequest.MinPrice <= findRequest.NeededPrice) {
         
          let findindex = {
            AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
            PlanId: findRequest.PlanId,
          };
  
          let resultGet = await succorModel.checkCashAssistanceDetail(findindex);
         
          if (resultGet[0] == null || ((resultGet[0].CashAssistanceDetailId == findRequest.CashAssistanceDetailId && resultGet[0] != null))) {
           
            // requestApi.post(
            //   {
            //     url: "Api tblPayment ",
            //     form: {
            //       CashAssistanceDetailId: findRequest.CashAssistanceDetailId,
            //     },
            //   },
            //   async function(err, res, body) {
            //     if ((await JSON.parse(body).CashAssistanceDetailId) != null) {
                 
                 
                  
                    await succorModel.ws_updateCashAssistanceDetail(
                      findRequest
                    ).then(result => {
                      if (result != null) {
                        response.json(result);
                      } else {
                        response.json({ error: "رکورد مورد نظر ویرایش نشد " });
                      }
                    });
                  
            //     } else {
            //       response.json({
            //         error: "باشد امکان تغييرات روي دو مبلغ وجود ندارد",
            //       });
            //     }
            //   }
            // );
          } else {
            response.json({
              error: "رکورد مورد نظر یکتا نیست"});
          }
        }else{
          response.json( {error: "حداقل مبلغ بايد از مبلغ مورد نياز کوچکتر يا مساوي باشد"});
        }
      }else{
        response.json({ error: "چنین رکوردی برای ویرایش موجود نیست" });
      }
     
    }else {
      response.json({ error: "فیلدهای اجباری را پر کنید" });
    }
  } catch (error) {
    response.json({error: "عملیات ویرایش انجام نشد", });
  }
}
//delete CashAssistanceDetail
//////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deleteCashAssistanceDetail = async function(request, response) {
  try {
    let findRequest = { ...request.body };
    if (
      findRequest.CashAssistanceDetailId !== null 
    
    ) {
    
      let findindex = {
        CashAssistanceDetailId: findRequest.CashAssistanceDetailId,
      };
      let findCashAssistanceDetailId = await succorModel.checkCashAssistanceDetail(
        findindex
      );
      if (findCashAssistanceDetailId[0] != null) {
        
        // requestApi.post(
        //   {
        //     url: "Api tblPayment ",
        //     form: {
        //       CashAssistanceDetailId: findRequest.CashAssistanceDetailId,
        //     },
        //   },
        //   async function(err, res, body) {
        //     if ((await JSON.parse(body).CashAssistanceDetailId) == null) {
       
              await succorModel.ws_deleteCashAssistanceDetail({CashAssistanceDetailId : findRequest.CashAssistanceDetailId} ).then(result => {
                if (result == 1) {
                  response.json({ message : "رکورد مورد نظر با موفقیت حذف شد " });
                } else {
                  response.json({ error: "رکورد مورد نظر حذف نشد " });
                }
              });
        //     } else {
        //       response.json({
        //         error: "به علت  وابستگي اطلاعات عمل حذف انجام نشد",
        //       });
        //     }
        //   }
        // );
      } else {
        response.json({ error: "چنین رکوردی برای حذف موجود نیست " });
      }
    } else {
      response.json({ error: "فیلدهای ضروری را پر کنید " });
    }
  } catch (error) {
    response.json({  error: "رکورد مورد نظر حذف نشد"});
  }
};