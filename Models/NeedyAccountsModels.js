//NeedyAccountsModels

var config = require('../Utils/config')
const sql = require('mssql')



var fnGetRandomString = require('../Utils/Randomnumber')




//checking a null or full or repit a insert  of updadat
//Todo:Because not work mvc check here
async function check(findRequest) {
  try {
    let pool = await sql.connect(config)

    let tblPersonal

    if (findRequest.PersonId == null &&
      findRequest.Name == null &&
      findRequest.Family == null &&
      findRequest.NationalCode == null &&
      findRequest.IdNumber == null &&
      findRequest.Sex == null &&
      findRequest.BirthPlace == null &&
      findRequest.PersonType == null &&
      findRequest.PersonPhoto == null &&
      findRequest.SecretCode == null) {


      //error null
      return 'the was empty'



    } else {
      ShebaNumber = await pool
        .request()
        .query(
          `SELECT * FROM [tblNeedyAccounts] WHERE ShebaNumber=${findRequest.ShebaNumber}`)


      if (ShebaNumber.recordsets[0] != null) {

        return ShebaNumber.recordsets[0]

      }   else {  
        let whereclause = ''
        console.log('tblNeedyAccounts.recordsets')

        //Todo: find value on proprty with string or number ||null and add to whereclause build query
        for (x in findRequest) {
          //?check value for insert string or number 
          if (typeof findRequest[String(x)] == 'string') {
        
            whereclause = whereclause + ' ' + `${x} = ` + "'" + findRequest[String(x)] + "'" + ` AND `
          } else if (typeof findRequest[String(x)] == 'number') {
            whereclause =
              whereclause + ' ' + `${x} =  ${findRequest[String(x)]}` + ` AND`
          } else if (findRequest[String(x)] == null) {
            whereclause + ' ' + `${x}is null AND`
            // break;
          }
        }
        whereclause = whereclause.slice(0, -4)
        //check query
        console.log('tblNeedyAccounts.recordsets')

        console.log('tblNeedyAccounts.recordsets')
        tblNeedyAccounts = await pool
          .request()
          .query(
            `SELECT * FROM [tblNeedyAccounts] WHERE ` +
            whereclause
          )


        return tblNeedyAccounts.recordsets[0]
      }
    }
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
      (findRequest.BankId == null &&
        findRequest.AccountNumber == null) ||
      (findRequest.BankId == undefined &&
        findRequest.AccountNumber == undefined)
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
           where BaseTypeCode = ${findRequest.BaseTypeCode}`)


      return tblPersonal.recordsets[0]


    } else {



      let whereclause = ''
      console.log('tblNeedyAccounts.recordsets')

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest) {



        //?check value for insert string or number 
        if (typeof findRequest[String(x)] == 'string') {



          whereclause = whereclause + ' ' + `${x} = ` + "'" + findRequest[String(x)] + "'" + ` AND `



        } else if (typeof findRequest[String(x)] == 'number') {



          whereclause =
            whereclause + ' ' + `${x} =  ${findRequest[String(x)]}` + ` AND`



        } else if (findRequest[String(x)] == null) {



          whereclause + ' ' + `${x}is null AND`



        }
      }
      whereclause = whereclause.slice(0, -4)






      tblNeedyAccounts = await pool
        .request()
        .query(
          `SELECT * FROM [tblNeedyAccounts] WHERE ` +
          whereclause
        )
      console.log(tblNeedyAccounts.recordsets[0] + 'tblNeedyAccounts.recordsets')



      if (tblNeedyAccounts.recordsets[0] == null) {


        ShebaNumber = await pool
          .request()
          .query(
            `SELECT * FROM [tblNeedyAccounts] WHERE ShebaNumber=${findRequest.ShebaNumber}`)



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

let number =Math.floor(Math.random()*999)+100


    let pool = await sql.connect(config)
    let value = ''
    value = value + '' + number + ','


    for (x in findRequest) {



      //? check typeof value for query
      if (findRequest[String(x)] == null ||
        typeof findRequest[String(x)] == 'number'
      ) {

        value = value + ' ' + `${findRequest[String(x)]}` + `,`

      } else {

        value = value + ' ' + `` + "'" + findRequest[String(x)] + "'" + `,`

      }
    }
    //!! end value have ',' delete
    value = value.slice(0, -1)

    console.log('finsh ' + value)
    let insertTblPersonal = await pool.request().query(
      `INSERT INTO [tblNeedyAccounts]
                      ( NeedyAccountId,  
                        BankId,
                        NeedyId,
                        OwnerName,
                        CardNumber,
                        AccountNumber,
                        AccountName,
                       ShebaNumber
                      )
                       VALUES
                      (` +
      value +
      `)`
    )

    let tblNeedyAccounts = await pool
      .request()
      .query(
        'SELECT * FROM [tblNeedyAccounts] where [NeedyAccountId]=' +
        number
      )

    return tblNeedyAccounts.recordsets[0][0]

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


      for (x in findRequest) {
      
        if (
          findRequest[String(x)] == null ||
          typeof findRequest[String(x)] == 'number'
        ) {

          value = value + ' ' + ` ${x} = ${findRequest[String(x)]}` + `,`
        } else {
          value =
            value +
            ' ' +
            `${x} = ` +
            "'" +
            findRequest[String(x)] +
            "'" +
            `,`
        }
      }

      value = value.slice(0, -1)



      updateTblPersonal = await pool.request().query(
        `UPDATE [tblNeedyAccounts]
      SET  ` +
        value +
        ` WHERE NeedyAccountId = ${findRequest.NeedyAccountId};`
      )



      updateTblPersonal = await pool
        .request()
        .query(
          `SELECT * FROM [tblNeedyAccounts] where [NeedyAccountId]=` +
          findRequest.NeedyAccountId
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

    deleteTblPersonal = await pool.request().query(`DELETE FROM [tblNeedyAccounts] WHERE NeedyAccountId = ${findRequest.NeedyAccountId};`)

    // }

    return deleteTblPersonal.rowsAffected[0];

  } catch (error) {
    console.log(error.message)
  }
}




module.exports = {
  check: check,
  ws_loadNeedyAccount: ws_loadNeedyAccount,
  ws_createNeedyAccount: ws_createNeedyAccount,
  ws_UpdateNeedyAccount: ws_UpdateNeedyAccount,
  ws_deleteNeedyAccount: ws_deleteNeedyAccount
}
