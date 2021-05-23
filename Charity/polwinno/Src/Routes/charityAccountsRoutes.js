

const charityAccountsControllers = require('../Controllers/charityAccountsController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())




router.route('/getCharityAccounts').post(charityAccountsControllers.getTblCharityAccountsController);
router.route('/insertCharityAccounts').post(charityAccountsControllers.insertTblCharityAccountsController);
router.route('/updateCharityAccounts').put(charityAccountsControllers.updateTblCharityAccountsController);
router.route('/deleteCharityAccounts').delete(charityAccountsControllers.deleteTblCharityAccountsController);
// just check charity for use in other table (without any join)
router.route('/checkCharityAccounts').post(charityAccountsControllers.checkCharityController);
module.exports = router
