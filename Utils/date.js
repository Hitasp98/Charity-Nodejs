
///تغییر اعداد فارسی به انگلیسی
String.prototype.toEnglishDigit = function() {
    let find = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let replace = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let replaceString = this;
    let regex;
  for (let i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};
// var fa_number = "۰۱۲۳۴۵۶۷۸۹"; 
// console.log(fa_number.toEnglishDigit());

//1398/01/01
//date1<date2
function datechack(date1, date2) {

  let year1 = date1.slice(0, 4)
  let month1 = date1.slice(5, 7)
  let day1 = date1.slice(8, 10)

  y1=year1.toEnglishDigit()
  m1=month1.toEnglishDigit()
  d1=day1.toEnglishDigit()

  ///////////////////////
  let year2 = date2.slice(0, 4)
  let month2 = date2.slice(5, 7)
  let day2 = date2.slice(8, 10)
  y2=year2.toEnglishDigit()
  m2=month2.toEnglishDigit()
  d2=day2.toEnglishDigit()


  //تاریخ شبیه به هم رو اشتباه برمیگردونیم
  if (y1 == y2) {
    if (m1 == m2) {
      if (d1 < d2) {
        return true;
      } else {
        return false;
      }
    } else if (m1 < m2) {
      return true;
    } else {
      return false;
    }
  } else if (y1 < y2) {
    return true;
  } else {
    return false;
  }
}
///return true درست است 

// console.log(datechack("۱۴۰۰/۰۲/۰۳", "۱۴۰۰/۰۲/۰۴"))
module.exports = { datechack: datechack };
