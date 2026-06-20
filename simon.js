let gameseq=[];
let usersq=[];
let started=false;
let level=0;
let btnss=["red","yellow","purple","green"];
let h2=document.querySelector("h2");
let btns=document.querySelectorAll(".btn");
let highest=[];

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelup();
    }
})

function levelup(){
    usersq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomidx=Math.floor(Math.random()*4);
    let randomcolour=btnss[randomidx];
    let randombtn=document.querySelector(`.${randomcolour}`);
    gameseq.push(randomcolour);
    gameflash(randombtn);

}

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 150);
}
function checkAns(idx){
    if(usersq[idx]==gameseq[idx]){
        if(usersq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        highest.push(level);
        let highestscore=highest.reduce((max,el) => {
            if(el>max){
                return el;
            }else{
                return max;
            }
        } )
        h2.innerHTML=`Game over! your score was <b>${level}<b> </br> your highest score is <b>${highestscore}<b><br>Press any key to start `;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        started=false;
        gameseq=[];
        usersq=[];
        level=0;
    }
}
function buttonpress(){
    let btn=this;
    userflash(btn);
    let btncolour= btn.getAttribute("id");
    usersq.push(btncolour);
    checkAns(usersq.length-1);
}
for(btn of btns){
    btn.addEventListener("click",buttonpress)
}


