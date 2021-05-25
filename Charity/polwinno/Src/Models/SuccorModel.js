var config = require("../Utils/dbconfig");
const sql = require("mssql");



async function checkCashAssistanceDetail(findRequest){
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
  
   let getCashAssistanceDetail = await pool.request().query(
      `SELECT *
      FROM tblCashAssistanceDetail   
        where ` + whereclause
    );
    return getCashAssistanceDetail.recordsets[0];
  }catch (error) {
    console.log(error.message);
  }
}


async function ws_loadCashAssistanceDetail(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getLoadCashAssistanceDetail;

    //show all records
    if (
      (findRequest.AssignNeedyPlanId === undefined &&
        findRequest.PlanId === undefined &&
        findRequest.CashAssistanceDetailId === undefined) ||
      (findRequest.AssignNeedyPlanId === null &&
        findRequest.PlanId === null &&
        findRequest.CashAssistanceDetailId === null)
    ) {
     
        getLoadCashAssistanceDetail = await pool.request()
        .query(`SELECT tblCashAssistanceDetail.*
        FROM tblCashAssistanceDetail   
        inner join tblAssignNeedyToPlans
        on tblCashAssistanceDetail.PlanId = tblAssignNeedyToPlans.PlanId
        and tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
        inner join tblPlans
        on tblAssignNeedyToPlans.PlanId = tblPlans.PlanId
        inner join tblPersonal
        on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
        `);
      return getLoadCashAssistanceDetail.recordsets[0];
    } else {
      //create  whereclause
      let whereclause = "";
      for (x in findRequest) {
        if (typeof findRequest[String(x)] == "string") {
          whereclause =
            whereclause +
            " " +
            `tblCashAssistanceDetail.${x} = N` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND`;
        } else if (typeof findRequest[String(x)] == "number") {
          whereclause =
            whereclause + " " + `tblCashAssistanceDetail.${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {
          whereclause =
            whereclause + " " + `tblCashAssistanceDetail.${x} =  ${findRequest[String(x)]}` + ` AND`;
        }
      }

      whereclause = whereclause.slice(0, -3);
      //show records with whereclause
      
      getLoadCashAssistanceDetail = await pool.request().query(
        `SELECT tblCashAssistanceDetail.*
         FROM tblCashAssistanceDetail   
        inner join tblAssignNeedyToPlans
        on tblCashAssistanceDetail.PlanId = tblAssignNeedyToPlans.PlanId
        and tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
        inner join tblPlans
        on tblAssignNeedyToPlans.PlanId = tblPlans.PlanId
        inner join tblPersonal
        on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
      where ` + whereclause
      );
      return getLoadCashAssistanceDetail.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
//ws_createCashAssistanceDetail
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_createCashAssistanceDetail(findRequest) {
  try {
    let pool = await sql.connect(config);

    let value = "";

    for (x in findRequest) {
      if (
        typeof findRequest[String(x)] == "number" || findRequest[String(x)] == null
      ) {
        value = value + " " + `${findRequest[String(x)]}` + `,`;
      } else if(typeof findRequest[String(x)] == "string") {
        value = value + " " + "N'" + findRequest[String(x)] + "'" + `,`;
      }
    }

    value = value.slice(0, -1);

    let insertCashAssistanceDetail = await pool.request().query(
      `INSERT INTO tblCashAssistanceDetail
      (AssignNeedyPlanId
      ,PlanId
      ,NeededPrice
      ,MinPrice
      ,Description)
      VALUES (` +
        value +
        `)`
    );
    let findByIndex = {
        AssignNeedyPlanId : findRequest.AssignNeedyPlanId,
        PlanId : findRequest.PlanId
    }
   
    insertCashAssistanceDetail = await checkCashAssistanceDetail(findByIndex)
    
    return insertCashAssistanceDetail[0].CashAssistanceDetailId;
  } catch (error) {
    console.log(error.message);
  }
}
//ws_updateCashAssistanceDetail
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_updateCashAssistanceDetail(findRequest) {
  try {
    let updateTblCharityAccounts;
    let pool = await sql.connect(config);

    let value = "";

    for (x in findRequest) {
      if(x =='CashAssistanceDetailId'){
                  
        }else if (
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

   let updateCashAssistanceDetail = await pool.request().query(
      `UPDATE tblCashAssistanceDetail
      SET  ` +
        value +
        `  WHERE CashAssistanceDetailId = ${findRequest.CashAssistanceDetailId};`
    );

    updateCashAssistanceDetail = await checkCashAssistanceDetail({CashAssistanceDetailId : findRequest.CashAssistanceDetailId })
    
    return updateCashAssistanceDetail;
  } catch (error) {
    console.log(error.message);
  }
}
//ws_deleteCashAssistanceDetail
/////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_deleteCashAssistanceDetail(findRequest) {
  try {
    let pool = await sql.connect(config);

    let deleteCashAssistanceDetail;

    deleteCashAssistanceDetail = await pool
      .request()
      .query(
        `DELETE FROM tblCashAssistanceDetail WHERE CashAssistanceDetailId  = ${findRequest.CashAssistanceDetailId};`
      );

    return deleteCashAssistanceDetail.rowsAffected[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
    checkCashAssistanceDetail:checkCashAssistanceDetail,
  ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
  ws_createCashAssistanceDetail: ws_createCashAssistanceDetail,
  ws_updateCashAssistanceDetail: ws_updateCashAssistanceDetail,
  ws_deleteCashAssistanceDetail: ws_deleteCashAssistanceDetail,
};