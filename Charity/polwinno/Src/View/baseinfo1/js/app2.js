function ws_loadBaseType() {
  $.ajax({
    type: "POST",
    url: "http://localhost:8090/CommonBaseType/getCommonBaseType",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
    }),
    dataType: "json",
    success: function(data) {
      console.log(data);
      let f = 0;
      for (row of data) {
        //TODO append table
        $("#baseinfo1").append(

          "<tr onclick=EditRecordForEditDemo(this)><td>"+row.BaseTypeTitle+"</td><td>"+row.CommonBaseTypeId+"</td></tr>"
        );
        console.log(f);
        f = f + 1;
      }
    },
  });
}
ws_loadBaseType();

//

function btnnew() {
  console.log("test");
  const BaseTypeTitle = document.getElementById("BaseTypeTitle").value;
  if (BaseTypeTitle == "") {
    alert("عنوان خالی است");
  } else {
    $.ajax({
      type: "POST",
      url: "/CommonBaseType/insertCommonBaseType",
      contentType: "application/json",
      data: JSON.stringify({
        BaseTypeTitle: BaseTypeTitle,
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