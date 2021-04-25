"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlanModel = require("../Models/FirstPlanModel");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require('request');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.loadPlan = function _callee(request, response) {
  var pool, findRequest;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          findRequest = _objectSpread({}, request.body);
          _context.next = 7;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(findRequest).then(function (result) {
            if (result[0] == null) {
              response.json({
                error: "هیچ رکوردی موجود نیست"
              });
            } else {
              response.json(result);
            }
          }));

        case 7:
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports.createPlan = function _callee2(request, response) {
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

module.exports.UpdatePlan = function _callee3(request, response) {
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

module.exports.deletePlan = function _callee4(request, response) {
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