var date = new Date();
date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

console.log(date);