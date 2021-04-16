var config = require("../Utils/config");
const sql = require("mssql");
const { request } = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
const { json } = require("body-parser");
var fnGetRandomString = require("../Utils/Randomnumber");
async function check(findRequest) {
  try {
    let pool = await sql.connect(config);

    let tblPersonal;

    if (
      findRequest[0].PersonId == null &&
      findRequest[0].Name == null &&
      findRequest[0].Family == null &&
      findRequest[0].NationalCode == null &&
      findRequest[0].IdNumber == null &&
      findRequest[0].Sex == null &&
      findRequest[0].BirthPlace == null &&
      findRequest[0].PersonType == null &&
      findRequest[0].PersonPhoto == null &&
      findRequest[0].SecretCode == null
    ) {
      return "the was empty";
    } else {

      console.log(findRequest[0]);
      let whereclause = "";

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest[0]) {
        //getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
        if (typeof findRequest[0][String(x)] == "string") {
          console.log(findRequest[0][String(x)]);
          whereclause =
            whereclause +
            " " +
            `${x} = ` +
            "'" +
            findRequest[0][String(x)] +
            "'" +
            ` AND `;
        } else if (typeof findRequest[0][String(x)] == "number") {

          whereclause =
            whereclause + " " + `${x} =  ${findRequest[0][String(x)]}` + ` AND`;
        } else if (findRequest[0][String(x)] == 'sex') {
          // whereclause + " " + `${x}is null AND`;
          break;
          // break;
        }
      }
      whereclause = whereclause.slice(0, -4);
      console.log(whereclause + "this whereclause");

      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM CharityDB.dbo.tblPersonal WHERE ` + whereclause);


      return tblPersonal.recordsets[0];

    }
  } catch (error) {
    console.log(error.message);
  }
}
async function checker(namefinder, find) {
  try {

    let pool = await sql.connect(config)
    let checker = await pool.request().query(`SELECT [${namefinder}]  FROM [dbo].[tblPersonal]
      where ${namefinder}=HASHBYTES('SHA2_256','${find}')`)

    return checker.recordsets[0]
  } catch (error) {
    console.log(error.message)
  }
}
async function ws_loadPersonal(chose, findRequest) {
  try {
    let pool = await sql.connect(config);

    let tblPersonal;

    if (
      findRequest[0].PersonId == null &&
      findRequest[0].Name == null &&
      findRequest[0].Family == null &&
      findRequest[0].NationalCode == null &&
      findRequest[0].IdNumber == null &&
      findRequest[0].Sex == null &&
      findRequest[0].BirthPlace == null &&
      findRequest[0].PersonType == null &&
      findRequest[0].PersonPhoto == null &&
      findRequest[0].SecretCode == null &&
      findRequest[0].BirthDate == null
    ) {
      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM CharityDB.dbo.tblPersonal`);

      return tblPersonal.recordsets[0];
    } else {
      if (chose == '1') {
        let pool = await sql.connect(config)
        let checker = await pool.request().query(`SELECT PersonType  FROM [dbo].[tblPersonal]
          where PersonType=HASHBYTES('SHA2_256','${findRequest[0].PersonType}')`)
        console.log(checker.recordsets + "checker.recordsets[0]")
        if (checker.recordsets[0] == '') {
          console.log(findRequest[0]);
          let whereclause = "";

          //Todo: find value on proprty with string or number ||null and add to whereclause build query
          for (x in findRequest[0]) {
            //getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
            if (typeof findRequest[0][String(x)] == "string") {
              console.log(findRequest[0][String(x)]);
              
              whereclause =
                whereclause +
                " " +
                `${x} = ` +
                "'" +
                findRequest[0][String(x)] +
                "'" +
                ` AND `;
               
            } else if (typeof findRequest[0][String(x)] == "number") {
              if (x== 'PersonType') {
                // whereclause + " " + `${x}is null AND`;
                console.log(findRequest[0][String(x)]+"findRequest[0][String(x)]1")
                break;
  
              }  
              whereclause =
                whereclause + " " + `${x} =  ${findRequest[0][String(x)]}` + ` AND`;
            } else if (findRequest[0][String(x)] == 'PersonType') {
             
              // whereclause + " " + `${x}is null AND`;
              console.log(findRequest[0][String(x)]+"findRequest[0][String(x)]")
              break;

            }
          }
          whereclause = whereclause.slice(0, -4);
          console.log(whereclause + "this whereclause");

          tblPersonal = await pool
            .request()
            .query(`SELECT * FROM [dbo].[tblPersonal] WHERE ` + whereclause);
          console.log(tblPersonal.recordsets[0]+'test')

          return tblPersonal.recordsets[0];
        } else {
          console.log('error persontype')
        }
      }
      else if (chose == '0') {
        let whereclause =
          ` PersonId =N` + "'" + findRequest[0].PersonId + "'" + ` AND`;

        //Todo: find value on proprty with string or number ||null and add to whereclause build query
        for (x in findRequest) {
          if (typeof findRequest[0][String(x)] == "string") {
            console.log(findRequest[0][String(x)]);
            whereclause =
              whereclause +
              " " +
              `${x} = N` +
              "'" +
              findRequest[0][String(x)] +
              "'" +
              ` AND`;
          } else if (typeof findRequest[String(x)] == "number") {

            whereclause =
              whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
          } else if (findRequest[String(x)] == null) {
            // Todo:for in Needly give the null value
            whereclause =
              whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
          }
        }
        whereclause = whereclause.slice(0, -3);
        tblPersonal = await pool
          .request()
          .query(`SELECT * FROM CharityDB.dbo.tblPersonal WHERE ` + whereclause);

        if (tblPersonal == "") {
          return null;
        } else {

          return tblPersonal.recordsets[0];
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_createPersonal(findRequest) {
  try {
    let number = fnGetRandomString.fnGetRandomString(3);
    number = parseInt(number);
    let pool = await sql.connect(config);
    let value = "";
    value = value + "" + number + ",";
    for (x in findRequest[0]) {
      if (
        findRequest[0][String(x)] == null ||
        typeof findRequest[0][String(x)] == "number"
      ) {
        if (x == 'PersonType') {
          value = value + "HASHBYTES('SHA2_256','" + `${findRequest[0][String(x)]}` + `'),`;

        } else {
          value = value + " " + `${findRequest[0][String(x)]}` + `,`;
        }
      } else {

        value = value + " " + `` + "'" + findRequest[0][String(x)] + "'" + `,`;
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
                VALUES
                      (` +
      value +
      `)`
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
    try {
      let updateTblPersonal
      let pool = await sql.connect(config)


      let value = ''

      for (x in findRequest[0]) {
        if (x == "PersonId") {

        } else if (findRequest[0][String(x)] == null || typeof (findRequest[0][String(x)]) == "number") {

          value = value + " " + ` ${x} = ${findRequest[0][String(x)]}` + `,`

        } else {
          value = value + " " + `${x} = ` + '\'' + findRequest[0][String(x)] + '\'' + `,`

        }

      }

      value = value.slice(0, -1)
      console.log(value)
      updateTblPersonal = await pool.request().query(`UPDATE [dbo].[tblPersonal]
      SET  ` + value +
        ` WHERE PersonId = ${findRequest[0].PersonId};`)


      console.log(findRequest[0] + "findRequest[PersonId]")
      updateTblPersonal = await pool.request().query(`SELECT * FROM [CharityDB].[dbo].[tblPersonal] where PersonId=` + findRequest[0].PersonId)
      return updateTblPersonal.recordsets;

    } catch (error) {
      console.log(error.message);

    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_deletePersonal(findRequest) {
  try { } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  ws_loadPersonal: ws_loadPersonal,
  check: check,
  checker: checker,
  ws_createPersonal: ws_createPersonal,
  ws_updatePersonal: ws_updatePersonal,
  ws_deletePersonal: ws_deletePersonal,
};