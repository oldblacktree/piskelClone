import React from 'react';
import ReactDOM from 'react-dom';
import './pen-size.css';

export default class PenSize extends React.Component {
  render() {
    return (
      <ul className="pen-size">
        <li className="pen-size__item pen-size__item--size-1 pen-size__item--active"></li>
        <li className="pen-size__item pen-size__item--size-2 "></li>
        <li className="pen-size__item pen-size__item--size-3"></li>
        <li className="pen-size__item pen-size__item--size-4"></li>
      </ul>
    );
  }
}
