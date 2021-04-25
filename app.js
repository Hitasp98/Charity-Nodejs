const path = require('path')
const hbs  = require('hbs')
var express      = require('express')
var bodyParser   = require('body-parser')

var app    = express()


const viewPath     = path.join(__dirname, './View')
const partialsPath = path.join(__dirname, './View')



app.use(express.static("./view/"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs')
app.set('views', viewPath)


hbs.registerPartials(partialsPath)

app.get('/info3', (req, res) => {
    res.render('baseinfo3')
})
app.get('/needy1', (req, res) => {
    res.render('needy1')
})
app.get('/needy2', (req, res) => {
    res.render('needy2')
})
app.get('*', (req, res) => {
    res.render('404')
})


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

//app.use('/api', router)
app.use('/tblCommonBaseType',  require('./Routes/tblCommonBaseTypeRoutes'))
app.use('/tblCommonBaseData',  require('./Routes/tblCommonBaseDataRoutes'))
app.use('/tblCharityAccounts', require('./Routes/tblCharityAccountsRoutes'))


app.use('/Personal',           require('./Routes/Personal'))
app.use('/NeedyAccounts',      require('./Routes/NeedyAccounts'))
const Payment=require('./Routes/PaymentRouter')
app.use('/Payment',Payment)


const FirstPlan=require('./Routes/FirstPlanRouter')
app.use('/FirstPlan',FirstPlan)

const SecondPlan=require('./Routes/SecondPlan')
app.use('/SecondPlan',SecondPlan)

const Settelment=require('./Routes/Settelment')
app.use('/Settelment',Settelment)

const Succor=require('./Routes/Succor')
app.use('/Succor',Succor)

var port = process.env.port || 8090
app.listen(port,()=>{
    console.log('running at '+ port);
})




