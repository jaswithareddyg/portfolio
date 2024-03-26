document.addEventListener("DOMContentLoaded", function () {
  // Get the container for shapes
  var shapesContainer = document.querySelector(".shapes");

  if (!shapesContainer) {
    console.error("Container for shapes not found!");
    return;
  }

  console.log("Generating shapes...");

  var shapes = [];

  // Function to generate a single shape
  function generateShape(type) {
    var shape;
    var posX, posY;

    switch (type) {
      case "circle":
        var size = Math.floor(Math.random() * 60) + 100;
        do {
          posX = Math.random() * (shapesContainer.offsetWidth - size);
          posY = Math.random() * (shapesContainer.offsetHeight - size);
        } while (isOverlapping(posX, posY, size));

        shapes.push({ type: "circle", x: posX, y: posY, size: size });

        shape = document.createElement("li");
        shape.classList.add("circle");
        shape.style.width = size + "px";
        shape.style.height = size + "px";
        shape.style.left = posX + "px";
        shape.style.top = posY + "px";
        break;

      case "pentagon":
        // Generate pentagon position
        posX = Math.random() * (shapesContainer.offsetWidth - 54);
        posY = Math.random() * (shapesContainer.offsetHeight - 50);

        shapes.push({ type: "pentagon", x: posX, y: posY });

        shape = document.createElement("div");
        shape.classList.add("pentagon");
        shape.style.left = posX + "px";
        shape.style.top = posY + "px";
        break;

      case "heart":
        // Generate heart position
        posX = Math.random() * (shapesContainer.offsetWidth - 100);
        posY = Math.random() * (shapesContainer.offsetHeight - 90);

        shapes.push({ type: "heart", x: posX, y: posY });

        shape = document.createElement("div");
        shape.classList.add("heart");
        shape.style.left = posX + "px";
        shape.style.top = posY + "px";
        break;

      case "pacman":
        // Generate pacman position
        posX = Math.random() * (shapesContainer.offsetWidth - 60);
        posY = Math.random() * (shapesContainer.offsetHeight - 60);

        shapes.push({ type: "pacman", x: posX, y: posY });

        shape = document.createElement("div");
        shape.classList.add("pacman");
        shape.style.left = posX + "px";
        shape.style.top = posY + "px";
        break;

      case "space-invader":
        // Generate space invader position
        posX = Math.random() * (shapesContainer.offsetWidth - 200);
        posY = Math.random() * (shapesContainer.offsetHeight - 200);

        shapes.push({ type: "space-invader", x: posX, y: posY });

        shape = document.createElement("div");
        shape.classList.add("space-invader");
        shape.style.left = posX + "px";
        shape.style.top = posY + "px";
        break;

      case "hexagon":
        // Generate hexagon position
        posX = Math.random() * (shapesContainer.offsetWidth - 100);
        posY = Math.random() * (shapesContainer.offsetHeight - 57.735);

        shapes.push({ type: "hexagon", x: posX, y: posY });

        shape = document.createElement("div");
        shape.classList.add("hexagon");
        shape.style.left = posX + "px";
        shape.style.top = posY + "px";
        break;

      default:
        break;
    }

    if (shape) {
      shapesContainer.appendChild(shape);
    }
  }

  // Generate 5 shapes randomly selected between circle, pentagon, heart, pacman, space invader, hexagon
  var availableShapes = [
    "circle",
    "pentagon",
    "heart",
    "pacman",
    "space-invader",
    "hexagon",
  ];
  for (var i = 0; i < 5; i++) {
    var randomIndex = Math.floor(Math.random() * availableShapes.length);
    generateShape(availableShapes[randomIndex]);
    availableShapes.splice(randomIndex, 1);
  }

  // Function to check if the new shape overlaps with existing shapes
  function isOverlapping(x, y, size) {
    for (var i = 0; i < shapes.length; i++) {
      var shape = shapes[i];
      var distance;

      // Calculate distance based on shape type
      switch (shape.type) {
        case "circle":
          distance = Math.sqrt(
            Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2)
          );
          if (distance < size + shape.size + 20) {
            return true; // Overlapping
          }
          break;

        case "pentagon":
        case "heart":
        case "pacman":
        case "space-invader":
        case "hexagon":
          // For non-circle shapes, check if the bounding boxes overlap
          if (
            x < shape.x + shape.offsetWidth + 20 &&
            x + size + 20 > shape.x &&
            y < shape.y + shape.offsetHeight + 20 &&
            y + size + 20 > shape.y
          ) {
            return true; // Overlapping
          }
          break;

        default:
          break;
      }
    }
    return false; // Not overlapping
  }
});
