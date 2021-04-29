"use strict";

//1398/01/01
function datechack(date1, date2) {
  var year1 = date1.slice(0, 4);
  var month1 = date1.slice(5, 7);
  var day1 = date1.slice(8, 10); ///////////////////////

  var year2 = date2.slice(0, 4);
  var month2 = date2.slice(5, 7);
  var day2 = date2.slice(8, 10);
  console.log(year1 + month1 + day1);
  console.log(year2 + month2 + day2);

  if (day > day2) {
    console.log(date1);
  } else {
    console.log(date2);
  }
}

datechack("1398/01/01", "1398/01/05");