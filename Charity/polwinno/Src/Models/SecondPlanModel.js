var config = require("../Utils/dbconfig");
const sql = require("mssql");





async function ws_loadNeedyForPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getAssignNeedyToPlans;

    //show all records


    if (
      (findRequest.NeedyId === undefined &&
        findRequest.PlanId === undefined &&
        findRequest.AssignNeedyPlanId === undefined 
        
       ) ||
      (findRequest.NeedyId === null &&
        findRequest.PlanId === null &&
        findRequest.AssignNeedyPlanId === null 
       
        )
    ) {
     
      getAssignNeedyToPlans = await pool.request()
        .query(`SELECT tblAssignNeedyToPlans.*
        FROM tblAssignNeedyToPlans   
        join tblPersonal
        on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
        join tblPlans
        on tblAssignNeedyToPlans.PlanId= tblPlans.PlanId 
        where personType = 2`);
      return getAssignNeedyToPlans.recordsets[0];
    } else {
      //create  whereclause
    
      let whereclause = " PersonType = 2 AND ";
      for (x in findRequest) {
        if (typeof findRequest[String(x)] == "string") {
          whereclause =
            whereclause +
            " " +
            `tblAssignNeedyToPlans.${x} = N` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND`;
        } else if (typeof findRequest[String(x)] == "number") {
          whereclause =
            whereclause + " " + `tblAssignNeedyToPlans.${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {
          whereclause =
            whereclause + " " + `tblAssignNeedyToPlans.${x} =  ${findRequest[String(x)]}` + ` AND`;
        }
      }

      whereclause = whereclause.slice(0, -3);
    
      //show records with whereclause
      

      getAssignNeedyToPlans = await pool.request().query(
        `SELECT tblAssignNeedyToPlans.*
        FROM tblAssignNeedyToPlans   
        join tblPersonal
        on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
        join tblPlans
        on tblAssignNeedyToPlans.PlanId= tblPlans.PlanId
	    	 where ` + whereclause
      );
    
      return getAssignNeedyToPlans.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
//ws_AssignNeedyToPlan
/////////////////////////////////////////////////////////////////////////////////////////////////////////
 
async function ws_AssignNeedyToPlan(findRequest) {
  try {
    let pool = await sql.connect(config);
    
    let values = "";
    for(let i=0;i<findRequest.NeedyId.length;i++){
      values = values + `(`+findRequest.NeedyId[i] +`,`+findRequest.PlanId +`,N`+"'"+findRequest.Fdate +"'"+`,N`+"'"+findRequest.Tdate+"'"+`) ,`
     
    }
    values = await values.slice(0, -1);
    let insertPlan = "INSERT INTO tblAssignNeedyToPlans VALUES "+ values
 


    let inserttblAssignNeedyToPlans = await pool.request().query(insertPlan)

    let tblAssignNeedyToPlans = await pool
      .request()
      .query(`SELECT tblAssignNeedyToPlans.*
      FROM tblAssignNeedyToPlans   
      join tblPersonal
      on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
      join tblPlans
      on tblAssignNeedyToPlans.PlanId= tblPlans.PlanId
     `);
     console.log(tblAssignNeedyToPlans.recordsets);
    return tblAssignNeedyToPlans.recordsets;
  } catch (error) {
    console.log(error.message);
  }
}
//ws_deleteNeedyFromPlan
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_deleteNeedyFromPlan(findRequest) {
  try {
    let pool = await sql.connect(config);

    let deletetblAssignNeedyToPlans;

    deletetblAssignNeedyToPlans = await pool
      .request()
      .query(
        `DELETE FROM tblAssignNeedyToPlans
        WHERE AssignNeedyPlanId = ${findRequest.AssignNeedyPlanId};`
      );

    return deletetblAssignNeedyToPlans.rowsAffected[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  ws_loadNeedyForPlan: ws_loadNeedyForPlan,
  ws_AssignNeedyToPlan: ws_AssignNeedyToPlan,
  ws_deleteNeedyFromPlan: ws_deleteNeedyFromPlan,
};