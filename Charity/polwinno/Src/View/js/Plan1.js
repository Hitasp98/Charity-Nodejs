//connect selector
function getmsgs1() {
    $.ajax({
      type: "POST",
      url: "/Personal/getPersonal",
      contentType: "application/json",
      data: JSON.stringify({
        doc_id_msgs: $("#doct_id").val(),
      }),
      dataType: "json",
      success: function(data) {
        console.log(data);
        for (row of data) {
          console.log(row.IdNumber);
          $("#msg_q").append(
            "<tr>" +
              "<td>" +
              row.IdNumber +
              " </td>" +
              "<td>" +
              row.sex +
              " </td>" +
              "<td>" +
              row.Family +
              " </td>" +
              "<td>" +
              row.NAME +
              " </td>" +
              "</tr>"
          );
        }
      },
    });
  }
  getmsgs1();
  