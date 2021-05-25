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

      for (row of data) {
        //TODO append table
        $("#baseinfo1").append(
          "<tr onclick=EditRecordForEditDemo(this)><td>" +
            row.BaseTypeTitle +
            "</td><td>" +
            row.CommonBaseTypeId +
            "</td></tr>"
        );
   
      }
    },
  });
}
ws_loadBaseType();
function ws_loadBaseType1() {
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

      for (row of data) {
        //TODO append table
        $("#baseinfo11").append(
          "<tr onclick=EditRecordForEditDemo(this)><td>" +
            row.BaseTypeTitle +
            "</td><td>" +
            row.CommonBaseTypeId +
            "</td></tr>"
        );
   
      }
    },
  });
}
ws_loadBaseType1();
function ws_loadBaseType2() {
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

      for (row of data) {
        //TODO append table
        $("#baseinfo12").append(
          "<tr onclick=EditRecordForEditDemo(this)><td>" +
            row.BaseTypeTitle +
            "</td><td>" +
            row.CommonBaseTypeId +
            "</td></tr>"
        );
   
      }
    },
  });
}
ws_loadBaseType2();
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
        alert(JSON.stringify(data));//عدد که سرور دونه
 
      },
    });
    location.reload();
  }
}

let rowJavascript;
let rowjQuery;
let basetypecode;
let commonbasetypeid;
function EditRecordForEditDemo(element) {
  rowJavascript = element.parentNode.parentNode;
  rowjQuery = $(element).closest("tr");
}
function btnedit() {
  try {
   
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
          if (i == rowjQuery[0].rowIndex - 1) {
            commonbasetypeid = row.CommonBaseTypeId;
            basetypecode = row.BaseTypeCode;
            break;
          }
          i = i + 1;
        }
        console.log(commonbasetypeid);
        if (BaseTypeTitle == "") {
          alert("عنوان خالی است");
        } else if (commonbasetypeid == "" || basetypecode == "") {
          alert("موردی انتخاب نشد");
        } else {
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
              location.reload();
            },
          });
        }
      },
    });
  } catch (err) {
    alert("موردی انتخاب نشد");
  }
}

function btndelete() {
  try {
   
    basevalue;
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
          if (i == rowjQuery[0].rowIndex - 1) {
            commonbasetypeid = row.CommonBaseTypeId;

            break;
          }
          i = i + 1;
        }
        console.log(commonbasetypeid);
        if (commonbasetypeid == "") {
          alert("شناسه یا ورودی انتخاب نشده");
        } else {
          $.ajax({
            type: "post",
            url: "/CommonBaseData/insertCommonBaseData",
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
  } catch (err) {
    alert("موردی انتخاب نشد");
  }
}

///////////////////
function ws_loadBasedata() {
  $.ajax({
    type: "POST",
    url: "http://localhost:8090/CommonBaseData/getCommonBaseData",
    contentType: "application/json",
    data: JSON.stringify({
      doc_id_msgs: $("#doct_id").val(),
    }),
    dataType: "json",
    success: function(data) {
      console.log(data);
      for (row of data) {
        //TODO append table
        $("#baseinfo2").append(
          "<tr onclick=EditRecordForEditDemo1(this)><td>" +
            row.BaseValue +
            "</td><td>" +
            row.CommonBaseDataId +
            "</td></tr>"
        );
       
      }
    },
  });
}
ws_loadBasedata();
function btnNewInfo2() {
  try {

    const BaseValue = document.getElementById("basevalue").value;

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
          if (i == rowjQuery[0].rowIndex - 1) {
            commonbasetypeid = row.CommonBaseTypeId;
            break;
          }
          i = i + 1;
        }
        console.log(commonbasetypeid);
        if (BaseValue == "") {
          alert("عنوان خالی است");
        } else if (commonbasetypeid == "") {
          alert("موردی انتخاب نشد");
        } else {
          $.ajax({
            type: "POST",
            url: "/CommonBaseData/insertCommonBaseData",
            contentType: "application/json",
            data: JSON.stringify({
              BaseValue: BaseValue,
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
  } catch (err) {
    alert("موردی انتخاب نشد");
  }
}
let rowJavascript1;
let commonbasedataid;
let rowjQuery1;
function EditRecordForEditDemo1(element) {
  rowJavascript1 = element.parentNode.parentNode;
  rowjQuery1 = $(element).closest("tr");
}
function btnEditInfo2() {

  try {
    alert(rowjQuery1[0].rowIndex - 1);
    const BaseValue = document.getElementById("basevalue1").value;

    $.ajax({
      type: "POST",
      url: "http://localhost:8090/CommonBaseData/getCommonBaseData",
      contentType: "application/json",
      data: JSON.stringify({
        doc_id_msgs: $("#doct_id").val(),
      }),
      dataType: "json",
      success: function(data) {
        let i = 0;
        for (row of data) {
          if (i == rowjQuery1[0].rowIndex - 1) {
            commonbasetypeid = row.CommonBaseTypeId;
            commonbasedataid=row.CommonBaseDataId;
            break;
          }
          i = i + 1;
        }
        console.log(commonbasetypeid);
        console.log(commonbasedataid);

        if (BaseValue == "") {
          alert("عنوان خالی است");
        } else if (commonbasetypeid == ""||commonbasedataid=="") {
          alert("موردی انتخاب نشد");
        } else {
          $.ajax({
            type: "PUt",
            url: "/CommonBaseData/updateCommonBaseData",
            contentType: "application/json",
            data: JSON.stringify({
              BaseValue: BaseValue,
              CommonBaseTypeId: commonbasetypeid,
              CommonBaseDataId:commonbasedataid,
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
  } catch (err) {
    alert("موردی انتخاب نشد");
  }
}
function btnDeleteInfo2() {

  try {
    alert(rowjQuery1[0].rowIndex - 1);

    $.ajax({
      type: "POST",
      url: "http://localhost:8090/CommonBaseData/getCommonBaseData",
      contentType: "application/json",
      data: JSON.stringify({
        doc_id_msgs: $("#doct_id").val(),
      }),
      dataType: "json",
      success: function(data) {
        let i = 0;
        for (row of data) {
          if (i == rowjQuery1[0].rowIndex - 1) {
            commonbasedataid=row.CommonBaseDataId;
            break;
          }
          i = i + 1;
        }
        console.log(commonbasedataid);

      if (commonbasedataid=="") {
          alert("موردی انتخاب نشد");
        } else {
          $.ajax({
            type: "DELETE",
            url: "/CommonBaseData/deleteCommonBaseData",
            contentType: "application/json",
            data: JSON.stringify({
            
              CommonBaseDataId:commonbasedataid,
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
  } catch (err) {
    alert("موردی انتخاب نشد");
  }
}