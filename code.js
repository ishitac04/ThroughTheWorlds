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
    const board = document.getElementById('grid');
    for (i=0; i<800; i++) {
        const square = document.createElement('div')
        board.appendChild(square)
    }
    boxes = document.querySelectorAll('#grid div')
}

function generateFloor() {
    for (i=680; i<800; i++) {
        boxes[i].classList.add("floor")
    }
}

function checkCollision() {
  floor=[pos, pos-40, pos+40]
  if (boxes[pos].classList.contains("floor")) {
    alert("collision")
  }
}

function jump() {
    topPos -= jumpHeight;
    character.style.top = topPos + "px";
    characterBackground();
    checkCollision();
    removeCharacterBackground();

    setTimeout(() => {
      topPos += jumpHeight;
      character.style.top = topPos + "px";
      characterBackground();
      checkCollision();
      removeCharacterBackground();
    }, 400);
}

function shoot(){
  alert("shot")
}

function createObstacle(i) {
  boxes[i].classList.add("floor");
  boxes[i+1].classList.add("floor");
  boxes[i-40].classList.add("floor");
  boxes[i-39].classList.add("floor");
}

function eraseObstacle(i) {
  boxes[i].classList.remove("floor");
  boxes[i+1].classList.remove("floor");
  boxes[i-40].classList.remove("floor");
  boxes[i-39].classList.remove("floor");
}

function movingObstacles() {
  eraseObstacle(blockposition);
  blockposition=blockposition-1;
  if (blockposition%40==0) {
    createObstacle(blockposition);
    eraseObstacle(blockposition);
    blockposition=678;
  }
  createObstacle(blockposition);
}

function characterBackground() {
  backTop = Math.floor(topPos/30);
  backLeft = Math.floor(leftPos/30);
  pos = (backTop*40) + backLeft;
  pos = pos+119;
  console.log(pos)
  boxes[pos].classList.add("characterback");
  boxes[pos+40].classList.add("characterback");
  boxes[pos-40].classList.add("characterback");
}

function removeCharacterBackground() {
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
characterBackground();
setInterval(movingObstacles,100)


document.addEventListener("keydown", e => {
  if (e.key === " ") {
    jump();
  } 
  else if (e.key === "i") {
    shoot();
  }
});