import './canvas.css';
import { createElementWithClass } from '../../helpers/helpers';

export default class Canvas {
  constructor(width = 800, height = 800) {
    const canvasElement = createElementWithClass('canvas', 'main-canvas');
    canvasElement.id = 'main-cavas';
    canvasElement.setAttribute('width', `${width}px`);
    canvasElement.setAttribute('height', `${height}px`);

    this.element = canvasElement;
  }
}
