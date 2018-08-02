// Jan 1st 1970 00:00:00 is unix apex time

// unix apex is used as relative timezone which is in UTC

// any + number is considered as future
// any - number is considered as past 

//1000 is equal to 1sec

//in Javascript itme is referred to as millisec

/*var date= new Date();
console.log(date.getMonth());*/

var moment=require("moment");

var date= moment();

//date.add('1','y').subtract('1','months')
console.log(date.format('MMM Do, YYYY h:MM:ss a'))
console.log(moment().format("ddd, hA")); 


