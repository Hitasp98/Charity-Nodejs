"use strict";

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber"); //تست نشده


function ws_loadCashAssistanceDetail(findRequest) {
  var pool, getTblCommonBaseType, whereclause;
  return regeneratorRuntime.async(function ws_loadCashAssistanceDetail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
          //show all records
          console.log(findRequest.PlanId);

          if (!(findRequest.AssignNeedyPlanId === undefined && findRequest.PlanId === undefined && findRequest.CashAssistanceDetailId === undefined || findRequest.AssignNeedyPlanId === null && findRequest.PlanId === null && findRequest.CashAssistanceDetailId === null)) {
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblCashAssistanceDetail.*,tblCashAssistanceDetail.AssignNeedyPlanId,tblPlans.PlanId\n        FROM tblCashAssistanceDetail   \n        join tblAssignNeedyToPlans\n        on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId\n        join tblPlans\n        on tblCashAssistanceDetail.PlanId= tblPlans.PlanId "));

        case 8:
          getPayment = _context.sent;
          return _context.abrupt("return", getPayment.recordsets[0]);

        case 12:
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
          //!!!!!!!!!!!!!!!!!!!!تغییر کویر ها

          _context.next = 17;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblCashAssistanceDetail.*,tblCashAssistanceDetail.AssignNeedyPlanId,tblPlans.PlanId\n        FROM tblCashAssistanceDetail   \n        join tblAssignNeedyToPlans\n        on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId\n        join tblPlans\n        on tblCashAssistanceDetail.PlanId= tblPlans.PlanId\n      where " + whereclause));

        case 17:
          getTblCommonBaseType = _context.sent;
          return _context.abrupt("return", getTblCommonBaseType.recordsets[0][0]);

        case 19:
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
} //تست نشده


function ws_createCashAssistanceDetail(findRequest) {
  var pool, value, inserttblAssignNeedyToPlans, tblAssignNeedyToPlans;
  return regeneratorRuntime.async(function ws_createCashAssistanceDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(findRequest.PlanId);
          _context2.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context2.sent;
          value = "";

          for (x in findRequest) {
            if (findRequest[String(x)] == null || typeof findRequest[String(x)] == "number") {
              value = value + " " + "".concat(findRequest[String(x)]) + ",";
            } else {
              value = value + " " + "N" + "'" + findRequest[String(x)] + "'" + ",";
            }
          }

          value = value.slice(0, -1);
          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO [dbo].[tblCashAssistanceDetail]\n      ([AssignNeedyPlanId]\n      ,[PlanId]\n      ,[NeededPrice]\n      ,[MinPrice]\n      ,[Description])\n      VALUES (" + value + ")"));

        case 10:
          inserttblAssignNeedyToPlans = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblCashAssistanceDetail.*,tblCashAssistanceDetail.AssignNeedyPlanId,tblPlans.PlanId\n      FROM tblCashAssistanceDetail   \n      join tblAssignNeedyToPlans\n      on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId\n      join tblPlans\n      on tblCashAssistanceDetail.PlanId= tblPlans.PlanId  "));

        case 13:
          tblAssignNeedyToPlans = _context2.sent;
          return _context2.abrupt("return", tblAssignNeedyToPlans.recordsets[0][0]);

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
} //تست نشده


function ws_updateCashAssistanceDetail(findRequest) {
  var updateTblCharityAccounts, pool, value;
  return regeneratorRuntime.async(function ws_updateCashAssistanceDetail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log(findRequest.PlanId);
          _context3.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
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
          _context3.next = 10;
          return regeneratorRuntime.awrap(pool.request().query("UPDATE [dbo].[tblCashAssistanceDetail]\n      SET  " + value + "  WHERE tblCashAssistanceDetail = ".concat(findRequest.tblCashAssistanceDetail, ";")));

        case 10:
          updateTblCharityAccounts = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblCashAssistanceDetail.*,tblCashAssistanceDetail.AssignNeedyPlanId,tblPlans.PlanId\n        FROM tblCashAssistanceDetail   \n        join tblAssignNeedyToPlans\n        on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId\n        join tblPlans\n        on tblCashAssistanceDetail.PlanId= tblPlans.PlanId\n      where tblCashAssistanceDetail =" + findRequest.CashAssistanceDetailId));

        case 13:
          updateTblCharityAccounts = _context3.sent;
          return _context3.abrupt("return", updateTblCharityAccounts.recordsets[0][0]);

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
} //تست نشده


function ws_deleteCashAssistanceDetail(findRequest) {
  var pool, deleteTblCharityAccounts;
  return regeneratorRuntime.async(function ws_deleteCashAssistanceDetail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("DELETE FROM tblCashAssistanceDetail WHERE CashAssistanceDetailId  = ".concat(findRequest.CashAssistanceDetailId, ";")));

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
  ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
  ws_createCashAssistanceDetail: ws_createCashAssistanceDetail,
  ws_updateCashAssistanceDetail: ws_updateCashAssistanceDetail,
  ws_deleteCashAssistanceDetail: ws_deleteCashAssistanceDetail
};