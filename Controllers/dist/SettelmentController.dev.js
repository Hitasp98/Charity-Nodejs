"use strict";

var PlanSettelmentModelModel = require("../Models/SettelmentModel");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require('request');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.loadPayment = function _callee(request, response) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {} catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.loadCashAssistanceDetail = function _callee2(request, response) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {} catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.Settelment = function _callee3(request, response) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {} catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.UpdatePayment = function _callee4(request, response) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {} catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.deletePayment = function _callee5(request, response) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          try {} catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};