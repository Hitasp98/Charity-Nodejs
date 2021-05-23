var config = require('../Utils/dbconfig');
const sql = require('mssql');
const { request } = require('express');
const getRandomString = require('../Utils/fnGetRandomString')
const url = require('../Utils/urlConfig')

//ws_loadBaseType()
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadBaseType(findRequest){
    try{
        let pool = await sql.connect(config)
     
        let getTblCommonBaseType; 
       
        //show all records 
        
        if((findRequest.CommonBaseTypeId === undefined && findRequest.BaseTypeCode === undefined && findRequest.BaseTypeTitle === undefined) || (findRequest.CommonBaseTypeId === null && findRequest.BaseTypeCode === null && findRequest.BaseTypeTitle === null)){
            getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType`)
            return getTblCommonBaseType.recordsets[0]
        }else{
        
            //create  whereclause   
            let whereclause = ''
            for (x in findRequest) {
                
                if (typeof(findRequest[String(x)])=="string" ){
                     whereclause = whereclause + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+` AND`;
                    
                    
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = whereclause + " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
                   
                    
                }else if(findRequest[String(x)]==null){
                    
                    whereclause = whereclause +  " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
        
                }
              }
              
              whereclause = whereclause.slice(0, -3)
              
              //show records with whereclause
              
              getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where`+ whereclause)
              return getTblCommonBaseType.recordsets[0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}


//ws_CreateBaseType() 
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ws_CreateBaseType(findRequest){
  
   
    try{

        //insert Data
        
        let pool = await sql.connect(config)
        let insertTblCommonBaseType = await pool.request().query(`INSERT INTO tblCommonBaseType (BaseTypeCode,BaseTypeTitle)
        VALUES (`+'\'' + getRandomString.fnGetRandomString(3) + '\''+`,N`+ '\'' + findRequest.BaseTypeTitle + '\''+`)`)
       
        //get after insert
       
        let getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where BaseTypeTitle = N`+'\'' + findRequest.BaseTypeTitle + '\'')
        return getTblCommonBaseType.recordsets[0][0].CommonBaseTypeId;
       
       
    }
    catch (error){
        console.log(error.message);
        
    }
}


//ws_UpdateBaseType()
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ws_UpdateBaseType(findRequest){
    let CommonBaseTypeValue
    try{
        let pool = await sql.connect(config)

        //update
            
        for(x in findRequest){
                if (x =="CommonBaseTypeId"){
                    CommonBaseTypeValue = findRequest.CommonBaseTypeId
                }else if(findRequest[String(x)] != null){
                    var updateTblCommonBaseType = await pool.request().query(`UPDATE tblCommonBaseType
                    SET  ${x} = N` +'\'' + findRequest[String(x)] + '\'' +
                    `WHERE CommonBaseTypeId=${findRequest.CommonBaseTypeId};`)
                }else{
                    updateTblCommonBaseType = {recordsets:[[null]]} 
                    return updateTblCommonBaseType.recordsets[0][0];
                }
            } 
            
            //show update record
            
           updateTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + CommonBaseTypeValue )    
                
            return updateTblCommonBaseType.recordsets[0];
    }
    catch (error){
        console.log(error.message);
        
    }
}
//ws_DeleteBaseType
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ws_DeleteBaseType(findRequest){
    try{
        let pool = await sql.connect(config)
        
            
                
        let deleteTblCommonBaseType = await pool.request().query(`DELETE FROM tblCommonBaseType WHERE CommonBaseTypeId = ${findRequest.CommonBaseTypeId};`)
                   
               
              
        return deleteTblCommonBaseType.rowsAffected[0];
        
        

    }
    catch (error){
        console.log(error.message);
    }
}

module.exports = {ws_loadBaseType : ws_loadBaseType,

    ws_CreateBaseType  :ws_CreateBaseType,
    ws_UpdateBaseType : ws_UpdateBaseType,
    ws_DeleteBaseType : ws_DeleteBaseType

} 