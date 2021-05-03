const body = document.querySelector(".body");
const menuContainer = document.querySelector(".menu-container");
const difficulty = document.querySelector(".difficulty");
const topScore = document.querySelector(".top-score");
const btnPlay = document.querySelector(".btn-play");

const targetsDiana = document.querySelector(".targets-diana");
const targetsStart = document.querySelector(".targets-start");

const minimumResolution = document.querySelector(".minimum-resolution");

const countDown = document.querySelector(".count-down")
const seconds = document.querySelector(".seconds");
const milliseconds = document.querySelector(".milliseconds");

const topEasy = document.querySelector(".top-easy");
const topNormal = document.querySelector(".top-normal");
const topHard = document.querySelector(".top-hard");
const topImpossible = document.querySelector(".top-impossible");

const showScore = document.querySelector(".show-score");

let gameEnds = false;

let noneFlex = "flex";

let score = -1;


const beep = new Audio;
beep.src = "Sound-effects/Mi Audio.mp3";


if (body.clientWidth < 720 || body.clientHeight < 550){
    menuContainer.style.display = "none";
    targetsStart.style.display = "none";
    targetsDiana.style.display = "none";
    minimumResolution.style.display = "flex";
} 

btnPlay.addEventListener("click", () =>{

    noneFlex = "none";

    animationHidden(menuContainer);
    animationVisible(targetsStart);
    animationVisible(countDown)
 
    seconds.textContent = "59";
    milliseconds.textContent = "99";
})

targetsStart.addEventListener("click", function () {

    score = -1;

    if (score == -1) {
        countDownTimer();
    } 
    
    targetsStart.style.display = "none";
    targetsStart.style.opacity = "0";

    score++
    firstDiana();
})
       

targetsDiana.addEventListener("click", function () {

    beep.play();

    let width = body.clientWidth - difficulty.value;
    let height = body.clientHeight - difficulty.value;

    targetsDiana.style.left = `${random(width)}px`;
    targetsDiana.style.top = `${random(height)}px`;

    score++
    showScore.textContent = score;
    console.log(score)

})


function firstDiana() {

    targetsDiana.style.display = "flex";
    targetsDiana.style.opacity = "1";
    
    let width = body.clientWidth - difficulty.value;
    let height = body.clientHeight - difficulty.value;

    targetsDiana.style.width = `${difficulty.value}px`;
    targetsDiana.style.height = `${difficulty.value}px`;

    targetsDiana.style.left = `${random(width)}px`;
    targetsDiana.style.top = `${random(height)}px`;

}

function animationHidden(hiddenElement) {
        
    let id = null;
    let opacity = 1;
    clearInterval(id);

    id = setInterval(() => {
        
        if (opacity <= 0) {
            hiddenElement.style.display = "none";
            clearInterval(id)
        } else{
            opacity -= 0.01;
            hiddenElement.style.opacity = opacity;
        }

    }, 2);

}

function animationVisible(visibleElement) {
        
    let id = null;
    let opacity = 0;
    clearInterval(id);

    id = setInterval(() => {
        
        if (opacity >= 1) {
            visibleElement.style.display = "flex";
            clearInterval(id)
        } else{
            opacity += 0.01;
            visibleElement.style.opacity = opacity;
        }

    }, 2);

}

function random(x) {
    let number = Math.round(Math.random() * x);
    return number
}

window.addEventListener("resize", function () {
    if (body.clientWidth < 720 || body.clientHeight < 550){
        menuContainer.style.display = "none";
        targetsStart.style.display = "none";
        targetsDiana.style.display = "none";
        minimumResolution.style.display = "flex";
    } 
    else{
        menuContainer.style.display = noneFlex;
        targetsStart.style.display = "flex";
        targetsDiana.style.display = "flex";
        minimumResolution.style.display = "none";
    }
})

let intervealID;

function countDownTimer() {
    
    intervealID = setInterval(() => {
    
        if (seconds.textContent == 0){

            clearInterval(stopCountDown())
            milliseconds.textContent = "00";

            gameEndsFunction();        

        }

        else{

            let milliseconds2 = parseInt(milliseconds.textContent);
            milliseconds2 -= 1 ;
            milliseconds.textContent = milliseconds2;

            if(milliseconds.textContent < 10){
                milliseconds.textContent = `0${milliseconds.textContent}`        
            }

            if(milliseconds.textContent == 0){
                milliseconds.textContent = "99";
                let seconds2 = parseInt(seconds.textContent);
                seconds2 -= 1;
                seconds.textContent = seconds2;
            }
        }
        

    }, 10);

    }

function stopCountDown() {
    clearInterval(intervealID)
}

function gameEndsFunction() {


    targetsDiana.style.display = "none";
    targetsDiana.style.opacity = "0";

    setTimeout(() => {
        
        animationHidden(countDown)
        animationVisible(menuContainer)


        if(difficulty.value == 150){
            topScoreUpdate(topEasy);
        }

        else if(difficulty.value == 100){
            topScoreUpdate(topNormal);
        }

        else if(difficulty.value == 50){     
            topScoreUpdate(topHard);
        }

        else if(difficulty.value == 25){   
            topScoreUpdate(topImpossible);
        }

        noneFlex = "flex";
        console.log("-----END-----")
        showScore.textContent = "0"

    }, 1000);
}

function topScoreUpdate(difficultySelected) {
    
    if(parseInt(difficultySelected.textContent) < score) {
        difficultySelected.textContent = score;
        difficultySelected.style.textShadow = `3px 3px black`;
    }

}