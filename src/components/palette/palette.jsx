import React from 'react';
import './palette.css';

export default class Palette extends React.Component {
    constructor(props) {
      super(props);
      this.handlerPrimaryColor = this.handlerPrimaryColor.bind(this);
      this.handlerSecondaryColor = this.handlerSecondaryColor.bind(this);
      this.handlerSwap = this.handlerSwap.bind(this);
    }

    handlerPrimaryColor(e) {
      let color = e.target.value;
      this.props.updateStatePrimaryColor(color);
    }

    handlerSecondaryColor(e) {
      let color = e.target.value;
      this.props.updateStateSecondaryColor(color);
    }

    handlerSwap() {
      let primaryColor = this.props.primaryColor;
      let secondaryColor = this.props.secondaryColor;
      this.props.updateStatePrimaryColor(secondaryColor)
      this.props.updateStateSecondaryColor(primaryColor)
    }

  render() {
    return (
      <div className="palette">
        <input className="palette__primary" id="palette__primary" type="color" onChange={this.handlerPrimaryColor}/>
        <input className="palette__secondary" id="palette__secondary" type="color" onChange={this.handlerSecondaryColor} />
        <label htmlFor='palette__primary'>
          {/* <div className="palette__item palette__item--primary" style={{ backgroundColor: this.props.primaryColor}}></div> */}
          <div className="palette__item palette__item--primary" style={{ backgroundColor: this.props.primaryColor}}></div>
        </label>
        <label htmlFor="palette__secondary">
          <div className="palette__item palette__item--secondary" style={{ backgroundColor: this.props.secondaryColor}}></div>
        </label>
        <div className="palette__swap-color" onClick={this.handlerSwap}></div>
      </div>
    )
  }
}

/*
// export default class Palette {
//   constructor(setPrimaryColor, setSecondaryColor) {
//     this.setPrimaryColor = setPrimaryColor;
//     this.setSecondaryColor = setSecondaryColor;

//     this.element = createElementWithClass('div', 'palette', paletteTemplate);
//     this.primaryColorPalette = this.element.querySelector('.palette__item--primary');
//     this.secondaryColorPalette = this.element.querySelector('.palette__item--secondary');

//     const primaryColorInput = this.element.querySelector('.palette__primary');
//     primaryColorInput.addEventListener('change', (event) => {
//       const color = event.target.value;
//       this.setColorToPrimaryPalette(color);
//     });

//     const secondaryColorInput = this.element.querySelector('.palette__secondary');
//     secondaryColorInput.addEventListener('change', (event) => {
//       const color = event.target.value;
//       this.setColorToSecondaryPalette(color);
//     });

//     const swapColorToggle = this.element.querySelector('.palette__swap-color');
//     swapColorToggle.addEventListener('click', this.swapColor.bind(this));
//   }

//   setColorToPrimaryPalette(color) {
//     this.primaryColorPalette.style.backgroundColor = color;
//     this.setPrimaryColor(color);
//   }

//   setColorToSecondaryPalette(color) {
//     this.secondaryColorPalette.style.backgroundColor = color;
//     this.setSecondaryColor(color);
//   }

//   swapColor() {
//     const primaryColor = this.primaryColorPalette.style.backgroundColor;
//     const seconsdaryColor = this.secondaryColorPalette.style.backgroundColor;
//     this.setColorToPrimaryPalette(seconsdaryColor);
//     this.setColorToSecondaryPalette(primaryColor);
//   }
//---------------------------------------
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
  // } */

