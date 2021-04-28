"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  var _findRequest;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(_findRequest).then(function (result) {
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
};

module.exports.createPlan = function _callee2(request, response) {
  var _findRequest2, findIndex, loadPlan, f, loadPlan2;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _findRequest2 = _objectSpread({}, request.body);
          console.log(_findRequest2.icon);

          if (!(_findRequest2.PlanName !== null && _findRequest2.Description !== null && _findRequest2.PlanNature !== null && _findRequest2.ParentPlanId !== null && _findRequest2.icon !== null && _findRequest2.Fdate !== null && _findRequest2.Tdate !== null && _findRequest2.neededLogin !== null)) {
            _context2.next = 31;
            break;
          }

          if (!(_findRequest2.Fdate < _findRequest2.Tdate)) {
            _context2.next = 28;
            break;
          }

          findIndex = {
            PlanName: _findRequest2.PlanName,
            PlanNature: _findRequest2.PlanNature,
            ParentPlanId: _findRequest2.ParentPlanId
          };
          console.log(findIndex);
          _context2.next = 9;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(findIndex));

        case 9:
          loadPlan = _context2.sent;
          console.log(_typeof(loadPlan));

          if (!(loadPlan == null)) {
            _context2.next = 25;
            break;
          }

          f = {
            PlanName: _findRequest2.PlanName
          };
          _context2.next = 15;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(f));

        case 15:
          loadPlan2 = _context2.sent;

          if (!(loadPlan2 == null)) {
            _context2.next = 22;
            break;
          }

          console.log("test");
          _context2.next = 20;
          return regeneratorRuntime.awrap(PlanModel.ws_createPlan(_findRequest2).then(function (result) {
            if (result != null) {
              response.json(result.PlanId);
            } else {
              response.json({
                error: " رکورد درج نشد "
              });
            }
          }));

        case 20:
          _context2.next = 23;
          break;

        case 22:
          response.json({
            error: "رکورد نکراری  "
          });

        case 23:
          _context2.next = 26;
          break;

        case 25:
          response.json({
            error: "رکورد نکراری  "
          });

        case 26:
          _context2.next = 29;
          break;

        case 28:
          response.json({
            error: "تاریخ شروع و پایان را چک کنید "
          });

        case 29:
          _context2.next = 32;
          break;

        case 31:
          response.json({
            error: " ورودی ها رو چک کنید "
          });

        case 32:
          _context2.next = 37;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "1کد نوع را وارد کنید"
          });

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 34]]);
};

module.exports.UpdatePlan = function _callee6(request, response) {
  var findIndex, loadPlan;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;

          if (!(findRequest.PlanName !== null && findRequest.Description !== null && findRequest.PlanNature !== null && findRequest.ParentPlanId !== null && findRequest.icon !== null && findRequest.Fdate !== null && findRequest.Tdate !== null && findRequest.neededLogin !== null)) {
            _context6.next = 9;
            break;
          }

          findIndex = {
            PName: findRequest.PlanName,
            PlanId: findRequest.PlanId,
            ParentPlanId: findRequest.ParentPlanId
          };
          _context6.next = 5;
          return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(findIndex));

        case 5:
          loadPlan = _context6.sent;

          if (loadPlan == null) {
            //!error here
            requestApi.post({
              url: "http://localhost:8090/tblCommonBaseData/tblNonCashAssistanceDetail ",
              form: {
                findRequest: findRequest.PlanId
              }
            }, function _callee5(err, res, body) {
              var Nature, resultPlanNature;
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body).PlanId);

                    case 2:
                      _context5.t0 = _context5.sent;
                      _context5.t1 = findRequest.PlanId;

                      if (!(_context5.t0 == _context5.t1)) {
                        _context5.next = 12;
                        break;
                      }

                      Nature = {
                        PlandId: findRequest.PlanId,
                        PlanNature: findRequest.PlanNature
                      }; //check PlanNature is here database
                      //ارسال ماهیت و شناسه برای تشخیص 

                      _context5.next = 8;
                      return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(Nature));

                    case 8:
                      resultPlanNature = _context5.sent;

                      //اگر چيزي برگردوند يعني ماهيت طرح را نميخواهد تغيير دهد
                      if (resultPlanNature != null) {
                        //!error here
                        requestApi.post({
                          url: "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans   ",
                          form: {
                            PlanId: findRequest.PlanId
                          }
                        }, function _callee3(err, res, body) {
                          var date, resultDate;
                          return regeneratorRuntime.async(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return regeneratorRuntime.awrap(JSON.parse(body).PlanId);

                                case 2:
                                  _context3.t0 = _context3.sent;
                                  _context3.t1 = findRequest.PlanId;

                                  if (!(_context3.t0 == _context3.t1)) {
                                    _context3.next = 21;
                                    break;
                                  }

                                  date = {
                                    PlanId: findRequest.PlanId,
                                    fdate: findRequest.Fdate,
                                    tdate: findRequest.Tdate
                                  }; //check in Fdate and Tdate base

                                  _context3.next = 8;
                                  return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(date));

                                case 8:
                                  resultDate = _context3.sent;

                                  if (!(resultDate != null)) {
                                    _context3.next = 18;
                                    break;
                                  }

                                  if (!(findRequest.Fdate < findRequest.Tdate)) {
                                    _context3.next = 15;
                                    break;
                                  }

                                  _context3.next = 13;
                                  return regeneratorRuntime.awrap(PlanModel.ws_UpdatePlan(findRequest).then(function (result) {
                                    if (result != null) {
                                      response.json(result);
                                    } else {
                                      response.json({
                                        error: " قابل تغییر نیست "
                                      });
                                    }
                                  }));

                                case 13:
                                  _context3.next = 16;
                                  break;

                                case 15:
                                  response.json({
                                    error: "تاریخ شروع و پایان  را چك كنيد "
                                  });

                                case 16:
                                  _context3.next = 19;
                                  break;

                                case 18:
                                  response.json({
                                    error: "تاریخ شروع و پایان قابل تغییر نیست "
                                  });

                                case 19:
                                  _context3.next = 27;
                                  break;

                                case 21:
                                  if (!(findRequest.Fdate < findRequest.Tdate)) {
                                    _context3.next = 26;
                                    break;
                                  }

                                  _context3.next = 24;
                                  return regeneratorRuntime.awrap(PlanModel.ws_UpdatePlan(findRequest).then(function (result) {
                                    if (result != null) {
                                      response.json(result);
                                    } else {
                                      response.json({
                                        error: " قابل تغییر نیست "
                                      });
                                    }
                                  }));

                                case 24:
                                  _context3.next = 27;
                                  break;

                                case 26:
                                  response.json({
                                    error: "تاریخ شروع و پایان  را چك كنيد "
                                  });

                                case 27:
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

                      _context5.next = 13;
                      break;

                    case 12:
                      //امكان تغيير ماهيت وجود دارد
                      requestApi.post({
                        url: "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans   ",
                        form: {
                          findRequest: findRequest.planId
                        }
                      }, function _callee4(err, res, body) {
                        var date, resultDate;
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
                                  _context4.next = 21;
                                  break;
                                }

                                date = {
                                  PlanId: findRequest.PlanId,
                                  fdate: findRequest.Fdate,
                                  tdate: findRequest.Tdate
                                }; //check in Fdate and Tdate base

                                _context4.next = 8;
                                return regeneratorRuntime.awrap(PlanModel.ws_loadPlan(date));

                              case 8:
                                resultDate = _context4.sent;

                                if (!(resultDate != null)) {
                                  _context4.next = 18;
                                  break;
                                }

                                if (!(findRequest.Fdate < findRequest.Tdate)) {
                                  _context4.next = 15;
                                  break;
                                }

                                _context4.next = 13;
                                return regeneratorRuntime.awrap(PlanModel.ws_UpdatePlan(findRequest).then(function (result) {
                                  if (result != null) {
                                    response.json(result);
                                  } else {
                                    response.json({
                                      error: " قابل تغییر نیست "
                                    });
                                  }
                                }));

                              case 13:
                                _context4.next = 16;
                                break;

                              case 15:
                                response.json({
                                  error: "تاریخ شروع و پایان  را چك كنيد "
                                });

                              case 16:
                                _context4.next = 19;
                                break;

                              case 18:
                                response.json({
                                  error: "تاریخ شروع و پایان قابل تغییر نیست "
                                });

                              case 19:
                                _context4.next = 27;
                                break;

                              case 21:
                                if (!(findRequest.Fdate < findRequest.Tdate)) {
                                  _context4.next = 26;
                                  break;
                                }

                                _context4.next = 24;
                                return regeneratorRuntime.awrap(PlanModel.ws_UpdatePlan(findRequest).then(function (result) {
                                  if (result != null) {
                                    response.json(result);
                                  } else {
                                    response.json({
                                      error: " قابل تغییر نیست "
                                    });
                                  }
                                }));

                              case 24:
                                _context4.next = 27;
                                break;

                              case 26:
                                response.json({
                                  error: "تاریخ شروع و پایان  را چك كنيد "
                                });

                              case 27:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        });
                      });

                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
          }

          _context6.next = 10;
          break;

        case 9:
          response.json({
            error: " ورودی ها رو چک کنید "
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

module.exports.deletePlan = function _callee10(request, response) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          try {
            requestApi.post({
              url: "http://localhost:8090/tblCommonBaseData/tblAssignNeedyToPlans",
              form: {
                findRequest: findRequest.planId
              }
            }, function _callee9(err, res, body) {
              return regeneratorRuntime.async(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body).PlanId);

                    case 2:
                      _context9.t0 = _context9.sent;
                      _context9.t1 = findRequest.PlanId;

                      if (!(_context9.t0 != _context9.t1)) {
                        _context9.next = 8;
                        break;
                      }

                      requestApi.post({
                        url: "http://localhost:8090/tblCommonBaseData/tblCashAssistanceDetail",
                        form: {
                          findRequest: findRequest.planId
                        }
                      }, function _callee8(err, res, body) {
                        return regeneratorRuntime.async(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                _context8.next = 2;
                                return regeneratorRuntime.awrap(JSON.parse(body).PlanId);

                              case 2:
                                _context8.t0 = _context8.sent;
                                _context8.t1 = findRequest.PlanId;

                                if (!(_context8.t0 != _context8.t1)) {
                                  _context8.next = 8;
                                  break;
                                }

                                requestApi.post({
                                  url: "http://localhost:8090/tblCommonBaseData/tblNonCashAssistanceDetail ",
                                  form: {
                                    findRequest: findRequest.planId
                                  }
                                }, function _callee7(err, res, body) {
                                  return regeneratorRuntime.async(function _callee7$(_context7) {
                                    while (1) {
                                      switch (_context7.prev = _context7.next) {
                                        case 0:
                                          _context7.next = 2;
                                          return regeneratorRuntime.awrap(JSON.parse(body).PlanId);

                                        case 2:
                                          _context7.t0 = _context7.sent;
                                          _context7.t1 = findRequest.PlanId;

                                          if (!(_context7.t0 != _context7.t1)) {
                                            _context7.next = 9;
                                            break;
                                          }

                                          _context7.next = 7;
                                          return regeneratorRuntime.awrap(PlanModel.ws_deletePlan(findRequest.PlanId).then(function (result) {
                                            if (result != null) {
                                              response.json(result);
                                            } else {
                                              response.json({
                                                error: "ركورد موجود نيست "
                                              });
                                            }
                                          }));

                                        case 7:
                                          _context7.next = 10;
                                          break;

                                        case 9:
                                          response.json({
                                            error: "به علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                                          });

                                        case 10:
                                        case "end":
                                          return _context7.stop();
                                      }
                                    }
                                  });
                                });
                                _context8.next = 9;
                                break;

                              case 8:
                                response.json({
                                  error: "به علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                                });

                              case 9:
                              case "end":
                                return _context8.stop();
                            }
                          }
                        });
                      });
                      _context9.next = 9;
                      break;

                    case 8:
                      response.json({
                        error: "به علت عدم وابستگي اطلاعات عمل حذف انجام نمي شود"
                      });

                    case 9:
                    case "end":
                      return _context9.stop();
                  }
                }
              });
            });
          } catch (error) {
            response.json({
              error: "کد نوع را وارد کنید"
            });
          }

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
};