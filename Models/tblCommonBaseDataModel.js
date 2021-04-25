var config = require('../Utils/dbconfig');
const sql = require('mssql');
const { request } = require('express');
const getRandomString = require('../Utils/fnGetRandomString')




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


    async function insertTblCommonBaseData(findRequest){
    
        
        try{
      console.log(findRequest)
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
    async function updateTblCommonBaseData(findRequest){

        try{

            let updateTblCommonBaseData
            let pool = await sql.connect(config)
           
            //create 6 char without update code . just change first 3 char
           
            let getTblCommonBaseTypeCode = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + findRequest["CommonBaseTypeId"])
            let getTblCommonBaseDataCode = await pool.request().query(`select * from tblCommonBaseData where CommonBaseDataId =` + findRequest["CommonBaseDataId"])
            let getTblCommonBaseCode = getTblCommonBaseTypeCode.recordsets[0][0].BaseTypeCode + await getTblCommonBaseDataCode.recordsets[0][0].BaseCode.substring(3, 6)
           
            console.log(getTblCommonBaseCode);
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