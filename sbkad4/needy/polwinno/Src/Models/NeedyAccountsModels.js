var config = require('../Utils/config')
const sql = require('mssql')
const { request } = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const { json } = require('body-parser')
var fnGetRandomString = require('../Utils/Randomnumber')
//checking a null or full or repit a insert  of updadat
//Todo:Because not work mvc check here
async function check(findRequest) {
  try {
    let pool = await sql.connect(config)

    let tblPersonal

    if (findRequest[0].PersonId == null &&
      findRequest[0].Name == null &&
      findRequest[0].Family == null &&
      findRequest[0].NationalCode == null &&
      findRequest[0].IdNumber == null &&
      findRequest[0].Sex == null &&
      findRequest[0].BirthPlace == null &&
      findRequest[0].PersonType == null &&
      findRequest[0].PersonPhoto == null &&
      findRequest[0].SecretCode == null) {
      //error null
      return 'the was empty'
    } else {
      console.log(findRequest[0])
      let whereclause = ''

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest[0]) {
        //?check value for insert string or number 
        if (typeof findRequest[0][String(x)] == 'string') {
          console.log(findRequest[0][String(x)])
          whereclause = whereclause + ' ' + `${x} = ` + "'" + findRequest[0][String(x)] + "'" + ` AND `
        } else if (typeof findRequest[0][String(x)] == 'number') {
          whereclause =
            whereclause + ' ' + `${x} =  ${findRequest[0][String(x)]}` + ` AND`
        } else if (findRequest[0][String(x)] == null) {
          whereclause + ' ' + `${x}is null AND`
          // break;
        }
      }
      whereclause = whereclause.slice(0, -4)
      console.log(whereclause + 'this whereclause')
      //check query
      tblPersonal = await pool
        .request()
        .query(
          `SELECT * FROM [CharityDB].[dbo].[tblNeedyAccounts] WHERE ` +
          whereclause
        )

      return tblPersonal.recordsets[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}
// this function is check one Request exampel shaba or passhash
async function checker(namefinder, find) {
  try {
    let pool = await sql.connect(config)
    let checker = await pool.request().query(`
SELECT [${namefinder}]
  FROM [dbo].[tblNeedyAccounts]
  where ${namefinder}=${find}`)

    return checker.recordsets[0]
  } catch (error) {
    console.log(error.message)
  }
}
//TODO: select tblNeedyAccounts
async function ws_loadNeedyAccount(findRequest) {
  try {
    //check connection
    let pool = await sql.connect(config)

    let tblPersonal

    if (
      findRequest[0].NeedyId == null &&
      findRequest[0].NeedyAccountId == null
    ) {
      //!!joining tb tblPersonal & tblCommonBaseData & tblCommonBaseType
      tblPersonal = await pool.request()
        .query(`SELECT [tblNeedyAccounts].*,tblPersonal.NAME ,tblPersonal.Family,tblPersonal.NationalCode,tblCommonBaseData.BaseCode,tblCommonBaseData.BaseValue,tblCommonBaseType.BaseTypeTitle
        FROM [dbo].[tblNeedyAccounts] 
            join tblPersonal
            on tblNeedyAccounts.AccountName=tblPersonal.NAME 
            AND tblNeedyAccounts.AccountName=tblPersonal.Family
            AND tblNeedyAccounts.AccountName=tblPersonal.NationalCode
            join tblCommonBaseData
            on tblNeedyAccounts.AccountNumber=tblCommonBaseData.BaseCode
            AND tblNeedyAccounts.AccountNumber=tblCommonBaseData.BaseValue
            join tblCommonBaseType
            on tblNeedyAccounts.AccountNumber=tblCommonBaseType.BaseTypeTitle
           where BaseTypeCode =N ${findRequest['BaseTypeCode']}`)

      return tblPersonal.recordsets[0]
    } else {
      console.log(findRequest[0])
      let whereclause = ''

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest[0]) {
        //?check value for insert string or number 
        if (typeof findRequest[0][String(x)] == 'string') {
          console.log(findRequest[0][String(x)])
          whereclause = whereclause + ' ' + `${x} = ` + "'" + findRequest[0][String(x)] + "'" + ` AND `
        } else if (typeof findRequest[0][String(x)] == 'number') {
          whereclause =
            whereclause + ' ' + `${x} =  ${findRequest[0][String(x)]}` + ` AND`
        } else if (findRequest[0][String(x)] == null) {
          whereclause + ' ' + `${x}is null AND`
          // break;
        }
      }
      whereclause = whereclause.slice(0, -4)
      console.log(whereclause + 'this whereclause')
      //check query
      tblNeedyAccounts = await pool
        .request()
        .query(
          `SELECT * FROM [CharityDB].[dbo].[tblNeedyAccounts] WHERE ` +
          whereclause
        )
      if (tblNeedyAccounts.recordsets[0] == null) {
        ShebaNumber = await pool
          .request()
          .query(
            `SELECT * FROM [CharityDB].[dbo].[tblNeedyAccounts] WHERE ShebaNumber=${findRequest[0].ShebaNumber}`)

        return ShebaNumber.recordsets[0]

      } else {
        return tblNeedyAccounts.recordsets[0]
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}
//TODO : insert tblNeedyAccounts
async function ws_createNeedyAccount(findRequest) {
  try {
    let number = findRequest[0].AccountNumber + findRequest[0].NeedyId
    let pool = await sql.connect(config)
    let value = ''
    value = value + '' + number + ','
    for (x in findRequest[0]) {
      //? check typeof value for query
      if (
        findRequest[0][String(x)] == null ||
        typeof findRequest[0][String(x)] == 'number'
      ) {
        value = value + ' ' + `${findRequest[0][String(x)]}` + `,`
      } else {
        value = value + ' ' + `` + "'" + findRequest[0][String(x)] + "'" + `,`
      }
    }
    //!! end value have ',' delete
    value = value.slice(0, -1)

    console.log('finsh ' + value)
    let insertTblPersonal = await pool.request().query(
      `INSERT INTO [CharityDB].[dbo].[tblNeedyAccounts]
                      (   [NeedyAccountId]
                        ,[BankId]
                        ,[NeedyId]
                        ,[OwnerName]
                        ,[CardNumber]
                        ,[AccountNumber]
                        ,[AccountName]
                        ,[ShebaNumber]
                      )
                VALUES
                      (` +
      value +
      `)`
    )
    let tblNeedyAccounts = await pool
      .request()
      .query(
        'SELECT * FROM [CharityDB].[dbo].[tblNeedyAccounts] where [NeedyAccountId]=' +
        number
      )
    // console.log(tblPersonal.recordsets + "tblPersonal.recordsets");
    console.log(tblNeedyAccounts.NeedyAccountId)
    return number
  } catch (error) {
    console.log(error.message)
  }
}
async function ws_UpdateNeedyAccount(findRequest) {
  try {
    try {
      //is  like ws_createNeedyAccount
      let updateTblPersonal
      let pool = await sql.connect(config)

      let value = ''

      for (x in findRequest[0]) {
        if (x == 'PersonId') {
        } else if (
          findRequest[0][String(x)] == null ||
          typeof findRequest[0][String(x)] == 'number'
        ) {
          value = value + ' ' + ` ${x} = ${findRequest[0][String(x)]}` + `,`
        } else {
          value =
            value +
            ' ' +
            `${x} = ` +
            "'" +
            findRequest[0][String(x)] +
            "'" +
            `,`
        }
      }

      value = value.slice(0, -1)
      console.log(value)
      updateTblPersonal = await pool.request().query(
        `UPDATE [CharityDB].[dbo].[tblNeedyAccounts]
      SET  ` +
        value +
        ` WHERE NeedyId = ${findRequest[0].NeedyId};`
      )

      updateTblPersonal = await pool
        .request()
        .query(
          `SELECT * FROM [CharityDB].[dbo].[tblNeedyAccounts] where [NeedyAccountId]=` +
          findRequest[0].NeedyAccountId
        )
      return updateTblPersonal.recordsets
    } catch (error) {
      console.log(error.message)
    }
  } catch (error) {
    console.log(error.message)
  }
}
async function ws_deleteNeedyAccount(findRequest) {
  try {
    let pool = await sql.connect(config)

    let deleteTblPersonal
    // let getTblPersonal = await pool.request().query(`select * from [CharityDB].[dbo].[tblPersonal] where PersonId =  ${findRequest.PersonId};`)




    // if(getTblPersonal != ''){

    deleteTblPersonal = await pool.request().query(`DELETE FROM [CharityDB].[dbo].[tblNeedyAccounts] WHERE PersonId = ${findRequest.PersonId};`)

    // }

    return deleteTblPersonal.rowsAffected[0];

  } catch (error) {
    console.log(error.message)
  }
}
module.exports = {
  ws_loadNeedyAccount: ws_loadNeedyAccount,
  check: check,
  checker: checker,
  ws_createNeedyAccount: ws_createNeedyAccount,
  ws_UpdateNeedyAccount: ws_UpdateNeedyAccount,
  ws_deleteNeedyAccount: ws_deleteNeedyAccount
}
