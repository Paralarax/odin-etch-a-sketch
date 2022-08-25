var gridLines = true;
var eraser = false;
var rainbowMode = false;
var mouseDown  = false;

document.body.draggable = false;



function getColor() {
    let color = document.querySelector("input");
    return color.value.toString();
}

function gridLinesToggle() {
    let pixels = document.querySelectorAll(".pixel");

    if (gridLines) {
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].style.border = "0px solid black";
        }
        gridLines = false;
    }
    else {
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].style.border = "1px solid white";
        }
        gridLines = true;
    }
}

function removeCells() {
    let pixels = document.querySelectorAll(".pixel");

    for (let i = 0; i < pixels.length; i++) {
        pixels[i].remove();
    }
}

function createGrid() {
    let size = parseInt(prompt("Grid size, (max is 64): "));

    while (size > 64 || size <= 0) {
        size = parseInt(prompt("Invalid input, enter again: "));
    }

    let grid = document.querySelector(".canvas");

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    removeCells();

    for(let i = 0; i < size*size; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("pixel");
        newDiv.draggable = false;

        grid.appendChild(newDiv);
    }
    addFuncToPixel();
}

function rainbowModeToggle() {
    if (rainbowMode) rainbowMode = false;
    else rainbowMode = true;
    console.log(rainbowMode);
}

function randomColor() {
    return "#" + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substring(1, 7);
}

function mouseState() {
    document.body.onmousedown = () => (mouseDown = true)
    document.body.onmouseup = () => (mouseDown = false)
    console.log("mouse: " + mouseDown);
}

function draw(e) {
    mouseState();
    if (mouseDown) {
        if (eraser) e.target.style.backgroundColor = "black";
        else {
            if (!rainbowMode) e.target.style.backgroundColor = `${getColor()}`;
            else e.target.style.backgroundColor = `${randomColor()}`;
        }
    }
}

function addFuncToPixel() {
    let pixels = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].addEventListener("mouseover", draw);
        pixels[i].addEventListener("click", (e) => {
            if (eraser) e.target.style.backgroundColor = "black";
            else {
                if (!rainbowMode) e.target.style.backgroundColor = `${getColor()}`;
                else e.target.style.backgroundColor = `${randomColor()}`;
            }
        })
    }
}

function eraserToggle() {
    if (eraser) eraser = false;
    else eraser = true;
}

function addFunctionToBtn() {
    let buttons = document.querySelectorAll(".buttons");

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent == "Rainbow mode") {
            buttons[i].addEventListener("click", rainbowModeToggle);
        }
        else if (buttons[i].textContent == "Eraser") {
            buttons[i].addEventListener("click", eraserToggle);
        }
        else if (buttons[i].textContent == "Grid") {
            buttons[i].addEventListener("click", createGrid)
        }
        else if (buttons[i].textContent == "Grid lines") {
            buttons[i].addEventListener("click", gridLinesToggle);
        }
        else if (buttons[i].textContent == "Clear") {
            buttons[i].addEventListener("click", removeCells);
        }
    }
}


addFunctionToBtn();



