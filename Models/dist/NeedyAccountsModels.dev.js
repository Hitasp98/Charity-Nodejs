"use strict";

//NeedyAccountsModels
var config = require('../Utils/config');

var sql = require('mssql');

var fnGetRandomString = require('../Utils/Randomnumber'); //checking a null or full or repit a insert  of updadat
//Todo:Because not work mvc check here


function check(findRequest) {
  var pool, tblPersonal, whereclause;
  return regeneratorRuntime.async(function check$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context.sent;

          if (!(findRequest.PersonId == null && findRequest.Name == null && findRequest.Family == null && findRequest.NationalCode == null && findRequest.IdNumber == null && findRequest.Sex == null && findRequest.BirthPlace == null && findRequest.PersonType == null && findRequest.PersonPhoto == null && findRequest.SecretCode == null)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", 'the was empty');

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [tblNeedyAccounts] WHERE ShebaNumber=".concat(findRequest.ShebaNumber)));

        case 10:
          ShebaNumber = _context.sent;

          if (!(ShebaNumber.recordsets[0] != null)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", ShebaNumber.recordsets[0]);

        case 15:
          whereclause = '';
          console.log('tblNeedyAccounts.recordsets'); //Todo: find value on proprty with string or number ||null and add to whereclause build query

          for (x in findRequest) {
            //?check value for insert string or number 
            if (typeof findRequest[String(x)] == 'string') {
              whereclause = whereclause + ' ' + "".concat(x, " = ") + "'" + findRequest[String(x)] + "'" + " AND ";
            } else if (typeof findRequest[String(x)] == 'number') {
              whereclause = whereclause + ' ' + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            } else if (findRequest[String(x)] == null) {
              whereclause + ' ' + "".concat(x, "is null AND"); // break;
            }
          }

          whereclause = whereclause.slice(0, -4); //check query

          console.log('tblNeedyAccounts.recordsets');
          console.log('tblNeedyAccounts.recordsets');
          _context.next = 23;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [tblNeedyAccounts] WHERE " + whereclause));

        case 23:
          tblNeedyAccounts = _context.sent;
          return _context.abrupt("return", tblNeedyAccounts.recordsets[0]);

        case 25:
          _context.next = 30;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 27]]);
} //TODO: select tblNeedyAccounts


function ws_loadNeedyAccount(findRequest) {
  var pool, tblPersonal, whereclause;
  return regeneratorRuntime.async(function ws_loadNeedyAccount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context2.sent;

          if (!(findRequest.BankId == null && findRequest.AccountNumber == null || findRequest.BankId == undefined && findRequest.AccountNumber == undefined)) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(pool.request().query("SELECT [tblNeedyAccounts].*,tblPersonal.NAME ,tblPersonal.Family,tblPersonal.NationalCode,tblCommonBaseData.BaseCode,tblCommonBaseData.BaseValue,tblCommonBaseType.BaseTypeTitle\n        FROM [dbo].[tblNeedyAccounts] \n            join tblPersonal\n            on tblNeedyAccounts.AccountName=tblPersonal.NAME \n            AND tblNeedyAccounts.AccountName=tblPersonal.Family\n            AND tblNeedyAccounts.AccountName=tblPersonal.NationalCode\n            join tblCommonBaseData\n            on tblNeedyAccounts.AccountNumber=tblCommonBaseData.BaseCode\n            AND tblNeedyAccounts.AccountNumber=tblCommonBaseData.BaseValue\n            join tblCommonBaseType\n            on tblNeedyAccounts.AccountNumber=tblCommonBaseType.BaseTypeTitle\n           where BaseTypeCode = ".concat(findRequest.BaseTypeCode)));

        case 7:
          tblPersonal = _context2.sent;
          return _context2.abrupt("return", tblPersonal.recordsets[0]);

        case 11:
          whereclause = '';
          console.log('tblNeedyAccounts.recordsets'); //Todo: find value on proprty with string or number ||null and add to whereclause build query

          for (x in findRequest) {
            //?check value for insert string or number 
            if (typeof findRequest[String(x)] == 'string') {
              whereclause = whereclause + ' ' + "".concat(x, " = ") + "'" + findRequest[String(x)] + "'" + " AND ";
            } else if (typeof findRequest[String(x)] == 'number') {
              whereclause = whereclause + ' ' + "".concat(x, " =  ").concat(findRequest[String(x)]) + " AND";
            } else if (findRequest[String(x)] == null) {
              whereclause + ' ' + "".concat(x, "is null AND");
            }
          }

          whereclause = whereclause.slice(0, -4);
          _context2.next = 17;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [tblNeedyAccounts] WHERE " + whereclause));

        case 17:
          tblNeedyAccounts = _context2.sent;
          console.log(tblNeedyAccounts.recordsets[0] + 'tblNeedyAccounts.recordsets');

          if (!(tblNeedyAccounts.recordsets[0] == null)) {
            _context2.next = 26;
            break;
          }

          _context2.next = 22;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [tblNeedyAccounts] WHERE ShebaNumber=".concat(findRequest.ShebaNumber)));

        case 22:
          ShebaNumber = _context2.sent;
          return _context2.abrupt("return", ShebaNumber.recordsets[0]);

        case 26:
          return _context2.abrupt("return", tblNeedyAccounts.recordsets[0]);

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
} //TODO : insert tblNeedyAccounts


function ws_createNeedyAccount(findRequest) {
  var number, pool, value, insertTblPersonal, _tblNeedyAccounts;

  return regeneratorRuntime.async(function ws_createNeedyAccount$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          number = Math.floor(Math.random() * 999) + 100;
          _context3.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context3.sent;
          value = '';
          value = value + '' + number + ',';

          for (x in findRequest) {
            //? check typeof value for query
            if (findRequest[String(x)] == null || typeof findRequest[String(x)] == 'number') {
              value = value + ' ' + "".concat(findRequest[String(x)]) + ",";
            } else {
              value = value + ' ' + "" + "'" + findRequest[String(x)] + "'" + ",";
            }
          } //!! end value have ',' delete


          value = value.slice(0, -1);
          console.log('finsh ' + value);
          _context3.next = 12;
          return regeneratorRuntime.awrap(pool.request().query("INSERT INTO [tblNeedyAccounts]\n                      ( NeedyAccountId,  \n                        BankId,\n                        NeedyId,\n                        OwnerName,\n                        CardNumber,\n                        AccountNumber,\n                        AccountName,\n                       ShebaNumber\n                      )\n                       VALUES\n                      (" + value + ")"));

        case 12:
          insertTblPersonal = _context3.sent;
          _context3.next = 15;
          return regeneratorRuntime.awrap(pool.request().query('SELECT * FROM [tblNeedyAccounts] where [NeedyAccountId]=' + number));

        case 15:
          _tblNeedyAccounts = _context3.sent;
          return _context3.abrupt("return", _tblNeedyAccounts.recordsets[0][0]);

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

function ws_UpdateNeedyAccount(findRequest) {
  var updateTblPersonal, pool, value;
  return regeneratorRuntime.async(function ws_UpdateNeedyAccount$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 4:
          pool = _context4.sent;
          value = '';

          for (x in findRequest) {
            // if(x=='NeedyAccountId'){
            //   value = value + ' ' + ` ${x} =${number}` + `,`
            // }
            if (findRequest[String(x)] == null || typeof findRequest[String(x)] == 'number') {
              value = value + ' ' + " ".concat(x, " = ").concat(findRequest[String(x)]) + ",";
            } else {
              value = value + ' ' + "".concat(x, " = ") + "'" + findRequest[String(x)] + "'" + ",";
            }
          }

          value = value.slice(0, -1);
          _context4.next = 10;
          return regeneratorRuntime.awrap(pool.request().query("UPDATE [tblNeedyAccounts]\n      SET  " + value + " WHERE NeedyAccountId = ".concat(findRequest.NeedyAccountId, ";")));

        case 10:
          updateTblPersonal = _context4.sent;
          _context4.next = 13;
          return regeneratorRuntime.awrap(pool.request().query("SELECT * FROM [tblNeedyAccounts] where [NeedyAccountId]=" + findRequest.NeedyAccountId));

        case 13:
          updateTblPersonal = _context4.sent;
          return _context4.abrupt("return", updateTblPersonal.recordsets);

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0.message);

        case 20:
          _context4.next = 25;
          break;

        case 22:
          _context4.prev = 22;
          _context4.t1 = _context4["catch"](0);
          console.log(_context4.t1.message);

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 22], [1, 17]]);
}

function ws_deleteNeedyAccount(findRequest) {
  var pool, deleteTblPersonal;
  return regeneratorRuntime.async(function ws_deleteNeedyAccount$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(pool.request().query("DELETE FROM [tblNeedyAccounts] WHERE NeedyAccountId = ".concat(findRequest.NeedyAccountId, ";")));

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
  check: check,
  ws_loadNeedyAccount: ws_loadNeedyAccount,
  ws_createNeedyAccount: ws_createNeedyAccount,
  ws_UpdateNeedyAccount: ws_UpdateNeedyAccount,
  ws_deleteNeedyAccount: ws_deleteNeedyAccount
};