import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx';
import PenSize from './pen-size/pen-size.jsx';
import Tools from './tools/tools.jsx';
import Palette from './palette/palette.jsx';
import Canvas from './canvas/canvas.jsx';
import Frames from './frames/frames.jsx';
import AnimationPlayer from './animation-player/animation-player.jsx'

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
      penSize: 1,
      primaryColor: "rgba(0, 0, 0, 1)",
      secondaryColor: "rgba(255, 255, 255, 1)",
      canvasWidth: 640,
      canvasHeight: 640,
      canvasCellCount: 32,
      // activeToolName: this.toolsList[0],
      activeToolName: '',
      framesList: [],
    }
  }

  updateStateProperty = (property) => (value) => {this.setState({ [property]: value })};
  handlePenSizeClick = this.updateStateProperty('penSize');
  handleToolClick = this.updateStateProperty('activeToolName');
  handlePrimaryColorChange = this.updateStateProperty('primaryColor');
  handleSecondaryColorChange = this.updateStateProperty('secondaryColor');
  handleFramesListChange = this.updateStateProperty('framesList');
  // handChange = this.updateStateProperty');
  handleInitialImageDataChange = this.updateStateProperty('initialImageData');

  // handleImageDataChange = (imageData) => {
  //   const {framesList} = this.state;
  //   const copyFramesList = framesList.slice();
  //   copyFramesLis].imageData = imageData;
  //   this.setState({'framesList':  copyFramesList})
  // }


  handleSwap = () => {
    const { primaryColor, secondaryColor} = this.state;

    this.setState({
      primaryColor: secondaryColor,
      secondaryColor: primaryColor,
    })
  }

  render() {
    const { primaryColor, secondaryColor, penSize, canvasWidth, canvasHeight, canvasCellCount, activeToolName, framesList, handleFramesListChange} = this.state;
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
          <section className="frames-column">
            <Frames
              width={canvasWidth}
              height={canvasHeight}
              framesList={framesList}
              handleFramesListChange={this.handleFramesListChange}
              // frameActive={frameActive}
              // handleFrameActiveChange={this.handleFrameActiveChange}

            />
          </section>
          <section className="main-column">
            <Canvas
              width={canvasWidth}
              height={canvasHeight}
              activeToolName={activeToolName}
              penSize={penSize}
              cellCount={canvasCellCount}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onPickColor={this.handlePrimaryColorChange}
              // handleImageDataChange={this.handleImageDataChange}
              // framesList={framesList}
              // frameActive={frameActive}
              // handleInitialImageDataChange={handleInitialImageDataChange}
            />
          </section>
          <section className="settings-column">
            <AnimationPlayer
              width={canvasWidth}
              height={canvasHeight}
              framesList={framesList}/>
          </section>
          <section className="menu-column"></section>
        </main>
      </>
    );
  }
}


// ========================================

ReactDOM.render(<App />,document.getElementById('root'));


