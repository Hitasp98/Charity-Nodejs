"use strict";

var path = require('path');

var hbs = require('hbs');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
var viewPath = path.join(__dirname, './View');
var partialsPath = path.join(__dirname, './View');
app.use(express["static"]("./view/"));
app.use(express.urlencoded({
  extended: true
}));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.get('/info3', function (req, res) {
  res.render('baseinfo3');
});
app.get('/needy1', function (req, res) {
  res.render('needy1');
});
app.get('/needy2', function (req, res) {
  res.render('needy2');
});
app.get('*', function (req, res) {
  res.render('404');
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); //app.use('/api', router)

app.use('/tblCommonBaseType', require('./Routes/tblCommonBaseTypeRoutes'));
app.use('/tblCommonBaseData', require('./Routes/tblCommonBaseDataRoutes'));
app.use('/tblCharityAccounts', require('./Routes/tblCharityAccountsRoutes'));
app.use('/Personal', require('./Routes/Personal'));
app.use('/NeedyAccounts', require('./Routes/NeedyAccounts'));

var Payment = require('./Routes/PaymentRouter');

app.use('/Payment', Payment);

var FirstPlan = require('./Routes/FirstPlanRouter');

app.use('/FirstPlan', FirstPlan);

var SecondPlan = require('./Routes/SecondPlan');

app.use('/SecondPlan', SecondPlan);

var Settelment = require('./Routes/Settelment');

app.use('/Settelment', Settelment);

var Succor = require('./Routes/Succor');

app.use('/Succor', Succor);
var port = process.env.port || 8090;
app.listen(port, function () {
  console.log('running at ' + port);
});