"use strict";

var path = require('path');

var mysql = require("mysql");

var express = require("express");

var fs = require('fs');

var hbs = require('hbs');

var app = express();
var router = app;
var port = 3000;

var bodyParser = require("body-parser"); ////
// Add the credentials to access your database


var viewsPath = path.join(__dirname, './view');
var partialsPath = path.join(__dirname, './view'); // Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.json());

var db = require('../my-database/config');

app.use(bodyParser.json());
app.use(express["static"]("./view/"));
app.use(express.urlencoded({
  extended: true
}));

require('./initDB')();

var commonbasedataRouter = require('./router/commonbasedataRouter');

app.use('/commonbasedata', commonbasedataRouter);

var commonbasetypeRouter = require('./router/commonbasetypeRouter');

app.use('/commonbasetype', commonbasetypeRouter);
app.get('/*', function (req, res) {
  res.render('404');
});
app.listen(port, function () {
  console.log("connect");
});