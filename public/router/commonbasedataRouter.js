const express = require('express')
var mysql = require('mysql')
const router = express.Router()
const commonbasedata = require('../controllers/commonbasedata')

router.post('/selecttblcommonbasedata', commonbasedata.ws_loadBaseValue)
router.post('/addBasedata', commonbasedata.ws_createBaseValue)
router.patch('/UpdateBasedata', commonbasedata.ws_updateBaseValue)
router.delete('/DeleteBasedata', commonbasedata.ws_deleteBaseValue)
// router.post('/selectTbSearch',Pcommonbasedata.selectTbSearch)
module.exports = router
