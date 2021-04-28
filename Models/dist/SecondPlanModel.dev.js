"use strict";

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber"); //تست نشده


function ws_loadNeedyForPlan(findRequest) {
  var pool, getTblCommonBaseType, whereclause;
  return regeneratorRuntime.async(function ws_loadNeedyForPlan$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;

          if (!(findRequest.NeedyId === undefined && findRequest.PlanId === undefined && findRequest.AssignNeedyPlanId === undefined || findRequest.NeedyId === null && findRequest.PlanId === null && findRequest.AssignNeedyPlanId === null)) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblAssignNeedyToPlans.*,tblPersonal.PersonId,tblPlans.PlanId\n      FROM tblAssignNeedyToPlans   \n      join tblPersonal\n      on tblAssignNeedyToPlans.PlanId = tblPersonal.PersonId\n      join tblPlans\n      on tblPersonal.PersonId= tblPlans.PlanId "));

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
          return regeneratorRuntime.awrap(pool.request().query("SELECT tblAssignNeedyToPlans.*,tblPersonal.PersonId,tblPlans.PlanId\n        FROM tblAssignNeedyToPlans  \n        join tblPersonal\n        on tblAssignNeedyToPlans.PlanId = tblPersonal.PersonId\n        join tblPlans\n        on tblPersonal.PersonId= tblPlans.PlanId\n          where" + whereclause));

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
} //????????????????شناسه نيازمند NeedyId يا هش مپي از ليست نيازمندان (ليستي از شناسه هاي NeedyId )
//????????????????این مطلب در این مدل قرار نگرفته
//تست نشده


function ws_AssignNeedyToPlan(findRequest) {
  var pool, value, inserttblAssignNeedyToPlans, tblAssignNeedyToPlans;
  return regeneratorRuntime.async(function ws_AssignNeedyToPlan$(_context2) {
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
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO tblAssignNeedyToPlans  (PlanId,Fdate,Tdate,NeedyId)\n            VALUES (" + value + ")"));

        case 9:
          inserttblAssignNeedyToPlans = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("select *  from tblAssignNeedyToPlans  "));

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


function ws_deleteNeedyFromPlan(findRequest) {
  var pool, deletetblAssignNeedyToPlans;
  return regeneratorRuntime.async(function ws_deleteNeedyFromPlan$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("DELETE FROM tblAssignNeedyToPlans WHERE PlanId = ".concat(findRequest.PlanId, ";")));

        case 6:
          deletetblAssignNeedyToPlans = _context3.sent;
          return _context3.abrupt("return", deletetblAssignNeedyToPlans.rowsAffected[0]);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

module.exports = {
  ws_loadNeedyForPlan: ws_loadNeedyForPlan,
  ws_AssignNeedyToPlan: ws_AssignNeedyToPlan,
  ws_deleteNeedyFromPlan: ws_deleteNeedyFromPlan
};