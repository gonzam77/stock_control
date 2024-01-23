export function formatDate(date, format) {
  if (!format) format = "dd-mm-yyyy";

  if (!date) date = new Date();
  else date = new Date(date);

  let month = "" + (date.getMonth() + 1);
  let day = "" + (date.getDate() + 1);
  let year = date.getFullYear();
  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;
  format = format.replace("dd", day);
  format = format.replace("mm", month);
  format = format.replace("yyyy", year);

  return format;
}
