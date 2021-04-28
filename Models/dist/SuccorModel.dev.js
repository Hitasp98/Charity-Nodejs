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

          if (!(findRequest.AssignNeedyPlanId === undefined && findRequest.PlanId === undefined && findRequest.CashAssistanceDetailId === undefined || findRequest.AssignNeedyPlanId === null && findRequest.PlanId === null && findRequest.CashAssistanceDetailId === null)) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblCashAssistanceDetail.*,tblPersonal.PersonId,tblPlans.PlanId\n      FROM tblCashAssistanceDetail   \n      join tblPersonal\n      on tblCashAssistanceDetail.PlanId = tblPersonal.PersonId\n      join tblPlans\n      on tblPersonal.PersonId= tblPlans.PlanId "));

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
          //!!!!!!!!!!!!!!!!!!!!تغییر کویر ها

          _context.next = 16;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblCashAssistanceDetail.*,tblPersonal.PersonId,tblPlans.PlanId\n        FROM tblCashAssistanceDetail  \n        join tblPersonal\n        on tblCashAssistanceDetail.PlanId = tblPersonal.PersonId\n        join tblPlans\n        on tblPersonal.PersonId= tblPlans.PlanId\n          where" + whereclause));

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
} //تست نشده 


function ws_createCashAssistanceDetail(findRequest) {
  var pool, value, inserttblAssignNeedyToPlans, tblAssignNeedyToPlans;
  return regeneratorRuntime.async(function ws_createCashAssistanceDetail$(_context2) {
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

          value = value.slice(0, -1);
          _context2.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO tblCashAssistanceDetail   (AssignNeedyPlanId,PlanId,NeededPrice,MinPrice,Description )\n            VALUES (" + value + ")"));

        case 9:
          inserttblAssignNeedyToPlans = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("select *  from  tblCashAssistanceDetail  "));

        case 12:
          tblAssignNeedyToPlans = _context2.sent;
          return _context2.abrupt("return", tblAssignNeedyToPlans.recordsets);

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
} //تست نشده


function ws_updateCashAssistanceDetail(findRequest) {
  var updateTblCharityAccounts, pool, value;
  return regeneratorRuntime.async(function ws_updateCashAssistanceDetail$(_context3) {
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
          return regeneratorRuntime.awrap(pool.request().query("UPDATE tblCashAssistanceDetail \n    SET  " + value + " WHERE tblCashAssistanceDetail = ".concat(findRequest.tblCashAssistanceDetail, ";")));

        case 9:
          updateTblCharityAccounts = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCashAssistanceDetail  where tblCashAssistanceDetail =" + findRequest["tblCashAssistanceDetail"]));

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