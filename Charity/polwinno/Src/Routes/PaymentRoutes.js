const paymentControllers = require('../Controllers/PaymentController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/getPayment').post(paymentControllers.getPayment);
router.route('/getCashAssistanceDetail').post(paymentControllers.getCashAssistanceDetail);
router.route('/insertPayment').post(paymentControllers.insertPayment);




module.exports = router