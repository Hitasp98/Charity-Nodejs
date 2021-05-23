
const sql = require("mssql");
var crypto = require("crypto-js");
var config = require('../Utils/dbconfig');

//ws_loadPersonal
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        if (typeof findRequest[String(x)] == "string" || typeof findRequest[String(x)] == "boolean") {

          whereclause =
            whereclause +
            " " +
            `${x} = N` +
            "'" +
            findRequest[String(x)] +
            "'" +
            ` AND `;

        } else if (typeof findRequest[String(x)] == "number"  ) {
       

          whereclause =
            whereclause + " " + `${x} =  ${findRequest[String(x)]}` + ` AND`;
        } else if (findRequest[String(x)] == null) {

        whereclause =
          whereclause + " " + `${x} is null AND`;
         
          

        }
      }


      whereclause =await whereclause.slice(0, -4);
     
     

      tblPersonal = await pool
        .request()
        .query(`SELECT * FROM tblPersonal WHERE ` + whereclause);
        return tblPersonal.recordsets[0]
    

    }


  } catch (error) {
    console.log(error.message);
  }
}
//ws_createPersonal
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
         
          if ( (findRequest[String(x)] == null || typeof(findRequest[String(x)])=="number") && x != "SecretCode"  ){
              value = value + " "+`${findRequest[String(x)]}`+`,`
             
          }else{
                value = value + " "+`N`+ '\''+ findRequest[String(x)] +'\''+`,`
          }
           
      }

     // create secretCode
      if (hashInputBase64 != null){
          value = value + " "+`N`+ '\''+ hashInputBase64 +'\''+`,`
          
      }else{
          value = value + " "+`${hashInputBase64}`+`,`
          
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
//ws_updatePersonal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_updatePersonal(findRequest) {
  try {



      let updateTblPersonal
      let pool = await sql.connect(config)
      let personIdValue
      let hashInputBase64
     // hash base on personType
      if(findRequest.PersonType == 2){
          let hashInput = findRequest.Name + findRequest.Family + findRequest.NationalCode + findRequest.PersonType

          hashInput = await crypto.SHA1(hashInput);
      
          hashInputBase64 = await hashInput.toString(crypto.enc.Base64)
      }else{
          hashInputBase64 = null
      }
      
      
      let value = ''
      
      for (x in findRequest) {


        if (x == "PersonId") {
          
         personIdValue = findRequest.PersonId
        
        } else if ((findRequest[String(x)] == null || typeof(findRequest[String(x)])=="number") && x != "SecretCode") {
 
          value = value + " " + ` ${x} = ${findRequest[String(x)]}` + `,`

        }else {
          value = value + " " + `${x}  = N` + '\'' + findRequest[String(x)] + '\'' + `,`

        }

      }

      //create secretCode

      if (hashInputBase64 != null){
        value = value + " "+`SecretCode = N`+ '\''+ hashInputBase64 +'\''+`,`
      }else{
          value = value + " "+`SecretCode = ${hashInputBase64} `+`,`   
      }
      
      value = await value.slice(0, -1)
      
      updateTblPersonal  = await pool.request().query(`UPDATE tblPersonal
      SET  ` + value +
        ` WHERE PersonId = ${personIdValue};`)


      updateTblPersonal = await pool.request().query(`SELECT * FROM tblPersonal where PersonId=` + findRequest.PersonId)
     
      return updateTblPersonal.recordsets[0];


  } catch (error) {

    console.log(error.message);
    
  }
}
//ws_deletePersonal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

