const personalControllers = require('../Controllers/personalController')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


router.route('/getPersonal').post(personalControllers.getPersonalController);
router.route('/insertPersonal').post(personalControllers.insertPersonalController);
router.route('/updatePersonal').put(personalControllers.updatePersonalController);
router.route('/deletePersonal').delete(personalControllers.deletePersonalController);

module.exports = router