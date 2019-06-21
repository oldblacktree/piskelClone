import React from 'react';
import './pen-size.css';

export default class PenSize extends React.PureComponent {
  constructor(props) {
    super(props);
    this.penSizeNumbers = [1,2,3,4];
  }

  handlePensizeItemClik = (item)=> () => {
    this.props.onPenSizeChange(item);
  }

  createPenSizeItems = () => {
  const arr = this.penSizeNumbers;
  const active = 'pen-size__item--active';

  return  arr.map(item => {
    const itemClass = `pen-size__item--size-${ item }`;
    const isActive = item === this.props.penSize ? active : '';

    return (
      <li
        className={`pen-size__item ${itemClass} ${isActive}`}
        key={item}
        onClick={this.handlePensizeItemClik(item)}
      />
    )
  })}

  render() {
    return (
      <ul className="pen-size">
        {this.createPenSizeItems()}
      </ul>
    );
  }
}

