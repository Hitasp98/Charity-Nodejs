"use strict";

//1398/01/01
//date1<date2
function datechack(date1, date2) {
  var year1 = parseInt(date1.slice(0, 4));
  var month1 = parseInt(date1.slice(5, 7));
  var day1 = parseInt(date1.slice(8, 10)); ///////////////////////

  var year2 = parseInt(date2.slice(0, 4));
  var month2 = parseInt(date2.slice(5, 7));
  var day2 = parseInt(date2.slice(8, 10));
  console.log(year1);
  console.log(year2); //تاریخ شبیه به هم رو اشتباه برمیگردونیم 

  if (year1 == year2 && month1 == month2 && day1 == day2) {
    return false;
  } else if (year1 <= year2) {
    if (month1 <= month2) {
      if (day1 <= day2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
} // console.log(datechack("1400/03/05", "1400/05/07"))


module.exports = {
  datechack: datechack
};