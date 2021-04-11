const tblCommonBaseTypeModel = require('./models/tblCommonBaseTypeModel')
const tblCommonBaseDataModel = require('./models/tblCommonBaseDataModel')
const tblCharityAccountsModel = require('./models/tblCharityAccountsModel')


//var Db = require('./models/tblCommonBaseTypeModel')
//var tblCommonBaseType = require('./tblCommonBaseType')

var express = require('express')
var bodyParser = require('body-parser')
//var cors = require('cors')
var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
//app.use(cors())
app.use('/api', router)


router.use((request,response,next)=>{
    console.log('middleware');
    next()
})



//tblCommonBaseType
router.route('/getTblCommonBaseType').post((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseTypeModel.getTblCommonBaseType(findRequest).then(result =>{ 
        
            
                if(result == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
                
            
            

        })
    
})

router.route('/insertTblCommonBaseType').post((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseTypeModel.insertTblCommonBaseType(findRequest).then(result => 
        
        response.json(result[0][0].CommonBaseTypeId)
    ).catch (error=>
    
       response.json({error:"رکورد مورد نظر موجود میباشد"})
    )
})

router.route('/updateTblCommonBaseType').put((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseTypeModel.updateTblCommonBaseType(findRequest).then(result =>{
        
        if(result==null){
            response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
        }else{

        response.json(result[0])
        }
        
     })
})

router.route('/deleteTblCommonBaseType').delete((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseTypeModel.deleteTblCommonBaseType(findRequest).then(result =>{

       if (result == 1 ){
        response.json({message:"عملیات حذف با موفقیت انجام شد"})
       }else{
        response.json({error : "عملیات حذف با موفقیت انجام نشد"})
       }
     
     })
})

//tblCommon/baseData
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.route('/getTblCommonBaseData').post((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseDataModel.getTblCommonBaseData(findRequest).then(result =>{ 
        
            
                if(result == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
                
            
            

        })
    
})


router.route('/insertTblCommonBaseData').post((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseDataModel.insertTblCommonBaseData(findRequest).then(result => 
        
        response.json(result[0][0].CommonBaseDataId)
    ).catch (error=>
    
       response.json({error:"رکورد مورد نظر ثبت نمیشود"})
    )
})

router.route('/updateTblCommonBaseData').put((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseDataModel.updateTblCommonBaseData(findRequest).then(result =>{
        
        if(result==null){
            response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
        }else{

        response.json(result[0])
        }
        
     })
})

router.route('/deleteTblCommonBaseData').delete((request,response)=>{
    let findRequest = {...request.body}
   
    tblCommonBaseDataModel.deleteTblCommonBaseData(findRequest).then(result =>{

       if (result == 1 ){
        response.json({message:"عملیات حذف با موفقیت انجام شد"})
       }else{
        response.json({error : "عملیات حذف با موفقیت انجام نشد"})
       }
     
     })
})
//tblCharityAccounts
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.route('/getTblCharityAccounts').post((request,response)=>{
    let findRequest = {...request.body}
   
    tblCharityAccountsModel.getTblCharityAccounts(findRequest).then(result =>{ 
        
            
                if(result == null){
                    response.json({error:"هیچ رکوردی موجود نیست"})
                }else{
                    response.json(result)
                }
                
            
            

        })
    
})

router.route('/insertTblCharityAccounts').post((request,response)=>{
    let findRequest = {...request.body}
   
    tblCharityAccountsModel.insertTblCharityAccounts(findRequest).then(result => 
        
        response.json(result[0][0].CharityAccountId)
    ).catch (error=>
    
       response.json({error:"رکورد مورد نظر ثبت نمیشود"})
    )
})

router.route('/updateTblCharityAccounts').put((request,response)=>{
    let findRequest = {...request.body}
   
    tblCharityAccountsModel.updateTblCharityAccounts(findRequest).then(result =>{
        
        if(result==null){
            response.json({error:"عملیات ویرایش با موفقیت انجام نشد"})
        }else{

        response.json(result[0])
        }
        
     })
})

router.route('/deleteTblCharityAccounts').delete((request,response)=>{
    let findRequest = {...request.body}
   
    tblCharityAccountsModel.deleteTblCharityAccounts(findRequest).then(result =>{

       if (result == 1 ){
        response.json({message:"عملیات حذف با موفقیت انجام شد"})
       }else{
        response.json({error : "عملیات حذف با موفقیت انجام نشد"})
       }
     
     })
})

var port = process.env.port || 8090
app.listen(port,()=>{
    console.log('running at '+ port);
})




