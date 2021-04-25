"use strict";

var config = require('../Utils/dbconfig');

var sql = require('mssql');

var _require = require('express'),
    request = _require.request;

var getRandomString = require('../Utils/fnGetRandomString');

function getTblCommonBaseData(findRequest) {
  var pool, _getTblCommonBaseData, whereclause;

  return regeneratorRuntime.async(function getTblCommonBaseData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;

          if (!(findRequest.CommonBaseDataId == null && findRequest.BaseCode == null && findRequest.BaseValue == null && findRequest.BaseValue == null && findRequest.CommonBaseTypeId == null)) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData"));

        case 7:
          _getTblCommonBaseData = _context.sent;
          return _context.abrupt("return", _getTblCommonBaseData.recordsets[0]);

        case 11:
          whereclause = '';

          for (x in findRequest) {
            //getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
            if (typeof findRequest[String(x)] == "string") {
              whereclause = whereclause + " " + "".concat(x, " = N") + '\'' + findRequest[String(x)] + '\'' + " AND";
            } else if (typeof findRequest[String(x)] == 'number') {
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            } else if (findRequest[String(x)] == null) {
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            }
          }

          whereclause = whereclause.slice(0, -3);
          _context.next = 16;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData where" + whereclause));

        case 16:
          _getTblCommonBaseData = _context.sent;
          return _context.abrupt("return", _getTblCommonBaseData.recordsets[0][0]);

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

function insertTblCommonBaseData(findRequest) {
  var pool, getTblCommonBaseTypeCode, getTblCommonBaseCode, _insertTblCommonBaseData, _getTblCommonBaseData2, _insertTblCommonBaseData2, _getTblCommonBaseData3;

  return regeneratorRuntime.async(function insertTblCommonBaseData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(findRequest);
          _context2.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseType where CommonBaseTypeId =" + findRequest["CommonBaseTypeId"]));

        case 7:
          getTblCommonBaseTypeCode = _context2.sent;
          getTblCommonBaseCode = getTblCommonBaseTypeCode.recordsets[0][0].BaseTypeCode + getRandomString.fnGetRandomString(3); //insert data

          if (!(findRequest.BaseValue != null)) {
            _context2.next = 19;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO tblCommonBaseData (BaseCode,BaseValue,CommonBaseTypeId)\n                VALUES (" + '\'' + getTblCommonBaseCode + '\'' + ",N" + '\'' + findRequest.BaseValue + '\'' + "," + findRequest["CommonBaseTypeId"] + ")"));

        case 12:
          _insertTblCommonBaseData = _context2.sent;
          _context2.next = 15;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData where BaseValue = N" + '\'' + findRequest.BaseValue + '\'' + " and " + "CommonBaseTypeId = ".concat(findRequest["CommonBaseTypeId"]) + " and " + "BaseCode =" + '\'' + getTblCommonBaseCode + '\''));

        case 15:
          _getTblCommonBaseData2 = _context2.sent;
          return _context2.abrupt("return", _getTblCommonBaseData2.recordsets);

        case 19:
          if (!(findRequest.BaseValue == null)) {
            _context2.next = 27;
            break;
          }

          _context2.next = 22;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO tblCommonBaseData (BaseCode,BaseValue,CommonBaseTypeId)\n                VALUES (" + '\'' + getTblCommonBaseCode + '\'' + "," + findRequest["BaseValue"] + "," + findRequest["CommonBaseTypeId"] + ")"));

        case 22:
          _insertTblCommonBaseData2 = _context2.sent;
          _context2.next = 25;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData where " + "CommonBaseTypeId = ".concat(findRequest["CommonBaseTypeId"]) + " and " + "BaseCode =" + '\'' + getTblCommonBaseCode + '\''));

        case 25:
          _getTblCommonBaseData3 = _context2.sent;
          return _context2.abrupt("return", _getTblCommonBaseData3.recordsets);

        case 27:
          _context2.next = 32;
          break;

        case 29:
          _context2.prev = 29;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 29]]);
}

function updateTblCommonBaseData(findRequest) {
  var _updateTblCommonBaseData, pool, getTblCommonBaseTypeCode, getTblCommonBaseDataCode, getTblCommonBaseCode;

  return regeneratorRuntime.async(function updateTblCommonBaseData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseType where CommonBaseTypeId =" + findRequest["CommonBaseTypeId"]));

        case 6:
          getTblCommonBaseTypeCode = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData where CommonBaseDataId =" + findRequest["CommonBaseDataId"]));

        case 9:
          getTblCommonBaseDataCode = _context3.sent;
          _context3.t0 = getTblCommonBaseTypeCode.recordsets[0][0].BaseTypeCode;
          _context3.next = 13;
          return regeneratorRuntime.awrap(getTblCommonBaseDataCode.recordsets[0][0].BaseCode.substring(3, 6));

        case 13:
          _context3.t1 = _context3.sent;
          getTblCommonBaseCode = _context3.t0 + _context3.t1;
          console.log(getTblCommonBaseCode);
          _context3.t2 = regeneratorRuntime.keys(findRequest);

        case 17:
          if ((_context3.t3 = _context3.t2()).done) {
            _context3.next = 39;
            break;
          }

          x = _context3.t3.value;

          if (!(x == "CommonBaseDataId")) {
            _context3.next = 23;
            break;
          }

          CommonBaseDataValue = findRequest.CommonBaseDataId;
          _context3.next = 37;
          break;

        case 23:
          if (!(findRequest[String(x)] != null && typeof findRequest[String(x)] == "string")) {
            _context3.next = 29;
            break;
          }

          _context3.next = 26;
          return regeneratorRuntime.awrap(pool.request().query("UPDATE tblCommonBaseData\n                        SET  ".concat(x, " = N") + '\'' + findRequest[String(x)] + '\'' + " , BaseCode = " + '\'' + getTblCommonBaseCode + '\'' + " WHERE CommonBaseDataId = ".concat(findRequest.CommonBaseDataId, ";")));

        case 26:
          _updateTblCommonBaseData = _context3.sent;
          _context3.next = 37;
          break;

        case 29:
          if (!(findRequest[String(x)] == null || typeof findRequest[String(x)] == "number")) {
            _context3.next = 35;
            break;
          }

          _context3.next = 32;
          return regeneratorRuntime.awrap(pool.request().query("UPDATE tblCommonBaseData\n                        SET  ".concat(x, " = ") + findRequest[String(x)] + " , BaseCode = " + '\'' + getTblCommonBaseCode + '\'' + " WHERE CommonBaseDataId=".concat(findRequest.CommonBaseDataId, ";")));

        case 32:
          _updateTblCommonBaseData = _context3.sent;
          _context3.next = 37;
          break;

        case 35:
          _updateTblCommonBaseData = {
            recordsets: [[null]]
          };
          return _context3.abrupt("return", _updateTblCommonBaseData.recordsets[0][0]);

        case 37:
          _context3.next = 17;
          break;

        case 39:
          _context3.next = 41;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData where CommonBaseDataId =" + CommonBaseDataValue));

        case 41:
          _updateTblCommonBaseData = _context3.sent;
          return _context3.abrupt("return", _updateTblCommonBaseData.recordsets);

        case 45:
          _context3.prev = 45;
          _context3.t4 = _context3["catch"](0);
          console.log(_context3.t4.message);

        case 48:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 45]]);
}

function deleteTblCommonBaseData(findRequest) {
  var pool, _deleteTblCommonBaseData, _getTblCommonBaseData4;

  return regeneratorRuntime.async(function deleteTblCommonBaseData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("select * from tblCommonBaseData where CommonBaseDataId =  ".concat(findRequest.CommonBaseDataId, ";")));

        case 6:
          _getTblCommonBaseData4 = _context4.sent;

          if (!(_getTblCommonBaseData4 != null)) {
            _context4.next = 11;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(pool.request().query("DELETE FROM tblCommonBaseData WHERE CommonBaseDataId = ".concat(findRequest.CommonBaseDataId, ";")));

        case 10:
          _deleteTblCommonBaseData = _context4.sent;

        case 11:
          return _context4.abrupt("return", _deleteTblCommonBaseData.rowsAffected[0]);

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = {
  getTblCommonBaseData: getTblCommonBaseData,
  insertTblCommonBaseData: insertTblCommonBaseData,
  updateTblCommonBaseData: updateTblCommonBaseData,
  deleteTblCommonBaseData: deleteTblCommonBaseData
};