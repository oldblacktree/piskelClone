import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx';
import PenSize from './pen-size/pen-size.jsx';
import Tools from './tools/tools.jsx';
import Palette from './palette/palette.jsx';
import Canvas from './canvas/canvas.jsx'
import Frames, { getNewFrame } from './frames/frames.jsx';
import AnimationPlayer from './animation-player/animation-player.jsx'
import PositionOnCanvas from './positionOnCanvas/positionOnCanvas.jsx'
import {createNewImageData, getId} from '../helpers/helpers'
import initialState from './InitialAppState'
import Menu from './menu/menu.jsx'

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

    const firstFrame = getNewFrame( initialState.canvasWidth, initialState.canvasHeight)
    this.state = {
      penSize: 1,
      primaryColor: "rgba(0, 0, 0, 1)",
      secondaryColor: "rgba(255, 255, 255, 1)",
      canvasWidth: 640,
      canvasHeight: 640,
      canvasCellCount: 64,
      // activeToolName: this.toolsList[0],
      activeToolName: '',
      // frameList: [
      //   {
      //     imageData: {}
      //     id: int,
      //   },
      // ],
      frameList: [
        firstFrame,
      ],
      activeFrameId: firstFrame.id,
      // positionOnCanvas: [cellX, cellY]
      positionOnCanvas: [initialState.canvasCellCount, initialState.canvasCellCount],
    }
  }

  //
  handleUpdateActiveFrameImageData = (newImageData) => {
    const { frameList, activeFrameId } = this.state
    const frame = frameList.find(({ id }) => id === activeFrameId)

    frameList.forEach((frame) => {
      if (frame.id === activeFrameId) {
        frame.imageData = newImageData
      }
    })

    this.setState({
      frameList,
    })
  }

  handleSwap = () => {
    const { primaryColor, secondaryColor} = this.state;

    this.setState({
      primaryColor: secondaryColor,
      secondaryColor: primaryColor,
    })
  }

  updateStateProperty = (property) => (value) => { this.setState({ [property]: value }) };
  handlePenSizeClick = this.updateStateProperty('penSize');
  handleToolChange = this.updateStateProperty('activeToolName');
  handlePrimaryColorChange = this.updateStateProperty('primaryColor');
  handleSecondaryColorChange = this.updateStateProperty('secondaryColor');
  handleFramesListChange = this.updateStateProperty('frameList');
  handleInitialImageDataChange = this.updateStateProperty('initialImageData');
  changeActiveFrameId = this.updateStateProperty('activeFrameId');
  changePositionOnCanvas = this.updateStateProperty('positionOnCanvas');

  render() {
    const {
      primaryColor, secondaryColor, penSize, canvasWidth, canvasHeight, canvasCellCount,
      activeToolName, frameList, activeFrameId, positionOnCanvas
    } = this.state;

    // Cavas takes imageData from Active frame and set it to self
    const { imageData: frameImageData } = frameList.find(({ id }) => id === activeFrameId)
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
              handleToolChange={this.handleToolChange}
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
              frameList={frameList}
              activeFrameId={activeFrameId}
              handleFramesListChange={this.handleFramesListChange}
              onChangeActiveFrameId={this.changeActiveFrameId}
            />
          </section>
          <section className="main-column">
            <Canvas
              width={canvasWidth}
              height={canvasHeight}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              penSize={penSize}
              imageData={frameImageData}
              cellCount={canvasCellCount}
              activeToolName={activeToolName}
              // activeFrameId={activeFrameId}
              updateFrameList={this.handleUpdateActiveFrameImageData}
              handlePrimaryColorChange={this.handlePrimaryColorChange}
              changePositionOnCanvas={this.changePositionOnCanvas}
            />
          </section>
          <section className="settings-column">
            <div>
              <AnimationPlayer
              width={canvasWidth}
              height={canvasHeight}
              framesList={frameList}/>
            </div>
            <PositionOnCanvas
              positionOnCanvas={positionOnCanvas}
            />
          </section>
          <section>
            <ul className="menu">
              <Menu />
            </ul>
          </section>
          <section className="menu-column"></section>
        </main>
      </>
    );
  }
}


// ========================================

ReactDOM.render(<App />,document.getElementById('root'));


