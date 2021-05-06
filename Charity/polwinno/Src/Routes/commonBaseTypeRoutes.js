

const tblCommonBaseTypeControllers = require('../Controllers/commonBaseTypeController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())



//commonBaseType routes

router.route('/getCommonBaseType').post(tblCommonBaseTypeControllers.getTblCommonBaseTypeController);
router.route('/insertCommonBaseType').post(tblCommonBaseTypeControllers.insertTblCommonBaseTypeController);
router.route('/updateCommonBaseType').put(tblCommonBaseTypeControllers.updateTblCommonBaseTypeController);
router.route('/deleteCommonBaseType').delete(tblCommonBaseTypeControllers.deleteTblCommonBaseTypeController);

module.exports = router
