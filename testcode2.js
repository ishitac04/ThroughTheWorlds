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
      boxes[posNow - 40].classList.contains("gem")
    ) { 
        gemcollected.play();
        boxes[gempos].classList.remove("gem");
        disappear=1;
        numscore=numscore+1;
        console.log(numscore);
        score.textContent="Score: "+numscore;
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

function shoot(){
  //will make this more detailed to create actual shooting logic
  alert("shot")
}

function loseLife() {
    if (lives > 1) {
        const heart = document.getElementById(`heart${lives}`);
        heart.classList.add("lost")
        lives--;
        lostlife.play();
        eraseObstacle(blockposition);
        eraseObstacle2(blockposition2);
        blockposition=678;
        blockposition2=473;
    } else {
      clearInterval(movingGame);
      document.getElementById("gameover").style.display = "block";
      document.getElementById("character").style.display = "none";
      bgmusic.pause()
      const heart = document.getElementById(`heart${lives}`);
      heart.classList.add("lost")
      lives--;
      lostlife.play();
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

function eraseGem(i) {
  boxes[i].classList.remove("gem");
}

function movingObstacles() {
  //makes the obstacle move to create the sense that the character is moving forward
  eraseGem(gem);
  eraseObstacle(blockposition);
  eraseObstacle2(blockposition2);
  gem=gem-1;
  blockposition=blockposition-1;
  blockposition2=blockposition2-1;
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
let gem=generateGems();
//makes the moving obstacle every 100 milliseconds
setInterval(attachCharacterToBack,50)
movingGame=setInterval(movingObstacles,100)

//detects when keys are pressed to shoot or jump
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    bgmusic.play()
    jump();
  } 
  else if (e.key === "i") {
    shoot();
  }
});