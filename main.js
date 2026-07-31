//main page
const hamIcon = document.querySelector("#hamIcon");
const topicContainer = document.querySelector("#topic-container");

hamIcon.addEventListener("click", function(){
   if (topicContainer.classList.contains("show")) {
        topicContainer.classList.remove("show");
    }
    else {
        topicContainer.classList.add("show");
    }

});


//card display

const rankCard = document.querySelector("#rankCard");
const dutyCard = document.querySelector("#dutyCard");
const impactCard = document.querySelector("#impactCard");


function hideAll() {
    let info = document.querySelectorAll(".info");

    for (let item of info) {
    item.style.display = "none";
}
}

function showTopic(id){
    hideAll();
    document.querySelector("#" + id).style.display = "block";
}

rankCard.addEventListener("click", function(){
    showTopic("rank");
});

dutyCard.addEventListener("click", function(){
    showTopic("duty");
});

impactCard.addEventListener("click", function(){
    showTopic("impact");
});

hideAll();






//GAME SECTION VERY IMPORTANT--------------------------------------------------------------------------------------

//actual game
//make bee image follow mouse
//dont forget phone


const playBtn = document.querySelector("#playBtn");
const restartBtn = document.querySelector("#restartBtn");

const game = document.querySelector("#game");
const GameArena = document.querySelector("#GameArena");

const bee = document.querySelector("#bee");
const wasp = document.querySelector("#wasp");
const arena = document.querySelector("#arena");

const scoretext = document.querySelector("#score");
const gameOverScreen = document.querySelector("#gameOver");
const gameOverTitle = gameOverScreen.querySelector("h2");


// flowers
const flowers = document.querySelectorAll(".flower");



let gameActive = false;

let pollinate = 0;
let target = 30;

let waspTime;
let collisiontime;



// Bee movement

function beeMove(event){	
    let x;
    let y;


    // phone
    if(event.touches){

        x = event.touches[0].clientX;
        y = event.touches[0].clientY;

    }

    // mouse
    else{

        x = event.clientX;
        y = event.clientY;

    }


    let arenaPosition = arena.getBoundingClientRect();


    x -= arenaPosition.left;
    y -= arenaPosition.top;



    bee.style.left = x - bee.clientWidth / 2 + "px";
    bee.style.top = y - bee.clientHeight / 2 + "px";

}



arena.addEventListener("mousemove", beeMove);
arena.addEventListener("touchstart", beeMove, {passive:false}); // mobile: move when touch screen
arena.addEventListener("touchmove", beeMove, {passive:false}); // mobile: move when dragging




// random number

function GetRandom(min,max){

    return Math.round(Math.random() * (max-min)) + min;

}


// wasp movement

const waspAudio = new Audio("audio/waspSound.mp3");


function waspMove(){
    let x = GetRandom(0,arena.clientWidth - wasp.clientWidth);
    let y = GetRandom(0, arena.clientHeight - wasp.clientHeight);

    wasp.style.left = x + "px";
    wasp.style.top = y + "px";

}





// spawn flowers

function spawnFlowers(){


    flowers.forEach(function(flower){

        let x = GetRandom(0, arena.clientWidth - flower.clientWidth);
        let y = GetRandom(0, arena.clientHeight - flower.clientHeight);


        flower.style.left = x + "px";
        flower.style.top = y + "px";
        flower.classList.remove("pollinated");
    });
}


// respawn flower
function respawnFlower(flower){
    setTimeout(function(){

        let x = GetRandom(0, arena.clientWidth - flower.clientWidth);
        let y = GetRandom(0, arena.clientHeight - flower.clientHeight);


        flower.style.left = x + "px";
        flower.style.top = y + "px";
        flower.classList.remove("pollinated");
		
    },1000);
}


// flower collision
function checkFlowerCollision(){
    let beeRect = bee.getBoundingClientRect();

    flowers.forEach(function(flower){

        if(flower.classList.contains("pollinated")){
            return;
        }

        let flowerRect = flower.getBoundingClientRect();

        if(

            beeRect.left < flowerRect.right &&
            beeRect.right > flowerRect.left &&
            beeRect.top < flowerRect.bottom &&
            beeRect.bottom > flowerRect.top

        ){


            flower.classList.add("pollinated");


            pollinate++;
            scoretext.innerHTML ="Pollinated flowers: " + pollinate + " / " + target;

            respawnFlower(flower);

            if(pollinate >= target){

                win();

            }
        }
    });
}

// wasp collision

function checkCollision(){

    if(!gameActive){
        return;
    }

    let beeRect = bee.getBoundingClientRect();
    let waspRect = wasp.getBoundingClientRect();

    if(

        beeRect.left < waspRect.right &&
        beeRect.right > waspRect.left &&
        beeRect.top < waspRect.bottom &&
        beeRect.bottom > waspRect.top

    ){

        waspAudio.play();
        gameOver();

    }
	
    checkFlowerCollision();
}

// start game
function startGame(){

    if(gameActive){
        return;
    }

    gameActive = true;
    pollinate = 0;

    scoretext.innerHTML = "Pollinated flowers: 0 / " + target;



    gameOverScreen.style.display = "none";
    arena.style.display = "block";

	bee.style.left = "100px";
    bee.style.top = "100px";



    spawnFlowers();
    waspMove();


    waspTime = setInterval(function(){


        if(gameActive){
            waspMove();
        }

    },500);

    collisiontime = setInterval(
        checkCollision,
        50
    );
}

// game over
function gameOver(){
	
    gameActive = false;

    clearInterval(waspTime);
    clearInterval(collisiontime);

    gameOverScreen.style.display = "block";
    gameOverTitle.innerHTML = "Game Over";
}


// win
const winSound = new Audio("audio/winSound.mp3");

function win(){

    gameActive = false;

    clearInterval(waspTime);
    clearInterval(collisiontime);
	
	winSound.play();

    gameOverScreen.style.display = "block";
	
    gameOverTitle.innerHTML =
    "You Win!";
}



// restart
function restart(){

    clearInterval(waspTime);
    clearInterval(collisiontime);

    flowers.forEach(function(flower){
        flower.classList.remove("pollinated");
    });

    gameActive = false;
    startGame();
}


// play button
playBtn.addEventListener("click",function(){

    game.style.display = "none";
    GameArena.style.display = "block";
	
    startGame();
});


// restart button
restartBtn.addEventListener("click",function(){
    restart();
});



const btnSubmit=document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click",CheckAns);
const scorebox=document.querySelector("#scorebox");
var q1,q2,q3,score=0;

function CheckAns(){
	score = 0;
    // Q1    
	q1 = document.querySelector("input[name='q1']:checked");
    if(q1 && q1.value == "Plants"){
        score++;
    }


    //Q2
    q2 = document.querySelectorAll("input[name='q2']:checked");
    let correctQ2 = ["Plants", "Crops", "Honey"];
    let q2Correct = true;

    if(q2.length != correctQ2.length){ //check if amount of ticked boxes equal to amount of correct answers
        q2Correct = false;
    }

    q2.forEach(function(answer){
        if(!correctQ2.includes(answer.value)){ // check for each answer 
            q2Correct = false;
        }
    });

    if(q2Correct){
        score++;
    }


    // Q3
    q3 = document.querySelector("input[name='q3']:checked");
    if(q3 && q3.value == "Nectar"){
        score++;
    }
    scorebox.innerHTML = "Score: " + score;
}

//reset without refresh
const resetBtn = document.querySelector("#resetBtn");

function resetpage(){
	hideAll(); // hide info
	
	 topicContainer.classList.remove("show"); // hide nav for mobile
	 
	 //GAME
	 gameActive = false;
	 clearInterval(waspTime);
	 clearInterval(collisiontime);
	 
	 scoretext.innerHTML = "Pollinated flowers: 0 / " + target; //reset score
	 pollinate = 0;
	 
	 game.style.display = "block"; //hide gameArena
     GameArena.style.display = "none";
     gameOverScreen.style.display = "none";
	 
	 bee.style.left = "100px"; // reset pos of bee and wasp
	 bee.style.top = "100px";
	 wasp.style.left = "300px";
	 wasp.style.top = "200px";
	 
	 //reset flowers
	 flowers.forEach(function(flower){
        flower.classList.remove("pollinated");
    });
	
	// QUIZ RESET
    let answers = document.querySelectorAll("#quiz input");
    answers.forEach(function(answer){
        answer.checked = false;
    });
	
    score = 0;
    scorebox.innerHTML = "Not submitted";
}

resetBtn.addEventListener("click", function(){
	resetpage();
	
});