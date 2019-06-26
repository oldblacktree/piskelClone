import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx';
import PenSize from './pen-size/pen-size.jsx';
import Tools from './tools/tools.jsx';
import Palette from './palette/palette.jsx';
import Canvas from './canvas/canvas.jsx'
import Frames from './frames/frames.jsx';
import AnimationPlayer from './animation-player/animation-player.jsx'
import {createNewImageData, getId} from '../helpers/helpers'
import initialState from './InitialAppState'

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

    this.getNewFrame = (...args) => {
      'эта функция дожна называться createNewFrame и быть точно не тут и быть static'
      /*
      * create copy frame with imageDate
      * OR create new frame with widht and height
      */
      const imageData = args.length === 1
        ? args[0]
        : createNewImageData(...args)
      return {
        imageData,
        id: getId()
      }
    }

    const firstFrame = this.getNewFrame( initialState.canvasWidth, initialState.canvasHeight)
    this.state = {
      penSize: 1,
      primaryColor: "rgba(0, 0, 0, 1)",
      secondaryColor: "rgba(255, 255, 255, 1)",
      canvasWidth: 640,
      canvasHeight: 640,
      canvasCellCount: 32,
      // activeToolName: this.toolsList[0],
      activeToolName: '',
      // frameList: [
      //   {
      //     imageData: {}
      //     id: int,
      //   },
      //   {}
      // ],
      frameList: [
        firstFrame,
      ],
      activeFrameId: firstFrame.id
    }
  }

  handleDeleteFrame = (frameId) => {
    const { frameList, activeFrameId} = this.state
    let newActiveFrameId;
    let removedFrameIndex;

    if (frameList.length > 1) {
      const newFrameList = frameList.filter((frame, frameIndex)=>{
        if (frame.id === frameId) {
          removedFrameIndex = frameIndex
        }
        return frame.id !== frameId
      })

      if ( frameId === activeFrameId) {
        newActiveFrameId = removedFrameIndex === 0
          ? newFrameList[removedFrameIndex].id
          : newFrameList[removedFrameIndex - 1].id
      } else {
        newActiveFrameId = activeFrameId
      }

      this.setState({
        frameList: newFrameList,
        activeFrameId: newActiveFrameId
      })
    }

  }

  handleUpdateFrameList = (frameId) => (imageData)=> {
    const { frameList } = this.state
    const frame = frameList.find(({ id }) => id === frameId)
    const updatedFrame = { ...frame, imageData}

    frameList.forEach((frame) => {
      if (frame.id === frameId) {
        frame.imageData = imageData
      }
    })

    this.setState({
      frameList,
    })
  }

  updateStateProperty = (property) => (value) => {this.setState({ [property]: value })};
  handlePenSizeClick = this.updateStateProperty('penSize');
  handleToolClick = this.updateStateProperty('activeToolName');
  handlePrimaryColorChange = this.updateStateProperty('primaryColor');
  handleSecondaryColorChange = this.updateStateProperty('secondaryColor');
  handleFramesListChange = this.updateStateProperty('framesList');
  // handChange = this.updateStateProperty');
  handleInitialImageDataChange = this.updateStateProperty('initialImageData');
  changeActiveFrameId = this.updateStateProperty('activeFrameId');

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

  handleAddFrame = () => {
    const {frameList} = this.state
    const newFrame = this.getNewFrame()
    const newFrameList = [...frameList, newFrame]

    this.setState({
      frameList: newFrameList,
      activeFrameId: newFrame.id
    })
  }

  componentDidMount() {
    this.setState({})
  }

  render() {
    const {
      primaryColor, secondaryColor, penSize, canvasWidth, canvasHeight, canvasCellCount,
      activeToolName, framesList, handleFramesListChange, frameList, activeFrameId
    } = this.state;

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
              frameList={frameList}
              activeFrameId={activeFrameId}
              handleFramesListChange={this.handleFramesListChange}
              addFrame={this.handleAddFrame}
              onChangeActiveFrameId={this.changeActiveFrameId}
              onDeleteFrame={this.handleDeleteFrame}
              // frameActive={frameActive}
              // handleFrameActiveChange={this.handleFrameActiveChange}

            />
          </section>
          <section className="main-column">
            <Canvas
              width={canvasWidth}
              height={canvasHeight}
              color={primaryColor}
              penSize={penSize}
              imageData={frameImageData}
              updateFrameList={this.handleUpdateFrameList(activeFrameId)}
            />
          </section>
          <section className="settings-column">
            <AnimationPlayer
              width={canvasWidth}
              height={canvasHeight}
              framesList={frameList}/>
          </section>
          <section className="menu-column"></section>
        </main>
      </>
    );
  }
}


// ========================================

ReactDOM.render(<App />,document.getElementById('root'));


