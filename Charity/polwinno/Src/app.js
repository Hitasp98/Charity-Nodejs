

var express = require('express')
var bodyParser = require('body-parser')

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


app.use('/CommonBaseType', require('./Routes/commonBaseTypeRoutes'))
app.use('/CommonBaseData', require('./Routes/commonBaseDataRoutes'))
app.use('/CharityAccounts', require('./Routes/charityAccountsRoutes'))
app.use('/Personal', require('./Routes/personalRoutes'))
app.use('/NeedyAccounts',  require('./Routes/NeedyAccountsRoutes'))
app.use('/FirstPlan', require('./Routes/FirstPlanRouter'))
app.use('/SecondPlan', require('./Routes/SecondPlanRouter'))
app.use('/Settelment', require('./Routes/SettelmentRoutes'))
app.use('/Payment', require('./Routes/PaymentRoutes'))



var port = process.env.port || 8090
app.listen(port,()=>{
    console.log('running at '+ port);
})




