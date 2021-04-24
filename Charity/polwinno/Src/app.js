

var express = require('express')
var bodyParser = require('body-parser')

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())


app.use('/tblCommonBaseType', require('./Routes/commonBaseTypeRoutes'))
app.use('/tblCommonBaseData', require('./Routes/commonBaseDataRoutes'))
app.use('/tblCharityAccounts', require('./Routes/charityAccountsRoutes'))
app.use('/tblPersonal', require('./Routes/personalRoutes'))




var port = process.env.port || 8090
app.listen(port,()=>{
    console.log('running at '+ port);
})




