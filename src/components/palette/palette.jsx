import React from 'react';
import './palette.css';
import { hexToRgbA } from '../../helpers/helpers'
export default class Palette extends React.PureComponent {

  handlePrimaryColorChange = (e) => {
    const color = e.target.value;
    this.props.onPrimaryColorChange(hexToRgbA(color));
  }

  handleSecondaryColorChange = (e) => {
    const color = e.target.value;
    this.props.onSecondaryColorChange(hexToRgbA(color));
  }

  render() {
    const { primaryColor, secondaryColor, onSwapColors} = this.props;

    return (
      <div className="palette">
        <input className="palette__primary" id="palette__primary" type="color" onChange={this.handlePrimaryColorChange}/>
        <input className="palette__secondary" id="palette__secondary" type="color" onChange={this.handleSecondaryColorChange} />
        <label htmlFor='palette__primary'>
          <div className="palette__item palette__item--primary" style={{ backgroundColor: primaryColor}}></div>
        </label>
        <label htmlFor="palette__secondary">
          <div className="palette__item palette__item--secondary" style={{ backgroundColor: secondaryColor}}></div>
        </label>
        <div className="palette__swap-color" onClick={onSwapColors}></div>
      </div>
    )
  }
};

