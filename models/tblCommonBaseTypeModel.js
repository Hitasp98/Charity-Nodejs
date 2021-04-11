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


async function getTblCommonBaseType(findRequest){
    try{
        let pool = await sql.connect(config)
     
        let getTblCommonBaseType; 
       

        if(findRequest.CommonBaseTypeId==null && findRequest.BaseTypeCode==null && findRequest.BaseTypeTitle==null){
            getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType`)
            return getTblCommonBaseType.recordsets[0]
        }else{
            let whereclause = ''
            for (x in findRequest) {
                
                getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where `+ `BaseTypeCode = `+ '\''+ findRequest["BaseTypeCode"] +'\''+`and `+`BaseTypeTitle = `+'\''+ findRequest["BaseTypeTitle"] +'\'' +`and `+`CommonBaseTypeId =  ${findRequest['CommonBaseTypeId']}`)
                if (typeof(findRequest[String(x)])=="string" ){
                     whereclause = whereclause + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+` AND`;
                    
                    
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = whereclause + " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
                   
                    
                }else if(findRequest[String(x)]==null){
                    
                    whereclause = whereclause +  " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
        
                }
              }
              whereclause = whereclause.slice(0, -3)
              getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where`+ whereclause)
              return getTblCommonBaseType.recordsets[0][0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}

async function getForInsertTblCommonBaseType(findRequest){
    try{
        let pool = await sql.connect(config)
        let allGetTblCommonBaseType = []
        let getTblCommonBaseType; 
       

        if(findRequest.CommonBaseTypeId==null && findRequest.BaseTypeCode==null && findRequest.BaseTypeTitle==null){
            getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType`)
            return getTblCommonBaseType.recordsets[0]
        }else{
            for (x in findRequest) {
                let whereclause 
              
                if (typeof(findRequest[String(x)])=="string"){
                     whereclause = `where`+" "+`${x} = N`+ '\''+ findRequest[String(x)] +'\'';
                     getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType `+whereclause)
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = `where`+" "+`${x} =  ${findRequest[String(x)]}`;
                     getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType `+whereclause)
                }else if(findRequest[String(x)]==null){
                    
                    getTblCommonBaseType = {recordsets:[[]]}
        
                }
                
               
                
               
              allGetTblCommonBaseType.push(getTblCommonBaseType.recordsets[0][0]);
             
              }
              return allGetTblCommonBaseType;
        }      
    }
    catch (error){
        console.log(error.message);
    }
}

async function insertTblCommonBaseType(findRequest){
    let getRequest = []
    getRequest = await getForInsertTblCommonBaseType(findRequest)
    if(getRequest[0]==null){
    try{
        let pool = await sql.connect(config)
        let insertTblCommonBaseType = await pool.request().query(`INSERT INTO tblCommonBaseType (BaseTypeCode,BaseTypeTitle)
        VALUES (`+'\'' + getRandomString(3) + '\''+`,N`+ '\'' + findRequest.BaseTypeTitle + '\''+`)`)
        let getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where BaseTypeTitle = N`+'\'' + findRequest.BaseTypeTitle + '\'')
        return getTblCommonBaseType.recordsets;
       
       
    }
    catch (error){
        console.log(error.message);
        
    }
}
}
async function updateTblCommonBaseType(findRequest){

    try{
        let pool = await sql.connect(config)
            for(x in findRequest){
                if (x=="CommonBaseTypeId"){
                    console.log(`can not update ${x}`);
                }else if(findRequest[String(x)] !==null){
                var updateTblCommonBaseType = await pool.request().query(`UPDATE tblCommonBaseType
                SET  ${x} = N` +'\'' + findRequest[String(x)] + '\'' +
                `WHERE CommonBaseTypeId=${findRequest.CommonBaseTypeId};`)
                }else{
                    updateTblCommonBaseType = {recordsets:[[null]]} 
                    return updateTblCommonBaseType.recordsets[0][0];
                }
            }    
           updateTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =` + findRequest.CommonBaseTypeId )    
                
            return updateTblCommonBaseType.recordsets;
    }
    catch (error){
        console.log(error.message);
        
    }
}

async function deleteTblCommonBaseType(findRequest){
    try{
        let pool = await sql.connect(config)
        
            let deleteTblCommonBaseType
            let getTblCommonBaseType = await pool.request().query(`select * from tblCommonBaseType where CommonBaseTypeId =  ${findRequest.CommonBaseTypeId};`)
            
            
            

            if(getTblCommonBaseType != null){
                
                    deleteTblCommonBaseType = await pool.request().query(`DELETE FROM tblCommonBaseType WHERE CommonBaseTypeId = ${findRequest.CommonBaseTypeId};`)
                   
                }
              
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