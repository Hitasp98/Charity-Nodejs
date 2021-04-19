

const PersonalControllers = require('../Controllers/PersonalControllers')



var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var router = express.Router()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())



router.route('/getPersonal').post(PersonalControllers.getPersonalController);
router.route('/insertPersonal').post(PersonalControllers.insertPersonalController);
router.route('/updatePersonal').put(PersonalControllers.updatePersonalController);
router.route('/deletePersonal').delete(PersonalControllers.deletePersonalController);

module.exports = router