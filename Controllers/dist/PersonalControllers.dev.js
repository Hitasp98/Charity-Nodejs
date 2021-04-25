"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PersonalModels = require("../Models/PersonalModels");

var express = require("express");

var bodyParser = require("body-parser");

var requestApi = require('request');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports.getPersonalController = function _callee(request, response) {
  var findRequest;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          findRequest = _objectSpread({}, request.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(PersonalModels.ws_loadPersonal(findRequest).then(function (result) {
            if (result == '') {
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
          console.log(_context.t0.message);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports.insertPersonalController = function _callee2(request, response) {
  var findRequest, NationalCode, loadPersonal;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          findRequest = _objectSpread({}, request.body);
          NationalCode = findRequest.NationalCode;

          if (!(NationalCode.length < 10 || NationalCode.length > 10)) {
            _context2.next = 7;
            break;
          }

          console.log('error NationalCode');
          _context2.next = 17;
          break;

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(PersonalModels.ws_check(findRequest));

        case 9:
          loadPersonal = _context2.sent;
          console.log(loadPersonal + 'loadPersonal');

          if (!(loadPersonal === null)) {
            _context2.next = 16;
            break;
          }

          _context2.next = 14;
          return regeneratorRuntime.awrap(PersonalModels.ws_createPersonal(findRequest).then(function (result) {
            if (result === null) {
              response.json({
                error: "عملیات درج با موفقیت انجام نشد"
              });
            } else {
              response.json(result);
            }
          })["catch"](function (error) {
            return response.json({
              error: "رکورد مورد نظر ثبت نمیشود"
            });
          }));

        case 14:
          _context2.next = 17;
          break;

        case 16:
          response.json("قبلا درج شده");

        case 17:
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

module.exports.updatePersonalController = function _callee3(request, response) {
  var findRequest, checked;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          findRequest = _objectSpread({}, request.body);

          if (!(findRequest.PersonId == null && findRequest.Name == null && findRequest.Family == null && findRequest.NationalCode == null && findRequest.IdNumber == null && findRequest.Sex == null && findRequest.BirthPlace == null && findRequest.PersonType == null && findRequest.PersonPhoto == null && findRequest.SecretCode == null && findRequest.BirthDate == null)) {
            _context3.next = 6;
            break;
          }

          response.json("ورودی ها خالی است");
          _context3.next = 15;
          break;

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(PersonalModels.ws_loadPersonal(findRequest));

        case 8:
          checked = _context3.sent;

          if (!(checked != ' ')) {
            _context3.next = 14;
            break;
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(PersonalModels.ws_updatePersonal(findRequest).then(function (result) {
            if (result == null) {
              response.json({
                error: "عملیات ویرایش با موفقیت انجام نشد"
              });
            } else {
              response.json(result);
            }
          }));

        case 12:
          _context3.next = 15;
          break;

        case 14:
          response.json(checked.PersonId + "1عملیات ویرایش با موفقیت انجام نشد");

        case 15:
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          response.json({
            error: "کد نوع را وارد کنید"
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

module.exports.deletePersonalController = function (request, response) {
  try {
    var findRequest = _objectSpread({}, request.body);

    if (findRequest.PersonId == null) {
      response.json("ورودی ها خالی است");
    } else {
      var _requestApi$post;

      // request for checking Fk in others table 
      requestApi.post((_requestApi$post = {
        url: 'http://localhost:8090/tblCommonBaseData/getTblCommonBaseData',
        form: {
          PersonId: findRequest[0].PersonId
        }
      }, _defineProperty(_requestApi$post, "url", 'http://localhost:8090/tblCommonBaseData/tblPayment'), _defineProperty(_requestApi$post, "form", {
        PersonId: findRequest[0].PersonId
      }), _defineProperty(_requestApi$post, "url", 'http://localhost:8090/tblCommonBaseData/tblDistributionGoods'), _defineProperty(_requestApi$post, "form", {
        PersonId: findRequest[0].PersonId
      }), _defineProperty(_requestApi$post, "url", 'http://localhost:8090/tblCommonBaseData/tblNonCashRequest'), _defineProperty(_requestApi$post, "form", {
        PersonId: findRequest[0].PersonId
      }), _defineProperty(_requestApi$post, "url", 'http://localhost:8090/tblCommonBaseData/tblNeedyAccounts'), _defineProperty(_requestApi$post, "form", {
        PersonId: findRequest[0].PersonId
      }), _requestApi$post), function _callee4(err, res, body) {
        var checked;
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(JSON.parse(body).CommonBaseTypeId);

              case 2:
                _context4.t0 = _context4.sent;
                _context4.t1 = findRequest[0].PersonId;

                if (!(_context4.t0 == _context4.t1)) {
                  _context4.next = 8;
                  break;
                }

                response.json({
                  error: "رکورد مورد نظر به عنوان کلید خارجی استفاده شده است"
                });
                _context4.next = 17;
                break;

              case 8:
                _context4.next = 10;
                return regeneratorRuntime.awrap(PersonalModels.ws_loadPersonal(findRequest));

              case 10:
                checked = _context4.sent;

                if (!(checked[0] != ' ')) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 14;
                return regeneratorRuntime.awrap(tblCommonBaseTypeModel.deletePersonalController(findRequest).then(function (result) {
                  if (result == 1) {
                    response.json({
                      message: "عملیات حذف با موفقیت انجام شد"
                    });
                  } else {
                    response.json({
                      error: "رکورد مورد نظر موجود نیست"
                    });
                  }
                }));

              case 14:
                _context4.next = 17;
                break;

              case 16:
                response.json({
                  error: "رکورد مورد نظر موجود نیست"
                });

              case 17:
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