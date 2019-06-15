import './menu.css';
import menuTemplate from './menu.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class Menu {
  constructor() {
    this.element = createElementWithClass('ul', 'menu', menuTemplate);
  }
}
