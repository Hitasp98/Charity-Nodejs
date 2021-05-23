const PlanControllers = require('../Controllers/FirstPlanController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/getPlan').post(PlanControllers.loadPlan);
router.route('/insertPlan').post(PlanControllers.createPlan);
router.route('/updatePlan').put(PlanControllers.UpdatePlan);
router.route('/deletePlan').delete(PlanControllers.deletePlan);



module.exports = router