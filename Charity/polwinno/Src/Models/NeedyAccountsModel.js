var config = require('../Utils/dbconfig')
const sql = require('mssql')







//ws_loadNeedyAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadNeedyAccount(findRequest) {
  try {



    //check connection
    let pool = await sql.connect(config)

    let tblNeedyAccounts 

    if (
      (
        findRequest.NeedyAccountId === null &&  
        findRequest.NeedyId === null 
       
        ) ||
      (
        findRequest.NeedyAccountId === undefined &&   
       
        findRequest.NeedyId === undefined 
      
    ) ){
      //joining tb tblPersonal & tblCommonBaseData & tblCommonBaseType
      tblPersonal = await pool.request()
        .query(`SELECT tblNeedyAccounts.*,tblPersonal.PersonId , tblCommonBaseData.CommonBaseDataId,tblCommonBaseType.BaseTypeCode
            FROM tblNeedyAccounts
            inner join tblPersonal
            on tblNeedyAccounts.NeedyId = tblPersonal.PersonId
            inner join tblCommonBaseData
            on tblNeedyAccounts.BankId = tblCommonBaseData.CommonBaseDataId
            join tblCommonBaseType
            on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId
            where BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\'' + `and personType = 2 `)


      return tblPersonal.recordsets[0]


    } else {



      let whereclause = ` BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\''+` AND personType = 2 AND `
      

      //find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest) {



        //?check value for insert string or number 
        if (typeof findRequest[String(x)] == 'string') {



          whereclause = whereclause + ' ' + `${x} = N` + "'" + findRequest[String(x)] + "'" + ` AND `



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



//insert tblNeedyAccounts
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

//ws_UpdateNeedyAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_UpdateNeedyAccount(findRequest) {
  
    try {

     
      let updateNeedyAccounts
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



      updateNeedyAccounts = await pool.request().query(
        `UPDATE tblNeedyAccounts
      SET  ` + value +
        ` WHERE NeedyAccountId = ${findRequest.NeedyAccountId};`
      )



      updateNeedyAccounts = await pool
        .request()
        .query(
          `SELECT * FROM [tblNeedyAccounts] where [NeedyAccountId]=` +
          findRequest.NeedyAccountId
        )


      return updateNeedyAccounts.recordsets




    } catch (error) {


      console.log(error.message)


    }
 
}

//ws_deleteNeedyAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_deleteNeedyAccount(findRequest) {
  try {
    let pool = await sql.connect(config)

    let deleteTblNeedyAccounts
    

      deleteTblNeedyAccounts = await pool.request().query(`DELETE FROM tblNeedyAccounts WHERE NeedyAccountId = ${findRequest.NeedyAccountId};`)

  

    return deleteTblNeedyAccounts.rowsAffected[0];

  } catch (error) {
    console.log(error.message)
  }
}

//check Needy account (just get Needy account table)
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function checkNeedyAccount(findRequest) {
  try {

    let pool = await sql.connect(config)

    let tblNeedyAccounts 

      let whereclause = ""
      
      //create whereclause
      for (x in findRequest) {



        //?check value for insert string or number 
        if (typeof findRequest[String(x)] == 'string') {



          whereclause = whereclause + ' ' + `${x} = N` + "'" + findRequest[String(x)] + "'" + ` AND `



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
          `SELECT *
          FROM tblNeedyAccounts
          where `+ whereclause
        )
     
      return tblNeedyAccounts.recordsets[0] 

    
  } catch (error) {


    console.log(error.message)


  }

}


module.exports = {
  ws_loadNeedyAccount: ws_loadNeedyAccount,
  checkNeedyAccount : checkNeedyAccount,
  ws_createNeedyAccount: ws_createNeedyAccount,
  ws_UpdateNeedyAccount: ws_UpdateNeedyAccount,
  ws_deleteNeedyAccount: ws_deleteNeedyAccount
}