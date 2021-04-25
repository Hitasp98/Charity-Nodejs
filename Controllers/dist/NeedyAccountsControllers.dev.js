"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//NeedAccountsControllers
// it's connect on db NeedAccounts
//have get , insert , update and delete
var NeedyAccountsModels = require("../Models/NeedyAccountsModels");

var express = require("express");

var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.getNeedyAccountsController = function _callee(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(NeedyAccountsModels.ws_loadNeedyAccount(findRequest).then(function (result) {
            if (result == null) {
              response.json({
                error: "هیچ رکوردی موجود نیست"
              });
            } else {
              response.json(result[0]);
            }
          }));

        case 4:
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports.insertNeedyAccountsController = function _callee2(request, response) {
  var findRequest, loadNeedyAccount;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          findRequest = _objectSpread({}, request.body);

          if (!(findRequest.NeedyId === null && findRequest.BankId === null && findRequest.OwnerName === null && findRequest.CardNumber === null && findRequest.AccountNumber === null && findRequest.AccountName === null && findRequest.ShebaNumber === null)) {
            _context2.next = 6;
            break;
          }

          response.json("ورودی ها خالی است");
          _context2.next = 15;
          break;

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(NeedyAccountsModels.ws_loadNeedyAccount(findRequest));

        case 8:
          loadNeedyAccount = _context2.sent;

          if (!(loadNeedyAccount == '')) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(NeedyAccountsModels.ws_createNeedyAccount(findRequest).then(function (result) {
            console.log(result + ' is insert');

            if (result == '') {
              response.json({
                error: "عملیات درج با موفقیت انجام نشد"
              });
            } else {
              response.json(result.NeedyAccountId);
            }
          }));

        case 12:
          _context2.next = 15;
          break;

        case 14:
          response.json("قبلا درج شده");

        case 15:
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 20:
          ;

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

module.exports.updateNeedyAccountsController = function _callee3(request, response) {
  var findRequest, checked;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          findRequest = _objectSpread({}, request.body);
          console.log(findRequest);

          if (!(findRequest.NeedyAccountId == null && findRequest.NeedyId == null && findRequest.BankId == null && findRequest.OwnerName == null && findRequest.CardNumber == null && findRequest.AccountNumber == null && findRequest.AccountName == null && findRequest.ShebaNumber == null)) {
            _context3.next = 7;
            break;
          }

          response.json("ورودی ها خالی است");
          _context3.next = 16;
          break;

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(NeedyAccountsModels.ws_loadNeedyAccount(findRequest));

        case 9:
          checked = _context3.sent;

          if (!(checked[0] != ' ')) {
            _context3.next = 15;
            break;
          }

          _context3.next = 13;
          return regeneratorRuntime.awrap(NeedyAccountsModels.ws_UpdateNeedyAccount(findRequest).then(function (result) {
            if (result == '') {
              response.json({
                error: "عملیات ویرایش با موفقیت انجام نشد"
              });
            } else {
              response.json(result);
            }
          }));

        case 13:
          _context3.next = 16;
          break;

        case 15:
          response.json(checked[0] + "1عملیات ویرایش با موفقیت انجام نشد");

        case 16:
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

module.exports.deleteNeedyAccountsController = function (request, response) {
  try {
    var findRequest = _objectSpread({}, request.body);

    if (findRequest.NeedyAccountId == null) {
      response.json("ورودی ها خالی است");
    } else {
      // request for checking Fk in others table 
      requestApi.post({
        url: 'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData',
        form: {
          findRequest: findRequest
        }
      }, function _callee4(err, res, body) {
        var checked;
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(JSON.parse(body).NeedyId);

              case 2:
                _context4.t0 = _context4.sent;
                _context4.t1 = findRequest.NeedyAccountId;

                if (!(_context4.t0 == _context4.t1)) {
                  _context4.next = 8;
                  break;
                }

                response.json({
                  error: "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است"
                });
                _context4.next = 18;
                break;

              case 8:
                _context4.next = 10;
                return regeneratorRuntime.awrap(NeedyAccountsModels.ws_loadNeedyAccount(findRequest));

              case 10:
                checked = _context4.sent;

                if (!(checked[0] != ' ')) {
                  _context4.next = 17;
                  break;
                }

                console.log('else');
                _context4.next = 15;
                return regeneratorRuntime.awrap(NeedyAccountsModels.ws_deleteNeedyAccount(findRequest).then(function (result) {
                  if (result == '') {
                    response.json({
                      message: "عملیات حذف با موفقیت انجام شد"
                    });
                  } else {
                    response.json({
                      error: "رکورد مورد نظر موجود نیست"
                    });
                  }
                }));

              case 15:
                _context4.next = 18;
                break;

              case 17:
                response.json({
                  error: "رکورد مورد نظر موجود نیست"
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        });
      });
    }
  } catch (error) {
    response.json({
      error: "کد نوع را وارد کنید"
    });
  }
};