import React from 'react';
import './canvas.css';
import { rgbaArr } from '../../helpers/helpers'


export default class Canvas extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }
cellWidth = this.props.width / this.props.cellCount;
cellHeight = this.props.height / this.props.cellCount;
prevToolName = this.props.activeToolName;
canvasBackgroundColor = 'rgba(231, 231, 231, 1)'

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

// -------------------------pen--------------------------------

drawPenCell = () => {
  const {primaryColor, penSize} = this.props;
  this.ctx.beginPath();
  this.ctx.fillStyle = primaryColor;
  switch(penSize) {
    case 1 :
      this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
      break;
    case 2 :
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1)* this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
      break;
    case 3:
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 3, this.cellHeight * 3);
      break;
    case 4:
      this.ctx.fillRect((this.cellX - 2) * this.cellWidth, (this.cellY - 2) * this.cellHeight, this.cellWidth * 4, this.cellHeight * 4);
      break;
  }
}

onMouseDownPen = () => {
  this.drawPenCell()
  this.canvas.addEventListener('mousemove', this.drawPenCell);
}

onMouseUpPen = () => {
  this.canvas.removeEventListener('mousemove', this.drawPenCell);
}

setPen = () => {
  this.canvas.addEventListener('mousedown', this.onMouseDownPen)
  this.canvas.addEventListener('mouseup', this.onMouseUpPen)
}

resetPen = () => {
  this.canvas.removeEventListener('mousedown', this.onMouseDownPen)
  this.canvas.removeEventListener('mouseup', this.onMouseUpPen)
}
// -------------------------eraser--------------------------
drawEraserCell = () => {
  const {penSize} = this.props;
  this.ctx.beginPath();
  this.ctx.fillStyle = this.canvasBackgroundColor;
  switch(penSize) {
    case 1 :
      this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
      break;
    case 2 :
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1)* this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
      break;
    case 3:
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 3, this.cellHeight * 3);
      break;
    case 4:
      this.ctx.fillRect((this.cellX - 2) * this.cellWidth, (this.cellY - 2) * this.cellHeight, this.cellWidth * 4, this.cellHeight * 4);
      break;
  }
}
onMouseDownEraser = () => {
  this.drawEraserCell()
  this.canvas.addEventListener('mousemove', this.drawEraserCell);
}

onMouseUpEraser = () => {
  this.canvas.removeEventListener('mousemove', this.drawEraserCell);
}

setEraser = () => {
  this.canvas.addEventListener('mousedown', this.onMouseDownEraser)
  this.canvas.addEventListener('mouseup', this.onMouseUpEraser)
}

resetEraser = () => {
  this.canvas.removeEventListener('mousedown', this.onMouseDownEraser)
  this.canvas.removeEventListener('mouseup', this.onMouseUpEraser)
}
//--------------------------lighten--------------------------
drawLightenCell = () => {
  const {penSize} = this.props;
  this.ctx.beginPath();
  this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  switch(penSize) {
    case 1 :
      this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
      break;
    case 2 :
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1)* this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
      break;
    case 3:
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 3, this.cellHeight * 3);
      break;
    case 4:
      this.ctx.fillRect((this.cellX - 2) * this.cellWidth, (this.cellY - 2) * this.cellHeight, this.cellWidth * 4, this.cellHeight * 4);
      break;
  }
}
onMouseDownLighten = () => {
  this.drawLightenCell()
  this.canvas.addEventListener('mousemove', this.drawLightenCell);
}

onMouseUpLighten = () => {
  this.canvas.removeEventListener('mousemove', this.drawLightenCell);
}

setLighten = () => {
  this.canvas.addEventListener('mousedown', this.onMouseDownLighten)
  this.canvas.addEventListener('mouseup', this.onMouseUpLighten)
}

resetLighten = () => {
  this.canvas.removeEventListener('mousedown', this.onMouseDownLighten)
  this.canvas.removeEventListener('mouseup', this.onMouseUpLighten)
}
// -------------------------mirror--------------------------------
drawMirrorCell = () => {
  const {primaryColor, penSize} = this.props;
  this.ctx.beginPath();
  this.ctx.fillStyle = primaryColor;
  switch(penSize) {
    case 1 :
      this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
      this.ctx.fillRect(Math.abs(this.cellX - (this.props.cellCount - 1)) * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
      break;
    case 2 :
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1)* this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
      this.ctx.fillRect(Math.abs(this.cellX - (this.props.cellCount - 1)) * this.cellWidth, (this.cellY - 1)* this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
      break;
    case 3:
      this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 3, this.cellHeight * 3);
      this.ctx.fillRect(Math.abs(this.cellX - (this.props.cellCount - 2)) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 3, this.cellHeight * 3);
      break;
    case 4:
      this.ctx.fillRect((this.cellX - 2) * this.cellWidth, (this.cellY - 2) * this.cellHeight, this.cellWidth * 4, this.cellHeight * 4);
      this.ctx.fillRect(Math.abs(this.cellX - (this.props.cellCount - 2)) * this.cellWidth, (this.cellY - 2) * this.cellHeight, this.cellWidth * 4, this.cellHeight * 4);
      break;
  }
}

onMouseDownMirror = () => {
  this.drawMirrorCell()
  this.canvas.addEventListener('mousemove', this.drawMirrorCell);
}

onMouseUpMirror = () => {
  this.canvas.removeEventListener('mousemove', this.drawMirrorCell);
}

setMirror = () => {
  this.canvas.addEventListener('mousedown', this.onMouseDownMirror)
  this.canvas.addEventListener('mouseup', this.onMouseUpMirror)
}

resetMirror = () => {
  this.canvas.removeEventListener('mousedown', this.onMouseDownMirror)
  this.canvas.removeEventListener('mouseup', this.onMouseUpMirror)
}

// -------------------------paint-bucket-all--------------------------------
// drawPaintBuchetAll = (e) => {
//   const imageData = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
//   const rgbaColorPick = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
//   this.ctx.fillStyle = this.props.primaryColor;
//   const { cellWidth, cellHeight, props: { cellCount}} = this

//   for (let i = 0; i <= cellCount - 1; i++) {
//     for (let j = 0; j <= cellCount - 1; j++){
//       const imageData = this.ctx.getImageData(i * cellWidth, j * cellHeight, 1, 1).data;
//       const rgbaColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
//       if (rgbaColorPick === rgbaColor) {
//         // this.ctx.beginPath();

//         this.ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
//       }
//       }
//     }
//   }
drawPaintBuchetAll = (e) => {
  const [pickedRColor, pickedGColor, pickedBColor] = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const [primaryRColor, primaryGColor, primaryBColor] = rgbaArr(this.props.primaryColor);
  const ImageData = this.ctx.getImageData(0, 0, this.props.width, this.props.height);

  for (let i = 0; i < ImageData.data.length; i = i + 4) {
    if (ImageData.data[i] === pickedRColor &&
        ImageData.data[i + 1] === pickedGColor &&
        ImageData.data[i + 2] === pickedBColor) {

      ImageData.data[i] = primaryRColor;
      ImageData.data[i + 1] = primaryGColor;
      ImageData.data[i + 2] = primaryBColor;
    }
  }
  this.ctx.putImageData(ImageData,0,0);
}

setPaintBucketAll = () => {
  this.canvas.addEventListener('mousedown', this.drawPaintBuchetAll)
}
resetPaintBucketAll = () => {
  this.canvas.removeEventListener('mousedown', this.drawPaintBuchetAll)
}

// ----------------------dithering------------------------
drawDitheringCell = () => {
  const { cellX, cellY, cellWidth, cellHeight, props:{primaryColor, secondaryColor, penSize}} = this;
  let color1, color2;
  if ((cellX + cellY) % 2 === 0) {
    color1 = primaryColor;
    color2 = secondaryColor
  } else {
    color2 = primaryColor;
    color1 = secondaryColor
  }

  this.ctx.beginPath();
  switch(penSize) {
    case 1 :
      this.ctx.fillStyle = color1;
      this.ctx.fillRect(cellX * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
      break;
    case 2 :
      this.ctx.fillStyle = color1;
      this.ctx.fillRect((cellX - 1) * cellWidth, (cellY - 1) * cellHeight, cellWidth * 2, cellHeight * 2);
      this.ctx.fillStyle = color2;
      this.ctx.fillRect((cellX - 1) * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect(cellX * cellWidth, (cellY - 1) * cellHeight, cellWidth, cellHeight);
      break;
    case 3:
      this.ctx.fillStyle = color1;
      this.ctx.fillRect((cellX - 1 ) * cellWidth, (cellY - 1) * cellHeight, cellWidth * 3, cellHeight * 3);
      this.ctx.fillStyle = color2;
      this.ctx.fillRect(cellX * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX - 1) * cellWidth, (cellY - 1) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX + 1) * cellWidth, (cellY + 1) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX - 1) * cellWidth, (cellY + 1) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX + 1) * cellWidth, (cellY - 1) * cellHeight, cellWidth, cellHeight);
      break;
    case 4:
      this.ctx.fillStyle = color1;
      this.ctx.fillRect((cellX - 2) * cellWidth, (cellY - 2) * cellHeight, cellWidth * 4, cellHeight * 4);
      this.ctx.fillStyle = color2;
      this.ctx.fillRect((cellX + 1) * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect(cellX * cellWidth, (cellY + 1) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX - 1) * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect(cellX * cellWidth, (cellY - 1) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX + 1) * cellWidth, (cellY - 2) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX - 1) * cellWidth, (cellY - 2) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX - 2) * cellWidth, (cellY - 1) * cellHeight, cellWidth, cellHeight);
      this.ctx.fillRect((cellX - 2) * cellWidth, (cellY + 1) * cellHeight, cellWidth, cellHeight);
      break;
  }
}

onMouseDownDithering = () => {
  this.drawDitheringCell()
  this.canvas.addEventListener('mousemove', this.drawDitheringCell);
}

onMouseUpDithering = () => {
  this.canvas.removeEventListener('mousemove', this.drawDitheringCell);
}

setDithering = () => {
  this.canvas.addEventListener('mousedown', this.onMouseDownDithering)
  this.canvas.addEventListener('mouseup', this.onMouseUpDithering)
}

resetDithering = () => {
  this.canvas.removeEventListener('mousedown', this.onMouseDownDithering)
  this.canvas.removeEventListener('mouseup', this.onMouseUpDithering)
}
// ---------------------------------------------------------




paintCanvasToOneColor = (color) => {
  this.ctx.beginPath();
  this.ctx.fillStyle = color;
  this.ctx.fillRect(0, 0, this.props.width, this.props.height)
}

getContext = (canvas) => {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.paintCanvasToOneColor(this.canvasBackgroundColor)
}

toolsList = {
  'pen': {
    set: this.setPen,
    reset: this.resetPen
  },
  'mirror': {
    set: this.setMirror,
    reset: this.resetMirror
  },
  'paint-bucket': {
    set: () => { console.log('set paint-bucket') },
    reset: () => { console.log('reset paint-bucket') }
  },
  'paint-bucket-all': {
    set: this.setPaintBucketAll,
    reset: this.resetPaintBucketAll
  },
  'eraser': {
    set: this.setEraser,
    reset: this.resetEraser
  },
  'stroke': {
    set: () => { console.log('set stroke') },
    reset: () => { console.log('reset stroke') }
  },
  'rectangle': {
    set: () => { console.log('set rectangle') },
    reset: () => { console.log('reset rectangle') }
  },
  'circle': {
    set: () => { console.log('set circle') },
    reset: () => { console.log('reset circle') }
  },
  'move': {
    set: () => { console.log('set move') },
    reset: () => { console.log('reset move') }
  },
  'shape-selection': {
    set: () => { console.log('set shape-selection') },
    reset: () => { console.log('reset shape-selection') }
  },
  'rectangle-selection': {
    set: () => { console.log('set rectangle-selection') },
    reset: () => { console.log('reset rectangle-selection') }
  },
  'lasso-selection': {
    set: () => { console.log('set lasso-selection') },
    reset: () => { console.log('reset lasso-selection') }
  },
  'lighten': {
    set: this.setLighten,
    reset: this.resetLighten
  },
  'dithering': {
    set: this.setDithering,
    reset: this.resetDithering
  },
  'color-picker': {
    set: this.setColorPicker,
    reset: this.resetColorPicker
  },

}




//     this.toolsList = [
//   'pen', 'mirror',
//   'paint-bucket', 'paint-bucket-all',
//   'eraser', 'stroke',
//   'rectangle', 'circle',
//   'move', 'shape-selection',
//   'rectangle-selection', 'lasso-selection',
//   'lighten', 'dithering',
//   'color-picker'
// ]

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
