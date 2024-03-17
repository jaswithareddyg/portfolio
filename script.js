document.addEventListener("DOMContentLoaded", function () {
  // Get the container for circles
  var circlesContainer = document.querySelector(".circles");

  if (!circlesContainer) {
    console.error("Container for circles not found!");
    return;
  }

  console.log("Generating circles...");

  // Function to generate a single circle
  function generateCircle() {
    // Create li element (circle)
    var circle = document.createElement("li");
    circle.classList.add("circle");

    // Set random size
    var size = Math.floor(Math.random() * 100) + 20; // Random size between 20 and 120 pixels

    // Set random position at the bottom
    var posX = Math.random() * (window.innerWidth - size); // Random position within window width
    var posY = window.innerHeight - size; // Position at the bottom of the window

    // Apply styles
    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.left = posX + "px";
    circle.style.top = posY + "px";
    circle.style.animationDuration = Math.floor(Math.random() * 10) + 5 + "s"; // Random animation duration between 5 and 15 seconds

    // Append circle to container
    circlesContainer.appendChild(circle);
  }

  // Function to generate circles continuously
  function generateCircles() {
    generateCircle(); // Generate a single circle
    setTimeout(generateCircles, 1000); // Continue generating circles every 1 second
  }

  // Start generating circles
  generateCircles();
});
