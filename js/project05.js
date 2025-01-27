// ========== Variables ==========
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const brushColorInput = document.getElementById("brushColor");
const brushSizeInput = document.getElementById("brushSize");
const backgroundColorInput = document.getElementById("backgroundColor");
const undoButton = document.getElementById("undoButton");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");

let drawing = false;
let brushColor = brushColorInput.value;
let brushSize = parseInt(brushSizeInput.value, 10);
let strokes = []; // Store strokes for undo
let currentStroke = [];

// ========== Canvas Setup ==========
function initializeCanvas() {
  ctx.fillStyle = backgroundColorInput.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ========== Event Handlers ==========
function startDrawing(e) {
  drawing = true;
  currentStroke = [];
  addPointToStroke(e);
}

function stopDrawing() {
  if (drawing) {
    drawing = false;
    strokes.push(currentStroke); // Save the stroke for undo
    currentStroke = [];
  }
}

function draw(e) {
  if (!drawing) return;
  addPointToStroke(e);

  // Redraw the canvas with the current stroke
  redrawCanvas();
}

// ========== Helper Functions ==========
function addPointToStroke(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  currentStroke.push({ x, y, color: brushColor, size: brushSize });
}

function redrawCanvas() {
  // Clear the canvas and reapply the background color
  ctx.fillStyle = backgroundColorInput.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Redraw all strokes
  strokes.forEach((stroke) => drawStroke(stroke));
  drawStroke(currentStroke);
}

function drawStroke(stroke) {
  ctx.beginPath();
  stroke.forEach((point, index) => {
    ctx.lineWidth = point.size;
    ctx.strokeStyle = point.color;

    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
}

// ========== Undo ==========
function undoLastStroke() {
  strokes.pop(); // Remove the last stroke
  redrawCanvas();
}

// ========== Clear Canvas ==========
function clearCanvas() {
  strokes = []; // Clear all strokes
  initializeCanvas();
}

// ========== Save Canvas ==========
function saveCanvasAsImage() {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ========== Event Listeners ==========
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

brushColorInput.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

brushSizeInput.addEventListener("input", (e) => {
  brushSize = parseInt(e.target.value, 10);
});

backgroundColorInput.addEventListener("input", (e) => {
  redrawCanvas(); // Redraw to apply the new background color
});

undoButton.addEventListener("click", undoLastStroke);
clearButton.addEventListener("click", clearCanvas);
saveButton.addEventListener("click", saveCanvasAsImage);

// ========== Initialize ==========
initializeCanvas();
