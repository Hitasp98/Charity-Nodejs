// const tblCommonBaseTypeModel = require('../Models/tblCommonBaseTypeModel')
// const tblCommonBaseDataModel = require('../Models/tblCommonBaseDataModel')
//const tblCharityAccountsModel = require('../Models/tblCharityAccountsModel')

const tblCharityAccountsControllers = require('../Controllers/charityAccountsController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())




router.route('/getTblCharityAccounts').post(tblCharityAccountsControllers.getTblCharityAccountsController);
router.route('/insertTblCharityAccounts').post(tblCharityAccountsControllers.insertTblCharityAccountsController);
router.route('/updateTblCharityAccounts').put(tblCharityAccountsControllers.updateTblCharityAccountsController);
router.route('/deleteTblCharityAccounts').delete(tblCharityAccountsControllers.deleteTblCharityAccountsController);
module.exports = router
