export class Snake {

  currentDirection = 'right';
  snake = [
    {
      x: 10,
      y: 20
    }
  ];
  context = null;
  positionsCount = 20;
  positionsSize = 30;

  constructor(context, positionsSize, positionsCount) {
    this.context = context;
    this.positionsCount = positionsCount;
    this.positionsSize = positionsSize;

    this.addKeyboardHandler();
  }

  addKeyboardHandler() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && this.currentDirection !== 'right') {
        this.currentDirection = 'left';
      } else if (event.key === 'ArrowRight' && this.currentDirection !== 'left') {
        this.currentDirection = 'right';
      } else if (event.key === 'ArrowUp' && this.currentDirection !== 'down') {
        this.currentDirection = 'up';
      } else if (event.key === 'ArrowDown' && this.currentDirection !== 'up') {
        this.currentDirection = 'down';
      }
    });

    this.addControlHandlers();
  }

  addControlHandlers() {
    const upButton = document.getElementById('up');
    const downButton = document.getElementById('down');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');

    upButton.addEventListener('touchstart', () => {
      if (this.currentDirection !== 'down') {
        this.currentDirection = 'up';
      }
    });

    downButton.addEventListener('touchstart', () => {
      if (this.currentDirection !== 'up') {
        this.currentDirection = 'down';
      }
    });

    leftButton.addEventListener('touchstart', () => {
      if (this.currentDirection !== 'right') {
        this.currentDirection = 'left';
      }
    });

    rightButton.addEventListener('touchstart', () => {
      if (this.currentDirection !== 'left') {
        this.currentDirection = 'right';
      }
    });
  }

  showSnake(foodPosition, border) {
    let result = {
      gotFood: false,
      collision: false,
    };

    for (let i = 0; i < this.snake.length; i++) {
      this.context.fillStyle = 'black';
      this.context.beginPath();
      const x = this.snake[i].x * this.positionsSize - this.positionsSize;
      const y = this.snake[i].y * this.positionsSize - this.positionsSize;
      const size = this.positionsSize;

      // основной прямоугольник
      this.context.fillRect(x, y, size, size);

      // внутренний прямоугольник
      const blockSize = size / 2;
      const blockOffsetX = size / 4;
      const blockOffsetY = size / 4;
      this.context.fillStyle = 'red';
      this.context.fillRect(x + blockOffsetX, y + blockOffsetY, blockSize, blockSize);
    }

    let newHeadPosition = {
      x: this.snake[0].x,
      y: this.snake[0].y,
    }

    if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
      result.gotFood = true;
    } else {
      this.snake.pop();
    }

    if (this.currentDirection === 'left') {
      if (border && newHeadPosition.x === 1) {
        newHeadPosition.x = 1;
        result.collision = true;
        return result;
      }
      if (newHeadPosition.x === 1) {
        newHeadPosition.x = this.positionsCount;
      } else {
        newHeadPosition.x -= 1;
      }
    } else if (this.currentDirection === 'right') {
      if (border && newHeadPosition.x === this.positionsCount) {
        result.collision = true;
        return result;
      }
      if (newHeadPosition.x === this.positionsCount) {
        newHeadPosition.x = 1;
      } else {
        newHeadPosition.x += 1;
      }
    } else if (this.currentDirection === 'up') {
      if (border && newHeadPosition.y === 1) {
        result.collision = true;
        return result;
      }
      if (newHeadPosition.y === 1) {
        newHeadPosition.y = this.positionsCount;
      } else {
        newHeadPosition.y -= 1;
      }
    } else if (this.currentDirection === 'down') {
      if (border && newHeadPosition.y === this.positionsCount) {
        result.collision = true;
        return result;
      }
      if (newHeadPosition.y === this.positionsCount) {
        newHeadPosition.y = 1;
      } else {
        newHeadPosition.y += 1;
      }
    }

    if (!this.checkNewHeadPositionCollision(newHeadPosition)) {
      this.snake.unshift(newHeadPosition);
    } else {
      result.collision = true;
    }
    return result;
  }

  checkNewHeadPositionCollision(newHeadPosition) {
    for (let i = 0; i < this.snake.length; i++) {
      if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
        return true;
      }
    }
    return false;
  }
}