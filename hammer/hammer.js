const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

// selecting for an element with id time-left
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 30
let timerId = null

let countDownTimerId = setInterval(countDown, 1000)

function randomSquare() {
  // remove mole
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  // add mole to random position from 1 - 32
  let randomPosition = squares[Math.floor(Math.random() * 32)]
  randomPosition.classList.add('mole')
  hitPosition = randomPosition.id
}

squares.forEach(square => {
  square.addEventListener('mouseover', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 800)
}

moveMole()

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert('Game over! Your final score is ' + result)
  }
}