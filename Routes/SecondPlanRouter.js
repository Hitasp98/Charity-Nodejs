
const PlanControllers = require('../Controllers/SecondPlanController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/loadNeedyForPlan').post(PlanControllers.loadNeedyForPlan);
router.route('/AssignNeedyToPlan').post(PlanControllers.AssignNeedyToPlan);
router.route('/deleteNeedyFromPlan').put(PlanControllers.deleteNeedyFromPlan);



module.exports = router