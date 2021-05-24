function ws_loadCharity() {
  $.ajax({
    type: "POST",
    url: "/CharityAccounts/getCharityAccounts",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
      BaseTypeCode: "IkM",

    }),
    dataType: "json",
    success: function(data) {
      console.log(data);
      for (row of data) {
        //TODO append table
        $("#Charity").append(

          "<tr onclick=EditRecordForEditDemo(this)><td>"+row.CharityAccountId+"</td><td>"+row.OwnerName+"</td><td>"+row.CardNumber+"</td><td>"+row.AccountName+"</td><td>"+row.AccountNumber+"</td><td>"+row.BranchName+"</td></tr>"
        );
       
      }
    },
  });
}
ws_loadCharity();

//

function btnnew() {
  const BankId = document.getElementById("BankId").value;
  const BranchName = document.getElementById("BranchName").value;
  const OwnerName = document.getElementById("OwnerName").value;
  const AccountNumber = document.getElementById("AccountNumber").value;
  const CardNumber = document.getElementById("CardNumber").value;
  const AccountName = document.getElementById("AccountName").value;
  if (BankId == ""||BranchName==""||OwnerName==""||AccountNumber==""||CardNumber==""||AccountName=="") {
    alert("عنوان خالی است");
  } else {
    $.ajax({
      type: "POST",
      url: "/CommonBaseType/insertCommonBaseType",
      contentType: "application/json",
      data: JSON.stringify({
        BankId: BankId,
        BranchName: BranchName,
        OwnerName: OwnerName,
        AccountNumber: AccountNumber,
        CardNumber: CardNumber,
        AccountName: AccountName,
            }),
      dataType: "json",
      success: function(data) {
        alert(JSON.stringify(data));
      },  
    });
    location.reload();

  }
}

let rowJavascript;
let rowjQuery;
let basetypecode
let commonbasetypeid
function EditRecordForEditDemo(element) {
  rowJavascript = element.parentNode.parentNode;
  rowjQuery = $(element).closest("tr");
}
function btnedit() {
  try{
  alert(rowjQuery[0].rowIndex-1)
  const BaseTypeTitle = document.getElementById("BaseTypeTitle1").value;

  
  
  $.ajax({
    type: "POST",
    url: "http://localhost:8090/CommonBaseType/getCommonBaseType",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
    }),
    dataType: "json",
    success: function(data) {
      let i = 0;
      for (row of data) {
        if (i == rowjQuery[0].rowIndex-1) {
          commonbasetypeid = row.CommonBaseTypeId;
          basetypecode= row.BaseTypeCode
          break;
        }
        i = i + 1;
      }
      console.log(commonbasetypeid)
      if (BaseTypeTitle == "") {
        alert("عنوان خالی است");
      } else if(commonbasetypeid==""||basetypecode==""){
        alert("موردی انتخاب نشد");

      }
      else {
        $.ajax({
          type: "PUT",
          url: "/CommonBaseType/updateCommonBaseType",
          contentType: "application/json",
          data: JSON.stringify({
            BaseTypeTitle: BaseTypeTitle,
            BaseTypeCode: basetypecode,
            CommonBaseTypeId: commonbasetypeid,
          }),
          dataType: "json",
          success: function(data) {
            alert(JSON.stringify(data));
            location.reload()
          },
        });
      }
    },
  });
}
catch (err){
  alert("موردی انتخاب نشد");

}
}



function btndelete() {
  try{
  alert(rowjQuery[0].rowIndex-1)

  
  
  $.ajax({
    type: "POST",
    url: "http://localhost:8090/CommonBaseType/getCommonBaseType",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
    }),
    dataType: "json",
    success: function(data) {
      let i = 0;
      for (row of data) {
        if (i == rowjQuery[0].rowIndex-1) {
          commonbasetypeid = row.CommonBaseTypeId;
        
          break;
        }
        i = i + 1;
      }
      console.log(commonbasetypeid)
      if (commonbasetypeid == "") {
        alert("شناسه یا ورودی انتخاب نشده");
      } else {
        $.ajax({
          type: "delete",
          url: "/CommonBaseType/deleteCommonBaseType",
          contentType: "application/json",
          data: JSON.stringify({
            CommonBaseTypeId: commonbasetypeid,
          }),
          dataType: "json",
          success: function(data) {
            alert(JSON.stringify(data));
      
            location.reload();
          },
        });
      }
    },
  });
}catch (err){
    alert("موردی انتخاب نشد");
  
  }
}