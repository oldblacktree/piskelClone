import './menu.css';
import React from 'react'
import { getNewFrame } from '../frames/frames.jsx';

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvasCellsCount = [32, 64, 128];
  }

  getDataURL = () => {
    const { frameImageData, canvasWidth, canvasHeight} = this.props
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    if (frameImageData) ctx.putImageData(frameImageData,0,0);
    return canvas.toDataURL('image/png')
  }


  handleResizeItemClik = (item) => () => {
    this.props.changeCanvasCellCount(item);
    this.props.changePositionOnCanvas([item, item])
  }

  createResizeItems = () => {
    const arr = this.canvasCellsCount;
    const active = 'resizeList__item--active';

    return arr.map(item => {
      const itemClass = `resizeList__item`;
      const isActive = item === this.props.canvasCellCount ? active : '';

      return (
        <li
          className={`${itemClass} ${isActive}`}
          key={item}
          onClick={this.handleResizeItemClik(item)}>
            {item}
        </li>
      )
    })
  }


  render() {
  const resizeItems = this.createResizeItems()
  this.dataURL = this.getDataURL()


    return (
      <>
        <li className="menu__item menu__item--preference"></li>
        <li className="menu__item menu__item--resize">
          <ul className="resizeList">
            {resizeItems}
          </ul>
        </li>
        <li >
          <a className="menu__item menu__item--save" href={`${this.dataURL}`} download="Image"></a>
        </li>
        <li className="menu__item menu__item--export"></li>
        <li className="menu__item menu__item--import"></li>
      </>
    )
  }
};


