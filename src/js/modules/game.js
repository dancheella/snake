import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {

  snake = null;
  context = null;
  positionsCount = null;
  positionsSize = null;
  scoreElement = null;
  interval = null;
  score = 0;
  size = 0;
  border = false;

  constructor(context, settings) {
    this.context = context;

    this.positionsCount = settings.positionsCount;
    this.positionsSize = settings.positionsSize;
    this.size = this.positionsSize * this.positionsCount;

    this.scoreElement = document.getElementById('score');
    this.canvas = document.querySelector('canvas');

    document.getElementById('border').innerText = 'Границы';

    document.getElementById('start').onclick = () => {
      this.startGame();
    }

    document.getElementById('border').onclick = () => {
      this.border = !this.border;
      this.showBorder(this.border, this.canvas);
    }
  }

  startGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.score = 0; // обнуление счетчика
    this.scoreElement.innerText = this.score; // обновление отображения счетчика

    this.food = new Food(this.context, this.positionsSize, this.positionsCount);
    this.snake = new Snake(this.context, this.positionsSize, this.positionsCount);

    this.food.setNewFoodPosition();

    this.interval = setInterval(this.gameProcess.bind(this), 100);
  }

  gameProcess() {
    this.context.clearRect(0, 0, this.positionsCount * this.positionsSize, this.positionsCount * this.positionsSize);

    // this.showGrid();
    this.food.showFood();
    let result = this.snake.showSnake(this.food.foodPosition, this.border);
    if (result) {
      if (result.collision) {
        this.endGame();
      } else if (result.gotFood) {
        this.score += 1;
        this.scoreElement.innerText = this.score;
        this.food.setNewFoodPosition();
      }
    }
  }

  endGame() {
    clearInterval(this.interval);

    this.context.fillStyle = 'white';
    this.context.font = 'bold 48px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Вы набрали: ' + this.score + ' очков!', (this.positionsCount * this.positionsSize) / 2,
      (this.positionsCount * this.positionsSize) / 2);
  }

  showGrid() {
    const size = this.positionsCount * this.positionsSize;

    for (let x = 0; x <= size; x += this.positionsSize) {
      this.context.moveTo(0.5 + x + this.positionsSize, 0);
      this.context.lineTo(0.5 + x + this.positionsSize, size + this.positionsSize);
    }

    for (let x = 0; x <= size; x += this.positionsSize) {
      this.context.moveTo(0, 0.5 + x + this.positionsSize);
      this.context.lineTo(size + this.positionsSize, 0.5 + x + this.positionsSize);
    }
    this.context.strokeStyle = "black";
    this.context.stroke();
  }

  showBorder(border, canvas) {
    if (border) {
      canvas.setAttribute('class', 'border');
      document.getElementById('border').innerText = 'Классический';
    } else {
      canvas.classList.remove('border');
      document.getElementById('border').innerText = 'Границы';
    }
  }
}