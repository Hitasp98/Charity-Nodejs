var config = require('../Utils/dbconfig');
const sql = require('mssql');
const { request } = require('express');
const getRandomString = require('../Utils/fnGetRandomString')


//ws_loadBaseType()
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getTblCommonBaseType(findRequest){
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
              return getTblCommonBaseType.recordsets[0][0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}


//ws_CreateBaseType() 
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertTblCommonBaseType(findRequest){
  
   
    try{

        //insert Data
        
        let pool = await sql.connect(config)
        let insertTblCommonBaseType = await pool.request().query(`INSERT INTO tblCommonBaseType (BaseTypeCode,BaseTypeTitle)
        VALUES (`+'\'' + getRandomString.fnGetRandomString(3) + '\''+`,N`+ '\'' + findRequest.BaseTypeTitle + '\''+`)`)
       
        //get after insert
       
        let getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where BaseTypeTitle = N`+'\'' + findRequest.BaseTypeTitle + '\'')
        return getTblCommonBaseType.recordsets;
       
       
    }
    catch (error){
        console.log(error.message);
        
    }
}


//ws_UpdateBaseType()
//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateTblCommonBaseType(findRequest){
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
                
            return updateTblCommonBaseType.recordsets;
    }
    catch (error){
        console.log(error.message);
        
    }
}

async function deleteTblCommonBaseType(findRequest){
    try{
        let pool = await sql.connect(config)
        
            //let deleteTblCommonBaseType
            //let getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =  ${findRequest.CommonBaseTypeId};`)
            
            //if(getTblCommonBaseType != null){
                
        let deleteTblCommonBaseType = await pool.request().query(`DELETE FROM tblCommonBaseType WHERE CommonBaseTypeId = ${findRequest.CommonBaseTypeId};`)
                   
               // }
              
        return deleteTblCommonBaseType.rowsAffected[0];
        
        

    }
    catch (error){
        console.log(error.message);
    }
}

module.exports = {getTblCommonBaseType : getTblCommonBaseType,

insertTblCommonBaseType:insertTblCommonBaseType,
updateTblCommonBaseType:updateTblCommonBaseType,
deleteTblCommonBaseType:deleteTblCommonBaseType

} 