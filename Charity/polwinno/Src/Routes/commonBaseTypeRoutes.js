

const commonBaseTypeControllers = require('../Controllers/commonBaseTypeController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())



//commonBaseType routes

router.route('/getCommonBaseType').post(commonBaseTypeControllers.getTblCommonBaseTypeController);
router.route('/insertCommonBaseType').post(commonBaseTypeControllers.insertTblCommonBaseTypeController);
router.route('/updateCommonBaseType').put(commonBaseTypeControllers.updateTblCommonBaseTypeController);
router.route('/deleteCommonBaseType').delete(commonBaseTypeControllers.deleteTblCommonBaseTypeController);

module.exports = router
