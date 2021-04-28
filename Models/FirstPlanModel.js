var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_loadPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getTblCommonBaseType;

    //show all records

    if (
      (findRequest.PlanName === undefined &&
        findRequest.PlanNature === undefined &&
        findRequest.ParentPlanId === undefined &&
        findRequest.Fdate === undefined &&
        findRequest.Tdate === undefined &&
        findRequest.neededLogin === undefined &&
        findRequest.PlanId === undefined) ||
      (findRequest.PlanName === null &&
        findRequest.PlanNature === null &&
        findRequest.ParentPlanId === null &&
        findRequest.Fdate === null &&
        findRequest.Tdate === null &&
        findRequest.neededLogin === null &&
        findRequest.PlanId === null)
    ) {
      getPayment = await pool.request().query(`SELECT *
   FROM tblPlans `);
      return getPayment.recordsets[0];
    } else {
      //create  whereclause
      let whereclause = "";
      for (x in findRequest) {
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
          whereclause =
            whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
        }
      }

      whereclause = whereclause.slice(0, -3);

      //show records with whereclause

      getTblCommonBaseType = await pool
        .request()
        .query(`select * from tblPlans  where` + whereclause);
      return getTblCommonBaseType.recordsets[0][0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_createPlan(findRequest) {
  try {
    let pool = await sql.connect(config);

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
//!!!!!!!!!!!!!!!!!!به دلیل عکس اینسرت انجام نشد 
    let insertTblCharityAccounts = await pool.request().query(
      `INSERT INTO tblPlans  (PlanName,Description,PlanNature,ParentPlanId,icon,Fdate,Tdate,neededLogin)
            VALUES (` +
        value +
        `)`
    );
    let getTblCharityAccounts = await pool
      .request()
      .query(
        `select PlanId  from tblPlans  where PlanId  =` +
          "'" +
          findRequest["PlanId"] +
          "'"
      );
    return getTblCharityAccounts.recordsets;
  } catch (error) {
    console.log(error.message);
  }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!تست نشده
async function ws_UpdatePlan(findRequest) {
  try {
    let updateTblCharityAccounts;
    let pool = await sql.connect(config);

    let value = "";

    for (x in findRequest) {
      if (
        findRequest[String(x)] == null ||
        typeof findRequest[String(x)] == "number"
      ) {
        value = value + " " + ` ${x} = ${findRequest[String(x)]}` + `,`;
      } else {
        value =
          value + " " + `${x} = N` + "'" + findRequest[String(x)] + "'" + `,`;
      }
    }

    value = value.slice(0, -1);
    updateTblCharityAccounts = await pool.request().query(
      `UPDATE tblPlans
    SET  ` +
        value +
        ` WHERE PlanId = ${findRequest.PlanId};`
    );

    updateTblCharityAccounts = await pool
      .request()
      .query(`select * from tblPlans where PlanId =` + findRequest["PlanId"]);
    return updateTblCharityAccounts.recordsets;
  } catch (error) {
    console.log(error.message);
  }
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!تست نشده
async function ws_deletePlan(findRequest) {
  try {
    let pool = await sql.connect(config);

    let deleteTblCharityAccounts;

    deleteTblCharityAccounts = await pool
      .request()
      .query(`DELETE FROM tblPlans WHERE PlanId = ${findRequest.PlanId};`);

    return deleteTblCharityAccounts.rowsAffected[0];
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  ws_loadPlan: ws_loadPlan,
  ws_createPlan: ws_createPlan,
  ws_UpdatePlan: ws_UpdatePlan,
  ws_deletePlan: ws_deletePlan,
};
