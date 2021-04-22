var config   = require("../Utils/config");
const sql    = require("mssql");
var crypto   = require('crypto');

var fnGetRandomString = require("../Utils/Randomnumber");

async function ws_loadPersonal(findRequest) {
  try {
    let pool = await sql.connect(config);

    let tblPersonal;

    if (
      ( findRequest.PersonId     == undefined &&
        findRequest.Name         == undefined &&
        findRequest.Family       == undefined &&
        findRequest.NationalCode == undefined &&
        findRequest.IdNumber     == undefined &&
        findRequest.Sex          == undefined &&
        findRequest.BirthPlace   == undefined &&
        findRequest.PersonType   == undefined &&
        findRequest.PersonPhoto  == undefined &&
        findRequest.SecretCode   == undefined &&
        findRequest.BirthDate    == undefined)
                                               ||
      (findRequest.PersonId      == null &&
      findRequest.Name           == null &&
      findRequest.Family         == null &&
      findRequest.NationalCode   == null &&
      findRequest.IdNumber       == null &&
      findRequest.Sex            == null &&
      findRequest.BirthPlace     == null &&
      findRequest.PersonType     == null &&
      findRequest.PersonPhoto    == null &&
      findRequest.SecretCode     == null &&
      findRequest.BirthDate      == null)
    ) {
      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM CharityDB.dbo.tblPersonal`);

      return tblPersonal.recordsets[0];
    } else {
  
      let pool = await sql.connect(config)

      console.log(findRequest);
      let whereclause = "";

      //Todo: find value on proprty with string or number ||null and add to whereclause build query
      for (x in findRequest) {
        if (typeof findRequest[String(x)] == "string") {

          whereclause =
            whereclause +
            " " +
            `${x} = ` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND `;

        } else if (typeof findRequest[String(x)] == "number") {
          if (x == 'PersonType') {
     
            console.log(findRequest[String(x)] + "findRequest[0][String(x)]1")
            break;

          }

          whereclause =
            whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {


          whereclause + " " + `${x}is null AND`;
          console.log(findRequest[String(x)] + "findRequest[0][String(x)]")
          

        }
      }


      whereclause = whereclause.slice(0, -4);
      console.log(whereclause + "this whereclause");

      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM [dbo].[tblPersonal] WHERE ` + whereclause);
      console.log(tblPersonal.recordsets[0] + 'tblPersonal')

      if (tblPersonal.recordsets[0] == '') {
        let checker = await pool.request().query(`SELECT PersonType  FROM [dbo].[tblPersonal]
          where PersonType=HASHBYTES('SHA2_256','${findRequest.PersonType}')`)
        console.log(checker.recordsets[0][0] + "checker.recordsets[0]")

        return checker.recordsets[0]
      }else {
        return tblPersonal.recordsets[0]
      }

    }


  } catch (error) {
    console.log(error.message);
  }
}
async function ws_createPersonal(findRequest) {
  try {

let number =  fnGetRandomString.fnGetRandomString(3);
    number     = parseInt(number);
    let pool   = await sql.connect(config);
    let value  = "";
    value      = value + "" + number + ",";
    for (x in findRequest) {


      if (

        findRequest[String(x)]        == null ||
        typeof findRequest[String(x)] == "number"

      ) {

        if (x  == 'PersonType') {


          value = value +" "+ "HASHBYTES('SHA2_256','" + `${findRequest[String(x)]}` + `'),`;

        } 
         else {

          value = value + " " + `${findRequest[String(x)]}` + `,`;
        }
      
      } else {
          if (x  == 'NAME'||x  == 'NationalCode'||x  == 'Family') {

           let f= crypto.createHash('md5').update(findRequest[String(x)] ).digest("hex");

           value = value + " " + `` + "'" + f+ "'" + `,`;

        }else if(x == 'PersonPhoto'){
      if(findRequest[String(x)]!=null){
          value = value + "CONVERT('"+findRequest[String(x)]+"',VARBINARY(MAX))," ;
          }
else {
  value = value + " " + `` + "'" + findRequest[String(x)] + "'" + `,`;

}
        }else {


        value = value + " " + `` + "'" + findRequest[String(x)] + "'" + `,`;
      
      }

      }
    }

    value = value.slice(0, -1);
    console.log('finsh ' + value)
    console.log(typeof(value))

    let insertTblPersonal = await pool.request().query(
      `INSERT INTO [tblPersonal]
                      (  PersonId
                        ,NAME
                        ,Family
                        ,NationalCode
                        ,IdNumber
                        ,sex
                        ,BirthDate
                        ,BirthPlace
                        ,PersonType
                        ,PersonPhoto
                        ,SecretCode
                      )
                         VALUES (` + value +`)`
    );
    let tblPersonal = await pool
      .request()
      .query(
        'SELECT * FROM [tblPersonal] where PersonId=' + number);


    console.log(tblPersonal.PersonId)
    return number;


  } catch (error) {

    console.log(error.message);


  }
}
async function ws_updatePersonal(findRequest) {
  try {



      let updateTblPersonal
      let pool = await sql.connect(config)


      let value = ''

      for (x in findRequest) {


        if (x == "PersonId") {

        } else if (findRequest[String(x)] ==  null 
                      || 
           typeof (findRequest[String(x)]) == "number") {
 
          value = value + " " + ` ${x} = ${findRequest[String(x)]}` + `,`

        } else {
          value = value + " " + `${x}  = ` + '\'' + findRequest[String(x)] + '\'' + `,`

        }

      }

      value = value.slice(0, -1)
      updateTblPersonal  = await pool.request().query(`UPDATE [tblPersonal]
      SET  ` + value +
        ` WHERE PersonId = ${findRequest.PersonId};`)


      updateTblPersonal = await pool.request().query(`SELECT * FROM [tblPersonal] 
      where PersonId=` 
      + findRequest.PersonId)
      return updateTblPersonal.recordsets[0];


  } catch (error) {

    console.log(error.message);
    
  }
}
async function ws_deletePersonal(findRequest) {
  try {
    let pool = await sql.connect(config)
        
    let deleteTblPersonal
    // let getTblPersonal = await pool.request().query(`select * from [CharityDB].[dbo].[tblPersonal] where PersonId =  ${findRequest.PersonId};`)
    
    
    

    // if(getTblPersonal != ''){
        
      deleteTblPersonal = await pool.request().query(`DELETE FROM [CharityDB].[dbo].[tblPersonal] WHERE PersonId = ${findRequest.PersonId};`)
           
        // }
      
        return deleteTblPersonal.rowsAffected[0];



   } catch (error) {

    console.log(error.message);


  }
}
module.exports = {
  ws_loadPersonal: ws_loadPersonal,
  ws_createPersonal: ws_createPersonal,
  ws_updatePersonal: ws_updatePersonal,
  ws_deletePersonal: ws_deletePersonal,
};