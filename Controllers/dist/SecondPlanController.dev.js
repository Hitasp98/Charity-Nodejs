"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlanModel = require("../Models/SecondPlanModel");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require("request");

var _require = require("express"),
    json = _require.json;

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); //تست نشده

module.exports.loadNeedyForPlan = function _callee(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(PlanModel.ws_loadNeedyForPlan(findRequest).then(function (result) {
            if (result[0] == null) {
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


module.exports.AssignNeedyToPlan = function _callee3(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            findRequest = _objectSpread({}, request.body);
            console.log(findRequest.PlanId);

            if (findRequest.PlanId !== null && findRequest.Fdate !== null && findRequest.Tdate !== null && findRequest.NeedyId !== null || findRequest.PlanId !== undefined && findRequest.Fdate !== undefined && findRequest.Tdate !== undefined && findRequest.NeedyId !== undefined) {
              console.log(findRequest.PlanId);
              console.log(findRequest.Fdate);
              console.log(findRequest.Tdate);
              console.log(findRequest.NeedyId);

              if (findRequest.Fdate < findRequest.Tdate) {
                // تاريخ هاروئ بگيريم  tblPlans در اينجا بايد از جدول
                requestApi.post({
                  url: "http://localhost:8090/FirstPlan/loadPlan",
                  from: {
                    PlanId: findRequest.PlanI,
                    Fdate: findRequest.Fdate,
                    Tdate: findRequest.Tdate
                  }
                }, function _callee2(err, res, body) {
                  var fPlan, fNeedyId, findNeedyId;
                  return regeneratorRuntime.async(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return regeneratorRuntime.awrap(JSON.parse(body));

                        case 2:
                          fPlan = _context2.sent;
                          console.log(fPlan[0]); //در اینجا باید ابتدا چک کنیم در رنج تاریخ است
                          //!مشکل اینجا این است تاریخ ها بصورت رشته ای است نه عددی برای مقایسه حتما باید چک کنیم عدد هستش
                          //!میتونی شرط عدد بودن بگذاریم

                          if (!(fPlan[0].Fdate > findRequest.Fdate || findRequest.Tdate < fPlan[0].Tdate)) {
                            _context2.next = 17;
                            break;
                          }

                          //چک برای اینه تکراری نباشه
                          //شناسه هارو اینجا فقط میفرستیم طبق سند گفته شده شناسه ها  ترکیب یکتا باشند
                          fNeedyId = {
                            NeedyId: findRequest.NeedyId,
                            PlanId: findRequest.PlanId
                          };
                          _context2.next = 8;
                          return regeneratorRuntime.awrap(PlanModel.ws_loadNeedyForPlan(fNeedyId));

                        case 8:
                          findNeedyId = _context2.sent;

                          if (!(findNeedyId == null)) {
                            _context2.next = 14;
                            break;
                          }

                          _context2.next = 12;
                          return regeneratorRuntime.awrap(PlanModel.ws_AssignNeedyToPlan(findRequest).then(function (result) {
                            if (result != null) {
                              response.json(result);
                            } else {
                              response.json({
                                error: "درج نشد   "
                              });
                            }
                          }));

                        case 12:
                          _context2.next = 15;
                          break;

                        case 14:
                          response.json({
                            error: " درج تکراری  "
                          });

                        case 15:
                          _context2.next = 18;
                          break;

                        case 17:
                          response.json({
                            error: "تاریخ شروع و پایان را چک کنید "
                          });

                        case 18:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  });
                });
              } else {
                response.json({
                  error: "تاریخ شروع و پایان را چک کنید "
                });
              }
            } else {
              response.json({
                error: " ورودی ها رو چک کنید "
              });
            }
          } catch (error) {
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
}; //تست نشده


module.exports.deleteNeedyFromPlan = function _callee6(request, response) {
  var findRequest, findAssignNeedyPlanId;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          findRequest = _toConsumableArray(request.body);

          if (!(findRequest.AssignNeedyPlanId !== null && findRequest.PlanId !== null || findRequest.AssignNeedyPlanId !== undefined && findRequest.PlanId !== undefined)) {
            _context6.next = 7;
            break;
          }

          _context6.next = 5;
          return regeneratorRuntime.awrap(PlanModel.ws_loadNeedyForPlan(findRequest.AssignNeedyPlanId));

        case 5:
          findAssignNeedyPlanId = _context6.sent;
          //api اینجا اررو هست دلیل نداشتن
          requestApi.post({
            url: "http://localhost:8090/tblCashAssistanceDetail/tblCashAssistanceDetail",
            from: {
              // در این قسمت در  داخل سند نوشته شد بود
              AssignNeedyPlanId: findRequest.AssignNeedyPlanId
            }
          }, function _callee5(err, res, body) {
            var fPlan;
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(JSON.parse(body));

                  case 2:
                    fPlan = _context5.sent;
                    console.log(fPlan[0]);

                    if (fPlan[0] == null) {
                      requestApi.post({
                        url: "http://localhost:8090/tblNonCashAssistanceDetail /tblNonCashAssistanceDetail ",
                        from: {
                          // در این قسمت در  داخل سند نوشته شد بود
                          AssignNeedyPlanId: findRequest.AssignNeedyPlanId
                        }
                      }, function _callee4(err, res, body) {
                        var fPlan2, findPlanId;
                        return regeneratorRuntime.async(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return regeneratorRuntime.awrap(JSON.parse(body));

                              case 2:
                                fPlan2 = _context4.sent;
                                console.log(fPlan2[0]);

                                if (!(fPlan2[0] == null)) {
                                  _context4.next = 16;
                                  break;
                                }

                                _context4.next = 7;
                                return regeneratorRuntime.awrap(PlanModel.ws_loadNeedyForPlan(findRequest.PlanId));

                              case 7:
                                findPlanId = _context4.sent;

                                if (!(findPlanId != null)) {
                                  _context4.next = 13;
                                  break;
                                }

                                _context4.next = 11;
                                return regeneratorRuntime.awrap(PlanModel.ws_deleteNeedyFromPlan(findRequest.PlanId).then(function (result) {
                                  if (result != null) {
                                    response.json("حذف شد");
                                  } else {
                                    response.json({
                                      error: "حذف نشد"
                                    });
                                  }
                                }));

                              case 11:
                                _context4.next = 14;
                                break;

                              case 13:
                                response.json({
                                  error: "رکورد یافت نشد "
                                });

                              case 14:
                                _context4.next = 17;
                                break;

                              case 16:
                                response.json({
                                  error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                                });

                              case 17:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        });
                      });
                    } else {
                      response.json({
                        error: "علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                      });
                    }

                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });

        case 7:
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};