export function formatDate(date, format) {
  console.log("date",date);
  if (!format) format = "dd-mm-yyyy";

  if (!date) date = new Date();
  else date = new Date(date);
  console.log('fecha',date.getDate(), date.getMonth(), date.getFullYear());
  let month = "" + (date.getMonth()+1);
  let day = "" + (date.getDate());
  let year = date.getFullYear();
  // if (day.length < 2) day = "0" + day;
  // if (month.length < 2) month = "0" + month;
  format = format.replace("dd", day);
  format = format.replace("mm", month);
  format = format.replace("yyyy", year);
  console.log('format',format);
  return format;
}

console.log(new Date().getTime());