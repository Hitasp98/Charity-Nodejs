"use strict";

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

function ws_loadPlan(findRequest) {
  var pool, getTblCommonBaseType, whereclause;
  return regeneratorRuntime.async(function ws_loadPlan$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;

          if (!(findRequest.PlanName === undefined && findRequest.PlanNature === undefined && findRequest.ParentPlanId === undefined && findRequest.Fdate === undefined && findRequest.Tdate === undefined && findRequest.neededLogin === undefined && findRequest.PlanId === undefined || findRequest.PlanName === null && findRequest.PlanNature === null && findRequest.ParentPlanId === null && findRequest.Fdate === null && findRequest.Tdate === null && findRequest.neededLogin === null && findRequest.PlanId === null)) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT *\n   FROM tblPlans "));

        case 7:
          getPayment = _context.sent;
          return _context.abrupt("return", getPayment.recordsets[0]);

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

          _context.next = 16;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblPlans  where" + whereclause));

        case 16:
          getTblCommonBaseType = _context.sent;
          return _context.abrupt("return", getTblCommonBaseType.recordsets[0][0]);

        case 18:
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

function ws_createPlan(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_createPlan$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function ws_UpdatePlan(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_UpdatePlan$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function ws_deletePlan(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_deletePlan$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

module.exports = {
  ws_loadPlan: ws_loadPlan,
  ws_createPlan: ws_createPlan,
  ws_UpdatePlan: ws_UpdatePlan,
  ws_deletePlan: ws_deletePlan
};