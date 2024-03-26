document.addEventListener('DOMContentLoaded', function () {
  // Get the container for circles
  var circlesContainer = document.querySelector('.circles');

  if (!circlesContainer) {
    console.error("Container for circles not found!");
    return;
  }

  console.log("Generating circles...");

  var circles = []; // Array to store circle positions

  // Function to check if the new circle overlaps with existing circles
  function isOverlapping(x, y, size) {
    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];
      var distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
      if (distance < (size + circle.size + 20)) { // 20 pixels added for minimum separation
        return true; // Overlapping
      }
    }
    return false; // Not overlapping
  }

  // Function to generate a single circle
  function generateCircle() {
    var size = Math.floor(Math.random() * 60) + 100; // Random size between 100 and 160 pixels
    var posX, posY;

    // Generate position until it meets the minimum separation requirement
    do {
      posX = Math.random() * (circlesContainer.offsetWidth - size);
      posY = Math.random() * (circlesContainer.offsetHeight - size);
    } while (isOverlapping(posX, posY, size));

    // Store the position of the new circle
    circles.push({ x: posX, y: posY, size: size });

    // Create li element (circle)
    var circle = document.createElement('li');
    circle.classList.add('circle');

    // Apply styles
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.style.left = posX + 'px';
    circle.style.top = posY + 'px';

    // Append circle to container
    circlesContainer.appendChild(circle);
  }

  // Generate 5 circles initially
  for (var i = 0; i < 5; i++) {
    generateCircle();
  }
});
