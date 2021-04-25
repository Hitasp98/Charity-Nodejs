
const PaymentControllers = require('../Controllers/PaymentController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/Payment').post(PaymentControllers.Payment);
router.route('/loadPayment').post(PaymentControllers.loadPayment);
router.route('/loadCashAssistanceDetail').put(PaymentControllers.loadCashAssistanceDetail);



module.exports = router