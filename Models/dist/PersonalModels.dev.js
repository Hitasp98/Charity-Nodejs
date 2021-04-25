"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var config = require("../Utils/config");

var sql = require("mssql");

var crypto = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

function ws_check(findRequest) {
  var pool, tblPersonal, _pool, whereclause, checker;

  return regeneratorRuntime.async(function ws_check$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;

          if (!(findRequest.PersonId === undefined && findRequest.Name === undefined && findRequest.Family === undefined && findRequest.NationalCode === undefined && findRequest.IdNumber === undefined && findRequest.Sex === undefined && findRequest.BirthPlace === undefined && findRequest.PersonType === undefined && findRequest.PersonPhoto === undefined && findRequest.SecretCode === undefined && findRequest.BirthDate === undefined || findRequest.PersonId === null && findRequest.Name === null && findRequest.Family === null && findRequest.NationalCode === null && findRequest.IdNumber === null && findRequest.Sex === null && findRequest.BirthPlace === null && findRequest.PersonType === null && findRequest.PersonPhoto === null && findRequest.SecretCode === null && findRequest.BirthDate === null)) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM CharityDB.dbo.tblPersonal"));

        case 7:
          tblPersonal = _context.sent;
          return _context.abrupt("return", tblPersonal.recordsets[0]);

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 13:
          _pool = _context.sent;
          console.log(findRequest);
          whereclause = ""; //Todo: find value on proprty with string or number ||null and add to whereclause build query

          _context.t0 = regeneratorRuntime.keys(findRequest);

        case 17:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 33;
            break;
          }

          x = _context.t1.value;

          if (!(typeof findRequest[String(x)] == "string")) {
            _context.next = 23;
            break;
          }

          whereclause = whereclause + " " + "".concat(x, " = ") + "'" + findRequest[String(x)] + "'" + " AND ";
          _context.next = 31;
          break;

        case 23:
          if (!(typeof findRequest[String(x)] == "number")) {
            _context.next = 30;
            break;
          }

          if (!(x == 'PersonType')) {
            _context.next = 27;
            break;
          }

          console.log(findRequest[String(x)] + "findRequest[0][String(x)]1");
          return _context.abrupt("break", 33);

        case 27:
          whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
          _context.next = 31;
          break;

        case 30:
          if (findRequest[String(x)] == null) {
            whereclause + " " + "".concat(x, "is null AND");
            console.log(findRequest[String(x)] + "findRequest[0][String(x)]");
          }

        case 31:
          _context.next = 17;
          break;

        case 33:
          whereclause = whereclause.slice(0, -4);
          console.log(whereclause + "this whereclause");
          _context.next = 37;
          return regeneratorRuntime.awrap(_pool.request().query("SELECT * FROM [dbo].[tblPersonal] WHERE " + whereclause));

        case 37:
          tblPersonal = _context.sent;
          console.log(tblPersonal.recordsets[0] + 'tblPersonal');

          if (!(tblPersonal.recordsets[0] == '')) {
            _context.next = 47;
            break;
          }

          _context.next = 42;
          return regeneratorRuntime.awrap(_pool.request().query("SELECT PersonType  FROM [dbo].[tblPersonal]\n          where PersonType=HASHBYTES('SHA2_256','".concat(findRequest.PersonType, "')")));

        case 42:
          checker = _context.sent;
          console.log(checker.recordsets + "checker.recordsets[0]");
          return _context.abrupt("return", checker.recordsets[0]);

        case 47:
          return _context.abrupt("return", tblPersonal.recordsets[0]);

        case 48:
          _context.next = 53;
          break;

        case 50:
          _context.prev = 50;
          _context.t2 = _context["catch"](0);
          console.log(_context.t2.message);

        case 53:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 50]]);
}

function ws_loadPersonal(findRequest) {
  var pool, tblPersonal, _pool2, whereclause;

  return regeneratorRuntime.async(function ws_loadPersonal$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;

          if (!(findRequest.PersonId === undefined && findRequest.Name === undefined && findRequest.Family === undefined && findRequest.NationalCode === undefined && findRequest.IdNumber === undefined && findRequest.Sex === undefined && findRequest.BirthPlace === undefined && findRequest.PersonType === undefined && findRequest.PersonPhoto === undefined && findRequest.SecretCode === undefined && findRequest.BirthDate === undefined || findRequest.PersonId === null && findRequest.Name === null && findRequest.Family === null && findRequest.NationalCode === null && findRequest.IdNumber === null && findRequest.Sex === null && findRequest.BirthPlace === null && findRequest.PersonType === null && findRequest.PersonPhoto === null && findRequest.SecretCode === null && findRequest.BirthDate === null)) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM tblPersonal"));

        case 7:
          tblPersonal = _context2.sent;
          return _context2.abrupt("return", tblPersonal.recordsets[0]);

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 13:
          _pool2 = _context2.sent;
          whereclause = ""; //Todo: find value on proprty with string or number ||null and add to whereclause build query

          for (x in findRequest) {
            if (typeof findRequest[String(x)] == "string") {
              whereclause = whereclause + " " + "".concat(x, " = ") + "'" + findRequest[String(x)] + "'" + " AND ";
            } else if (typeof findRequest[String(x)] == "number") {
              //   if (x == 'PersonType') {
              //     //console.log(findRequest[String(x)] + "findRequest[0][String(x)]1")
              //     break;
              //   }
              whereclause = whereclause + " " + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            } else if (findRequest[String(x)] == null) {
              whereclause = whereclause + " " + "".concat(x, " is null AND"); //console.log(findRequest[String(x)] + "findRequest[0][String(x)]")
            }
          }

          whereclause = whereclause.slice(0, -4); // await console.log(whereclause);

          _context2.next = 19;
          return regeneratorRuntime.awrap(_pool2.request().query("SELECT * FROM tblPersonal WHERE " + whereclause));

        case 19:
          tblPersonal = _context2.sent;
          return _context2.abrupt("return", tblPersonal.recordsets[0]);

        case 21:
          _context2.next = 26;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 23]]);
}

function ws_createPersonal(findRequest) {
  var number, pool, value, f, insertTblPersonal, tblPersonal;
  return regeneratorRuntime.async(function ws_createPersonal$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          number = fnGetRandomString.fnGetRandomString(3);
          number = parseInt(number);
          _context3.next = 5;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 5:
          pool = _context3.sent;
          value = "";
          value = value + "" + number + ",";
          _context3.t0 = regeneratorRuntime.keys(findRequest);

        case 9:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 27;
            break;
          }

          x = _context3.t1.value;

          if (!(findRequest[String(x)] == null || typeof findRequest[String(x)] == "number")) {
            _context3.next = 15;
            break;
          }

          if (x == 'PersonType') {
            value = value + " " + "HASHBYTES('SHA2_256','" + "".concat(findRequest[String(x)]) + "'),";
          } else {
            value = value + " " + "".concat(findRequest[String(x)]) + ",";
          }

          _context3.next = 25;
          break;

        case 15:
          if (!(x == 'NAME' || x == 'NationalCode' || x == 'Family')) {
            _context3.next = 24;
            break;
          }

          _context3.next = 18;
          return regeneratorRuntime.awrap(crypto.createHash('md5').update(findRequest[String(x)]).digest("hex"));

        case 18:
          f = _context3.sent;
          console.log(f + '<============f');
          String(f);
          value = value + " " + "" + "'" + f + "'" + ","; // console.log(value+'<========================')

          _context3.next = 25;
          break;

        case 24:
          if (x == 'PersonPhoto') {
            if (findRequest[String(x)] != null) {
              value = value + "CONVERT('" + findRequest[String(x)] + "',VARBINARY(MAX)),";
            } else {
              value = value + " " + "" + "'" + findRequest[String(x)] + "'" + ",";
            }
          } else {
            value = value + " " + "" + "'" + findRequest[String(x)] + "'" + ",";
          }

        case 25:
          _context3.next = 9;
          break;

        case 27:
          value = value.slice(0, -1);
          console.log('finsh ' + value);
          console.log(_typeof(value));
          _context3.next = 32;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO [tblPersonal]\n                      (  PersonId\n                        ,NAME\n                        ,Family\n                        ,NationalCode\n                        ,IdNumber\n                        ,sex\n                        ,BirthDate\n                        ,BirthPlace\n                        ,PersonType\n                        ,PersonPhoto\n                        ,SecretCode\n                      )\n                         VALUES (" + value + ")"));

        case 32:
          insertTblPersonal = _context3.sent;
          _context3.next = 35;
          return regeneratorRuntime.awrap(pool.request().query('SELECT * FROM [tblPersonal] where PersonId=' + number));

        case 35:
          tblPersonal = _context3.sent;
          console.log(tblPersonal.PersonId);
          return _context3.abrupt("return", number);

        case 40:
          _context3.prev = 40;
          _context3.t2 = _context3["catch"](0);
          console.log(_context3.t2.message);

        case 43:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 40]]);
}

function ws_updatePersonal(findRequest) {
  var updateTblPersonal, pool, value;
  return regeneratorRuntime.async(function ws_updatePersonal$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context4.sent;
          value = '';

          for (x in findRequest) {
            if (x == "PersonId") {} else if (findRequest[String(x)] == null || typeof findRequest[String(x)] == "number") {
              value = value + " " + " ".concat(x, " = ").concat(findRequest[String(x)]) + ",";
            } else {
              value = value + " " + "".concat(x, "  = ") + '\'' + findRequest[String(x)] + '\'' + ",";
            }
          }

          value = value.slice(0, -1);
          _context4.next = 9;
          return regeneratorRuntime.awrap(pool.request().query("UPDATE [tblPersonal]\n      SET  " + value + " WHERE PersonId = ".concat(findRequest.PersonId, ";")));

        case 9:
          updateTblPersonal = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [tblPersonal] \n      where PersonId=" + findRequest.PersonId));

        case 12:
          updateTblPersonal = _context4.sent;
          return _context4.abrupt("return", updateTblPersonal.recordsets[0]);

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function ws_deletePersonal(findRequest) {
  var pool, deleteTblPersonal;
  return regeneratorRuntime.async(function ws_deletePersonal$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("DELETE FROM [CharityDB].[dbo].[tblPersonal] WHERE PersonId = ".concat(findRequest.PersonId, ";")));

        case 6:
          deleteTblPersonal = _context5.sent;
          return _context5.abrupt("return", deleteTblPersonal.rowsAffected[0]);

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

module.exports = {
  ws_check: ws_check,
  ws_loadPersonal: ws_loadPersonal,
  ws_createPersonal: ws_createPersonal,
  ws_updatePersonal: ws_updatePersonal,
  ws_deletePersonal: ws_deletePersonal
};