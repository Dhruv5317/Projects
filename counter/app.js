const daysE=document.getElementById("days");
const hoursE=document.getElementById("hours");
const minsE=document.getElementById("mins");
const secondsE=document.getElementById("seconds")


const mybday='1 nov 2021';
function countdown(){
    const bdaydate=new Date(mybday);
    const currentdate= new Date();
    const tseconds=(bdaydate-currentdate)/1000;
    const days=Math.floor(tseconds/3600/24);
    const hours=Math.floor(tseconds/3600)%24;
    const mins=Math.floor(tseconds/60)%60;
    const seconds=Math.floor(tseconds)%60;
    daysE.innerHTML=days;
    hoursE.innerHTML=hours;
    minsE.innerHTML=mins;
    secondsE.innerHTML=seconds;
}
countdown();
setInterval(countdown,1000);