

const tblCommonBaseTypeControllers = require('../Controllers/commonBaseTypeController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())



//commonBaseType routes

router.route('/getTblCommonBaseType').post(tblCommonBaseTypeControllers.getTblCommonBaseTypeController);
router.route('/insertTblCommonBaseType').post(tblCommonBaseTypeControllers.insertTblCommonBaseTypeController);
router.route('/updateTblCommonBaseType').put(tblCommonBaseTypeControllers.updateTblCommonBaseTypeController);
router.route('/deleteTblCommonBaseType').delete(tblCommonBaseTypeControllers.deleteTblCommonBaseTypeController);

module.exports = router
