let canvas = document.getElementById('ball__game')
let ctx = canvas.getContext('2d')
let ballRadius = 9
let x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3)
let y = canvas.height - 40
let dx = 2
let dy = -2

let paddleHeight = 12
let paddleWidth = 72

let paddleX = (canvas.width - paddleWidth) / 2

let rowCount = 5
let columnCount = 9
let brickWidth = 54
let brickHeight = 18
let brickPadding = 12
let topOffSet = 40
let leftOffSet = 33
let score = 0

let bricks = []
for(let i = 0; i < columnCount; i++) {
    bricks[i] = []
    for(let j = 0; j < rowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1}
    }
}

document.addEventListener('mousemove', mouseMoveHandler, false)

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2
    }
}

function drawPaddle() {
    ctx.beginPath()
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30)
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

function drawBricks() {
    for(let i = 0; i < columnCount; i++) {
        for(let j = 0; j < rowCount; j++) {
            if(bricks[i][j].status === 1) {
                let brickX = (i * (brickWidth + brickPadding)) + leftOffSet
                let brickY = (j * (brickHeight + brickPadding)) + topOffSet
                bricks[i][j].x = brickX
                bricks[i][j].y = brickY
                ctx.beginPath()
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30)
                ctx.fillStyle = '#333'
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function trackScore() {
    ctx.font = 'bold 18px sans-serif'
    ctx.fillStyle = '#333'
    ctx.fillText('Placar : ' + score, 8, 24)
}

function hitDetection() {
    for(let i = 0; i < columnCount; i++) {
        for(let j = 0; j < rowCount; j++) {
            let b = bricks[i][j]
            if(b.status === 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                    score++

                    if(score === rowCount * columnCount) {
                        alert('Parabéns ! Você ganhou. :)')
                        document.location.reload()
                    }
                }
            }
        }
    }
}

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trackScore()
    drawBricks()
    drawBall()
    drawPaddle()
    hitDetection()

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }

    if(y + dy < ballRadius) {
        dy = -dy
    } else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            alert('Game Over ! :(')
            document.location.reload()
        }
    }

    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy
    }

    x += dx
    y += dy
}
setInterval(init, 10)