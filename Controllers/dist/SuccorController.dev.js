"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Succor = require("../Models/SuccorModel");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require("request");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); //تست نشده
//join این متد مانند متد های معملولی قبلی گیت معمولی به علاوه

module.exports.loadCashAssistanceDetail = function _callee(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findRequest).then(function (result) {
            console.log(result);

            if (result == null) {
              response.json({
                error: "هیچ رکوردی موجود نیست"
              });
            } else {
              response.json(result);
            }
          }));

        case 4:
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //تست نشده


module.exports.createCashAssistanceDetail = function _callee2(request, response) {
  var findRequest, findindex, findId;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          findRequest = _objectSpread({}, request.body);

          if (!(findRequest.PlanId !== null && findRequest.NeededPrice !== null || findRequest.PlanId !== undefined && findRequest.NeededPrice !== undefined)) {
            _context2.next = 22;
            break;
          }

          findRequest.MinPrice = parseInt(findRequest.MinPrice);
          findRequest.NeededPrice = parseInt(findRequest.NeededPrice);

          if (findRequest.MinPrice == null) {
            findRequest.MinPrice = 0;
          }

          if (!(findRequest.MinPrice <= findRequest.NeededPrice)) {
            _context2.next = 19;
            break;
          }

          //ترکيب شناسه طرح و نيازمند طرح کليد يکتا را مي سازد
          findindex = {
            AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
            //?داخل سند فقط گفته شد شناسه طرح و نیاز مند طرح
            PlanId: findRequest.PlanId
          };
          _context2.next = 10;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findindex));

        case 10:
          findId = _context2.sent;

          if (!(findId == null)) {
            _context2.next = 16;
            break;
          }

          _context2.next = 14;
          return regeneratorRuntime.awrap(Succor.ws_createCashAssistanceDetail(findRequest).then(function (result) {
            if (result != null) {
              response.json(result);
            } else {
              response.json({
                error: "درج نشد "
              });
            }
          }));

        case 14:
          _context2.next = 17;
          break;

        case 16:
          response.json({
            error: "رکورد تکراری"
          });

        case 17:
          _context2.next = 20;
          break;

        case 19:
          response.json({
            error: "حداقل مبلغ بايد از مبلغ مورد نياز کوچکتر يا مساوي باشد."
          });

        case 20:
          _context2.next = 23;
          break;

        case 22:
          response.json({
            error: "ورودی هارو چک کنید"
          });

        case 23:
          _context2.next = 28;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 25]]);
}; //تست نشده


module.exports.updateCashAssistanceDetail = function _callee3(request, response) {
  var findRequest, findindex, findId, findCashAssistanceDetailId;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          findRequest = _objectSpread({}, request.body);
          console.log(findRequest.PlanId);

          if (!(findRequest.PlanId !== null && findRequest.NeededPrice !== null || findRequest.PlanId !== undefined && findRequest.NeededPrice !== undefined)) {
            _context3.next = 27;
            break;
          }

          if (findRequest.MinPrice == null) {
            findRequest.MinPrice = 0;
          }

          if (!(findRequest.MinPrice <= findRequest.NeededPrice)) {
            _context3.next = 25;
            break;
          }

          findindex = {
            AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
            //?داخل سند فقط گفته شد شناسه طرح و نیاز مند طرح
            PlanId: findRequest.PlanId
          };
          console.log(findindex.PlanId);
          _context3.next = 10;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findindex));

        case 10:
          findId = _context3.sent;
          console.log(findId);

          if (!(findId != null)) {
            _context3.next = 24;
            break;
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findRequest.CashAssistanceDetailId));

        case 15:
          findCashAssistanceDetailId = _context3.sent;

          if (!(findCashAssistanceDetailId != null)) {
            _context3.next = 21;
            break;
          }

          _context3.next = 19;
          return regeneratorRuntime.awrap(Succor.ws_updateCashAssistanceDetail(findRequest).then(function (result) {
            if (result != null) {
              response.json(result);
            } else {
              response.json({
                error: "ویرایش نشد "
              });
            }
          }));

        case 19:
          _context3.next = 22;
          break;

        case 21:
          response.json({
            error: "رکورد وجود ندارد"
          });

        case 22:
          _context3.next = 25;
          break;

        case 24:
          response.json({
            error: "رکورد وجود ندارد"
          });

        case 25:
          _context3.next = 28;
          break;

        case 27:
          response.json({
            error: "ورودی هارو چک کنید"
          });

        case 28:
          _context3.next = 33;
          break;

        case 30:
          _context3.prev = 30;
          _context3.t0 = _context3["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 30]]);
}; //تست نشده


module.exports.deleteCashAssistanceDetail = function _callee5(request, response) {
  var findRequest, findCashAssistanceDetailId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          findRequest = _objectSpread({}, request.body);

          if (!(findRequest.CashAssistanceDetailId !== null || findRequest.CashAssistanceDetailId !== undefined)) {
            _context5.next = 9;
            break;
          }

          _context5.next = 5;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findRequest.CashAssistanceDetailId));

        case 5:
          findCashAssistanceDetailId = _context5.sent;

          if (findCashAssistanceDetailId != null) {
            //tblPayment ,CashAssistanceDetailIdبراساس شناسه جزئيات  جدول  داراي رکورد باشد
            requestApi.post({
              url: "Api tblPayment ",
              form: {
                CashAssistanceDetailId: findRequest.CashAssistanceDetailId
              }
            }, function _callee4(err, res, body) {
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body).CashAssistanceDetailId);

                    case 2:
                      _context4.t0 = _context4.sent;

                      if (!(_context4.t0 == null)) {
                        _context4.next = 8;
                        break;
                      }

                      _context4.next = 6;
                      return regeneratorRuntime.awrap(Succor.ws_deleteCashAssistanceDetail(findRequest).then(function (result) {
                        if (result != null) {
                          response.json(result);
                        } else {
                          response.json({
                            error: "رکورد حذف نشد "
                          });
                        }
                      }));

                    case 6:
                      _context4.next = 9;
                      break;

                    case 8:
                      response.json({
                        error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                      });

                    case 9:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });
          } else {
            response.json({
              error: " رکورد وجود ندارد "
            });
          }

          _context5.next = 10;
          break;

        case 9:
          response.json({
            error: "ورودی را چک کنید "
          });

        case 10:
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};