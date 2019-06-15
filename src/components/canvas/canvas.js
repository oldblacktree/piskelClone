import './canvas.css';
import { createElementWithClass } from '../../helpers/helpers';

export default class canvas {
  constructor(width, height) {
    const canvasElement = createElementWithClass('canvas', 'main-canvas');
    canvasElement.id = 'main-cavas';
    canvasElement.width = `${width}px`;
    canvasElement.height = `${height}px`;

    this.element = canvasElement;
  }
}
