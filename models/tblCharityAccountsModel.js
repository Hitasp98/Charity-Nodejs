var config = require('../config/dbconfig');
const sql = require('mssql');
const { request } = require('express');


function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
    
}


async function getTblCharityAccounts(findRequest){
    try{
        let pool = await sql.connect(config)
   
        let getTblCharityAccounts; 
       
    
        if(findRequest.CharityAccountId==null && findRequest.BankId==null && findRequest.BranchName==null && findRequest.OwnerName==null && findRequest.CardNumber==null && findRequest.AccountNumber ==null && findRequest.AccountName ==null){
          
            getTblCharityAccounts = await pool.request().query(`select tblCharityAccounts.*,tblCommonBaseData.BaseCode,tblCommonBaseData.BaseValue,tblCommonBaseType.BaseTypeCode
            from tblCharityAccounts 
            join tblCommonBaseData
            on tblCharityAccounts.BankId=tblCommonBaseData.CommonBaseDataId 
            join tblCommonBaseType
            on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId
             where BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\'')
           
            return getTblCharityAccounts.recordsets[0]
        }else{
            
            let whereclause = ` BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\''+` AND`
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
              getTblCharityAccounts = await pool.request().query(`select tblCharityAccounts.*,tblCommonBaseData.BaseCode,tblCommonBaseData.BaseValue from tblCharityAccounts 
              join tblCommonBaseData
              on tblCharityAccounts.BankId=tblCommonBaseData.CommonBaseDataId 
              join tblCommonBaseType
              on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId where`+ whereclause )
              return getTblCharityAccounts.recordsets[0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}


async function insertTblCharityAccounts(findRequest){
   
    
    try{
        let pool = await sql.connect(config)
       
        let getTblCharityAccounts
        let getRequest = []

        let value = ''

            for(x in findRequest){
               
                if ( findRequest[String(x)] == null || typeof(findRequest[String(x)])=="number" ){
                    value = value + " "+`${findRequest[String(x)]}`+`,`
                   
                }else{
                    value = value + " "+`N`+ '\''+ findRequest[String(x)] +'\''+`,`
                    
                }
                 
            }

            value = value.slice(0,-1)
            
             getRequest = await getTblCharityAccounts(findRequest)
             
             if (getRequest[0] == null){
                let insertTblCharityAccounts = await pool.request().query(`INSERT INTO tblCharityAccounts (BankId,BranchName,OwnerName,CardNumber,AccountNumber,AccountName)
                VALUES (`+ value +`)`)
                let getTblCommonBaseData = await pool.request().query(`select tblCharityAccounts.CharityAccountId from tblCharityAccounts where AccountNumber =`+ '\''+ findRequest["AccountNumber"] +'\'')
                return getTblCommonBaseData.recordsets;
            }else if (getRequest[0] != null){
                getTblCharityAccounts = {recordsets:[]}
                return getTblCharityAccounts.recordsets;
        }
       
    }
    catch (error){
        console.log(error.message);
        
    }

}
async function updateTblCharityAccounts(findRequest){

    try{
        let updateTblCharityAccounts
        let pool = await sql.connect(config)


        let value = ''

        for(x in findRequest){
            if(x == "CharityAccountId" ){

               }
            else if( findRequest[String(x)] == null || typeof(findRequest[String(x)])=="number" ){
                value = value + " "+` ${x} = ${findRequest[String(x)]}`+`,`
               
            }else{
                value = value + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+`,`
                
            }
             
        }

        value = value.slice(0,-1)                    
        updateTblCharityAccounts = await pool.request().query(`UPDATE tblCharityAccounts
        SET  `+ value +
        ` WHERE CharityAccountId = ${findRequest.CharityAccountId};`)

        
              
        updateTblCharityAccounts = await pool.request().query(`select * from tblCharityAccounts where CharityAccountId =` + findRequest["CharityAccountId"] )   
        return updateTblCharityAccounts.recordsets;
           
    }
    catch (error){
        console.log(error.message);
        
    }
}

async function deleteTblCharityAccounts(findRequest){
    try{
        let pool = await sql.connect(config)
        
            let deleteTblCharityAccounts
            let getTblCharityAccounts = await pool.request().query(`select * from tblCharityAccounts where CharityAccountId =  ${findRequest.CharityAccountId};`)
           
                if(getTblCharityAccounts != null){
                
                    deleteTblCharityAccounts = await pool.request().query(`DELETE FROM tblCharityAccounts WHERE CharityAccountId = ${findRequest.CharityAccountId};`)
                   
                }
               
                return deleteTblCharityAccounts.rowsAffected[0];
        
        

    }
    catch (error){
        console.log(error);
    }
}

module.exports = {getTblCharityAccounts : getTblCharityAccounts,

insertTblCharityAccounts:insertTblCharityAccounts,
updateTblCharityAccounts:updateTblCharityAccounts,
deleteTblCharityAccounts:deleteTblCharityAccounts

} 