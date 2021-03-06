/**
 * Loads a texture async
 * @param texture
 * @returns {Promise<unknown>}
 */
const loadTexture = (texture) =>
  new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });

    image.src = texture;
  });

const floor = new Array(9).fill(new Array(9).fill("X"));

const walls = [
  ["X", "X", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["X", "X", "X", "X", " ", " ", " ", " ", " "],
  ["X", "X", " ", "X", "X", " ", " ", " ", " "],
  ["X", "X", " ", " ", " ", " ", " ", " ", " "],
  ["X", "X", " ", " ", " ", " ", "X", " ", " "],
  ["X", "X", " ", "X", " ", " ", " ", " ", " "],
  ["X", "X", " ", "X", " ", " ", " ", " ", " "],
  ["X", "X", " ", " ", " ", " ", " ", " ", " "],
];

const weeds = [
  [" ", " ", " ", " ", " ", " ", "X", "X", "X"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "X"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "X"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "X"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "X"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "X"],
  [" ", " ", " ", " ", " ", " ", "X", "X", "X"],
  [" ", " ", " ", " ", " ", " ", "X", "X", "X"],
  [" ", " ", " ", " ", " ", " ", "X", "X", "X"],
];

const targets = [
  [" ", " ", " ", " ", " ", "X", " ", " ", " "],
  [" ", " ", " ", "X", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", "X", " "],
  [" ", " ", " ", " ", " ", "X", " ", " ", " "],
  [" ", " ", " ", " ", " ", "X", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
];

const boxes = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", "X", " ", " ", " ", "X", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "X", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "X", "X", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
];

const player = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["X", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
];

let playerX = 0;
let playerY = 1;

/**
 * Renders a grid of blocks with a given texture
 * @param blocks
 * @param textureImage
 * @param canvas
 * @returns {Promise<unknown>}
 */
const renderBlocks = (blocks, textureImage, canvas) => {
  // Scale the grid of the nested blocks array to the pixel grid of the canvas
  const pixelWidthBlock = canvas.width / blocks[0].length;
  const pixelHeightBlock = canvas.height / blocks.length;
  const context = canvas.getContext("2d");

  blocks.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "X") {
        context.drawImage(
          textureImage,
          x * pixelWidthBlock,
          y * pixelHeightBlock,
          pixelWidthBlock,
          pixelHeightBlock
        );
      }
    });
  });
};

/**
 * Renders a grid of blocks with a given texture
 * @param blocks
 * @param textureImage
 * @param canvas
 * @returns {Promise<unknown>}
 */
const renderBackground = (blocks, textureImage, canvas) => {
  // Scale the grid of the nested blocks array to the pixel grid of the canvas
  const pixelWidthBlock = canvas.width / blocks[0].length;
  const pixelHeightBlock = canvas.height / blocks.length;
  const context = canvas.getContext("2d");

  context.drawImage(
    textureImage,
    0,
    0,
    pixelWidthBlock * 9,
    pixelHeightBlock * 9
  );
};

/**
 * Determines if the game was won
 * @param targets
 * @param boxes
 * @returns {boolean}
 */
const hasWon = (targets, boxes) => {
  for (let y = 0; y < targets.length; y++) {
    for (let x = 0; x < targets[0].length; x++) {
      if (targets[y][x] !== boxes[y][x]) {
        // Some box is not aligned with a target.
        return false;
      }
    }
  }

  return true;
};

Promise.allSettled([
  loadTexture("./floor.jpg"),
  loadTexture("./wall.png"),
  loadTexture("./target.png"),
  loadTexture("./box.png"),
  loadTexture("./whaletail.png"),
  loadTexture("./weed.png"),
]).then((results) => {
  const [
    floorTexture,
    wallTexture,
    targetTexture,
    boxTexture,
    playerTexture,
    weedTexture,
  ] = results.map((result) => result.value);

  const canvas = document.querySelector("#canvas");

  const render = () => {
    renderBackground(floor, floorTexture, canvas);
    renderBlocks(walls, wallTexture, canvas);
    renderBlocks(targets, targetTexture, canvas);
    renderBlocks(boxes, boxTexture, canvas);
    renderBlocks(player, playerTexture, canvas);
    renderBlocks(weeds, weedTexture, canvas);
  };

  render();

  window.addEventListener("keydown", (event) => {
    let xMovement = 0;
    let yMovement = 0;

    console.log("move");

    switch (event.key) {
      case "ArrowUp":
        yMovement = -1;
        break;
      case "ArrowDown":
        yMovement = 1;
        break;
      case "ArrowLeft":
        xMovement = -1;
        break;
      case "ArrowRight":
        xMovement = 1;
        break;
    }

    const newPlayerX = playerX + xMovement;
    const newPlayerY = playerY + yMovement;

    // Collision with end of playing field
    if (
      newPlayerX < 0 ||
      newPlayerY < 0 ||
      newPlayerX > floor[0].length - 1 ||
      newPlayerY > floor[0].length - 1
    ) {
      return;
    }

    // Wall collision
    if (walls[newPlayerY][newPlayerX] === "X") {
      return;
    }

    // Weed collision
    if (weeds[newPlayerY][newPlayerX] === "X") {
      return;
    }

    // Box collision
    if (boxes[newPlayerY][newPlayerX] === "X") {
      if (
        boxes[newPlayerY + yMovement][newPlayerX + xMovement] === "X" ||
        walls[newPlayerY + yMovement][newPlayerX + xMovement] === "X" ||
        weeds[newPlayerY + yMovement][newPlayerX + xMovement] === "X"
      ) {
        return;
      }

      boxes[newPlayerY][newPlayerX] = " ";
      boxes[newPlayerY + yMovement][newPlayerX + xMovement] = "X";
    }

    // Remove player at old position
    player[playerY][playerX] = " ";

    // Set player at new position
    player[newPlayerY][newPlayerX] = "X";
    playerX = newPlayerX;
    playerY = newPlayerY;

    if (hasWon(targets, boxes)) {
      document.querySelector("#message").innerHTML = "You've won!";
      location.href = '../freeAnimals/freeAnimals.html';
    }

    render();
  });
});
