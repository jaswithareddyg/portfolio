// Select the canvas element and get its 2D rendering context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Define parameters for the motion
const motionParams = {
  pointsNumber: 40, // Number of points in the trail
  widthFactor: 0.3, // Factor affecting the width of the lines
  spring: 0.4, // Springiness factor
  friction: 0.5, // Friction factor
};

// Initialize variables for mouse movement detection
let mouseMoved = false;
const pointer = { x: 0.5 * window.innerWidth, y: 0.5 * window.innerHeight };

// Initialize trail array to store the points
const trail = Array.from({ length: motionParams.pointsNumber }, () => ({
  x: pointer.x,
  y: pointer.y,
  dx: 0,
  dy: 0,
}));

// Event listeners for mouse and touch events
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("touchmove", handleTouchMove);
window.addEventListener("click", handleMouseClick);
window.addEventListener("resize", setupCanvas);

// Function to handle mouse movement
function handleMouseMove(e) {
  mouseMoved = true;
  updateMousePosition(e.pageX, e.pageY);
}

// Function to handle touch movement
function handleTouchMove(e) {
  mouseMoved = true;
  updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
}

// Function to handle mouse click
function handleMouseClick(e) {
  updateMousePosition(e.pageX, e.pageY);
}

// Function to update the mouse position
function updateMousePosition(x, y) {
  pointer.x = x;
  pointer.y = y;
}

// Function to update the animation
function update(t) {
  // For intro motion
  if (!mouseMoved) {
    pointer.x =
      (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
      window.innerWidth;
    pointer.y =
      (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
      window.innerHeight;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update trail points
  trail.forEach((p, pIdx) => {
    const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
    const spring = pIdx === 0 ? 0.4 * motionParams.spring : motionParams.spring;
    p.dx += (prev.x - p.x) * spring;
    p.dy += (prev.y - p.y) * spring;
    p.dx *= motionParams.friction;
    p.dy *= motionParams.friction;
    p.x += p.dx;
    p.y += p.dy;
  });

  // Render the trail
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);

  for (let i = 1; i < trail.length - 1; i++) {
    const xc = 0.5 * (trail[i].x + trail[i + 1].x);
    const yc = 0.5 * (trail[i].y + trail[i + 1].y);
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
    ctx.lineWidth = motionParams.widthFactor * (motionParams.pointsNumber - i);
    ctx.stroke();
  }
  ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
  ctx.stroke();

  // Request next animation frame
  window.requestAnimationFrame(update);
}

// Function to setup canvas size
function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Initial setup of canvas and start animation
setupCanvas();
update(0);
