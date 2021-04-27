var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_loadNeedyForPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getTblCommonBaseType;

    //show all records

    if (
      (findRequest.NeedyId === undefined &&
        findRequest.PlanId === undefined &&
        findRequest.AssignNeedyPlanId === undefined) ||
      (findRequest.NeedyId === null &&
        findRequest.PlanId === null &&
        findRequest.AssignNeedyPlanId === null)
    ) {
      getPayment = await pool.request().query(`SELECT tblCashAssistanceDetail.*,tblPersonal.PersonId,tblPlans.PlanId
      FROM tblCashAssistanceDetail  
      join tblPersonal
      on tblCashAssistanceDetail. = tblPersonal.PersonId
      join tblPlans
      on tblPersonal.PersonId= tblPlans.PlanId `);
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
        .query(`SELECT tblCashAssistanceDetail.*,tblPersonal.PersonId,tblPlans.PlanId
        FROM tblCashAssistanceDetail  
        join tblPersonal
        on tblCashAssistanceDetail.PlanId = tblPersonal.PersonId
        join tblPlans
        on tblPersonal.PersonId= tblPlans.PlanId+  where` + whereclause);
      return getTblCommonBaseType.recordsets[0][0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_AssignNeedyToPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_deleteNeedyFromPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  ws_loadNeedyForPlan: ws_loadNeedyForPlan,
  ws_AssignNeedyToPlan: ws_AssignNeedyToPlan,
  ws_deleteNeedyFromPlan: ws_deleteNeedyFromPlan,
};
