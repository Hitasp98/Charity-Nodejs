"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PaymentModel = require("../Models/PaymentModel");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require('request');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.Payment = function _callee(request, response) {
  var findRequest, C, A;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(PaymentModel.ws_loadCashAssistanceDetail(findRequest.CashAssistanceDetailId));

        case 4:
          C = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(PaymentModel.ws_loadPayment(findRequest.CashAssistanceDetailId, findRequest.PaymentStatus, findRequest.CharityAccountId = null));

        case 7:
          A = _context.sent;
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports.loadPayment = function _callee2(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(PaymentModel.ws_loadPayment(findRequest).then(function (result) {
            if (result[0] == null) {
              response.json({
                error: "هیچ رکوردی موجود نیست"
              });
            } else {
              response.json(result);
            }
          }));

        case 4:
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: " رکوردی یافت نشد"
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports.loadCashAssistanceDetail = function _callee3(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context3.next = 4;
          return regeneratorRuntime.awrap(PaymentModel.ws_loadCashAssistanceDetail(findRequest).then(function (result) {
            if (result[0] == null) {
              response.json({
                error: "هیچ رکوردی موجود نیست"
              });
            } else {
              response.json(result);
            }
          }));

        case 4:
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};