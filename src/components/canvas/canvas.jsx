import React from 'react';
import './canvas.css';



export default class Canvas extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }
cellWidth = this.props.width / this.props.cellCount;
cellHeight = this.props.height / this.props.cellCount;
prevToolName = this.props.activeToolName;

addSomeFigureOnCanvas = () => {
this.ctx.fillStyle = "blue"
this.ctx.fillRect(0, 0, 100, 100)
this.ctx.beginPath()
this.ctx.fillStyle = "green";
this.ctx.fillRect(100, 100, 100, 100)
this.ctx.beginPath();
this.ctx.fillStyle = "gold";
this.ctx.fillRect(200, 200, 100, 100)
this.ctx.beginPath();
this.ctx.fillStyle = "yellow";
this.ctx.fillRect(300, 300, 100, 100)
}

handleCursorPosition = (e) => {
  const x = event.offsetX;
  const y = event.offsetY;
  this.cellX = Math.floor(x / this.cellWidth);
  this  .cellY = Math.floor(y / this.cellHeight);
}
//------------color-picker----------------
getColorFromCanvas = (e) => {
  const x = event.offsetX;
  const y = event.offsetY;
  const imageData = this.ctx.getImageData(x, y, 1, 1).data;
  const rgbaColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
  this.props.onPickColor(rgbaColor);
}
setColorPicker = () => {
  this.canvas.addEventListener('click', this.getColorFromCanvas)
}
resetColorPicker = () => {
  this.canvas.removeEventListener('click', this.getColorFromCanvas)
}

// ---------------pen--------------------------------
drawCell = (e) => {
  const {primaryColor, penSize} = this.props;
  this.ctx.beginPath();
  this.ctx.fillStyle = primaryColor;
  this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight)
}
onMouseDown = () => {
  console.log(1)
  this.drawCell()
  this.canvas.addEventListener('mousemove', this.drawCell);
}
onMouseUp = () => {
  this.canvas.removeEventListener('mousemove', this.drawCell);
}

setPen = () => {
  this.canvas.addEventListener('mousedown', this.onMouseDown)
  this.canvas.addEventListener('mouseup', this.onMouseUp)
}

resetPen = () => {
  console.log('resetPen')
  this.canvas.removeEventListener('mousedown', this.onMouseDown)
  this.canvas.removeEventListener('mouseup', this.onMouseUp)
}
// ---------------------------------------------------

getContext = (canvas) => {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
}

toolsList = {
  'pen': {
    set: this.setPen,
    reset: this.resetPen
  },
  'mirror': {
    set: () => { console.log('set mirror') },
    reset: () => { console.log('reset mirror') }
  },
  'color-picker': {
    set: this.setColorPicker,
    reset: this.resetColorPicker},
}


componentDidUpdate() {
  if (this.props.activeToolName !== this.prevToolName) {

    if (this.prevToolName !== ''){
    this.toolsList[this.prevToolName].reset()
    }

    this.prevToolName = this.props.activeToolName
    this.toolsList[this.props.activeToolName].set()
  }

}

render() {
  const {width, height} = this.props
  return (
    <>
    <canvas
      className="canvas"
      width={width + 'px'}
      height={height + 'px'}
      ref={this.getContext}
      onMouseMove={this.handleCursorPosition}
      >
        This browser don't support canvas
    </canvas>
    <p onClick={this.addSomeFigureOnCanvas} style={{color: 'red'}}>Add</p>
    </>
  )
}
}
