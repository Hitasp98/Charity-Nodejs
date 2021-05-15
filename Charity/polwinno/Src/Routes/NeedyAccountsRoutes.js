const NeedyAccountsControllers = require('../Controllers/NeedyAccountsController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

router.route('/getNeedyAccounts').post(NeedyAccountsControllers.getNeedyAccountsController);
router.route('/insertNeedyAccounts').post(NeedyAccountsControllers.insertNeedyAccountsController);
router.route('/updateNeedyAccounts').put(NeedyAccountsControllers.updateNeedyAccountsController);
router.route('/deleteNeedyAccounts').delete(NeedyAccountsControllers.deleteNeedyAccountsController);
// for check NeedyAccount table 
router.route('/checkNeedyAccounts').post(NeedyAccountsControllers.checkNeedyAccountsController);


module.exports = router