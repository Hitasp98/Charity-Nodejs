var config = require('../Utils/dbconfig');
const sql = require('mssql');




//ws_loadCharityAccounts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_loadCharityAccounts(findRequest){
    try{
        let pool = await sql.connect(config)
   
        let getTblCharityAccounts; 
       
   
        if((findRequest.CharityAccountId===null && findRequest.BankId===null && findRequest.BranchName===null && findRequest.OwnerName===null && findRequest.CardNumber===null && findRequest.AccountNumber ===null && findRequest.AccountName ===null) || ((findRequest.CharityAccountId===undefined && findRequest.BankId===undefined && findRequest.BranchName===undefined && findRequest.OwnerName===undefined && findRequest.CardNumber===undefined && findRequest.AccountNumber ===undefined && findRequest.AccountName ===undefined))){
          
            getTblCharityAccounts = await pool.request()
            .query(`select tblCharityAccounts.*,tblCommonBaseData.BaseCode,tblCommonBaseData.BaseValue,tblCommonBaseType.BaseTypeCode,tblCommonBaseType.BaseTypeTitle,
            from tblCharityAccounts 
            inner join tblCommonBaseData
            on tblCharityAccounts.BankId=tblCommonBaseData.CommonBaseDataId 
            inner join tblCommonBaseType
            on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId
             where BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\'')
     
            return getTblCharityAccounts.recordsets[0]
        }else{
            
            let whereclause = ` BaseTypeCode =N`+ '\''+findRequest.BaseTypeCode+'\''+` AND`
            for (x in findRequest) {
                
                
                if (typeof(findRequest[String(x)])=="string" ){
                     whereclause = whereclause + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+` AND`;
                    
                    
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = whereclause + " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
                   
                    
                }else if(findRequest[String(x)]==null){
                    
                    whereclause = whereclause +  " "+`${x} IS null`+` AND`;
        
                }
              }
              whereclause = await whereclause.slice(0, -3)

              getTblCharityAccounts = await pool.request().query(`select tblCharityAccounts.*,tblCommonBaseData.BaseCode,tblCommonBaseData.BaseValue,tblCommonBaseType.BaseTypeCode,tblCommonBaseType.BaseTypeTitle
              from tblCharityAccounts 
              inner join tblCommonBaseData
              on tblCharityAccounts.BankId=tblCommonBaseData.CommonBaseDataId 
              inner join tblCommonBaseType
              on tblCommonBaseData.CommonBaseTypeId=tblCommonBaseType.CommonBaseTypeId where`+ whereclause )
              return getTblCharityAccounts.recordsets[0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}


//ws_CreateCharityAccounts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_CreateCharityAccounts(findRequest){
   
    
    try{
        let pool = await sql.connect(config)
       
        let value = ''

            for(x in findRequest){
               
                if ( findRequest[String(x)] == null || typeof(findRequest[String(x)])=="number" ){
                    value = value + " "+`${findRequest[String(x)]}`+`,`
                   
                }else{
                    value = value + " "+`N`+ '\''+ findRequest[String(x)] +'\''+`,`
                    
                }
                 
            }

            value = value.slice(0,-1)
            
                let insertTblCharityAccounts = await pool.request().query(`INSERT INTO tblCharityAccounts (BankId,BranchName,OwnerName,CardNumber,AccountNumber,AccountName)
                VALUES (`+ value +`)`)
                let getTblCharityAccounts = await pool.request().query(`select tblCharityAccounts.CharityAccountId from tblCharityAccounts where AccountNumber =`+ '\''+ findRequest["AccountNumber"] +'\'')
                return getTblCharityAccounts.recordsets;
           
       
    }
    catch (error){
        console.log(error.message);
        
    }

}
//ws_updateCharityAccounts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_updateCharityAccounts(findRequest){

    try{
        let updateTblCharityAccounts
        let pool = await sql.connect(config)


        let value = ''

        for(x in findRequest){
            if(x == "CharityAccountId" ){
                charityAccountIdVlue = findRequest.CharityAccountId
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
        ` WHERE CharityAccountId = ` + charityAccountIdVlue)
   
        updateTblCharityAccounts = await pool.request().query(`select * from tblCharityAccounts where CharityAccountId =` + charityAccountIdVlue )   
        return updateTblCharityAccounts.recordsets;
           
    }
    catch (error){
        console.log(error.message);
        
    }

}
//ws_deleteCharityAccounts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ws_deleteCharityAccounts(findRequest){
    try{
        let pool = await sql.connect(config)
        
            let deleteTblCharityAccounts
            
           
                
                
            deleteTblCharityAccounts = await pool.request().query(`DELETE FROM tblCharityAccounts WHERE CharityAccountId = ${findRequest.CharityAccountId};`)
                   
                
               
                return deleteTblCharityAccounts.rowsAffected[0];
        
        

    }
    catch (error){
        console.log(error);
    }
}
// just for check charity accounts (without any join)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function checkCharity(findRequest){
    try{
        let pool = await sql.connect(config)
   
        let getTblCharityAccounts; 
            let whereclause = ""
            for (x in findRequest) {
                
                
                if (typeof(findRequest[String(x)])=="string" ){
                     whereclause = whereclause + " "+`${x} = N`+ '\''+ findRequest[String(x)] +'\''+` AND`;
                    
                    
                }else if(typeof(findRequest[String(x)]) == 'number'){
                     whereclause = whereclause + " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
                   
                    
                }else if(findRequest[String(x)]==null){
                    
                    whereclause = whereclause +  " "+`${x} =  ${findRequest[String(x)]}`+` AND`;
        
                }
              
              whereclause = whereclause.slice(0, -3)
              getTblCharityAccounts = await pool.request().query(`select * from tblCharityAccounts
              where`+ whereclause )
              return getTblCharityAccounts.recordsets[0];
        }      
    }
    catch (error){
        console.log(error.message);
    }
}


module.exports = {
ws_loadCharityAccounts : ws_loadCharityAccounts,
checkCharity : checkCharity,
ws_CreateCharityAccounts : ws_CreateCharityAccounts,
ws_updateCharityAccounts : ws_updateCharityAccounts,
ws_deleteCharityAccounts : ws_deleteCharityAccounts

} 