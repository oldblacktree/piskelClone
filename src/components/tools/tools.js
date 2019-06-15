import './tools.css';
import toolsTemplate from './tools.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class Tools {
  constructor() {
    this.element = createElementWithClass('ul', 'tools', toolsTemplate);
  }
}
