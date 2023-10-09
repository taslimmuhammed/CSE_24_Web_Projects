const cs41_canvas = document.getElementById('cs41-myCanvas');
cs41_canvas.width = 1000;
cs41_canvas.height = 440;
const cs41_ctx = cs41_canvas.getContext('2d');
let cs41_isDrawing = false;
let cs41_isErasing = false;
let cs41_score = 0;

function cs41_startDrawing(e) {
  cs41_isDrawing = true;
  cs41_ctx.lineWidth = cs41_isErasing ? 20 : 3;
  cs41_ctx.lineCap = 'round';
  cs41_ctx.strokeStyle = cs41_isErasing ? 'white' : 'black';
  cs41_ctx.beginPath();
  cs41_ctx.moveTo(e.clientX - cs41_canvas.offsetLeft, e.clientY - cs41_canvas.offsetTop);
}

function cs41_draw(e) {
  if (!cs41_isDrawing) return;
  cs41_ctx.lineTo(e.clientX - cs41_canvas.offsetLeft, e.clientY - cs41_canvas.offsetTop);
  cs41_ctx.stroke();
}

function cs41_stopDrawing() {
  cs41_isDrawing = false;
  cs41_ctx.closePath();
}

function cs41_toggleEraser() {
  cs41_isErasing = !cs41_isErasing;
  if (cs41_isErasing) {
    cs41_eraserBtn.textContent = 'Switch to Pencil';
  } else {
    cs41_eraserBtn.textContent = 'Switch to Eraser';
  }
}

cs41_canvas.addEventListener('mousedown', cs41_startDrawing);
cs41_canvas.addEventListener('mousemove', cs41_draw);
cs41_canvas.addEventListener('mouseup', cs41_stopDrawing);
cs41_canvas.addEventListener('mouseout', cs41_stopDrawing);

const cs41_eraserBtn = document.getElementById('cs41-eraserBtn');
cs41_eraserBtn.addEventListener('click', cs41_toggleEraser);
