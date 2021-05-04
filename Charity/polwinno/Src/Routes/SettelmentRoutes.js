const settelmentControllers = require('../Controllers/SettelmentController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/getPayment').post(settelmentControllers.getPayment);
router.route('/getCashAssistanceDetail').post(settelmentControllers.getCashAssistanceDetail);
// router.route('/updatePlan').put(settelmentControllers.UpdatePlan);
// router.route('/deletePlan').delete(settelmentControllers.deletePlan);



module.exports = router