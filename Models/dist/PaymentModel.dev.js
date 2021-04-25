"use strict";

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber");

function ws_Payment(findRequest) {
  return regeneratorRuntime.async(function ws_Payment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {} catch (error) {
            console.log(error.message);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function ws_loadPayment(findRequest) {
  var pool, getTblCommonBaseType, whereclause;
  return regeneratorRuntime.async(function ws_loadPayment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;

          if (!(findRequest.CashAssistanceDetailId === undefined && findRequest.PaymentGatewayId === undefined && findRequest.PaymentDate === undefined && findRequest.PaymentStatus === undefined && findRequest.CharityAccountId === undefined && findRequest.FollowCode === undefined && findRequest.NeedyId === undefined && findRequest.PaymentId === undefined || findRequest.CashAssistanceDetailId === null && findRequest.PaymentGatewayId === null && findRequest.PaymentDate === null && findRequest.PaymentStatus === null && findRequest.CharityAccountId === null && findRequest.FollowCode === null && findRequest.NeedyId === null && findRequest.PaymentId === null)) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT *\n   FROM tblPayment, tblCharityAccounts,tblCashAssistanceDetail,tblPersonal ,tblPlans;"));

        case 7:
          getPayment = _context2.sent;
          return _context2.abrupt("return", getPayment.recordsets[0]);

        case 11:
          //create  whereclause
          whereclause = "";

          for (x in findRequest) {
            if (typeof findRequest[String(x)] == "string") {
              whereclause = whereclause + " " + "".concat(x, " = N") + "'" + findRequest[String(x)] + "'" + " AND";
            } else if (typeof findRequest[String(x)] == "number") {
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            } else if (findRequest[String(x)] == null) {
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            }
          }

          whereclause = whereclause.slice(0, -3); //show records with whereclause

          _context2.next = 16;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblPayment  where" + whereclause));

        case 16:
          getTblCommonBaseType = _context2.sent;
          return _context2.abrupt("return", getTblCommonBaseType.recordsets[0][0]);

        case 18:
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

function ws_loadCashAssistanceDetail(findRequest) {
  var pool, getTblCommonBaseType, whereclause;
  return regeneratorRuntime.async(function ws_loadCashAssistanceDetail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;

          if (!(findRequest.AssignNeedyPlanId === undefined && findRequest.PlanId === undefined && findRequest.CashAssistanceDetailId === undefined || findRequest.PlanId === null && findRequest.CashAssistanceDetailId === null)) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT *\n   FROM tblCashAssistanceDetail, tblAssignNeedyToPlans,tblPersonal ,tblPlans"));

        case 7:
          getPayment = _context3.sent;
          return _context3.abrupt("return", getPayment.recordsets[0]);

        case 11:
          //create  whereclause
          whereclause = "";

          for (x in findRequest) {
            if (typeof findRequest[String(x)] == "string") {
              whereclause = whereclause + " " + "".concat(x, " = N") + "'" + findRequest[String(x)] + "'" + " AND";
            } else if (typeof findRequest[String(x)] == "number") {
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            } else if (findRequest[String(x)] == null) {
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            }
          }

          whereclause = whereclause.slice(0, -3); //show records with whereclause

          _context3.next = 16;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCashAssistanceDetail   where" + whereclause));

        case 16:
          getTblCommonBaseType = _context3.sent;
          return _context3.abrupt("return", getTblCommonBaseType.recordsets[0][0]);

        case 18:
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

module.exports = {
  ws_Payment: ws_Payment,
  ws_loadPayment: ws_loadPayment,
  ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail
};