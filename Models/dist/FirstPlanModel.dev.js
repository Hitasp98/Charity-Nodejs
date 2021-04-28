"use strict";

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require("crypto");

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
  var pool, value, insertTblCharityAccounts, getTblCharityAccounts;
  return regeneratorRuntime.async(function ws_createPlan$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;
          value = "";

          for (x in findRequest) {
            if (findRequest[String(x)] == null || typeof findRequest[String(x)] == "number") {
              value = value + " " + "".concat(findRequest[String(x)]) + ",";
            } else {
              value = value + " " + "N" + "'" + findRequest[String(x)] + "'" + ",";
            }
          }

          value = value.slice(0, -1); //!!!!!!!!!!!!!!!!!!به دلیل عکس اینسرت انجام نشد 

          _context2.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO tblPlans  (PlanName,Description,PlanNature,ParentPlanId,icon,Fdate,Tdate,neededLogin)\n            VALUES (" + value + ")"));

        case 9:
          insertTblCharityAccounts = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("select PlanId  from tblPlans  where PlanId  =" + "'" + findRequest["PlanId"] + "'"));

        case 12:
          getTblCharityAccounts = _context2.sent;
          return _context2.abrupt("return", getTblCharityAccounts.recordsets);

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!تست نشده


function ws_UpdatePlan(findRequest) {
  var updateTblCharityAccounts, pool, value;
  return regeneratorRuntime.async(function ws_UpdatePlan$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          value = "";

          for (x in findRequest) {
            if (findRequest[String(x)] == null || typeof findRequest[String(x)] == "number") {
              value = value + " " + " ".concat(x, " = ").concat(findRequest[String(x)]) + ",";
            } else {
              value = value + " " + "".concat(x, " = N") + "'" + findRequest[String(x)] + "'" + ",";
            }
          }

          value = value.slice(0, -1);
          _context3.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("UPDATE tblPlans\n    SET  " + value + " WHERE PlanId = ".concat(findRequest.PlanId, ";")));

        case 9:
          updateTblCharityAccounts = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblPlans where PlanId =" + findRequest["PlanId"]));

        case 12:
          updateTblCharityAccounts = _context3.sent;
          return _context3.abrupt("return", updateTblCharityAccounts.recordsets);

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!تست نشده


function ws_deletePlan(findRequest) {
  var pool, deleteTblCharityAccounts;
  return regeneratorRuntime.async(function ws_deletePlan$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("DELETE FROM tblPlans WHERE PlanId = ".concat(findRequest.PlanId, ";")));

        case 6:
          deleteTblCharityAccounts = _context4.sent;
          return _context4.abrupt("return", deleteTblCharityAccounts.rowsAffected[0]);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

module.exports = {
  ws_loadPlan: ws_loadPlan,
  ws_createPlan: ws_createPlan,
  ws_UpdatePlan: ws_UpdatePlan,
  ws_deletePlan: ws_deletePlan
};