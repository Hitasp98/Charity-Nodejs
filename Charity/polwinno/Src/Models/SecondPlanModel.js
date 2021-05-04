var config = require("../Utils/dbconfig");
const sql = require("mssql");



//تست نشده

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
      //!!!!!!!!!!!!!!!!!!!!تغییر کویر ها
      getAssignNeedyToPlans = await pool.request()
        .query(`SELECT tblAssignNeedyToPlans.*,tblPersonal.PersonId
        FROM tblAssignNeedyToPlans   
        join tblPersonal
        on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
        join tblPlans
        on tblAssignNeedyToPlans.PlanId= tblPlans.PlanId `);
      return getAssignNeedyToPlans.recordsets[0];
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
      //!!!!!!!!!!!!!!!!!!!!تغییر کویر ها

      getTblCommonBaseType = await pool.request().query(
        `SELECT tblAssignNeedyToPlans.*,tblPersonal.PersonId
        FROM tblAssignNeedyToPlans   
        join tblPersonal
        on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
        join tblPlans
        on tblAssignNeedyToPlans.PlanId= tblPlans.PlanId
		where` + whereclause
      );
      return getAssignNeedyToPlans.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
//????????????????شناسه نيازمند NeedyId يا هش مپي از ليست نيازمندان (ليستي از شناسه هاي NeedyId )
//????????????????این مطلب در این مدل قرار نگرفته
//تست نشده

async function ws_AssignNeedyToPlan(findRequest) {
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

    let inserttblAssignNeedyToPlans = await pool.request().query(
      `
INSERT INTO [dbo].[tblAssignNeedyToPlans]
           ([NeedyId]
           ,[PlanId]
           ,[Fdate]
           ,[Tdate])
     VALUES (` +
        value +
        `)`
    );
    let tblAssignNeedyToPlans = await pool
      .request()
      .query(`SELECT tblAssignNeedyToPlans.*,tblPersonal.PersonId,tblPlans.PlanId
      FROM tblAssignNeedyToPlans   
      join tblPersonal
      on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
      join tblPlans
      on tblAssignNeedyToPlans.PlanId= tblPlans.PlanId `);
    return tblAssignNeedyToPlans.recordsets;
  } catch (error) {
    console.log(error.message);
  }
}
//تست نشده
  
async function ws_deleteNeedyFromPlan(findRequest) {
  try {
    let pool = await sql.connect(config);

    let deletetblAssignNeedyToPlans;

    deletetblAssignNeedyToPlans = await pool
      .request()
      .query(
        `DELETE FROM [dbo].[tblAssignNeedyToPlans]
        WHERE PlanId = ${findRequest.PlanId};`
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