const cs43_img1 = document.getElementById("cs43-img1");
const cs43_bird = document.getElementById("cs43-bird");
const cs43_finalScore = document.getElementById("cs43-score");
const cs43_isReset = document.getElementById("cs43-reset");
const cs43_gameOverScreen = document.getElementById("cs43-gameoverscreen");
const cs43_boundingRect1 = document.getElementById("cs43-boundingRect1");
const cs43_boundingRect2 = document.getElementById("cs43-boundingRect2");

let cs43_score = 0;
let cs43_gameRunning = true;
let cs43_yPos = 200;
let game_active = false;

document.getElementById("cs43-project").addEventListener("mouseenter", () => {game_active=true;});
document.getElementById("cs43-project").addEventListener("mouseleave", () => {game_active=false;});


function cs43_showGameOverScreen() {
  cs43_gameRunning = false;
  cs43_finalScore.textContent = "Score : " + cs43_score;
  cs43_gameOverScreen.style.display = "block";
  cs43_isReset.addEventListener("click", cs43_resetGame);
}

function cs43_resetGame() {
  // Reset game variables
  cs43_score = 0;
  cs43_gameRunning = true;
  cs43_yPos = 200;

  // Reset player position
  cs43_bird.style.top = cs43_yPos + "px";
  cs43_gameOverScreen.style.display = "none";
}

// //bird movement

function cs43_moveDown(){
  if(cs43_gameRunning){
  cs43_yPos += 1;
  cs43_bird.style.top = cs43_yPos + "px";
  if (cs43_yPos > 616) {    
    cs43_showGameOverScreen();
  }
}
}

function cs43_moveUp(){
  cs43_yPos-= 120;
  if (cs43_yPos <= -85) {    
    cs43_showGameOverScreen();
  }
}

document.addEventListener("keydown", (event) => {
  if(!game_active)
	return;
  if (event.key === "ArrowUp") {
	event.preventDefault();
    cs43_moveUp();
  }
});


let cs43_moveDownInterval = setInterval(cs43_moveDown,1);
let cs43_setRandomYPositionIntreval = setInterval(() => {
  cs43_setRandomYPosition();
}, 3000);
let cs43_detectCollisionInterval = setInterval(cs43_detectCollision, 100);



//debug
// let cs43_yPos = cs43_bird.offsetTop;
// let xPos = cs43_bird.offsetLeft;
// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowUp") {
//     moveUp();
//   }
// });
// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowDown") {
//     moveDown();
//   }
// });
// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowLeft") {
//     moveLeft();
//   }
// });
// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowRight") {
//     moveRight();
//   }
// });

// function moveUp(){
//   cs43_yPos -= 5;
//   cs43_bird.style.top = cs43_yPos + "px";
//   console.log(xPos,cs43_yPos);
//   if (cs43_yPos <= 6) {    
//     console.log("outOfBound");
//   }
// }
// function moveDown(){
//   cs43_yPos += 5;
//   cs43_bird.style.top = cs43_yPos + "px";
//   console.log(xPos,cs43_yPos);
//   if (cs43_yPos >= 616) {    
//     console.log("outOfBound");
//   }
// }
// function moveLeft(){
//   xPos -= 5;
//   cs43_bird.style.left = xPos + "px";
//   console.log(xPos,cs43_yPos);
// }
// function moveRight(){
//   xPos += 5;
//   cs43_bird.style.left = xPos + "px";
//   console.log(xPos,cs43_yPos);
// }

// cs43_img1.style.top = -240 + "px";


// randomly position the obstacle

function cs43_getRandomYPosition() {
  const cs43_minY = -240;
  const cs43_maxY = 16;
  return Math.floor(Math.random() * (cs43_maxY - cs43_minY + 1)) + cs43_minY;
}

function cs43_setRandomYPosition() {
  if(cs43_gameRunning){
    const cs43_newY = cs43_getRandomYPosition();
    cs43_img1.style.top = cs43_newY + "px";
    cs43_score++;
} 
}


//collision detection

const cs43_passThroughArea = {
  cs43_y1 : 313,
  cs43_y2 : 606,
};

function cs43_detectCollision() {
  const cs43_rect1 = cs43_img1.getBoundingClientRect();
  const cs43_rect2 = cs43_bird.getBoundingClientRect();

  if (cs43_rect2.right >= cs43_rect1.left+30 &&
      cs43_rect2.left <= cs43_rect1.right-40 &&
      (cs43_rect2.top <= cs43_rect1.top + cs43_passThroughArea.cs43_y1 || 
      cs43_rect2.bottom >= cs43_rect1.top + cs43_passThroughArea.cs43_y2)) {    
        cs43_showGameOverScreen();
  }
}

