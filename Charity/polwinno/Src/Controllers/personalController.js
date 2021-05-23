const tblPersonalModel = require("../Models/personalModel");
var fnCheckCodeMeli = require("../Utils/nationalCodeChecker");
var express = require("express");
var bodyParser = require("body-parser");

const requestApi = require('request');


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//get personal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.getPersonalController = async function (request, response) {
  try {
    let findRequest = {...request.body};

    await tblPersonalModel.ws_loadPersonal(findRequest).then(result => {
        if(result[0] == null){
            response.json({error:"هیچ رکوردی موجود نیست"})
        }else{
            response.json(result)
        }

    });
  } catch (error) {

    console.log(error.message);
  }
};
//insert personal 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.insertPersonalController = async function (request, response) {
try {

    let findRequest = { ...request.body };
    if(findRequest.PersonType != null && findRequest.Name !=null && findRequest.Family !=null && findRequest.Sex!=null){
       // check nationalcode 
                let nationalCodeChecker = fnCheckCodeMeli.fnCheckCodeMeli(findRequest.NationalCode)
            
                if(nationalCodeChecker == true ){
                    //check personType = 2 mandatory or check needy person mandatory fields
                    if(findRequest.PersonType == 2 && findRequest.IdNumber !=null && findRequest.NationalCode !=null && findRequest.BirthDate !=null && findRequest.BirthPlace != null && findRequest.PersonPhoto != null ){
                    
                        
                        let findIndex = {
                        
                        PersonType : findRequest.PersonType,
                            NationalCode : findRequest.NationalCode
                        }
                        let resultGet = await tblPersonalModel.ws_loadPersonal(findIndex)
                        if(resultGet[0] == null){
                            await tblPersonalModel.ws_createPersonal(findRequest).then(result => 
                                
                                response.json(result[0].PersonId)
                            ).catch (error=>
                            
                                response.json({error:"رکورد مورد نظر درج نشد"})
                            )
                        }else{
                            response.json({error:"رکورد مورد نظر تکراری میباشد"})
                        }
                        
                    }else if(findRequest.PersonType == 1 || findRequest.PersonType == 3 ){
                        
                        let findIndex = {
                        
                            PersonType : findRequest.PersonType,
                            NationalCode : findRequest.NationalCode
                        }
                        let resultGet = await tblPersonalModel.ws_loadPersonal(findIndex)
                        if(resultGet[0] == null){
                            await tblPersonalModel.ws_createPersonal(findRequest).then(result => 
                                
                                response.json(result[0].PersonId)
                            ).catch (error=>
                            
                                response.json({error:"رکورد مورد نظر درج نشد"})
                            )
                        }else{
                            response.json({error:"رکورد مورد نظر تکراری میباشد"})
                        }
                    }else{
                        response.json({ error:" فیلد های اجباری برای شخص نیازمند را صحیح پر کنید "}); 
                    }
            }else{
                response.json({ error:" کدملی صحیح نمیباشد "});
            }     
    }else{
        response.json({ error:" فیلد های اجباری پر کنید "}); 
    }
  } catch (error) {
    response.json({ error: "رکورد مورد نظر درج نشد"});
  }
};
//update personal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.updatePersonalController = async function (request, response) {
  try {
  
    
    
    let findRequest = { ...request.body };
    if(findRequest.PersonType != null && findRequest.Name !=null && findRequest.Family !=null && findRequest.Sex!=null){
       
        let findById = await tblPersonalModel.ws_loadPersonal({PersonId : findRequest.PersonId })
            
            if(findById[0] != null){
                let nationalCodeChecker = await fnCheckCodeMeli.fnCheckCodeMeli(findRequest.NationalCode)
                if(nationalCodeChecker == true ){
                    if(findRequest.PersonType == 2 && findRequest.IdNumber !=null && findRequest.NationalCode !=null && findRequest.BirthDate !=null && findRequest.BirthPlace != null && findRequest.PersonPhoto != null ){
                       
                        
                        let findIndex = {
                        
                            PersonType : findRequest.PersonType,
                            NationalCode : findRequest.NationalCode
                        }
                        let resultGet = await tblPersonalModel.ws_loadPersonal(findIndex)
                        console.log(resultGet);
                        if(resultGet[0] == null || (resultGet[0].PersonId == findRequest.PersonId && resultGet[0] != null )){
                            await tblPersonalModel.ws_updatePersonal(findRequest).then(result => 
                                
                                response.json(result)
                            ).catch (error=>
                            
                                response.json({error:"رکورد مورد نظر ویرایش نشد"})
                            )
                        }else{
                            response.json({error:"رکورد مورد نظر تکراری میباشد"})
                        }
                        
                    }else if(findRequest.PersonType == 1 || findRequest.PersonType == 0 ){
                        
                        let findIndex = {
                        
                            PersonType : findRequest.PersonType,
                            NationalCode : findRequest.NationalCode
                        }
                        let resultGet = await tblPersonalModel.ws_loadPersonal(findIndex)
 
                        if(resultGet[0] == null || ((resultGet[0].PersonId == findRequest.PersonId) && resultGet[0] != null)){
                           
                            await tblPersonalModel.ws_updatePersonal(findRequest).then(result => 
                                
                                response.json(result)
                            ).catch (error=>
                            
                                response.json({error:"رکورد مورد نظر ویرایش نشد"})
                            )
                        }else{
                            response.json({error:"رکورد مورد نظر یکتا نیست"})
                        }
                    }else{
                        response.json({ error:" فیلد های اجباری برای شخص نیازمند را پر کنید "}); 
                    }
               }else{
                response.json({ error:" کدملی صحیح نمیباشد "});
               } 
            }else{
                response.json({ error:" چنین رکوردی برای ویرایش موجود نیست "}); 
            }
            
    }else{
        response.json({ error:" فیلد های اجباری پر کنید "}); 
    }
  } catch (error) {
    response.json({
      error: "رکورد مورد نظر ویرایش نشد"
    });
  }
};
//delete Personal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.deletePersonalController = async  function (request, response) {
  try {
    let findRequest = { ...request.body };
    let findById = await tblPersonalModel.ws_loadPersonal({PersonId : findRequest.PersonId })
    if(findById[0] != null){
        await tblPersonalModel.ws_deletePersonal(findRequest).then(result =>{
    
            if (result == 1 ){
                response.json({message:"عملیات حذف با موفقیت انجام شد"})
            }else{
                response.json({error : " دوباره سعی کنید عملیات حذف انجام نشد"})
            }})
    }else{
        response.json({
            error: "چنین رکوردی برای حذف موجود نیست"
          })
    }
  } catch (error) {
    response.json({
      error: "رکورد مورد نظر خذف نشد"
    })

  }
}