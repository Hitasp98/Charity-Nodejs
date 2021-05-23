

const tblCommonBaseDataControllers = require('../Controllers/commonBaseDataController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())



router.route('/getCommonBaseData').post(tblCommonBaseDataControllers.getTblCommonBaseDataController);
router.route('/insertCommonBaseData').post(tblCommonBaseDataControllers.insertTblCommonBaseDataController);
router.route('/updateCommonBaseData').put(tblCommonBaseDataControllers.updateTblCommonBaseDataController);
router.route('/deleteCommonBaseData').delete(tblCommonBaseDataControllers.deleteTblCommonBaseDataController);
module.exports = router
