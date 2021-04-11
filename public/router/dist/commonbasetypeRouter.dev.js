"use strict";

var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var commonbasetype = require('../controllers/commonbasetype'); //tb tblcommonbasetype


router.post('/selecttblcommonbasetype', commonbasetype.ws_loadBaseType);
router.post('/addBasetype', commonbasetype.ws_CreateBaseType);
router.patch('/UpdateBasetype', commonbasetype.ws_UpdateBaseType);
router["delete"]('/DeleteBasetype', commonbasetype.ws_DeleteBaseType);
router.post('/searchTbBasetype', commonbasetype.searchTbBasetype);
router.post('/searchTbBaseTypeTitle', commonbasetype.searchTbBaseTypeTitle);
module.exports = router;