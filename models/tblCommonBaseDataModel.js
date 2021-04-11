var config = require('../config/dbconfig');
const sql = require('mssql');
const { request } = require('express');
//const tblCommonBaseType = require('../tblCommonBaseType');

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
    
}


async function getTblCommonBaseData(findRequest){
    try{
        let pool = await sql.connect(config)
     
        let getTblCommonBaseData; 
       
        
        if(findRequest.CommonBaseDataId==null && findRequest.BaseCode==null && findRequest.BaseValue==null && findRequest.BaseValue==null && findRequest.CommonBaseTypeId ==null){
            getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData`)
            return getTblCommonBaseData.recordsets[0]
        }else{
            let whereclause = ''
            for (x in findRequest) {
                
                //getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
                if (typeof(findRequest[String(x)])=="string" ){
                     whereclause = whereclause + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+` AND`;
                    
                    
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = whereclause + " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
                   
                    
                }else if(findRequest[String(x)]==null){
                    
                    whereclause = whereclause +  " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
        
                }
              }
              whereclause = whereclause.slice(0, -3)
              getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where`+ whereclause)
              return getTblCommonBaseData.recordsets[0][0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}

async function getForInsertTblCommonBaseData(findRequest){
    try{
        let pool = await sql.connect(config)
        let allGetTblCommonBaseData = []
        let getTblCommonBaseData; 
       

        if(findRequest.CommonBaseDataId==null && findRequest.BaseCode==null && findRequest.BaseValue==null && findRequest.CommonBaseTypeId ==null){
            getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData`)
            return getTblCommonBaseData.recordsets[0]
        }else{
            
                let whereclause 
              
               
                    whereclause = `where`+" "+`BaseCode = `+ '\''+ findRequest["BaseCode"] +'\'';
                    getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData `+ whereclause)
              
               
              allGetTblCommonBaseData.push(getTblCommonBaseData.recordsets[0][0]);
             
              
              return allGetTblCommonBaseData;
        }      
    }
    catch (error){
        console.log(error.message);
    }
}

async function insertTblCommonBaseData(findRequest){
   
    
    try{
        let pool = await sql.connect(config)
        let getTblCommonBaseCode = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + findRequest["CommonBaseTypeId"])
        getTblCommonBaseCode = getTblCommonBaseCode.recordsets[0][0].BaseTypeCode + await getRandomString(3)
        
        let getRequest = []
        getRequest = await getForInsertTblCommonBaseData(findRequest)
        if (getRequest[0] == null && findRequest.BaseValue != null){
        let insertTblCommonBaseData = await pool.request().query(`INSERT INTO tblCommonBaseData (BaseCode,BaseValue,CommonBaseTypeId)
        VALUES (`+'\'' + getTblCommonBaseCode + '\''+`,N`+'\''+ findRequest.BaseValue +'\''+`,`+findRequest["CommonBaseTypeId"] +`)`)
        let getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where BaseValue = N`+'\'' + findRequest.BaseValue + '\''+" and "+ `CommonBaseTypeId = ${findRequest["CommonBaseTypeId"]}`+ ` and `+`BaseCode =`+'\'' + getTblCommonBaseCode + '\'')
        return getTblCommonBaseData.recordsets;
        }else if (getRequest[0] == null && findRequest.BaseValue == null){
            let insertTblCommonBaseData = await pool.request().query(`INSERT INTO tblCommonBaseData (BaseCode,BaseValue,CommonBaseTypeId)
            VALUES (`+'\'' + getTblCommonBaseCode + '\''+`,N`+ findRequest["BaseValue"] +`,`+findRequest["CommonBaseTypeId"] +`)`)
           
            let getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where ` + `CommonBaseTypeId = ${findRequest["CommonBaseTypeId"]}`+ ` and `+`BaseCode =`+'\'' + getTblCommonBaseCode + '\'')
            return getTblCommonBaseData.recordsets;
        }
       
    }
    catch (error){
        console.log(error.message);
        
    }

}
async function updateTblCommonBaseData(findRequest){

    try{
        let updateTblCommonBaseData
        let pool = await sql.connect(config)
        let getTblCommonBaseCode = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + findRequest["CommonBaseTypeId"])
        getTblCommonBaseCode = getTblCommonBaseCode.recordsets[0][0].BaseTypeCode + await getRandomString(3) 
       
            for(x in findRequest){
                if (x=="CommonBaseDataId"){
                    console.log(`can not update ${x}`);
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
            updateTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where CommonBaseDataId =` + findRequest["CommonBaseDataId"] )   
            return updateTblCommonBaseData.recordsets;
           
    }
    catch (error){
        console.log(error.message);
        
    }
}

async function deleteTblCommonBaseData(findRequest){
    try{
        let pool = await sql.connect(config)
        
            let deleteTblCommonBaseData
            let getTblCommonBaseData = await pool.request().query(`select * from tblCommonBaseData where CommonBaseDataId =  ${findRequest.CommonBaseDataId};`)
           
                if(getTblCommonBaseData != null){
                
                    deleteTblCommonBaseData = await pool.request().query(`DELETE FROM tblCommonBaseData WHERE CommonBaseDataId = ${findRequest.CommonBaseDataId};`)
                   
                }
               
                return deleteTblCommonBaseData.rowsAffected[0];
        
        

    }
    catch (error){
        console.log(error);
    }
}

module.exports = {getTblCommonBaseData : getTblCommonBaseData,

insertTblCommonBaseData:insertTblCommonBaseData,
updateTblCommonBaseData:updateTblCommonBaseData,
deleteTblCommonBaseData:deleteTblCommonBaseData

} 