import './pen-size.css';
import penSizeTemplate from './pen-size.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class PenSize {
  constructor() {
    this.element = createElementWithClass('ul', 'pen-size', penSizeTemplate);
  }
}
