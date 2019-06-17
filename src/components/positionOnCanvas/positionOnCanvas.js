import './positionOnCanvas.css';
import { createElementWithClass } from '../../helpers/helpers';

export default class PositionOnCanvas {
  constructor(width, height, cellCount) {
    this.width = width;
    this.height = height;

    this.element = createElementWithClass('p', 'cursor-position');
    this.element.id = 'cursor-position';
    this.element.textContent = `[${cellCount} x ${cellCount}]`;
  }

  // drawNewPosition(x, y) {
  //   this.element.textContent = `[${x} x ${y}]`;
  // }

  // canvasHandler(event) {
  //   const x = event.offsetX;
  //   const y = event.offsetY;
  //   const cellX = Math.floor(x / cellWidth);
  //   const cellY = Math.floor(y / cellHeight);
  //   this.drawNewPosition(cellX, cellY);
  // }


  // setCursorPositionOnCanvas(event) {
  // let  x = event.offsetX;
  // let  y = event.offsetY;
  // let  cellX = Math.floor(x / cellWidth);
  // let  cellY = Math.floor(y / cellHeight);
  //   cursorPosition.textContent = `[${cellX + 1} x ${cellY + 1}]`;
  // }

  // resetCursorPositionOnCanvas() {
  //   cursorPosition.textContent = `[${canvCellCount} x ${canvCellCount}]`;
  // }
}
