
//this the function where whole the game loads 
const game=()=> {
    let pscore=0;
    let cscore=0;
    const startgame = ()=>{
        //getting attributes with with DOM
        const playbtn=document.querySelector('.intro button');
        const introscreen=document.querySelector('.intro');
        const match=document.querySelector('.match');
        //on click event
        playbtn.addEventListener('click',()=> {
            introscreen.classList.add('fadeout');
            match.classList.add('fadein');
        });
    };
    //this will happen at playtime
const playmatch=()=>{
    const options=document.querySelectorAll('.options button');
    const playerhand=document.querySelector('.player-hand');
    const comphand=document.querySelector('.computer-hand');
    const comoptions=['rock','paper','scissors'];
    const hands=document.querySelectorAll('.hands img')
    
    hands.forEach(hand=>{
        hand.addEventListener('animationend',function(){
            this.style.animation="";
        });
    });


    options.forEach(option=>{
        //this is an event for every option we select
        option.addEventListener('click',function(){       
           //.random method will generate random number
            const comnumber=Math.floor(Math.random()*3);
            const comchoice=comoptions[comnumber];
            //settimeout method for animation
            setTimeout(()=>{
                //this.textcontent=the option we select for e.g. rock,paper,scissors
                comparehands(this.textContent,comchoice); 
                playerhand.src = `./assets/${this.textContent}.png`;
                comphand.src=`./assets/${comchoice}.png`;   
            },1500);
            playerhand.style.animation="shakePlayer 2s ease";
            comphand.style.animation="shakeComputer 2s ease";   
        });
    }); 
};
//this is for UPADATING THE SCORE
const updatescore = ()=>{
    const playerscore=document.querySelector('.player-score p');
    const computerscore=document.querySelector('.computer-score p');
    playerscore.textContent=pscore;
    computerscore.textContent=cscore;  
};
//this function will compare who wins..
const comparehands = (playerchoice,comchoice)=>{
    const winner= document.querySelector('.winner');
    if(playerchoice === comchoice)
    {
        winneer.textContent="It is a tie";
        return;
    }
    if(playerchoice==='rock')
    {
        if (comchoice==='scissors'){
            winner.textContent="Player Wins";
            pscore++;
            //every time =we have to call that function
            updatescore();
            return;
        }
        else{
            winner.textContent="Computer Wins";
            cscore++;
            updatescore();
            return;
        }
    }
    if(playerchoice==='paper')
    {
        if (comchoice==='scissors'){
            winner.textContent="Computer Wins";
            cscore++;
            updatescore();
            return;
        }
        else{
            winner.textContent="Player Wins";
            pscore++;
            updatescore();
            return;
        }
    }
    if(playerchoice==='scissors')
    {
        if (comchoice==='rock'){
            winner.textContent="Computer Wins";
            cscore++;
            updatescore();
            return;
        }
        else{
            winner.textContent="Player Wins";
            pscore++;
            updatescore();
            return;
        }
    }
};
//calling the all function 
startgame();
playmatch();
};
game();