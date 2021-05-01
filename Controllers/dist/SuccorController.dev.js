"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  var _findRequest;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(_findRequest).then(function (result) {
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
  var _findRequest2, findindex, findId;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _findRequest2 = _toConsumableArray(request.body);

          if (!(_findRequest2.AssignNeedyPlanId !== null && _findRequest2.PlanId !== null && _findRequest2.NeededPrice !== null && _findRequest2.MinPrice !== null && _findRequest2.Description !== null || _findRequest2.AssignNeedyPlanId !== undefined && _findRequest2.PlanId !== undefined && _findRequest2.NeededPrice !== undefined && _findRequest2.MinPrice !== undefined && _findRequest2.Description !== undefined)) {
            _context2.next = 20;
            break;
          }

          if (_findRequest2.MinPrice = null) {
            _findRequest2.MinPrice = 0;
          }

          if (!(_findRequest2.MinPrice <= _findRequest2.NeededPrice)) {
            _context2.next = 17;
            break;
          }

          //ترکيب شناسه طرح و نيازمند طرح کليد يکتا را مي سازد
          findindex = {
            AssignNeedyPlanId: _findRequest2.AssignNeedyPlanId,
            //?داخل سند فقط گفته شد شناسه طرح و نیاز مند طرح
            PlanId: _findRequest2.PlanId
          };
          _context2.next = 8;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findindex));

        case 8:
          findId = _context2.sent;

          if (!(findId == null)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(Succor.ws_createCashAssistanceDetail(_findRequest2).then(function (result) {
            if (result != null) {
              response.json(result);
            } else {
              response.json({
                error: "درج نشد "
              });
            }
          }));

        case 12:
          _context2.next = 15;
          break;

        case 14:
          response.json({
            error: "رکورد تکراری"
          });

        case 15:
          _context2.next = 18;
          break;

        case 17:
          response.json({
            error: "حداقل مبلغ بايد از مبلغ مورد نياز کوچکتر يا مساوي باشد."
          });

        case 18:
          _context2.next = 21;
          break;

        case 20:
          response.json({
            error: "ورودی هارو چک کنید"
          });

        case 21:
          _context2.next = 26;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 23]]);
}; //تست نشده


module.exports.updateCashAssistanceDetail = function _callee4(request, response) {
  var findindex, findId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!(findRequest.AssignNeedyPlanId !== null && findRequest.PlanId !== null && findRequest.NeededPrice !== null && findRequest.MinPrice !== null && findRequest.Description !== null || findRequest.AssignNeedyPlanId !== undefined && findRequest.PlanId !== undefined && findRequest.NeededPrice !== undefined && findRequest.MinPrice !== undefined && findRequest.Description !== undefined)) {
            _context4.next = 11;
            break;
          }

          if (findRequest.MinPrice = null) {
            findRequest.MinPrice = 0;
          }

          if (!(findRequest.MinPrice <= findRequest.NeededPrice)) {
            _context4.next = 9;
            break;
          }

          findindex = {
            AssignNeedyPlanId: findRequest.AssignNeedyPlanId,
            //?داخل سند فقط گفته شد شناسه طرح و نیاز مند طرح
            PlanId: findRequest.PlanId
          };
          _context4.next = 7;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findindex));

        case 7:
          findId = _context4.sent;

          if (findId != null) {
            // tblPayment اگر به ازاء شناسه جزئيات رکوردي در جدول  وجود داشته باشد
            //باشد امکان تغييرات روي دو مبلغ وجود ندارد
            requestApi.post({
              url: "Api tblPayment ",
              form: {
                CashAssistanceDetailId: findRequest.CashAssistanceDetailId
              }
            }, function _callee3(err, res, body) {
              var findCashAssistanceDetailId;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body).CashAssistanceDetailId);

                    case 2:
                      _context3.t0 = _context3.sent;

                      if (!(_context3.t0 != null)) {
                        _context3.next = 15;
                        break;
                      }

                      _context3.next = 6;
                      return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(findRequest.CashAssistanceDetailId));

                    case 6:
                      findCashAssistanceDetailId = _context3.sent;

                      if (!(findCashAssistanceDetailId != null)) {
                        _context3.next = 12;
                        break;
                      }

                      _context3.next = 10;
                      return regeneratorRuntime.awrap(Succor.ws_updateCashAssistanceDetail(findRequest).then(function (result) {
                        if (result != null) {
                          response.json(result);
                        } else {
                          response.json({
                            error: "ویرایش نشد "
                          });
                        }
                      }));

                    case 10:
                      _context3.next = 13;
                      break;

                    case 12:
                      response.json({
                        error: "رکورد وجود ندارد"
                      });

                    case 13:
                      _context3.next = 16;
                      break;

                    case 15:
                      response.json({
                        error: "باشد امکان تغييرات روي دو مبلغ وجود ندارد"
                      });

                    case 16:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
          } else {
            response.json({
              error: "رکورد وجود ندارد"
            });
          }

        case 9:
          _context4.next = 12;
          break;

        case 11:
          response.json({
            error: "ورودی هارو چک کنید"
          });

        case 12:
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; //تست نشده


module.exports.deleteCashAssistanceDetail = function _callee6(request, response) {
  var _findRequest3, findCashAssistanceDetailId;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _findRequest3 = _toConsumableArray(request.body);

          if (!(_findRequest3.CashAssistanceDetailId !== null || _findRequest3.CashAssistanceDetailId !== undefined)) {
            _context6.next = 9;
            break;
          }

          _context6.next = 5;
          return regeneratorRuntime.awrap(Succor.ws_loadCashAssistanceDetail(_findRequest3.CashAssistanceDetailId));

        case 5:
          findCashAssistanceDetailId = _context6.sent;

          if (findCashAssistanceDetailId != null) {
            //tblPayment ,CashAssistanceDetailIdبراساس شناسه جزئيات  جدول  داراي رکورد باشد
            requestApi.post({
              url: "Api tblPayment ",
              form: {
                CashAssistanceDetailId: _findRequest3.CashAssistanceDetailId
              }
            }, function _callee5(err, res, body) {
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body).CashAssistanceDetailId);

                    case 2:
                      _context5.t0 = _context5.sent;

                      if (!(_context5.t0 == null)) {
                        _context5.next = 8;
                        break;
                      }

                      _context5.next = 6;
                      return regeneratorRuntime.awrap(Succor.ws_deleteCashAssistanceDetail(_findRequest3).then(function (result) {
                        if (result != null) {
                          response.json(result);
                        } else {
                          response.json({
                            error: "رکورد حذف نشد "
                          });
                        }
                      }));

                    case 6:
                      _context5.next = 9;
                      break;

                    case 8:
                      response.json({
                        error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                      });

                    case 9:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
          } else {
            response.json({
              error: " رکورد وجود ندارد "
            });
          }

          _context6.next = 10;
          break;

        case 9:
          response.json({
            error: "ورودی را چک کنید "
          });

        case 10:
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
};