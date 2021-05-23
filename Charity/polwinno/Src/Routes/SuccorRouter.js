const SuccorControllers = require('../Controllers/SuccorController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/loadCashAssistanceDetail').post(SuccorControllers.loadCashAssistanceDetail);
router.route('/createCashAssistanceDetail').post(SuccorControllers.createCashAssistanceDetail);
router.route('/updateCashAssistanceDetail').put(SuccorControllers.updateCashAssistanceDetail);
router.route('/deleteCashAssistanceDetail').delete(SuccorControllers.deleteCashAssistanceDetail);



module.exports = router