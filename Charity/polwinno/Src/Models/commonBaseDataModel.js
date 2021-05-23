var config = require('../Utils/dbconfig');
const sql = require('mssql');
const { request } = require('express');
const getRandomString = require('../Utils/fnGetRandomString')


//ws_loadBaseValue
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadBaseValue(findRequest){
    try{
        let pool = await sql.connect(config)
     
        let getTblCommonBaseData; 
       
        
        if((findRequest.CommonBaseDataId===null && findRequest.BaseCode===null && findRequest.BaseValue===null  && findRequest.CommonBaseTypeId ===null) || (findRequest.CommonBaseDataId===undefined && findRequest.BaseCode===undefined && findRequest.BaseValue===undefined  && findRequest.CommonBaseTypeId ===undefined)){
            getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData`)
            return getTblCommonBaseData.recordsets[0]
        }else{
            let whereclause = ''
            // create whereclause
            for (x in findRequest) {
                
               
                if (typeof(findRequest[String(x)])=="string" ){
                     whereclause = whereclause + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+` AND`;
                    
                    
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = whereclause + " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
                   
                    
                }else if(findRequest[String(x)]==null){
                    
                    whereclause = whereclause +  " "+`${x} IS NULL`+` AND`;
        
                }
              }
              whereclause = whereclause.slice(0, -3)
          
              getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where`+ whereclause)
              return getTblCommonBaseData.recordsets[0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}

//ws_createBaseValue
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_createBaseValue(findRequest){
   
    
    try{
        let pool = await sql.connect(config)
        let getTblCommonBaseTypeCode = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + findRequest["CommonBaseTypeId"])
       
        let getTblCommonBaseCode = getTblCommonBaseTypeCode.recordsets[0][0].BaseTypeCode + getRandomString.fnGetRandomString(3)
        
       //insert data
        if (findRequest.BaseValue != null){
             let insertTblCommonBaseData = await pool.request().query(`INSERT INTO tblCommonBaseData (BaseCode,BaseValue,CommonBaseTypeId)
             VALUES (`+'\'' + getTblCommonBaseCode + '\''+`,N`+'\''+ findRequest.BaseValue +'\''+`,`+findRequest["CommonBaseTypeId"] +`)`)
            let getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where BaseValue = N`+'\'' + findRequest.BaseValue + '\''+" and "+ `CommonBaseTypeId = ${findRequest["CommonBaseTypeId"]}`+ ` and `+`BaseCode =`+'\'' + getTblCommonBaseCode + '\'')
             return getTblCommonBaseData.recordsets;
        }else if (findRequest.BaseValue == null){
            let insertTblCommonBaseData = await pool.request().query(`INSERT INTO tblCommonBaseData (BaseCode,BaseValue,CommonBaseTypeId)
            VALUES (`+'\'' + getTblCommonBaseCode + '\''+`,`+ findRequest["BaseValue"] +`,`+findRequest["CommonBaseTypeId"] +`)`)
           
            let getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where ` + `CommonBaseTypeId = ${findRequest["CommonBaseTypeId"]}`+ ` and `+`BaseCode =`+'\'' + getTblCommonBaseCode + '\'')
            return getTblCommonBaseData.recordsets;
        }
       
    }
    catch (error){
        console.log(error.message);
        
    }

}
//ws_updateBaseValue
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_updateBaseValue(findRequest){

    try{
        let updateTblCommonBaseData
        let pool = await sql.connect(config)
       
        //create 6 char without update code . just change first 3 char
       
        let getTblCommonBaseTypeCode = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + findRequest["CommonBaseTypeId"])
        let getTblCommonBaseDataCode = await pool.request().query(`select * from tblCommonBaseData where CommonBaseDataId =` + findRequest["CommonBaseDataId"])
        let getTblCommonBaseCode = getTblCommonBaseTypeCode.recordsets[0][0].BaseTypeCode + await getTblCommonBaseDataCode.recordsets[0][0].BaseCode.substring(3, 6)
       
       
            for(x in findRequest){
                if (x=="CommonBaseDataId"){
                    CommonBaseDataValue = findRequest.CommonBaseDataId;
                }else if(findRequest[String(x)] != null && typeof(findRequest[String(x)]) == "string" ){
                 
                    
    
                    
                    updateTblCommonBaseData = await pool.request().query(`UPDATE tblCommonBaseData
                    SET  ${x} = N` +'\'' + findRequest[String(x)] + '\'' +` , BaseCode = `+ '\'' + getTblCommonBaseCode + '\'' +
                    ` WHERE CommonBaseDataId = ${findRequest.CommonBaseDataId};`)
                   
 
                    
                
                }else if(findRequest[String(x)] == null || typeof(findRequest[String(x)]) == "number"){
                   
                    updateTblCommonBaseData = await pool.request().query(`UPDATE tblCommonBaseData
                    SET  ${x} = `+ findRequest[String(x)] + ` , BaseCode = `+'\'' + getTblCommonBaseCode + '\''+
                    ` WHERE CommonBaseDataId=${findRequest.CommonBaseDataId};`)
                   
                
                }else{
                    updateTblCommonBaseData = {recordsets:[[null]]} 
                    return updateTblCommonBaseData.recordsets[0][0];
                }
            }    
            updateTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where CommonBaseDataId =` + CommonBaseDataValue )   
            return updateTblCommonBaseData.recordsets;
           
    }
    catch (error){
        console.log(error.message);
        
    }
}
//ws_deleteBaseValue
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_deleteBaseValue(findRequest){
    try{
        let pool = await sql.connect(config)
        
            let deleteTblCommonBaseData
           
           
                
                
                deleteTblCommonBaseData = await pool.request().query(`DELETE FROM tblCommonBaseData WHERE CommonBaseDataId = ${findRequest.CommonBaseDataId};`)
                   
                
               
                return deleteTblCommonBaseData.rowsAffected[0];
        
        

    }
    catch (error){
        console.log(error.message);
    }
}

module.exports = {
ws_loadBaseValue : ws_loadBaseValue,
ws_createBaseValue : ws_createBaseValue,
ws_updateBaseValue : ws_updateBaseValue,
ws_deleteBaseValue : ws_deleteBaseValue

} 