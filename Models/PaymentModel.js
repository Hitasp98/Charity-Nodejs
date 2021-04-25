var config = require("../Utils/config");
const sql = require("mssql");
var crypto = require("crypto");

var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_Payment(findRequest) {
  try {
   
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_loadPayment(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getTblCommonBaseType;

    //show all records

    if (
      (findRequest.CashAssistanceDetailId === undefined &&
        findRequest.PaymentGatewayId === undefined &&
        findRequest.PaymentDate === undefined &&
        findRequest.PaymentStatus === undefined &&
        findRequest.CharityAccountId === undefined &&
        findRequest.FollowCode === undefined &&
        findRequest.NeedyId === undefined &&
        findRequest.PaymentId === undefined) ||
      (findRequest.CashAssistanceDetailId === null &&
        findRequest.PaymentGatewayId === null &&
        findRequest.PaymentDate === null &&
        findRequest.PaymentStatus === null &&
        findRequest.CharityAccountId === null &&
        findRequest.FollowCode === null &&
        findRequest.NeedyId === null &&
        findRequest.PaymentId === null)
    ) {
      getPayment  = await pool
        .request()
        .query(`SELECT *
   FROM tblPayment, tblCharityAccounts,tblCashAssistanceDetail,tblPersonal ,tblPlans;`)
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
        .query(`select * from tblPayment  where` + whereclause);
      return getTblCommonBaseType.recordsets[0][0];
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function ws_loadCashAssistanceDetail(findRequest) {
  try {
    let pool = await sql.connect(config);
    let getTblCommonBaseType;

    //show all records

    if (
      (findRequest.AssignNeedyPlanId === undefined &&
        findRequest.PlanId === undefined &&
        findRequest.CashAssistanceDetailId === undefined ) ||
      (findRequest.PlanId === null &&
        findRequest.CashAssistanceDetailId === null   )
    ) {
      getPayment  = await pool
        .request()
        .query(`SELECT *
   FROM tblCashAssistanceDetail, tblAssignNeedyToPlans,tblPersonal ,tblPlans`)
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
        .query(`select * from tblCashAssistanceDetail   where` + whereclause);
      return getTblCommonBaseType.recordsets[0][0];
    }
  }  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  ws_Payment: ws_Payment,
  ws_loadPayment: ws_loadPayment,
  ws_loadCashAssistanceDetail: ws_loadCashAssistanceDetail,
};
