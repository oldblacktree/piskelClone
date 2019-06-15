import './palette.css';
import paletteTemplate from './palette.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class Palette {
  constructor() {
    this.element = createElementWithClass('div', 'palette', paletteTemplate);
  }
}
