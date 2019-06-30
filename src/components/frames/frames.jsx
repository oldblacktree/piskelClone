import './frames.css';
import React from 'react';
import { cloneDeep } from 'lodash';
import { createNewImageData, getId } from '../../helpers/helpers'

class Frame extends React.PureComponent {

  static getNewFrame = (...args) => {
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

  handleDuplicateFrame = () => {
    const { frameList, handleFramesListChange, onChangeActiveFrameId, frameId } = this.props
    let duplicatedFrameIndex;

    const { imageData: duplicateImageData } = frameList.find(({ id }, i) => {
      if (id === frameId) {
        duplicatedFrameIndex = i;
        return true
      }
    });

    const duplicateFrame = Frame.getNewFrame(duplicateImageData);
    const newFrameList = [...frameList]
    newFrameList.splice(duplicatedFrameIndex + 1, 0, duplicateFrame);
    handleFramesListChange(newFrameList)
    onChangeActiveFrameId(duplicateFrame.id)
  }

  handleDeleteFrame = () => {
    const { frameList, activeFrameId, handleFramesListChange, onChangeActiveFrameId, frameId } = this.props

    let newActiveFrameId;
    let removedFrameIndex;

    if (frameList.length > 1) {
      const newFrameList = frameList.filter((frame, frameIndex) => {
        if (frame.id === frameId) {
          removedFrameIndex = frameIndex
        }
        return frame.id !== frameId
      })

      if (frameId === activeFrameId) {
        newActiveFrameId = removedFrameIndex === 0
          ? newFrameList[removedFrameIndex].id
          : newFrameList[removedFrameIndex - 1].id
      } else {
        newActiveFrameId = activeFrameId
      }

      handleFramesListChange(newFrameList)
      onChangeActiveFrameId(newActiveFrameId)
    }
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref
    console.log('this.canvasRef', this.canvasRef)
  }

  handleChangeActiveFrameId =()=>{
    const { frameId, onChangeActiveFrameId } = this.props
    onChangeActiveFrameId(frameId)
  }

  componentDidUpdate() {
    const { imageData } = this.props
    this.canvasRef.getContext("2d").putImageData(imageData, 0, 0)
  }

  componentDidMount() {
    this.canvasRef.getContext("2d").putImageData(this.props.imageData, 0, 0)
  }

  render() {
    console.log('RENDER FRAME')
    const { props: { width, height, isActive, frameId, onChangeActiveFrameId} } = this
    const activeClass = 'frames__item--active';

    return (
      <li className={`frames__item ${isActive ? activeClass : ''}`} >
        <div className="frames__button frames__button--move"></div>
        <div className="frames__button frames__button--delete" onClick={this.handleDeleteFrame}></div>
        <div className="frames__button frames__button--duplicate" onClick={this.handleDuplicateFrame}></div>
        <canvas
          className="frames__canvas"
          width={width + 'px'}
          height={height + 'px'}
          ref={this.setCanvasRef}
          onClick={this.handleChangeActiveFrameId}
        >
          This browser don't support canvas
        </canvas>
      </li>
    )
  }
}

export default class Frames extends React.Component {
  index = 0;

  handleAddFrame = () => {
    const { frameList, width, height, handleFramesListChange, onChangeActiveFrameId } = this.props
    const newFrame = Frame.getNewFrame(width, height);
    const newFrameList = [...frameList, newFrame]
    handleFramesListChange(newFrameList)
    onChangeActiveFrameId(newFrame.id)
  }


  render(){
    const { props: { frameList, activeFrameId, width, height, handleFramesListChange, onChangeActiveFrameId, onDeleteFrame}} = this;
    const frames = frameList.map(({imageData, id}) => {
      return (
        <Frame
          key={id}
          width={width}
          height={height}
          imageData={imageData}
          frameId={id}
          frameList={frameList}
          activeFrameId={activeFrameId}
          handleFramesListChange={handleFramesListChange}
          onChangeActiveFrameId={onChangeActiveFrameId}
          isActive={id === activeFrameId}
          onDeleteFrame={onDeleteFrame}
        />
      )
    })

    return (
    <>
      <ul className="frames">
        {frames}
      </ul>
        <div className="add-frame" onClick={this.handleAddFrame}>
        <p className="add-frame__text">Add new frame</p>
      </div>
    </>
    )
  }
}

const getNewFrame = Frame.getNewFrame
export {getNewFrame}

