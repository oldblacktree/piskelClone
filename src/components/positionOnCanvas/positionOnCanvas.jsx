import './positionOnCanvas.css';
import React from 'react';

export default class PenSize extends React.PureComponent {

  render() {
    const { positionOnCanvas } = this.props
    return (
      <p className="cursor-position">
        {`[${positionOnCanvas[0]} x ${positionOnCanvas[1]} ]`}
      </p>
    );
  }
}
