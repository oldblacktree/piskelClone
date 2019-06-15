import './header.css';
import headerTemplate from './header.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class Header {
  constructor() {
    this.element = createElementWithClass('header', 'header', headerTemplate);
  }
}
