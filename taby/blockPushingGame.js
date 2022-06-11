/**
 * Loads a texture async
 * @param texture
 * @returns {Promise<unknown>}
 */
 const loadTexture = texture => new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
  
    image.src = texture
  })
  
  Promise.allSettled([
    loadTexture('./floor.jpg'),
    loadTexture('./wall.jpg'),
    loadTexture('./weed.jpg'), 
    loadTexture('./target.jpg'),
    loadTexture('./box.jpg'),
    loadTexture('./player.jpg'),
    ,
  ]).then(results => {
    const [
      floorTexture,
      wallTexture,
      weedTexture,
      targetTexture,
      boxTexture,
      playerTexture
      
    ] = results.map(result => result.value)
    // more stuff here...
  })

  const floor = new Array(9).fill(new Array(9).fill('X'))

const walls = [
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', 'X', 'X', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
  ['X', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]

const weeds = [
    [' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X'],
    [' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X'],
  ]

const targets = [
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
  [' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]

const boxes = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'X', 'X', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]

const player = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
];

let playerX = 2
let playerY = 2

/**
 * Renders a grid of blocks with a given texture
 * @param blocks
 * @param textureImage
 * @param canvas
 * @returns {Promise<unknown>}
 */
 const renderBlocks = (blocks, textureImage, canvas) => {
    // Scale the grid of the nested blocks array to the pixel grid of the canvas
    const pixelWidthBlock = canvas.width / blocks[0].length
    const pixelHeightBlock = canvas.height / blocks.length
    const context = canvas.getContext('2d')
  
    blocks.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 'X') {
          context.drawImage(
            textureImage,
            x * pixelWidthBlock,
            y * pixelHeightBlock,
            pixelWidthBlock,
            pixelHeightBlock
          )
        }
      })
    })
  }

  Promise.allSettled([
    loadTexture('./floor.jpg'),
    loadTexture('./wall.jpg'),
    loadTexture('./target.jpg'),
    loadTexture('./box.jpg'),
    loadTexture('./player.jpg'),
    loadTexture('./weed.jpg'),
  ]).then(results => {
    const [
      floorTexture,
      wallTexture,
      targetTexture,
      boxTexture,
      playerTexture, 
      weedTexture,
      
    ] = results.map(result => result.value)
  
    const canvas = document.querySelector('#canvas')
  
    const render = () => {
      renderBlocks(floor, floorTexture, canvas)
      renderBlocks(walls, wallTexture, canvas)
      renderBlocks(targets, targetTexture, canvas)
      renderBlocks(boxes, boxTexture, canvas)
      renderBlocks(player, playerTexture, canvas)
      renderBlocks(weeds, weedTexture, canvas)
    }
  
    render()
    // ...
  })

  window.addEventListener('keydown', event => {
    let xMovement = 0
    let yMovement = 0
  
    switch (event.key) {
      case 'ArrowUp':
        yMovement = -1
        break
      case 'ArrowDown':
        yMovement = 1
        break
      case 'ArrowLeft':
        xMovement = -1
        break
      case 'ArrowRight':
        xMovement = 1
        break
    }
  
    const newplayerX = [playerX + xMovement]
    const newplayerY = [playerY + yMovement]
  
    // ...
  
    // Remove player at old position
    player[playerY][playerX] = ' '
  
    // Set player at new position
    player[newplayerY][newplayerX] = 'X'
    playerX = newplayerX
    playerY = newplayerY
  
    render()
  })

  window.addEventListener('keydown', event => {
    let xMovement = 0
    let yMovement = 0

    switch (event.key) {
      case 'ArrowUp':
        yMovement = -1
        break
      case 'ArrowDown':
        yMovement = 1
        break
      case 'ArrowLeft':
        xMovement = -1
        break
      case 'ArrowRight':
        xMovement = 1
        break
    }

    const newPlayerX = playerX + xMovement
    const newPlayerY = playerY + yMovement

    // Collision with end of playing field
    if (
      newPlayerX < 0
      || newPlayerY < 0
      || newPlayerX > floor[0].length - 1
      || newPlayerY > floor.length - 1
    ) {
      return
    }

    // Wall collision
    if (walls[newPlayerY][newPlayerX] === 'X') {
      return
    }

    // Box collision
    if (boxes[newPlayerY][newPlayerX] === 'X') {
      if (
        boxes[newPlayerY + yMovement][newPlayerX + xMovement] === 'X'
        || walls[newPlayerY + yMovement][newPlayerX + xMovement] === 'X'
      ) {
        return
      }

      boxes[newPlayerY][newPlayerX] = ' '
      boxes[newPlayerY + yMovement][newPlayerX + xMovement] = 'X'
    }

    player[playerY][playerX] = ' '
    player[newPlayerY][newPlayerX] = 'X'
    playerX = newPlayerX
    playerY = newPlayerY

    if (hasWon(targets, boxes)) {
      document.querySelector('#message').innerHTML = 'You\'ve won!'
    }

    render()
  })
