"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tblCommonBaseDataModel = require('../Models/tblCommonBaseDataModel');

var express = require('express');

var bodyParser = require('body-parser');

var requestApi = require('request');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.getTblCommonBaseDataController = function (request, response) {
  var findRequest = _objectSpread({}, request.body);

  tblCommonBaseDataModel.getTblCommonBaseData(findRequest).then(function (result) {
    if (result == null) {
      response.json({
        error: "هیچ رکوردی موجود نیست"
      });
    } else {
      response.json(result);
    }
  });
}; //insert data
///////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports.insertTblCommonBaseDataController = function _callee2(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          findRequest = _objectSpread({}, request.body);
          console.log(findRequest); //for creating code check commonBaseTypeId

          if (!(findRequest.CommonBaseTypeId != '')) {
            _context2.next = 8;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(requestApi.post({
            url: 'http://localhost:8090/tblCommonBaseType/getTblCommonBaseType',
            form: {
              CommonBaseTypeId: findRequest.CommonBaseTypeId
            }
          }, function _callee(err, res, body) {
            var resultGet;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    resultGet = JSON.parse(body).BaseTypeCode;
                    console.log(resultGet); //if create BaseCode it will insert data

                    if (!(resultGet != '')) {
                      _context.next = 7;
                      break;
                    }

                    _context.next = 5;
                    return regeneratorRuntime.awrap(tblCommonBaseDataModel.insertTblCommonBaseData(findRequest).then(function (result) {
                      return response.json(result[0].CommonBaseDataId);
                    })["catch"](function (error) {
                      return response.json({
                        error: "رکورد مورد نظر ثبت نشد دوباره سعی کنید"
                      });
                    }));

                  case 5:
                    _context.next = 8;
                    break;

                  case 7:
                    response.json({
                      error: "صحیح وارد نشده است commonBaseTypeId "
                    });

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 6:
          _context2.next = 9;
          break;

        case 8:
          response.json({
            error: "فیلد اجباری را پرکنید  "
          });

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "  رکورد مورد نظر ثبت نشد دوباره سعی کنید"
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; //update    
//////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports.updateTblCommonBaseDataController = function _callee4(request, response) {
  var findRequest, findGet;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          findRequest = _objectSpread({}, request.body);

          if (!(findRequest.CommonBaseTypeId != null && findRequest.CommonBaseDataId != null)) {
            _context4.next = 14;
            break;
          }

          _context4.next = 5;
          return regeneratorRuntime.awrap(tblCommonBaseDataModel.getTblCommonBaseData({
            CommonBaseDataId: findRequest.CommonBaseDataId
          }));

        case 5:
          findGet = _context4.sent;

          if (!(findGet[0] != null)) {
            _context4.next = 11;
            break;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(requestApi.post({
            url: 'http://localhost:8090/tblCommonBaseType/getTblCommonBaseType',
            form: {
              CommonBaseTypeId: findRequest.CommonBaseTypeId
            }
          }, function _callee3(err, res, body) {
            var resultGet;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    resultGet = JSON.parse(body).BaseTypeCode; // check commonBaseTypeId for create code

                    if (!(resultGet != null)) {
                      _context3.next = 6;
                      break;
                    }

                    _context3.next = 4;
                    return regeneratorRuntime.awrap(tblCommonBaseDataModel.updateTblCommonBaseData(findRequest).then(function (result) {
                      if (result == null) {
                        response.json({
                          error: " دوباره سعی کنید عملیات ویرایش با موفقیت انجام نشد"
                        });
                      } else {
                        response.json(result[0]);
                      }
                    }));

                  case 4:
                    _context3.next = 7;
                    break;

                  case 6:
                    response.json({
                      error: "صحیح وارد نشده است commonBaseTypeId"
                    });

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 9:
          _context4.next = 12;
          break;

        case 11:
          response.json({
            error: "چنین رکوردی برای ویرایش موجود نمیباشد"
          });

        case 12:
          _context4.next = 15;
          break;

        case 14:
          response.json({
            error: "فیلدهای اجباری را پرکنید"
          });

        case 15:
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          response.json({
            error: " دوباره سعی کنید عملیات ویرایش با موفقیت انجام نشد"
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

module.exports.deleteTblCommonBaseDataController = function _callee6(request, response) {
  var findRequest, findGet;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          findRequest = _objectSpread({}, request.body);

          if (!(findRequest.CommonBaseDataId != null)) {
            _context6.next = 9;
            break;
          }

          _context6.next = 5;
          return regeneratorRuntime.awrap(tblCommonBaseDataModel.getTblCommonBaseData({
            CommonBaseDataId: findRequest.CommonBaseDataId
          }));

        case 5:
          findGet = _context6.sent;

          if (findGet[0] != null) {
            requestApi.post({
              url: 'http://localhost:8090/tblCharityAccounts/getTblCharityAccounts',
              form: {
                BankId: findRequest.CommonBaseDataId,
                BaseTypeCode: findRequest.BaseTypeCode
              }
            }, function _callee5(err, res, body) {
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(JSON.parse(body)[0]);

                    case 2:
                      _context5.t1 = _context5.sent;
                      _context5.t0 = _context5.t1 != null;

                      if (!_context5.t0) {
                        _context5.next = 10;
                        break;
                      }

                      _context5.next = 7;
                      return regeneratorRuntime.awrap(JSON.parse(body)[0].BankId);

                    case 7:
                      _context5.t2 = _context5.sent;
                      _context5.t3 = findRequest.CommonBaseDataId;
                      _context5.t0 = _context5.t2 == _context5.t3;

                    case 10:
                      if (!_context5.t0) {
                        _context5.next = 14;
                        break;
                      }

                      response.json({
                        error: "امکان حذف بدليل وابستگي امکان پذير نمي باشد"
                      });
                      _context5.next = 16;
                      break;

                    case 14:
                      _context5.next = 16;
                      return regeneratorRuntime.awrap(tblCommonBaseDataModel.deleteTblCommonBaseData(findRequest).then(function (result) {
                        if (result == 1) {
                          response.json({
                            message: "عملیات حذف با موفقیت انجام شد"
                          });
                        } else {
                          response.json({
                            error: "دوباره سعی کنید عملیات حذف با موفقیت انجام نشد"
                          });
                        }
                      }));

                    case 16:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
          } else {
            response.json({
              error: "چنین رکوردی موجود نیست"
            });
          }

          _context6.next = 10;
          break;

        case 9:
          response.json({
            error: "فیلد های اجباری را پر کنید"
          });

        case 10:
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          response.json({
            error: " دوباره سعی کنید عملیات حذف با موفقیت انجام نشد"
          });

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
};