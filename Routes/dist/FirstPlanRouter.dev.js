"use strict";

var PlanControllers = require('../Controllers/FirstPlanController');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
router.route('/loadPlan').post(PlanControllers.loadPlan);
router.route('/createPlan').post(PlanControllers.createPlan);
router.route('/UpdatePlan').put(PlanControllers.UpdatePlan);
router.route('/deletePlan').put(PlanControllers.deletePlan);
module.exports = router;