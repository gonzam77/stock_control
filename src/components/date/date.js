export const toDate = new Date();
 console.log(toDate);
 const options = {
    year:'numeric',
    month:'numeric',
    day:'numeric'
 }

 export const formattedDate = toDate.toLocaleString('arg',options)