import React from 'react';
import './tools.css';


export default class Tools extends React.Component {
  render() {
    return (
    <ul className="tools">
        <li className="tools-item tools-item--pen tools-item--active "></li>
        <li className="tools-item tools-item--mirror"></li>
        <li className="tools-item tools-item--paint-bucket"></li>
        <li className="tools-item tools-item--paint-bucket-all"></li>
        <li className="tools-item tools-item--eraser"></li>
        <li className="tools-item tools-item--stroke"></li>
        <li className="tools-item tools-item--rectangle"></li>
        <li className="tools-item tools-item--circle"></li>
        <li className="tools-item tools-item--move"></li>
        <li className="tools-item tools-item--shape-selection"></li>
        <li className="tools-item tools-item--rectangle-selection"></li>
        <li className="tools-item tools-item--lasso-selection"></li>
        <li className="tools-item tools-item--lighten"></li>
        <li className="tools-item tools-item--dithering"></li>
        <li className="tools-item tools-item--color-picker"></li>
    </ul>
    );
  }
}
