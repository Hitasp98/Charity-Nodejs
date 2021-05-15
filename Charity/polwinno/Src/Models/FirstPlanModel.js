var config = require("../Utils/dbconfig");
const sql = require("mssql");

//ws_loadPlan
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getPlan;

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
    
      getPlan = await pool.request().query(`SELECT *
   FROM tblPlans `);
      return getPlan.recordsets[0];
    } else {
      //create  whereclause
      let whereclause = "";
      for (x in findRequest) {
        if (typeof findRequest[String(x)] == "string" || typeof findRequest[String(x)] == "boolean") {
          whereclause =
            whereclause +
            " " +
            `${x} = N` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND`;
        } else if (typeof findRequest[String(x)] == "number" ) {
          whereclause =
            whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {
          whereclause =
            whereclause + " " + `${x} is null` + ` AND`;
        }
      }

      
      whereclause = await whereclause.slice(0, -3);
   
      //show records with whereclause

      getPlan = await pool
        .request()
        .query(`select * from tblPlans  where` + whereclause);
      return getPlan.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
//ws_createPlan
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_createPlan(findRequest) {
  try {
    let pool = await sql.connect(config);

    let value = "";

    for (x in findRequest) {
      if (
        findRequest[String(x)] == null ||   typeof findRequest[String(x)] == "number") {
        value = value + " " + `${findRequest[String(x)]}` + `,`;
      } else {
        value = value + " " + `N` + "'" + findRequest[String(x)] + "'" + `,`;
      }
    }

    value = await value.slice(0, -1);
    
    let insertTblCharityAccounts = await pool.request().query(
      `INSERT INTO tblPlans  (PlanName,Description,PlanNature,ParentPlanId,icon,Fdate,Tdate,neededLogin)
            VALUES (` +
        value +
        `)`
    );

    let findIndex = {
        PlanName : findRequest.PlanName,
        PlanNature : findRequest.PlanNature,
        ParentPlanId : findRequest.ParentPlanId
    } 
    let getPlan = await ws_loadPlan(findIndex)
     
  
    return getPlan;
  } catch (error) {
    console.log(error.message);
  }
}
//ws_UpdatePlan
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_UpdatePlan(findRequest) {
  try {
    let updateTblPlan;
    let pool = await sql.connect(config);

    let value = "";

    for (x in findRequest) {
      if (x == "PlanId"){

      }else if (
        findRequest[String(x)] == null || typeof findRequest[String(x)] == "number" ) {
        value = value + " " + ` ${x} = ${findRequest[String(x)]}` + `,`;
      }else{
        value =
          value + " " + `${x} = N` + "'" + findRequest[String(x)] + "'" + `,`;
      }

    }

    value = await value.slice(0, -1);
    
    updateTblPlan = await pool.request().query(
      `UPDATE tblPlans
    SET  ` +
        value +
        ` WHERE PlanId = ${findRequest.PlanId};`
    );

    updateTblPlan = await pool
      .request()
      .query(`select * from tblPlans where PlanId =` + findRequest["PlanId"]);
    return updateTblPlan.recordsets;
  } catch (error) {
    console.log(error.message);
  }
}
//ws_deletePlan
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_deletePlan(findRequest) {
  try {
    let pool = await sql.connect(config);

    let deletePlan;

    deletePlan = await pool
      .request()
      .query(`DELETE FROM tblPlans WHERE PlanId = ${findRequest.PlanId};`);

    return deletePlan.rowsAffected[0];
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