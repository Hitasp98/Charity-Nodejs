var config = require("../Utils/config");
const sql = require("mssql");
async function ws_loadPersonal(findRequest) {
  try {
    let pool = await sql.connect(config);

    let tblPersonal;

    if (
      findRequest.PersonId == null &&
      findRequest.Name == null &&
      findRequest.Family == null &&
      findRequest.NationalCode == null &&
      findRequest.IdNumber == null &&
      findRequest.Sex == null &&
      findRequest.BirthPlace == null &&
      findRequest.PersonType == null &&
      findRequest.PersonPhoto == null &&
      findRequest.SecretCode == null
    ) {
      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM CharityDB.dbo.tblPersonal`);

      return tblPersonal.recordsets[0];
    } else {
      let whereclause =
        ` PersonId =N` + "'" + findRequest.PersonId + "'" + ` AND`;
    
        //Todo: find value on proprty with string or number ||null and add to whereclause build query
        for (x in findRequest) {
          //getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
          if (typeof findRequest[String(x)] == "string") {
            whereclause =
              whereclause +
              " " +
              `${x} = N` +
              "'" +
              findRequest[String(x)] +
              "'" +
              ` AND`;
          } else if (typeof findRequest[String(x)] == "number") {
            whereclause =
              whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
          } else if (findRequest[String(x)] == null) {
            // Todo:for in baseinfo3 give the null value
            whereclause =
              whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
          }
        }
        whereclause = whereclause.slice(0, -3);
        tblPersonal = await pool
          .request()
          .query(
            `SELECT * FROM CharityDB.dbo.tblPersonal WHERE ` + whereclause
          );
        return tblPersonal.recordsets[0];
    
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_createPersonal(findRequest) {
  try {
    let pool = await sql.connect(config);

    let getRequest = [];

    let value = "";

    for (x in findRequest) {
      if (
        findRequest[String(x)] == null ||
        typeof findRequest[String(x)] == "number"
      ) {
        value = value + " " + `${findRequest[String(x)]}` + `,`;
      } else {
        value = value + " " + `N` + "'" + findRequest[String(x)] + "'" + `,`;
      }
    }

    value = value.slice(0, -1);

    let insertTblCharityAccounts = await pool.request().query(
      `INSERT INTO dbo.tblPersonal
      (PersonId
      ,NAME
      ,Family
      ,NationalCode
      ,IdNumber
      ,sex
      ,BirthDate
      ,BirthPlace
      ,PersonType
      ,PersonPhoto
      ,SecretCode)
VALUES
      (`+value +`)`
    );
    let tblPersonal = await pool
      .request()
      .query(
        `select tblPersonal.NationalCode from tblPersonal where PersonId  =` +
          "'" +
          findRequest["PersonId "] +
          "'"
      );
    tblPersonal.recordsets;
    if (tblPersonal.recordsets[0] != null) {
      return tblPersonal.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_updatePersonal(findRequest) {
  try {
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_deletePersonal(findRequest) {
  try {
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
