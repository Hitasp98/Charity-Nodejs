const planControllers = require('../Controllers/SecondPlanController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/getPlan').post(planControllers.loadNeedyForPlan);
router.route('/insertPlan').post(planControllers.AssignNeedyToPlan);
router.route('/deletePlan').delete(planControllers.deleteNeedyFromPlan);



module.exports = router