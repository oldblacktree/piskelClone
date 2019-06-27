import './menu.css';
import React from 'react'


export default class Palette extends React.PureComponent {

  render() {
    return (
      <>
        <li className="menu__item menu__item--preference"></li>
        <li className="menu__item menu__item--resize"></li>
        <li className="menu__item menu__item--save"></li>
        <li className="menu__item menu__item--export"></li>
        <li className="menu__item menu__item--import"></li>
      </>
    )
  }
};


