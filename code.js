const floor=[];
const character = document.getElementById("character");
let topPos = 380;
let leftPos = 300;
const jumpHeight = 150;
let blockposition=678;
let backLeft;
let backTop;
let pos=609;

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
    const posNow = (backTop * 40) + backLeft + 119;

    boxes.forEach(b => b.classList.remove("characterback"));
    boxes[posNow].classList.add("characterback");
    boxes[posNow + 40].classList.add("characterback");
    boxes[posNow - 40].classList.add("characterback");

    if (
      boxes[posNow].classList.contains("floor") ||
      boxes[posNow + 40].classList.contains("floor") ||
      boxes[posNow - 40].classList.contains("floor")
    ) {
      alert("collision!");
      location.reload();
    }
  }, 2000);
}


function jump() {
    //makes the character jump upwards, waits and then falls back down
    topPos -= jumpHeight;
    character.style.top = topPos + "px";
    checkCollision();

    setTimeout(() => {
      topPos += jumpHeight;
      character.style.top = topPos + "px";
      checkCollision();
    }, 400);
}

function shoot(){
  //will make this more detailed to create actual shooting logic
  alert("shot")
}

function createObstacle(i) {
  //creates the obstacle on the floor
  boxes[i].classList.add("floor");
  boxes[i+1].classList.add("floor");
  boxes[i-40].classList.add("floor");
  boxes[i-39].classList.add("floor");

  let a=Math.floor(Math.random()*3)
  if (a==1) {
    boxes[i-200].classList.add("floor");
    boxes[i-199].classList.add("floor");
  }
}

function eraseObstacle(i) {
  //removes the old obstacle so that it appears to move rather than just grow
  boxes[i].classList.remove("floor");
  boxes[i+1].classList.remove("floor");
  boxes[i-40].classList.remove("floor");
  boxes[i-39].classList.remove("floor");
}

function movingObstacles() {
  //makes the obstacle move to create the sense that the character is moving forward
  eraseObstacle(blockposition);
  blockposition=blockposition-1;
  if (blockposition%40==0) {
    createObstacle(blockposition);
    eraseObstacle(blockposition);
    blockposition=678;
  }
  createObstacle(blockposition);
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
//makes the moving obstacle every 100 milliseconds
//setInterval(movingObstacles,100)

//detects when keys are pressed to shoot or jump
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    jump();
  } 
  else if (e.key === "i") {
    shoot();
  }
});