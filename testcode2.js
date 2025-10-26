const floor=[];
const character = document.getElementById("character");
let topPos = 380;
let leftPos = 300;
const jumpHeight = 150;
let blockposition=678;
let blockposition2=473;
let backLeft;
let backTop;
let pos=609;
let lives=3;
let bgmusic = document.getElementById("bgmusic");
let lostlife = document.getElementById("lostlife");
let shot=document.getElementById("shot");
let gemcollected=document.getElementById("sparkle");
const score=document.getElementById("score");
let numscore=0;
let gemId = 0;
let startPortal=658;
let health = 100;
const healthbar = document.getElementById("healthbar");
let bulletposition=608;

function generateGrid() {
  //creates the main grid for the game
    const board = document.getElementById('grid');
    for (i=0; i<800; i++) {
        const square = document.createElement('div')
        board.appendChild(square)
    }
    boxes = document.querySelectorAll('#grid div')
}

function generateFloor() {
  //adds floor pieces to the bottom of the board
    for (i=680; i<800; i++) {
        boxes[i].classList.add("floor")
    }
}

function generatePortal(i) {
  boxes[i].classList.add("portal");
  boxes[i-40].classList.add("portal");
  boxes[i-80].classList.add("portal");
  boxes[i-120].classList.add("portal");
}

function erasePortal(i) {
  boxes[i].classList.remove("portal");
  boxes[i-40].classList.remove("portal");
  boxes[i-80].classList.remove("portal");
  boxes[i-120].classList.remove("portal");
}

function checkCollision() {
  //makes the obstacle move to create the sense that the character is
  setTimeout(() => {
    const backTop = Math.floor(topPos / 30);
    const backLeft = Math.floor(leftPos / 30);
    const posNow = (backTop * 40) + backLeft + 122;

    boxes.forEach(b => b.classList.remove("characterback"));
    boxes[posNow].classList.add("characterback");
    boxes[posNow + 40].classList.add("characterback");
    boxes[posNow - 40].classList.add("characterback");

    if (
      boxes[posNow].classList.contains("floor") ||
      boxes[posNow + 40].classList.contains("floor") ||
      boxes[posNow - 40].classList.contains("floor")
    ) {
      loseLife();
      numscore=0;
      console.log(numscore);
      score.textContent="Score: "+numscore;
    } else if (
      boxes[posNow].classList.contains("gem") ||
      boxes[posNow + 40].classList.contains("gem") ||
      boxes[posNow - 40].classList.contains("gem") ||
      boxes[posNow - 80].classList.contains("gem")
    ) { 
        health=health+20;
        gemcollected.play();
        document.body.style.filter = "brightness(10)";
        setTimeout(() => document.body.style.filter = "", 150);
        boxes[gempos].classList.remove("gem");
        disappear=1;
        numscore=numscore+1;
        console.log(numscore);
        score.textContent="Score: "+numscore;
        if (numscore==15) {
          alert("Collected enough gems! Move on to level 2 - the secret lab...")
        }
    }
  }, 4000);
}

function generateGems() {
  gemId=gemId+1;
  disappear=0;
  a=Math.floor(Math.random()*5);
  gempos=680-(a*40);
  while (boxes[gempos].classList.contains("floor") || boxes[gempos-1].classList.contains("floor") || boxes[gempos+1].classList.contains("floor")) {
    a=Math.floor(Math.random()*5);
  gempos=680-(a*40);
  }
  return gempos;
}

function attachCharacterToBack() {
  const backBox = document.querySelector(".characterback");
  if (!backBox) return;

  const boxRect = backBox.getBoundingClientRect();
  const gridRect = document.getElementById("grid").getBoundingClientRect();

  let top = boxRect.top - gridRect.top;
  let left = boxRect.left - gridRect.left;
  top=top-50
  left=left-10

  character.style.top = top + "px";
  character.style.left = left + "px";
}


function jump() {
  //makes the character jump upwards, waits and then falls back down
  let jumpUp = true;
  const jumpSpeed = 50;
  const step = 10; 
  const maxJump = 380 - jumpHeight;

  character.style.transition = "top 0.1s ease-out"; 

  let jumpInterval = setInterval(() => {
    if (jumpUp) {
      topPos -= step;
      if (topPos <= maxJump) jumpUp = false;
    } else {
      topPos += step;
      if (topPos >= 380) {
        topPos = 380;
        clearInterval(jumpInterval);
        isJumping = false;
        character.style.transition = "";
      }
    }

    checkCollision();

    const visualOffset = (jumpUp ? -20 : 0);
    character.style.top = (topPos + visualOffset) + "px";
  }, jumpSpeed);
}

function shoot() {
    const bulletinterval = setInterval(() => {
    boxes[bulletposition].classList.remove("bullet");
    bulletposition += 1;
    if (bulletposition%40==0 || boxes[bulletposition].classList.contains("floor")) {
      clearInterval(bulletinterval);
      bulletposition=575;
      return;
    }
    boxes[bulletposition].classList.add("bullet");
    }, 100);
}
  

function loseLife() {
    if (lives > 1) {
        const heart = document.getElementById(`heart${lives}`);
        heart.classList.add("lost")
        lives--;
        lostlife.play();
        health=100; 
        screenShake();
        eraseObstacle(blockposition);
        eraseObstacle2(blockposition2);
        blockposition=678;
        blockposition2=473;
    } else {
      clearInterval(movingGame);
      document.getElementById("gameover").style.display = "block";
      document.getElementById("restart").style.display = "block";
      document.getElementById("menu").style.display = "block";
      document.getElementById("character").style.display = "none";
      bgmusic.pause()
      const heart = document.getElementById(`heart${lives}`);
      heart.classList.add("lost")
      lives--;
      lostlife.play();
      screenShake();
    }
}

function createObstacle(i) {
  //creates the obstacle on the floor
  boxes[i].classList.add("floor");
  boxes[i+1].classList.add("floor");
  boxes[i-40].classList.add("floor");
  boxes[i-39].classList.add("floor");
}

function createGem(i) {
  boxes[i].classList.add("gem");
}

function moveGem() {
  boxes[a].classList.remove("gem");
  a=a-1;
  boxes[a].classList.add("gem");
}

function createObstacle2(i) {
  //creates the obstacle on the floor
  boxes[i].classList.add("floor");
  boxes[i-40].classList.add("floor");
  boxes[i+1].classList.add("floor");
  boxes[i-39].classList.add("floor");
}

function eraseObstacle(i) {
  //removes the old obstacle so that it appears to move rather than just grow
  boxes[i].classList.remove("floor");
  boxes[i+1].classList.remove("floor");
  boxes[i-40].classList.remove("floor");
  boxes[i-39].classList.remove("floor");
}

function eraseObstacle2(i) {
  //removes the old obstacle so that it appears to move rather than just grow
  boxes[i].classList.remove("floor");
  boxes[i-40].classList.remove("floor");
  boxes[i+1].classList.remove("floor");
  boxes[i-39].classList.remove("floor");
}

function screenShake() {
  const grid = document.getElementById("border");
  grid.style.animation = "shake 0.3s";
  grid.addEventListener("animationend", () => grid.style.animation = "");
}

function eraseGem(i) {
  boxes[i].classList.remove("gem");
}

function createRobot(i) {
  boxes[i-39].classList.add("robot1");
  boxes[i-1].classList.add("floor")
  boxes[i+1].classList.add("robot2");
  boxes[i+41].classList.add("robot3");
  boxes[i-38].classList.add("robot4");
  boxes[i+2].classList.add("robot5");
  boxes[i+42].classList.add("robot6");
  boxes[i-37].classList.add("robot7");
  boxes[i+3].classList.add("robot8");
  boxes[i+43].classList.add("robot9");
}

function eraseRobot(i) {
  boxes[i-39].classList.remove("robot1");
  boxes[i-1].classList.remove("floor")
  boxes[i+1].classList.remove("robot2");
  boxes[i+41].classList.remove("robot3");
  boxes[i-38].classList.remove("robot4");
  boxes[i+2].classList.remove("robot5");
  boxes[i+42].classList.remove("robot6");
  boxes[i-37].classList.remove("robot7");
  boxes[i+3].classList.remove("robot8");
  boxes[i+43].classList.remove("robot9");
}

function movingObstacles() {
  //makes the obstacle move to create the sense that the character is moving forward
  eraseGem(gem);
  eraseObstacle(blockposition);
  eraseObstacle2(blockposition2);
  eraseRobot(blockposition);
  gem=gem-1;
  blockposition=blockposition-1;
  blockposition2=blockposition2-1;
  robotposition=blockposition+1;
  startPortal=startPortal-1;
  if (blockposition%40==0) {
    createObstacle(blockposition);
    eraseObstacle(blockposition);
    blockposition=678;
  }
  if (blockposition2%40==0) {
    createObstacle(blockposition2);
    eraseObstacle(blockposition2);
    blockposition2=473;
  }
  if (gem%40==0 || disappear==1) {
    createGem(gem);
    eraseGem(gem);
    gem=generateGems();
  }
  if (startPortal%40==0) {
    document.getElementById("portal").style.display = "none";
    startPortal=startPortal+1;
  }
  createObstacle(blockposition);
  createObstacle2(blockposition2);
  createGem(gem);
  checkCollision();
}

function characterBackground() {
  //creates a way to track what boxes the character covers
  backTop = Math.floor(topPos/30);
  backLeft = Math.floor(leftPos/30);
  pos = (backTop*40) + backLeft;
  pos = pos+119;
  boxes[pos].classList.add("characterback");
  boxes[pos+40].classList.add("characterback");
  boxes[pos-40].classList.add("characterback");
  console.log(pos)
}

function removeCharacterBackground() {
  //removes the character backing so that collisions aren't detected when the character moves
  backTop = Math.floor(topPos/30);
  backLeft = Math.floor(leftPos/30);
  pos = (backTop*40) + backLeft;
  pos = pos+119;
  boxes[pos].classList.remove("characterback");
  boxes[pos+40].classList.remove("characterback");
  boxes[pos-40].classList.remove("characterback");
}

generateGrid();
generateFloor();
boxes[609].classList.add("characterback");
boxes[649].classList.add("characterback");
boxes[569].classList.add("characterback");


setInterval(() => {
  if (health > 0) {
    health = health - 10;
    healthbar.style.height = health + "%";
  } else {
    loseLife();
    health=100;
  }
}, 1000);
let gem=generateGems();
//makes the moving obstacle every 100 milliseconds
setInterval(attachCharacterToBack,50);
movingGame=setInterval(movingObstacles,100);

//detects when keys are pressed to shoot or jump
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    bgmusic.play()
    jump();
  } 
  else if (e.key === "i") {
    let bulletTop = topPos + 15; // tweak for vertical alignment
    let bulletLeft = leftPos + 30;
    shoot();
  }
});