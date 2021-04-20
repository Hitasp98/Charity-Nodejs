var config = require("../Utils/config");
const sql = require("mssql");
const { request } = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
const { json } = require("body-parser");
var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_loadPersonal(findRequest) {
  try {
    let pool = await sql.connect(config);

    let tblPersonal;

    if (
      ( findRequest.PersonId == undefined &&
        findRequest.Name == undefined &&
        findRequest.Family == undefined &&
        findRequest.NationalCode == undefined &&
        findRequest.IdNumber == undefined &&
        findRequest.Sex == undefined &&
        findRequest.BirthPlace == undefined &&
        findRequest.PersonType == undefined &&
        findRequest.PersonPhoto == undefined &&
        findRequest.SecretCode == undefined &&
        findRequest.BirthDate == undefined)
      ||
      (findRequest.PersonId == null &&
      findRequest.Name == null &&
      findRequest.Family == null &&
      findRequest.NationalCode == null &&
      findRequest.IdNumber == null &&
      findRequest.Sex == null &&
      findRequest.BirthPlace == null &&
      findRequest.PersonType == null &&
      findRequest.PersonPhoto == null &&
      findRequest.SecretCode == null &&
      findRequest.BirthDate == null)
    ) {
      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM CharityDB.dbo.tblPersonal`);

      return tblPersonal.recordsets[0];
    } else {
      // if (chose == '1') {
      let pool = await sql.connect(config)

      console.log(findRequest);
      let whereclause = "";

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest) {
        //getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
        if (typeof findRequest[String(x)] == "string") {
          console.log(findRequest[String(x)]);

          whereclause =
            whereclause +
            " " +
            `${x} = ` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND `;

        } else if (typeof findRequest[String(x)] == "number") {
          if (x == 'PersonType') {
            // whereclause + " " + `${x}is null AND`;
            console.log(findRequest[String(x)] + "findRequest[0][String(x)]1")
            break;

          }
          whereclause =
            whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {

          whereclause + " " + `${x}is null AND`;
          console.log(findRequest[String(x)] + "findRequest[0][String(x)]")
          // break;

        }
      }


      whereclause = whereclause.slice(0, -4);
      console.log(whereclause + "this whereclause");

      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM [dbo].[tblPersonal] WHERE ` + whereclause);
      console.log(tblPersonal.recordsets[0] + 'tblPersonal')

      if (tblPersonal.recordsets[0] == '') {
        let checker = await pool.request().query(`SELECT PersonType  FROM [dbo].[tblPersonal]
          where PersonType=HASHBYTES('SHA2_256','${findRequest.PersonType}')`)
        console.log(checker.recordsets + "checker.recordsets[0]")

        return checker.recordsets[0]
      }else {
        return tblPersonal.recordsets[0]
      }

    }


  } catch (error) {
    console.log(error.message);
  }
}
async function ws_createPersonal(findRequest) {
  try {
    console.log(findRequest)
    let number = fnGetRandomString.fnGetRandomString(3);
    number = parseInt(number);
    let pool = await sql.connect(config);
    let value = "";
    value = value + "" + number + ",";
    for (x in findRequest) {
      if (
        findRequest[String(x)] == null ||
        typeof findRequest[String(x)] == "number"
      ) {
        if (x == 'PersonType') {
          value = value + "HASHBYTES('SHA2_256','" + `${findRequest[String(x)]}` + `'),`;

        }
         else {
          value = value + " " + `${findRequest[String(x)]}` + `,`;
        }
      
      } else {
        if(x == 'PersonPhoto'){
          console.log('test ====================================PersonPhoto')
  
          value = value + "CONVERT(VARBINARY(MAX),'"+findRequest[String(x)]+"')," ;
          console.log(value)

        }else {
        value = value + " " + `` + "'" + findRequest[String(x)] + "'" + `,`;}
      }
    }

    value = value.slice(0, -1);
    console.log('finsh ' + value)
    let insertTblPersonal = await pool.request().query(
      `INSERT INTO [CharityDB].[dbo].[tblPersonal]
                      (  PersonId
                        ,NAME
                        ,Family
                        ,NationalCode
                        ,IdNumber
                        ,sex
                        ,BirthDate
                        ,BirthPlace
                        ,PersonType
                        ,PersonPhoto
                        ,SecretCode
                      )
                VALUES (` + value +`)`
    );
    let tblPersonal = await pool
      .request()
      .query(
        'SELECT * FROM [CharityDB].[dbo].[tblPersonal] where PersonId=' + number);
    // console.log(tblPersonal.recordsets + "tblPersonal.recordsets");
    console.log(tblPersonal.PersonId)
    return number;
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_updatePersonal(findRequest) {
  try {
    console.log('test edit1'  )

      let updateTblPersonal
      let pool = await sql.connect(config)


      let value = ''

      for (x in findRequest) {
        if (x == "PersonId") {

        } else if (findRequest[String(x)] == null || typeof (findRequest[String(x)]) == "number") {

          value = value + " " + ` ${x} = ${findRequest[String(x)]}` + `,`

        } else {
          value = value + " " + `${x} = ` + '\'' + findRequest[String(x)] + '\'' + `,`

        }

      }

      value = value.slice(0, -1)
      console.log(value)
      updateTblPersonal = await pool.request().query(`UPDATE [dbo].[tblPersonal]
      SET  ` + value +
        ` WHERE PersonId = ${findRequest.PersonId};`)


      console.log(findRequest + "findRequest[PersonId]")
      updateTblPersonal = await pool.request().query(`SELECT * FROM [CharityDB].[dbo].[tblPersonal] where PersonId=` + findRequest.PersonId)
      return updateTblPersonal.recordsets;

  } catch (error) {
    console.log(error.message);
  }
}
async function ws_deletePersonal(findRequest) {
  try {
    let pool = await sql.connect(config)
        
    let deleteTblPersonal
    // let getTblPersonal = await pool.request().query(`select * from [CharityDB].[dbo].[tblPersonal] where PersonId =  ${findRequest.PersonId};`)
    
    
    

    // if(getTblPersonal != ''){
        
      deleteTblPersonal = await pool.request().query(`DELETE FROM [CharityDB].[dbo].[tblPersonal] WHERE PersonId = ${findRequest.PersonId};`)
           
        // }
      
        return deleteTblPersonal.rowsAffected[0];



   } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  ws_loadPersonal: ws_loadPersonal,
  
  ws_createPersonal: ws_createPersonal,
  ws_updatePersonal: ws_updatePersonal,
  ws_deletePersonal: ws_deletePersonal,
};