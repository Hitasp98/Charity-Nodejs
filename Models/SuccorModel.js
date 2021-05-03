var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber");
async function ws_chackCashAssistanceDetail(findRequest){
 try {
  let pool = await sql.connect(config);
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
    //اررو
    getTblCommonBaseType = await pool.request().query(
      `SELECT *
      FROM tblCashAssistanceDetail   
        where ` + whereclause
    );
    return getTblCommonBaseType.recordsets[0];
  }catch (error) {
    console.log(error.message);
  }
}

//تست نشده
async function ws_loadCashAssistanceDetail(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getTblCommonBaseType;

    //show all records
    if (
      (findRequest.AssignNeedyPlanId === undefined &&
        findRequest.PlanId === undefined &&
        findRequest.CashAssistanceDetailId === undefined) ||
      (findRequest.AssignNeedyPlanId === null &&
        findRequest.PlanId === null &&
        findRequest.CashAssistanceDetailId === null)
    ) {
      //!!!!!!!!!!!!!!!!!!!!تغییر کویر ها
      getPayment = await pool.request()
        .query(`SELECT tblCashAssistanceDetail.*,tblCashAssistanceDetail.AssignNeedyPlanId,tblPlans.PlanId
        FROM tblCashAssistanceDetail   
        join tblAssignNeedyToPlans
        on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
        join tblPlans
        on tblCashAssistanceDetail.PlanId= tblPlans.PlanId `);
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
      //!!!!!!!!!!!!!!!!!!!!تغییر کویر ها
      //اررو
      getTblCommonBaseType = await pool.request().query(
        `SELECT *
        FROM tblCashAssistanceDetail   
        join tblAssignNeedyToPlans
        on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
        join tblPlans
        on tblCashAssistanceDetail.PlanId= tblPlans.PlanId
      where ` + whereclause
      );
      return getTblCommonBaseType.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
//تست نشده
async function ws_createCashAssistanceDetail(findRequest) {
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
      `INSERT INTO [dbo].[tblCashAssistanceDetail]
      ([AssignNeedyPlanId]
      ,[PlanId]
      ,[NeededPrice]
      ,[MinPrice]
      ,[Description])
      VALUES (` +
        value +
        `)`
    );
    let tblAssignNeedyToPlans = await pool.request()
      .query(`SELECT tblCashAssistanceDetail.*,tblCashAssistanceDetail.AssignNeedyPlanId,tblPlans.PlanId
      FROM tblCashAssistanceDetail   
      join tblAssignNeedyToPlans
      on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
      join tblPlans
      on tblCashAssistanceDetail.PlanId= tblPlans.PlanId  `);
    return tblAssignNeedyToPlans.recordsets[0][0];
  } catch (error) {
    console.log(error.message);
  }
}
//تست نشده
async function ws_updateCashAssistanceDetail(findRequest) {
  try {
    let updateTblCharityAccounts;
    let pool = await sql.connect(config);

    let value = "";

    for (x in findRequest) {
      if(x=='CashAssistanceDetailId'){
continue      }
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
      `UPDATE [dbo].[tblCashAssistanceDetail]
      SET  ` +
        value +
        `  WHERE CashAssistanceDetailId = ${findRequest.CashAssistanceDetailId};`
    );

    updateTblCharityAccounts = await pool.request().query(
      `SELECT *
        FROM tblCashAssistanceDetail   
        
        WHERE CashAssistanceDetailId = ${findRequest.CashAssistanceDetailId};`
    );
    return updateTblCharityAccounts.recordsets[0][0];
  } catch (error) {
    console.log(error.message);
  }
}
//تست نشده
async function ws_deleteCashAssistanceDetail(findRequest) {
  try {
    let pool = await sql.connect(config);

    let deleteTblCharityAccounts;

    deleteTblCharityAccounts = await pool
      .request()
      .query(
        `DELETE FROM tblCashAssistanceDetail WHERE CashAssistanceDetailId  = ${findRequest.CashAssistanceDetailId};`
      );

    return deleteTblCharityAccounts.rowsAffected[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  ws_chackCashAssistanceDetail:ws_chackCashAssistanceDetail,
  ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
  ws_createCashAssistanceDetail: ws_createCashAssistanceDetail,
  ws_updateCashAssistanceDetail: ws_updateCashAssistanceDetail,
  ws_deleteCashAssistanceDetail: ws_deleteCashAssistanceDetail,
};
