
const sql = require("mssql");
var crypto = require("crypto-js");
var config = require('../Utils/dbconfig');



async function ws_loadPersonal(findRequest) {
  try {
    let pool = await sql.connect(config);

    let tblPersonal;

    if (
      ( findRequest.PersonId     === undefined &&
        findRequest.Name         === undefined &&
        findRequest.Family       === undefined &&
        findRequest.NationalCode === undefined &&
        findRequest.IdNumber     === undefined &&
        findRequest.Sex          === undefined &&
        findRequest.BirthPlace   === undefined &&
        findRequest.PersonType   === undefined &&
        findRequest.PersonPhoto  === undefined &&
        findRequest.SecretCode   === undefined &&
        findRequest.BirthDate    === undefined)
                                               ||
      (findRequest.PersonId      === null &&
      findRequest.Name           === null &&
      findRequest.Family         === null &&
      findRequest.NationalCode   === null &&
      findRequest.IdNumber       === null &&
      findRequest.Sex            === null &&
      findRequest.BirthPlace     === null &&
      findRequest.PersonType     === null &&
      findRequest.PersonPhoto    === null &&
      findRequest.SecretCode     === null &&
      findRequest.BirthDate      === null)
    ) {
      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM tblPersonal`);

      return tblPersonal.recordsets[0];
    } else {
  
      let pool = await sql.connect(config)

     
      let whereclause = "";

     
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
       

          whereclause =
            whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {

        whereclause =
          whereclause + " " + `${x} is null AND`;
         
          

        }
      }


      whereclause = whereclause.slice(0, -4);
     
     

      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM tblPersonal WHERE ` + whereclause);
        return tblPersonal.recordsets[0]
    

    }


  } catch (error) {
    console.log(error.message);
  }
}


async function ws_createPersonal(findRequest) {
try {
  

      let pool   = await sql.connect(config);
      let hashInputBase64
     
        if(findRequest.PersonType == 2){
            let hashInput = findRequest.Name + findRequest.Family + findRequest.NationalCode + findRequest.PersonType

            hashInput = await crypto.SHA1(hashInput);
        
            hashInputBase64 = await hashInput.toString(crypto.enc.Base64)
        }else{
            hashInputBase64 = null
        }
           
   
      let value = ''

      for(x in findRequest){
         
          if ( (findRequest[String(x)] == null || typeof(findRequest[String(x)])=="number" ||  typeof(findRequest[String(x)])=="boolean") && x != "SecretCode"  ){
              value = value + " "+`${findRequest[String(x)]}`+`,`
             
          }else if(x == "SecretCode"){
                if (hashInputBase64 != null){
                    value = value + " "+`N`+ '\''+ hashInputBase64 +'\''+`,`
                   
                }else{
                    value = value + " "+`${findRequest[String(x)]}`+`,`
                   
                }
               
          }else{
                value = value + " "+`N`+ '\''+ findRequest[String(x)] +'\''+`,`
          }
           
      }
       value = await value.slice(0,-1)

      


    
      let insertTblPersonal = await pool.request().query( `INSERT INTO tblPersonal
                        (  NAME
                          ,Family
                          ,NationalCode
                          ,IdNumber
                          ,sex
                          ,BirthDate
                          ,BirthPlace
                          ,PersonType
                          ,PersonPhoto
                          ,SecretCode )
         
                          VALUES (` + value +`)`)
        let tblPersonal                     
      if(hashInputBase64 != null){
        tblPersonal = await pool
        .request()
        .query('SELECT * FROM tblPersonal where SecretCode ='+ '\''+ hashInputBase64 +'\'')
      }else{
        tblPersonal = await pool
        .request()
        .query('SELECT top 1 * FROM tblPersonal ORDER By PersonId DESC' )
      }              
     
                            

      return tblPersonal.recordsets[0];
  
  
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
      updateTblPersonal  = await pool.request().query(`UPDATE [dbo].[tblPersonal]
      SET  ` + value +
        ` WHERE PersonId = ${findRequest.PersonId};`)


      updateTblPersonal = await pool.request().query(`SELECT * FROM [CharityDB].[dbo].[tblPersonal] where PersonId=` + findRequest.PersonId)
      return updateTblPersonal.recordsets;


  } catch (error) {

    console.log(error.message);
    
  }
}
async function ws_deletePersonal(findRequest) {
  try {

   
    let pool = await sql.connect(config)
        
    let deleteTblPersonal
   
        
      deleteTblPersonal =  await pool.request().query(`DELETE FROM tblPersonal WHERE PersonId = ${findRequest.PersonId};`)
           
        
      
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

