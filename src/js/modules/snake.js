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
    this.addTouchHandler();
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
  }

  addTouchHandler() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    });

    document.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && this.currentDirection !== 'left') {
          this.currentDirection = 'right';
        } else if (deltaX < 0 && this.currentDirection !== 'right') {
          this.currentDirection = 'left';
        }
      } else {
        if (deltaY > 0 && this.currentDirection !== 'up') {
          this.currentDirection = 'down';
        } else if (deltaY < 0 && this.currentDirection !== 'down') {
          this.currentDirection = 'up';
        }
      }
    });
  }

  showSnake(foodPosition) {
    let result = {
      gotFood: false,
      collision: false,
    };

    for (let i = 0; i < this.snake.length; i++) {
      this.context.fillStyle = 'black';
      this.context.beginPath();
      this.context.fillRect(this.snake[i].x * this.positionsSize - this.positionsSize,
        this.snake[i].y * this.positionsSize - this.positionsSize, this.positionsSize, this.positionsSize);
    }

    let newHeadPosition = {
      x: this.snake[0].x,
      y: this.snake[0].y,
    }

    if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
      result.gotFood = true
    } else {
      this.snake.pop();
    }

    if (this.currentDirection === 'left') {
      if (newHeadPosition.x === 1) {
        newHeadPosition.x = this.positionsCount;
      } else {
        newHeadPosition.x -= 1;
      }
    } else if (this.currentDirection === 'right') {
      if (newHeadPosition.x === this.positionsCount) {
        newHeadPosition.x = 1;
      } else {
        newHeadPosition.x += 1;
      }
    } else if (this.currentDirection === 'up') {
      if (newHeadPosition.y === 1) {
        newHeadPosition.y = this.positionsCount;
      } else {
        newHeadPosition.y -= 1;
      }
    } else if (this.currentDirection === 'down') {
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