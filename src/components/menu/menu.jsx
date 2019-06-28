import './menu.css';
import React from 'react'
import { getNewFrame } from '../frames/frames.jsx';

export default class Menu extends React.PureComponent {


  getDataURL = () => {
    const { frameImageData, canvasWidth, canvasHeight} = this.props
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    if (frameImageData) ctx.putImageData(frameImageData,0,0);
    return canvas.toDataURL('image/png')
  }


  render() {
    this.dataURL = this.getDataURL()
    return (
      <>
        <li className="menu__item menu__item--preference"></li>
        <li className="menu__item menu__item--resize"></li>
        <li >
          <a className="menu__item menu__item--save" href={`${this.dataURL}`} download="Image"></a>
        </li>
        <li className="menu__item menu__item--export"></li>
        <li className="menu__item menu__item--import"></li>
      </>
    )
  }
};


