var config = require("../Utils/dbconfig");
const sql = require("mssql");



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
        getPayment = await pool.request().query(`SELECT *
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
          whereclause = whereclause + " " +`${x} = N` + "'" + findRequest[String(x)] + "'" + ` AND`;
        
        } else if (typeof findRequest[String(x)] == "number") {
          whereclause =whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
       
        } else if (findRequest[String(x)] == null) {
          whereclause = whereclause + " " + `${x} is null` + ` AND`;
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
          CashAssistanceDetail = await pool.request().query(`SELECT *
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
            whereclause = whereclause + " " +`${x} = N` +"'" +findRequest[String(x)] +"'" +` AND`;
          
        } else if (typeof findRequest[String(x)] == "number") {
            whereclause =
              whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
          
         } else if (findRequest[String(x)] == null) {
            whereclause =
              whereclause + " " + `${x} is null` + ` AND`;
          }
        }
  
        whereclause = await whereclause.slice(0, -3);
      
        //show records with whereclause
  
        CashAssistanceDetail = await pool
          .request()
          .query(`SELECT *
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




module.exports = {
  ws_loadPayment : ws_loadPayment,
  ws_loadCashAssistanceDetail : ws_loadCashAssistanceDetail,

};