"use strict";

var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var commonbasedata = require('../controllers/commonbasedata');

router.post('/selecttblcommonbasedata', commonbasedata.ws_loadBaseValue);
router.post('/addBasedata', commonbasedata.ws_createBaseValue);
router.patch('/UpdateBasedata', commonbasedata.ws_updateBaseValue);
router["delete"]('/DeleteBasedata', commonbasedata.ws_deleteBaseValue); // router.post('/selectTbSearch',Pcommonbasedata.selectTbSearch)

module.exports = router;