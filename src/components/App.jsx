import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx';
import PenSize from './pen-size/pen-size.jsx';
import Tools from './tools/tools.jsx';
import Palette from './palette/palette.jsx';
import Canvas from './canvas/canvas.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toolsList = [
      'pen', 'mirror',
      'paint-bucket', 'paint-bucket-all',
      'eraser', 'stroke',
      'rectangle', 'circle',
      'move', 'shape-selection',
      'rectangle-selection', 'lasso-selection',
      'lighten', 'dithering',
      'color-picker'
    ]

    this.state = {
      penSize: 4,
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF",
      canvasWidth: 640,
      canvasHeight: 640,
      canvasCellCount: 32,
      // activeToolName: this.toolsList[0],
      activeToolName: '',
    }
  }

  updateStateProperty = (property) => (value) => {this.setState({ [property]: value })};
  handlePenSizeClick = this.updateStateProperty('penSize');
  handleToolClick = this.updateStateProperty('activeToolName');
  handlePrimaryColorChange = this.updateStateProperty('primaryColor');
  handleSecondaryColorChange = this.updateStateProperty('secondaryColor');

  handleSwap = () => {
    const { primaryColor, secondaryColor} = this.state;

    this.setState({
      primaryColor: secondaryColor,
      secondaryColor: primaryColor,
    })
  }

  render() {
    const { primaryColor, secondaryColor, penSize, canvasWidth, canvasHeight, canvasCellCount, activeToolName} = this.state;
    return (
      <>
        <Header />
        <main className='main'>
          <section className="tools-column">
            <PenSize
              penSize={penSize}
              onPenSizeChange={this.handlePenSizeClick}
            />
            <Tools
              toolsList={this.toolsList}
              activeToolName={activeToolName}
              onToolClick={this.handleToolClick}
            />
            <Palette
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onPrimaryColorChange={this.handlePrimaryColorChange}
              onSecondaryColorChange={this.handleSecondaryColorChange}
              onSwapColors={this.handleSwap}
              />
          </section>
          <section className="frames-column"></section>
          <section className="main-column">
            <Canvas
              width={canvasWidth}
              height={canvasHeight}
              activeToolName={activeToolName}
              penSize={penSize}
              cellCount={canvasCellCount}
              primaryColor={primaryColor}
              onPickColor={this.handlePrimaryColorChange}
            />
          </section>
          <section className="settings-column"></section>
          <section className="menu-column"></section>
        </main>
      </>
    );
  }
}


// ========================================

ReactDOM.render(<App />,document.getElementById('root'));


