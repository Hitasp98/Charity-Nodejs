

const tblCommonBaseDataControllers = require('../Controllers/tblCommonBaseDataController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())




router.route('/getTblCommonBaseData').post(tblCommonBaseDataControllers.getTblCommonBaseDataController);
router.route('/insertTblCommonBaseData').post(tblCommonBaseDataControllers.insertTblCommonBaseDataController);
router.route('/updateTblCommonBaseData').put(tblCommonBaseDataControllers.updateTblCommonBaseDataController);
router.route('/deleteTblCommonBaseData').delete(tblCommonBaseDataControllers.deleteTblCommonBaseDataController);
module.exports = router
