import './frames.css';
import framesTemplate from './frames.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class Frames {
  constructor() {
    this.element = createElementWithClass('div', 'frames', framesTemplate);
  }
}
