var config = require("../Utils/dbconfig");
const sql = require("mssql");


//ws_loadPayment
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadPayment(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getPayment;

    //show all records

    if (
      ( findRequest.CashAssistanceDetailId === undefined &&
        findRequest.PaymentGatewayId === undefined &&
        findRequest.PaymentDate === undefined &&
        findRequest.PaymentStatus === undefined &&
        findRequest.CharityAccountId === undefined &&
        findRequest.FollowCode === undefined &&
        findRequest.NeedyId === undefined &&
        findRequest.PaymentId === undefined ) ||
        (findRequest.CashAssistanceDetailId === null &&
         findRequest.PaymentGatewayId === null &&
         findRequest.PaymentDate === null &&
         findRequest.PaymentStatus === null &&
         findRequest.CharityAccountId === null &&
         findRequest.FollowCode === null &&
         findRequest.NeedyId === null &&
         findRequest.PaymentId === null )
    ) {
        getPayment = await pool.request().query(`SELECT tblPayment.*
            FROM tblPayment 
            join tblCashAssistanceDetail 
            on tblPayment.CashAssistanceDetailId = tblCashAssistanceDetail.CashAssistanceDetailId
            join tblPlans
            on tblCashAssistanceDetail.PlanId = tblPlans.PlanId
            join tblPersonal 
            on tblPayment.NeedyId = tblPersonal.PersonId
            join tblCharityAccounts 
            on tblPayment.CharityAccountId = tblCharityAccounts.CharityAccountId `);
      return getPayment.recordsets[0];
    } else {
      //create  whereclause
      let whereclause = "";
      for (x in findRequest) {
        if (typeof findRequest[String(x)] == "string") {
          whereclause =
            whereclause +
            " " +
            `tblPayment.${x} = N` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND`;
        } else if (typeof findRequest[String(x)] == "number") {
          whereclause =
            whereclause + " " + `tblPayment.${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {
          whereclause =
            whereclause + " " + `${x} is null` + ` AND`;
        }
      }

      whereclause = await whereclause.slice(0, -3);
    
      //show records with whereclause

      getPayment = await pool
        .request()
        .query(`SELECT *
        FROM tblPayment 
        join tblCashAssistanceDetail 
        on tblPayment.CashAssistanceDetailId = tblCashAssistanceDetail.CashAssistanceDetailId
        join tblPlans
        on tblCashAssistanceDetail.PlanId = tblPlans.PlanId
        join tblPersonal 
        on tblPayment.NeedyId = tblPersonal.PersonId
        join tblCharityAccounts 
        on tblPayment.CharityAccountId = tblCharityAccounts.CharityAccountId  where` + whereclause);
      return getPayment.recordsets[0];
    }
  } catch (error) {
    console.log(error.message);
  }
}

//ws_loadCashAssistanceDetail
//////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadCashAssistanceDetail(findRequest) {
    try {
      let pool = await sql.connect(config);
      let CashAssistanceDetail;
  
      //show all records
  
      if (
        ( findRequest.AssignNeedyPlanId === undefined &&
          findRequest.PlanId === undefined &&
          findRequest.CashAssistanceDetailId === undefined
          ) ||
          (findRequest.AssignNeedyPlanId === null &&
            findRequest.PlanId === null &&
            findRequest.CashAssistanceDetailId === null )
      ) {
          CashAssistanceDetail = await pool.request().query(`SELECT tblCashAssistanceDetail.*
              FROM tblCashAssistanceDetail 
              join tblAssignNeedyToPlans
              on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
              join tblPlans
              on tblCashAssistanceDetail.PlanId = tblPlans.PlanId
              join tblPersonal 
              on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId
               `);
        return CashAssistanceDetail.recordsets[0];
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
              whereclause + " " + `tblCashAssistanceDetail.${x} is null` + ` AND`;
          }
        }
  
        whereclause = await whereclause.slice(0, -3);
      
        //show records with whereclause
  
        CashAssistanceDetail = await pool
          .request()
          .query(`SELECT tblCashAssistanceDetail.*
          FROM tblCashAssistanceDetail 
          join tblAssignNeedyToPlans
          on tblCashAssistanceDetail.AssignNeedyPlanId = tblAssignNeedyToPlans.AssignNeedyPlanId
          join tblPlans
          on tblCashAssistanceDetail.PlanId = tblPlans.PlanId
          join tblPersonal 
          on tblAssignNeedyToPlans.NeedyId = tblPersonal.PersonId  where` + whereclause);
        return CashAssistanceDetail.recordsets[0];
      }
    } catch (error) {
      console.log(error.message);
    }
  }



// async function ws_createPlan(findRequest) {
//   try {
//     let pool = await sql.connect(config);

//     let value = "";

//     for (x in findRequest) {
//       if (
//         findRequest[String(x)] == null ||   typeof findRequest[String(x)] == "number" || typeof(findRequest[String(x)])=="boolean") {
//         value = value + " " + `${findRequest[String(x)]}` + `,`;
//       } else {
//         value = value + " " + `N` + "'" + findRequest[String(x)] + "'" + `,`;
//       }
//     }

//     value = await value.slice(0, -1);
//     await console.log(value);
//     let insertTblCharityAccounts = await pool.request().query(
//       `INSERT INTO tblPlans  (PlanName,Description,PlanNature,ParentPlanId,icon,Fdate,Tdate,neededLogin)
//             VALUES (` +
//         value +
//         `)`
//     );

//     let findIndex = {
//         PlanName : findRequest.PlanName,
//         PlanNature : findRequest.PlanNature,
//         ParentPlanId : findRequest.ParentPlanId
//     } 
//     let getPlan = await ws_loadPlan(findIndex)
     
//     return getPlan;
//   } catch (error) {
//     console.log(error.message);
//   }
// }


// async function ws_UpdatePlan(findRequest) {
//   try {
//     let updateTblPlan;
//     let pool = await sql.connect(config);

//     let value = "";

//     for (x in findRequest) {
//       if (x == "PlanId"){

//       }else if (
//         findRequest[String(x)] == null || typeof findRequest[String(x)] == "number" || typeof findRequest[String(x)] == "boolean" ) {
//         value = value + " " + ` ${x} = ${findRequest[String(x)]}` + `,`;
//       } else {
//         value =
//           value + " " + `${x} = N` + "'" + findRequest[String(x)] + "'" + `,`;
//       }
//       //console.log(value);
//     }

//     value = await value.slice(0, -1);
    
//     updateTblPlan = await pool.request().query(
//       `UPDATE tblPlans
//     SET  ` +
//         value +
//         ` WHERE PlanId = ${findRequest.PlanId};`
//     );

//     updateTblPlan = await pool
//       .request()
//       .query(`select * from tblPlans where PlanId =` + findRequest["PlanId"]);
//     return updateTblPlan.recordsets;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function ws_deletePlan(findRequest) {
//   try {
//     let pool = await sql.connect(config);

//     let deletePlan;

//     deletePlan = await pool
//       .request()
//       .query(`DELETE FROM tblPlans WHERE PlanId = ${findRequest.PlanId};`);

//     return deletePlan.rowsAffected[0];
//   } catch (error) {
//     console.log(error.message);
//   }
// }
module.exports = {
  ws_loadPayment : ws_loadPayment,
  ws_loadCashAssistanceDetail : ws_loadCashAssistanceDetail,
//   ws_createPlan: ws_createPlan,
//   ws_UpdatePlan: ws_UpdatePlan,
//   ws_deletePlan: ws_deletePlan,
};