import React from 'react';
import './canvas.css';
import { rgbaArr } from '../../helpers/helpers'
import { cloneDeep } from 'lodash';

// class ToolService {
//   constructor(canvasRef) {
//     this.canvasRef = canvasRef
//   }
// }


export default class Canvas extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.canvasRef = '';
    this.ctx = '';
  }

  cellWidth = this.props.width / this.props.cellCount;
  cellHeight = this.props.height / this.props.cellCount;
  prevToolName = this.props.activeToolName;
  canvasBackgroundColor = 'rgba(231, 231, 231, 1)'

  handleCursorPosition = (e) => {
    const x = event.offsetX;
    const y = event.offsetY;
    this.cellX = Math.floor(x / this.cellWidth);
    this.cellY = Math.floor(y / this.cellHeight);
    this.props.changePositionOnCanvas([this.cellX + 1, this.cellY + 1])
  }
  setDefaultPositionOnCanvas = () => {
    this.props.changePositionOnCanvas([this.props.cellCount, this.props.cellCount])
  }

  //------------color-picker----------------
  getColorFromCanvas = (e) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    console.log(imageData)
    const rgbaColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
    this.props.handlePrimaryColorChange(rgbaColor);
  }
  setColorPicker = () => {
    this.canvasRef.addEventListener('click', this.getColorFromCanvas)
  }
  resetColorPicker = () => {
    this.canvasRef.removeEventListener('click', this.getColorFromCanvas)
  }

  // -------------------------pen--------------------------------

  drawPenCell = () => {
    const { primaryColor, penSize } = this.props;
    this.ctx.beginPath();
    this.ctx.fillStyle = primaryColor;
    switch (penSize) {
      case 1:
        this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
        break;
      case 2:
        this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
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
    this.canvasRef.addEventListener('mousemove', this.drawPenCell);
  }

  onMouseUpPen = () => {
    this.canvasRef.removeEventListener('mousemove', this.drawPenCell);
  }

  setPen = () => {
    this.canvasRef.addEventListener('mousedown', this.onMouseDownPen)
    this.canvasRef.addEventListener('mouseup', this.onMouseUpPen)
  }

  resetPen = () => {
    this.canvasRef.removeEventListener('mousedown', this.onMouseDownPen)
    this.canvasRef.removeEventListener('mouseup', this.onMouseUpPen)
  }
  // -------------------------eraser--------------------------
  drawEraserCell = () => {
    const { penSize } = this.props;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.canvasBackgroundColor;
    switch (penSize) {
      case 1:
        this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
        break;
      case 2:
        this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
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
    this.canvasRef.addEventListener('mousemove', this.drawEraserCell);
  }

  onMouseUpEraser = () => {
    this.canvasRef.removeEventListener('mousemove', this.drawEraserCell);
  }

  setEraser = () => {
    this.canvasRef.addEventListener('mousedown', this.onMouseDownEraser)
    this.canvasRef.addEventListener('mouseup', this.onMouseUpEraser)
  }

  resetEraser = () => {
    this.canvasRef.removeEventListener('mousedown', this.onMouseDownEraser)
    this.canvasRef.removeEventListener('mouseup', this.onMouseUpEraser)
  }
  //--------------------------lighten--------------------------
  drawLightenCell = () => {
    const { penSize } = this.props;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    switch (penSize) {
      case 1:
        this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
        break;
      case 2:
        this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
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
    this.canvasRef.addEventListener('mousemove', this.drawLightenCell);
  }

  onMouseUpLighten = () => {
    this.canvasRef.removeEventListener('mousemove', this.drawLightenCell);
  }

  setLighten = () => {
    this.canvasRef.addEventListener('mousedown', this.onMouseDownLighten)
    this.canvasRef.addEventListener('mouseup', this.onMouseUpLighten)
  }

  resetLighten = () => {
    this.canvasRef.removeEventListener('mousedown', this.onMouseDownLighten)
    this.canvasRef.removeEventListener('mouseup', this.onMouseUpLighten)
  }
  // -------------------------mirror--------------------------------
  drawMirrorCell = () => {
    const { primaryColor, penSize } = this.props;
    this.ctx.beginPath();
    this.ctx.fillStyle = primaryColor;
    switch (penSize) {
      case 1:
        this.ctx.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
        this.ctx.fillRect(Math.abs(this.cellX - (this.props.cellCount - 1)) * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
        break;
      case 2:
        this.ctx.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
        this.ctx.fillRect(Math.abs(this.cellX - (this.props.cellCount - 1)) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
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
    this.canvasRef.addEventListener('mousemove', this.drawMirrorCell);
  }

  onMouseUpMirror = () => {
    this.canvasRef.removeEventListener('mousemove', this.drawMirrorCell);
  }

  setMirror = () => {
    this.canvasRef.addEventListener('mousedown', this.onMouseDownMirror)
    this.canvasRef.addEventListener('mouseup', this.onMouseUpMirror)
  }

  resetMirror = () => {
    this.canvasRef.removeEventListener('mousedown', this.onMouseDownMirror)
    this.canvasRef.removeEventListener('mouseup', this.onMouseUpMirror)
  }
//------------------------------------PaintBuchetAll-----------------------------

  drawPaintBucketAll = (e) => {

    const [pickedRColor, pickedGColor, pickedBColor] = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    console.log(this.props.primaryColor)
    const [primaryRColor, primaryGColor, primaryBColor] = rgbaArr(this.props.primaryColor);
    console.log(primaryRColor, primaryGColor, primaryBColor)
    const ImageData = this.ctx.getImageData(0, 0, this.props.width, this.props.height);


    console.log(primaryRColor, primaryGColor, primaryBColor)
    console.log(ImageData)

    for (let i = 0; i < ImageData.data.length; i = i + 4) {
      if (ImageData.data[i] === pickedRColor &&
        ImageData.data[i + 1] === pickedGColor &&
        ImageData.data[i + 2] === pickedBColor) {

        ImageData.data[i] = primaryRColor;
        ImageData.data[i + 1] = primaryGColor;
        ImageData.data[i + 2] = primaryBColor;
      }
    }
    this.ctx.putImageData(ImageData, 0, 0);
  }

  setPaintBucketAll = () => {
    this.canvasRef.addEventListener('mousedown', this.drawPaintBucketAll)
  }
  resetPaintBucketAll = () => {
    this.canvasRef.removeEventListener('mousedown', this.drawPaintBucketAll)
  }

  // ----------------------dithering------------------------
  drawDitheringCell = () => {
    const { cellX, cellY, cellWidth, cellHeight, props: { primaryColor, secondaryColor, penSize } } = this;
    let color1, color2;
    if ((cellX + cellY) % 2 === 0) {
      color1 = primaryColor;
      color2 = secondaryColor
    } else {
      color2 = primaryColor;
      color1 = secondaryColor
    }

    this.ctx.beginPath();
    switch (penSize) {
      case 1:
        this.ctx.fillStyle = color1;
        this.ctx.fillRect(cellX * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
        break;
      case 2:
        this.ctx.fillStyle = color1;
        this.ctx.fillRect((cellX - 1) * cellWidth, (cellY - 1) * cellHeight, cellWidth * 2, cellHeight * 2);
        this.ctx.fillStyle = color2;
        this.ctx.fillRect((cellX - 1) * cellWidth, cellY * cellHeight, cellWidth, cellHeight);
        this.ctx.fillRect(cellX * cellWidth, (cellY - 1) * cellHeight, cellWidth, cellHeight);
        break;
      case 3:
        this.ctx.fillStyle = color1;
        this.ctx.fillRect((cellX - 1) * cellWidth, (cellY - 1) * cellHeight, cellWidth * 3, cellHeight * 3);
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
    this.canvasRef.addEventListener('mousemove', this.drawDitheringCell);
  }

  onMouseUpDithering = () => {
    this.canvasRef.removeEventListener('mousemove', this.drawDitheringCell);
  }

  setDithering = () => {
    this.canvasRef.addEventListener('mousedown', this.onMouseDownDithering)
    this.canvasRef.addEventListener('mouseup', this.onMouseUpDithering)
  }

  resetDithering = () => {
    this.canvasRef.removeEventListener('mousedown', this.onMouseDownDithering)
    this.canvasRef.removeEventListener('mouseup', this.onMouseUpDithering)
  }
  // ---------------------------------------------------------

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

  handleUpdateFrameImageData = () => {
    const { width, height, updateFrameList} = this.props
    const newImageData = this.ctx.getImageData(0, 0, width, height)
    updateFrameList(newImageData)
  }

  componentDidMount() {
    this.ctx.putImageData(this.props.imageData, 0, 0)
    // this.toolService = new ToolService(this.canvasRef)
    // this.toolService.drawPenCell(color, penSize)
  }

  componentDidUpdate() {
    // const { imageData } = this.props
    // if (imageData.data) {
    this.ctx.putImageData(this.props.imageData, 0, 0)
    // }
    if (this.props.activeToolName !== this.prevToolName) {
      if (this.prevToolName !== '') {
        this.toolsList[this.prevToolName].reset()
      }

      this.prevToolName = this.props.activeToolName
      this.toolsList[this.props.activeToolName].set()
    }

  }

  setCanvasRef = ref => {
    this.canvasRef = ref;
    this.ctx = this.canvasRef.getContext("2d")
  }

  render() {
    const { width, height } = this.props
    this.cellWidth = this.props.width / this.props.cellCount;
    this.cellHeight = this.props.height / this.props.cellCount;
    return (
      <>
        <canvas
          className="canvas"
          width={width + 'px'}
          height={height + 'px'}
          ref={this.setCanvasRef}
          onMouseMove={this.handleCursorPosition}
          onMouseUp={this.handleUpdateFrameImageData}
          onMouseOut={this.setDefaultPositionOnCanvas}
        >
          This browser don't support canvas
    </canvas>
      </>
    )
  }
}
