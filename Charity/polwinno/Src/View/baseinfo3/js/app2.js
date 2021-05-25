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
          "<tr onclick=EditRecordForEditDemo(this)><td>" +
            row.CharityAccountId +
            "</td><td>" +
            row.OwnerName +
            "</td><td>" +
            row.CardNumber +
            "</td><td>" +
            row.AccountName +
            "</td><td>" +
            row.AccountNumber +
            "</td><td>" +
            row.BranchName +
            "</td></tr>"
        );
      }
    },
  });
}
ws_loadCharity();
///
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
function ws_loadBasedata1() {
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
        $("#baseinfo22").append(
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
ws_loadBasedata1();
//
let rowJavascript1;
let bankid;
let rowjQuery1;
function EditRecordForEditDemo1(element) {
  rowJavascript1 = element.parentNode.parentNode;
  rowjQuery1 = $(element).closest("tr");
}
let rowJavascript;
let charityaccountid;
let rowjQuery;
function EditRecordForEditDemo(element) {
  rowJavascript = element.parentNode.parentNode;
  rowjQuery = $(element).closest("tr");
}
function btnnew() {
  // const BankId = document.getElementById("BankId").value;
  try {
    const BranchName = document.getElementById("BranchName").value;
    const OwnerName = document.getElementById("OwnerName").value;
    const AccountNumber = document.getElementById("AccountNumber").value;
    const CardNumber = document.getElementById("CardNumber").value;
    const AccountName = document.getElementById("AccountName").value;
    console.log(BranchName);
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
            bankid = row.CommonBaseDataId;
            break;
          }
          i = i + 1;
        }
        console.log(bankid);
        if (
          BranchName == "" ||
          OwnerName == "" ||
          AccountNumber == "" ||
          CardNumber == "" ||
          AccountName == ""
        ) {
          alert("عنوان خالی است");
        } else {
          $.ajax({
            type: "POST",
            url: "/CharityAccounts/insertCharityAccounts",
            contentType: "application/json",
            data: JSON.stringify({
              BankId: bankid,
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
          // location.reload();
        }
      },
    });
  } catch (err) {
    alert("ورودي نداريم ");
  }
}

function btnedit() {
  try {
    const BranchName = document.getElementById("BranchName1").value;
    const OwnerName = document.getElementById("OwnerName1").value;
    const AccountNumber = document.getElementById("AccountNumber1").value;
    const CardNumber = document.getElementById("CardNumber1").value;
    const AccountName = document.getElementById("AccountName1").value;
    console.log(BranchName);
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
        let j = 0;

        for (row of data) {
          //TODO append table
          if (i == rowjQuery[0].rowIndex - 1) {
            charityaccountid = row.CharityAccountId;
            bankid = row.CommonBaseDataId;
            break;
          }
          i = i + 1;
        }
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
                bankid = row.CommonBaseDataId;
                break;
              }
              i = i + 1;
            }
            console.log(bankid);
            if (
              BranchName == "" ||
              OwnerName == "" ||
              AccountNumber == "" ||
              CardNumber == "" ||
              AccountName == ""
            ) {
              alert("عنوان خالی است");
            } else {
              $.ajax({
                type: "POST",
                url: "/CharityAccounts/updateCharityAccounts",
                contentType: "application/json",
                data: JSON.stringify({
                  CharityAccountId: charityaccountid,
                  BankId: bankid,
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
              // location.reload();
            }
          },
        });
      },
    });
  } catch (err) {
    alert("ورودي نداريم ");
  }
}

function btndelete() {
  try {
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
        let j = 0;

        for (row of data) {
          //TODO append table
          if (i == rowjQuery[0].rowIndex - 1) {
            charityaccountid = row.CharityAccountId;
            break;
          }
          i = i + 1;
        
        $.ajax({
          type: "POST",
          url: "/CharityAccounts/deleteCharityAccounts",
          contentType: "application/json",
          data: JSON.stringify({
            doc_id_msgs: $("#doct_id").val(),
            CharityAccountId:charityaccountid
          }),
          dataType: "json",
          success: function(data) {
            alert(data);
          
          },
        });
      }
      },
    });
  } catch (err) {
    alert("موردی انتخاب نشد");
  }
}
