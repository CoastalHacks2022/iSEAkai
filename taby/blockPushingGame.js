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
      playerTexture
    ] = results.map(result => result.value)
    // more stuff here...
  })

  const floor = new Array(9).fill(new Array(9).fill('X'))

const walls = [
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', ' ', 'X', 'X', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', 'X', 'X', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
]

const targets = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
  [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' '],
  [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]

const boxes = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', 'X', ' ', 'X', 'X', 'X', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]

const player = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
];

let playerX = 2
let playerY = 2