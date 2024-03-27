const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Определяем размеры холста
canvas.width = window.innerWidth * 0.8; // Пример: 80% ширины окна
canvas.height = window.innerHeight * 0.8; // Пример: 80% высоты окна

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = canvas.width * 0.01; // Пример: 1% ширины холста

// Добавляем переменные для управления панелью
let paddleHeight = canvas.height * 0.03; // Пример: 3% высоты холста
let paddleWidth = canvas.width * 0.15; // Пример: 15% ширины холста
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false; // Добавлено
let leftPressed = false; // Добавлено

let touchX; // Переменная для хранения положения касания
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}


canvas.addEventListener('touchstart', touchStartHandler, false);
canvas.addEventListener('touchmove', touchMoveHandler, false);

function touchStartHandler(e) {
    // Получаем координаты касания
    let touch = e.touches[0];
    touchX = touch.clientX - canvas.offsetLeft;
    // Проверяем, находится ли палец на панели
    if (touch.clientX > paddleX && touch.clientX < paddleX + paddleWidth && touch.clientY > canvas.height - paddleHeight) {
        // Если палец на панели, запоминаем начальную позицию панели
        touchX = touch.clientX - paddleX;
    }
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
}

function touchMoveHandler(e) {
    let touch = e.touches[0];
    let newPaddleX = touch.clientX - touchX;
    // Проверяем, чтобы панель не вышла за пределы холста
    if (newPaddleX > 0 && newPaddleX < canvas.width - paddleWidth) {
        paddleX = newPaddleX;
    }
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            document.location.reload();
        }
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();