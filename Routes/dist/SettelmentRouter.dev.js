"use strict";

var SettelmentControllers = require('../Controllers/SettelmentController');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
router.route('/loadPayment').post(SettelmentControllers.loadPayment);
router.route('/loadCashAssistanceDetail').post(SettelmentControllers.loadCashAssistanceDetail);
router.route('/Settelment').put(SettelmentControllers.Settelment);
router.route('/UpdatePayment').put(SettelmentControllers.UpdatePayment);
router.route('/deletePayment').put(SettelmentControllers.deletePayment);
module.exports = router;