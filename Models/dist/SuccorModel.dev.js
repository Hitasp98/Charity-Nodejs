"use strict";

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

function ws_loadCashAssistanceDetail(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_loadCashAssistanceDetail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;
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
}

function ws_createCashAssistanceDetail(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_createCashAssistanceDetail$(_context2) {
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

function ws_updateCashAssistanceDetail(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_updateCashAssistanceDetail$(_context3) {
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

function ws_deleteCashAssistanceDetail(findRequest) {
  var pool;
  return regeneratorRuntime.async(function ws_deleteCashAssistanceDetail$(_context4) {
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
  ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
  ws_createCashAssistanceDetail: ws_createCashAssistanceDetail,
  ws_updateCashAssistanceDetail: ws_updateCashAssistanceDetail,
  ws_deleteCashAssistanceDetail: ws_deleteCashAssistanceDetail
};