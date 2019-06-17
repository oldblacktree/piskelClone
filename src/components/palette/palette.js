import './palette.css';
import paletteTemplate from './palette.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class Palette {
  constructor(setPrimaryColor, setSecondaryColor) {
    this.setPrimaryColor = setPrimaryColor;
    this.setSecondaryColor = setSecondaryColor;

    this.element = createElementWithClass('div', 'palette', paletteTemplate);
    this.primaryColorPalette = this.element.querySelector('.palette__item--primary');
    this.secondaryColorPalette = this.element.querySelector('.palette__item--secondary');

    const primaryColorInput = this.element.querySelector('.palette__primary');
    primaryColorInput.addEventListener('change', (event) => {
      const color = event.target.value;
      this.setColorToPrimaryPalette(color);
    });

    const secondaryColorInput = this.element.querySelector('.palette__secondary');
    secondaryColorInput.addEventListener('change', (event) => {
      const color = event.target.value;
      this.setColorToSecondaryPalette(color);
    });

    const swapColorToggle = this.element.querySelector('.palette__swap-color');
    swapColorToggle.addEventListener('click', this.swapColor.bind(this));
  }

  setColorToPrimaryPalette(color) {
    this.primaryColorPalette.style.backgroundColor = color;
    this.setPrimaryColor(color);
  }

  setColorToSecondaryPalette(color) {
    this.secondaryColorPalette.style.backgroundColor = color;
    this.setSecondaryColor(color);
  }

  swapColor() {
    const primaryColor = this.primaryColorPalette.style.backgroundColor;
    const seconsdaryColor = this.secondaryColorPalette.style.backgroundColor;
    this.setColorToPrimaryPalette(seconsdaryColor);
    this.setColorToSecondaryPalette(primaryColor);
  }

  // export default class Palette {
  //   constructor(setColorToState) {
  //     this.setColorToState = setColorToState;
  //     this.element = createElementWithClass('div', 'palette', paletteTemplate);
  //     this.primaryColorPalette = this.element.querySelector('.palette__item--primary');

  //     const primaryColorInput = this.element.querySelector('.palette__primary');
  //     primaryColorInput.addEventListener('change', (event) => {
  //       const color = event.target.value;
  //       this.setColorToPrimaryPalette(color);
  //     });
  //   }

  //   setColorToPrimaryPalette(color) {
  //     this.primaryColorPalette.style.backgroundColor = color;
  //     this.setColorToState({color: color});
  //   }

  // setEventListener() {
  //   this.primaryColorInput.addEventListener('change', (event) => {
  //     const color = event.target.value;
  //     this.setColorToPrimaryPalette(color);
  //     this.callback(color);
  //   });
  // }
}
