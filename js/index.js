const canvas = document.getElementById("snakeGame");
const context = canvas.getContext("2d");
const box = 32;
const scoreTemplate = document.getElementById("score");
let score = 0;
let snake = [];
let food = [];
let direction = "right";

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createBG() {
  context.fillStyle = "#9a71ca";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#510f9d";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "#f2e205";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update() {
  if (event.keyCode == 37 || (event.keyCode == 65 && direction != "right")) {
    direction = "left";
  }
  if (event.keyCode == 38 || (event.keyCode == 87 && direction != "down")) {
    direction = "up";
  }
  if (event.keyCode == 39 || (event.keyCode == 68 && direction != "left")) {
    direction = "right";
  }
  if (event.keyCode == 40 || (event.keyCode == 83 && direction != "up")) {
    direction = "down";
  }
}

function playGame() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert(" Fim de Jogo! ;( \n Sua pontuação final foi: " + score);
    }
  }

  createBG();
  createSnake();
  drawFood();

  let snakex = snake[0].x;
  let snakey = snake[0].y;

  if (direction == "right") snakex += box;
  if (direction == "left") snakex -= box;
  if (direction == "up") snakey -= box;
  if (direction == "down") snakey += box;

  if (snakex != food.x || snakey != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    score++;
    scoreTemplate.innerHTML = score;
  }

  let newHead = {
    x: snakex,
    y: snakey,
  };

  snake.unshift(newHead);
}

let game = setInterval(playGame, 100);
