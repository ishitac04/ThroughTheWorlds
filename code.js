const floor=[]

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

function createCharacter(i) {
    boxes[i].classList.add("char1");
    boxes[i+1].classList.add("char2");
    boxes[i+2].classList.add("char3");
    boxes[i+40].classList.add("char4");
    boxes[i+41].classList.add("char5");
    boxes[i+42].classList.add("char6");
    boxes[i+80].classList.add("char7");
    boxes[i+81].classList.add("char8");
    boxes[i+82].classList.add("char9");
    boxes[i+120].classList.add("char10");
    boxes[i+121].classList.add("char11");
    boxes[i+122].classList.add("char12");
}

function runningMan(i) {
    boxes[i].classList.add("runningman")
}

function moveCharacter() {
    
}

generateGrid();
generateFloor();
runningMan(300);