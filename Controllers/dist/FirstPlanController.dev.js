"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlanModel = require("../Models/FirstPlanModel");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.loadPlan = function _callee(request, response) {
  var pool, _findRequest;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          _findRequest = _objectSpread({}, request.body);
          _context.next = 7;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(_findRequest).then(function (result) {
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
  var findIndex, loadPlan;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!(findRequest.Fdate < findRequest.Tdate)) {
            _context2.next = 11;
            break;
          }

          findIndex = {
            PName: findRequest.PlanName,
            PlanNature: findRequest.PlanNature,
            ParentPlanId: findRequest.ParentPlanId
          };
          _context2.next = 5;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(findIndex));

        case 5:
          loadPlan = _context2.sent;

          if (!(loadPlan == null)) {
            _context2.next = 9;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(PlanModel.ws_createPlan(findRequest).then(function (result) {
            if (result == null) {//not insert
            } else {
              response.json(result.PlanId);
            }
          }));

        case 9:
          _context2.next = 12;
          break;

        case 11:
          response.json({
            error: "تاریخ شروع و پایان را چک کنید "
          });

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports.UpdatePlan = function _callee5(request, response) {
  var findIndex, loadPlan;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;

          if (!(findRequest.Fdate < findRequest.Tdate)) {
            _context5.next = 7;
            break;
          }

          findIndex = {
            PName: findRequest.PlanName,
            PlanNature: findRequest.PlanNature,
            ParentPlanId: findRequest.ParentPlanId
          };
          _context5.next = 5;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(findIndex));

        case 5:
          loadPlan = _context5.sent;

          if (loadPlan == null) {
            //!error here
            requestApi.post({
              url: "http://localhost:8090/tblCommonBaseData/tblNonCashAssistanceDetail ",
              form: {
                findRequest: findRequest.PlanId
              }
            }, function _callee4(err, res, body) {
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body).PlanId);

                    case 2:
                      _context4.t0 = _context4.sent;
                      _context4.t1 = findRequest.PlanId;

                      if (!(_context4.t0 == _context4.t1)) {
                        _context4.next = 6;
                        break;
                      }

                      if (findRequest.PlanNature === null) {
                        //!error here
                        requestApi.post({
                          url: "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans   ",
                          form: {
                            findRequest: findRequest.planId
                          }
                        }, function _callee3(err, res, body) {
                          return regeneratorRuntime.async(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  if (findRequest.Fdate === null || findRequest.Tdate === null) {} else {
                                    response.json({
                                      error: "تاریخ شروع و پایان قابل تغییر نیست "
                                    });
                                  }

                                case 1:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          });
                        });
                      } else {
                        response.json({
                          error: "ماهیت را نمیتوان تغییر داد"
                        });
                      }

                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });
          }

        case 7:
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports.deletePlan = function _callee6(request, response) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          try {} catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};