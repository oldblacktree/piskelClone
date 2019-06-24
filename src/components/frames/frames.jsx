import './frames.css';
import React from 'react'

class Frame extends React.Component {
  handleFrameClick = (e) => {
    const frameNumber = +e.target.dataset.item
    this.props.handleFrameActiveChange(frameNumber)
  }

  getContext = (canvas) => {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.putImageData(this.props.framesList[this.props.dataItem].imageData,0,0)
  }
  componentDidUpdate() {
    this.ctx.putImageData(this.props.framesList[this.props.dataItem].imageData, 0, 0)
  }

  onDeleteButtonClick = () => {
    const newFrames = [...this.props.framesList];
    newFrames.splice(this.props.dataItem, 1);
    // this.props.handleFramesChange(newFrames)
    console.log(newFrames)
  }

  onCopyButtonClick = () => {
  const newFrames = [...this.props.framesList];
  newFrames.splice(this.props.dataItem, 0, newFrames[this.props.dataItem]);
  this.props.handleFramesChange(newFrames)
  }



  render() {
  const { width, height, dataItem, isActive } = this.props;
  const activeClass = 'frames__item--active';

  return (
    <li className={`frames__item ${isActive ? activeClass : ''}`} >
      <div className="frames__button frames__button--move"></div>
      <div className="frames__button frames__button--delete" onClick={this.onDeleteButtonClick}></div>
      <div className="frames__button frames__button--duplicate" onClick={this.onCopyButtonClick}></div>
      <canvas
        className="frames__canvas"
        width={width + 'px'}
        height={height + 'px'}
        data-item={dataItem}
        onClick={this.handleFrameClick}
        ref={this.getContext}
      >
        This browser don't support canvas
      </canvas>
    </li>
    )
  }
}

export default class Frames extends React.Component {

  getNewFrame = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    canvas.setAttribute("width", this.props.width);
    canvas.setAttribute("height", this.props.height);
    ctx.fillStyle = 'rgba(231, 231, 231, 1)';
    ctx.fillRect(0, 0, this.props.width, this.props.height);
    const imageData = ctx.getImageData(0,0, this.props.width, this.props.height);
    return {imageData: imageData}
  }

  handleAddFrame = () => {
    this.props.handleFrameActiveChange(this.props.framesList.length)
    const newFrames = this.props.framesList.concat(this.getNewFrame());
    this.props.handleFramesChange(newFrames)
  }

  componentDidMount(){
    this.handleAddFrame();
  }

  render() {
    const { props: { framesList, width, height, frameActive, handleFramesChange}} = this;
    const frames = this.props.framesList.map((item,i) => {
      const isActive = frameActive === i ? true : false;

      return (
        <Frame
          key={i}
          width={width}
          height={height}
          dataItem={i}
          handleFrameActiveChange={this.props.handleFrameActiveChange}
          isActive={isActive}
          imageData={this.props.framesList[i].imageData}
          framesList={framesList}
          handleFramesChange={handleFramesChange}

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
    );
  }
}
