const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const paddleHeight = 100
const paddleWidth = 10
const ballSize = 10

let leftPaddleY = (canvas.height - paddleHeight) / 2
let rightPaddleY = (canvas.height - paddleHeight) / 2
let ballX = canvas.width / 2
let ballY = canvas.height / 2
let ballSpeedX = 5
let ballSpeedY = 5

function draw() {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#FFF'
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight)
  ctx.fillRect(
    canvas.width - paddleWidth,
    rightPaddleY,
    paddleWidth,
    paddleHeight
  )
  ctx.fillRect(ballX, ballY, ballSize, ballSize)
}

function update() {
  ballX += ballSpeedX
  ballY += ballSpeedY

  if (ballY < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY
  }

  if (
    ballX < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX
  }

  if (
    ballX > canvas.width - paddleWidth * 2 &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX
  }

  if (ballX < 0 || ballX + ballSize > canvas.width) {
    ballX = canvas.width / 2
    ballY = canvas.height / 2
    ballSpeedX = -ballSpeedX
  }

  if (ballY > rightPaddleY) {
    rightPaddleY += 5
  } else {
    rightPaddleY -= 5
  }
}

function gameLoop() {
  draw()
  update()
}

setInterval(gameLoop, 1000 / 30)

document.addEventListener('mousemove', event => {
  leftPaddleY =
    event.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2
})
