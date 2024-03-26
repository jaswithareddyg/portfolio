document.addEventListener('DOMContentLoaded', function () {
  // Get the container for circles
  var circlesContainer = document.querySelector('.circles');

  if (!circlesContainer) {
    console.error("Container for circles not found!");
    return;
  }

  console.log("Generating circles...");

  // Function to generate a single circle
  function generateCircle() {
    // Create li element (circle)
    var circle = document.createElement('li');
    circle.classList.add('circle');

    // Set random size
    var size = Math.floor(Math.random() * 60) + 40; // Random size between 40 and 100 pixels
    
    // Set random position within the container bounds
    var containerRect = circlesContainer.getBoundingClientRect();
    var posX = Math.random() * (containerRect.width - size);
    var posY = Math.random() * (containerRect.height - size);

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

  // Function to move circles with parallax effect
  function moveCircles(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var containerRect = circlesContainer.getBoundingClientRect();

    var centerX = containerRect.left + containerRect.width / 2;
    var centerY = containerRect.top + containerRect.height / 2;

    var circles = circlesContainer.querySelectorAll('.circle');
    circles.forEach(function(circle, index) {
      // Calculate parallax effect based on mouse position
      var parallaxAmount = index + 1;
      var offsetX = (mouseX - centerX) * parallaxAmount / 100;
      var offsetY = (mouseY - centerY) * parallaxAmount / 100;

      // Ensure the circle stays within the bounds of the container
      var posX = Math.max(0, Math.min(containerRect.width - parseFloat(circle.style.width), centerX + offsetX - parseFloat(circle.style.width) / 2));
      var posY = Math.max(0, Math.min(containerRect.height - parseFloat(circle.style.height), centerY + offsetY - parseFloat(circle.style.height) / 2));

      // Apply parallax effect to circle position
      circle.style.transform = `translate(${posX}px, ${posY}px)`;
    });
  }

  // Listen for mousemove event to apply parallax effect
  document.addEventListener('mousemove', moveCircles);
});
