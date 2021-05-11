function getmsgs1() {
    $.ajax({
      type: "POST",
      url: "/SecondPlan/getPlan",
      contentType: "application/json",
      data: JSON.stringify({
        doc_id_msgs: $("#doct_id").val(),
      }),
      dataType: "json",
      success: function(data) {
        console.log(data);
        for (row of data) {
          $("#msg_q").append("<tr>" + "<td>" + row.PlanName + " </td>" + "</tr>");
        }
      },
    });
  }
  getmsgs1();