var config = require('../Utils/dbconfig')
const sql = require('mssql')







//TODO: select tblNeedyAccounts
async function ws_loadNeedyAccount(findRequest) {
  try {



    //check connection
    let pool = await sql.connect(config)

    let tblNeedyAccounts 

    if (
      (
        findRequest.NeedyAccountId === null &&  
        findRequest.BankId === null &&
        findRequest.NeedyId === null &&
        findRequest.OwnerName === null && 
        findRequest.CardNumber === null &&
        findRequest.AccountNumber === null &&
        findRequest.AccountName === null &&
        findRequest.ShebaNumber === null
        ) ||
      (
        findRequest.NeedyAccountId === undefined &&   
        findRequest.BankId === undefined &&
        findRequest.NeedyId === undefined &&
        findRequest.OwnerName === undefined && 
        findRequest.CardNumber === undefined &&
        findRequest.AccountNumber === undefined &&
        findRequest.AccountName === undefined &&
        findRequest.ShebaNumber === undefined)
    ) {
      //!!joining tb tblPersonal & tblCommonBaseData & tblCommonBaseType
      tblPersonal = await pool.request()
        .query(`SELECT tblNeedyAccounts.*,tblPersonal.PersonId , tblCommonBaseData.CommonBaseDataId,tblCommonBaseType.BaseTypeCode
            FROM tblNeedyAccounts
            join tblPersonal
            on tblNeedyAccounts.NeedyId = tblPersonal.PersonId
            join tblCommonBaseData
            on tblNeedyAccounts.BankId = tblCommonBaseData.CommonBaseDataId
            join tblCommonBaseType
            on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId
            where BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\'')


      return tblPersonal.recordsets[0]


    } else {



      let whereclause = ` BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\''+` AND`
      

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest) {



        //?check value for insert string or number 
        if (typeof findRequest[String(x)] == 'string') {



          whereclause = whereclause + ' ' + `${x} = ` + "'" + findRequest[String(x)] + "'" + ` AND `



        } else if (typeof findRequest[String(x)] == 'number') {



          whereclause = whereclause + ' ' + `${x} =  ${findRequest[String(x)]}` + ` AND`



        } else if (findRequest[String(x)] == null) {



          whereclause + ' ' + `${x} is null AND`



        }
      }
      whereclause = whereclause.slice(0, -4)






      tblNeedyAccounts = await pool
        .request()
        .query(
          `SELECT tblNeedyAccounts.*,tblPersonal.PersonId , tblCommonBaseData.CommonBaseDataId,tblCommonBaseType.BaseTypeCode
          FROM tblNeedyAccounts
          join tblPersonal
          on tblNeedyAccounts.NeedyId = tblPersonal.PersonId
          join tblCommonBaseData
          on tblNeedyAccounts.BankId = tblCommonBaseData.CommonBaseDataId
          join tblCommonBaseType
          on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId
          where `+ whereclause
        )
     
      return tblNeedyAccounts.recordsets[0] 

    }
  } catch (error) {


    console.log(error.message)


  }

}



//TODO : insert tblNeedyAccounts
async function ws_createNeedyAccount(findRequest) {
try {




    let pool = await sql.connect(config)
    let value = ''
    


    for (x in findRequest) {



      // check typeof value for query
      if (findRequest[String(x)] == null || typeof findRequest[String(x)] == 'number') {

        value = value + ' ' + `${findRequest[String(x)]}` + `,`

      } else {

        value = value + ' '+ "N'" + findRequest[String(x)] + "'" + `,`

      }
    }
    //!! end value have ',' delete
    value = await value.slice(0, -1)

   
    let insertTblPersonal = await pool.request().query(
      `INSERT INTO tblNeedyAccounts
                      (   
                        BankId,
                        NeedyId,
                        OwnerName,
                        CardNumber,
                        AccountNumber,
                        AccountName,
                       ShebaNumber
                      )
                      VALUES (`+ value +`)`
    )

    let tblNeedyAccounts = await pool
      .request()
      .query(
        'SELECT * FROM tblNeedyAccounts where ShebaNumber ='+ '\''+ findRequest["ShebaNumber"] +'\'')

    return tblNeedyAccounts.recordsets

  } catch (error) {
    console.log(error.message)
  }
}



async function ws_UpdateNeedyAccount(findRequest) {
  
    try {

      //is  like ws_createNeedyAccount
      let updateTblPersonal
      let pool = await sql.connect(config)

      let value = ''


      for (x in findRequest) {
      if(x == "NeedyAccountId"){

      }else if (
          findRequest[String(x)] == null || typeof findRequest[String(x)] == 'number') {

          value = value + ' ' + ` ${x} = ${findRequest[String(x)]}` + `,`
        } else {
          value = value + ' ' + `${x} = ` + "N'" + findRequest[String(x)] + "'" + `,`
        }
      }

      value = await value.slice(0, -1)


console.log(value);
      updateTblPersonal = await pool.request().query(
        `UPDATE tblNeedyAccounts
      SET  ` + value +
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
 
}



async function ws_deleteNeedyAccount(findRequest) {
  try {
    let pool = await sql.connect(config)

    let deleteTblPersonal
    // let getTblPersonal = await pool.request().query(`select * from [CharityDB].[dbo].[tblPersonal] where PersonId =  ${findRequest.PersonId};`)




    // if(getTblPersonal != ''){

    deleteTblPersonal = await pool.request().query(`DELETE FROM tblNeedyAccounts WHERE NeedyAccountId = ${findRequest.NeedyAccountId};`)

    // }

    return deleteTblPersonal.rowsAffected[0];

  } catch (error) {
    console.log(error.message)
  }
}




module.exports = {
  
  ws_loadNeedyAccount: ws_loadNeedyAccount,
  ws_createNeedyAccount: ws_createNeedyAccount,
  ws_UpdateNeedyAccount: ws_UpdateNeedyAccount,
  ws_deleteNeedyAccount: ws_deleteNeedyAccount
}