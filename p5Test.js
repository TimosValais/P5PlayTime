let canvas;
let drawing = false;
const shapeDropdownButton = document.getElementById("shapeDropdown");
let prevMouseX = 0;
let prevMouseY = 0;
const brushStatus = document.getElementById("brushStatus");

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    const selectedItemText = event.target.textContent;
    document.getElementById("shapeDropdown").textContent = selectedItemText;
  });
});

const firstDropdownItem = document.querySelector(".default-shape");
shapeDropdownButton.textContent = firstDropdownItem.textContent;

let fillColorPicker = document.getElementById("fill-color-picker");
let fillColorValue = document.getElementById("fill-color-value");

let strokeColorPicker = document.getElementById("stroke-color-picker");
let strokeColorValue = document.getElementById("stroke-color-value");

let bgColorPicker = document.getElementById("bg-color-picker");
let bgColorValue = document.getElementById("bg-color-value");

fillColorPicker.addEventListener("input", () => {
  fillColorValue.value = fillColorPicker.value;
});

strokeColorPicker.addEventListener("input", () => {
  strokeColorValue.value = strokeColorPicker.value;
});

bgColorPicker.addEventListener("input", () => {
  bgColorValue.value = bgColorPicker.value;
  canvas.background(bgColorPicker.value);
});

function setup() {
  let canvasContainer = document.getElementById("canvasContainer");
  let containerWidth = canvasContainer.offsetWidth;
  let containerHeight = canvasContainer.offsetHeight;

  canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent("canvasContainer");
  background(0);

  canvas.mousePressed(handleCanvasClick);
  canvas.mouseReleased(handleCanvasRelease);
  canvas.elt.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  let brushButton = select("#brushButton");
  let clearButton = select("#clearButton");
  brushButton.mousePressed(toggleDrawing);
  clearButton.mousePressed(clearTheCanvas);
}

function draw() {
  if (drawing) {
    drawActiveShape(mouseX, mouseY, 80, 80);
  }
}

function drawActiveShape(mouseX, mouseY, height, width) {
  fill(fillColorValue.value);
  stroke(strokeColorValue.value);

  switch (shapeDropdownButton.textContent) {
    case "Ellipse":
      ellipse(mouseX, mouseY, height, width);
      break;
    case "Rectangle":
      rect(mouseX, mouseY, height, width);
      break;
    case "Triangle":
      drawTriangle(mouseX, mouseY, height, width);
      break;
    case "Line":
      drawLine(prevMouseX, prevMouseY, mouseX, mouseY);
      break;
    default:
      break;
  }
}

function toggleDrawing() {
  toggleBrushButton();
  drawing = !drawing;
}
function toggleBrushButton() {
  if (!drawing) {
    brushStatus.classList.remove("d-none");
    // brushButton.classList.remove("btn-danger");
    // brushButton.classList.add("btn-primary");
    // brushButton.textContent = "Brush";
  } else {
    brushStatus.classList.add("d-none");
    // brushButton.classList.remove("btn-primary");
    // brushButton.classList.add("btn-danger");
    // brushButton.textContent = "Unbrush";
  }
}
function handleCanvasClick() {
  if (mouseButton === LEFT) {
    toggleDrawing();
    if (!drawing) {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    }
  } else if (mouseButton === RIGHT) {
    clearTheCanvas();
  }
}

function handleCanvasRelease() {
  if (mouseButton === LEFT) {
    toggleDrawing();
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

function clearTheCanvas() {
  background(bgColorValue.value);
}

function drawTriangle(x, y, height, width) {
  triangle(x, y, x - width / 2, y + height, x + width / 2, y + height);
}

function drawLine(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
}
