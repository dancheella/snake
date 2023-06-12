import {Game} from "./modules/game.js";

class App {

  settings = {
    positionsCount: 30,
    positionsSize: 20,
  }

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', (this.settings.positionsCount * this.settings.positionsSize).toString());
    canvas.setAttribute('height', (this.settings.positionsCount * this.settings.positionsSize).toString());
    document.getElementById('container').appendChild(canvas);

    const context = canvas.getContext('2d');

    new Game(context, this.settings);

    function preventScroll(event) {
      let keys = {
        37: true, // Стрелка влево
        38: true, // Стрелка вверх
        39: true, // Стрелка вправо
        40: true  // Стрелка вниз
      };

      if (keys[event.keyCode]) {
        event.preventDefault(); // Отменить действие прокрутки
      }
    }

    // Добавить обработчик события нажатия клавиш на весь документ
    document.addEventListener('keydown', preventScroll);
  }
}

(new App());