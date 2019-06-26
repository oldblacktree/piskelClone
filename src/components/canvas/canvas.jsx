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
    this.state = {}
  }



  setCanvasRef = ref => {
    this.canvasRef = ref;
}

  componentDidMount() {
    this.canvasRef.getContext("2d").putImageData(this.props.imageData, 0, 0)
    // this.toolService = new ToolService(this.canvasRef)

    // this.toolService.drawPenCell(color, penSize)
  }

  componentDidUpdate(prevProps) {
    // const { imageData } = this.props

    // if (imageData.data) {
      this.canvasRef.getContext("2d").putImageData(this.props.imageData, 0, 0)
    // }
  }

  drawPenCell = () => {
    const { color, penSize } = this.props;
    // this.ctx.beginPath();
    this.context.fillStyle = color;

    switch (penSize) {
      case 1:
        this.context.fillRect(this.cellX * this.cellWidth, this.cellY * this.cellHeight, this.cellWidth, this.cellHeight);
        break;
      case 2:
        this.context.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 2, this.cellHeight * 2);
        break;
      case 3:
        this.context.fillRect((this.cellX - 1) * this.cellWidth, (this.cellY - 1) * this.cellHeight, this.cellWidth * 3, this.cellHeight * 3);
        break;
      case 4:
        this.context.fillRect((this.cellX - 2) * this.cellWidth, (this.cellY - 2) * this.cellHeight, this.cellWidth * 4, this.cellHeight * 4);
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

  handleMouseMove = () => {
    const x = event.offsetX;
    const y = event.offsetY;
    this.setState({
      x:x,
      y:y,
    })

  }

  handleMouseUp = () => {}

  handleClick = () => {
    const { width, height, updateFrameList} = this.props
    const {x, y} = this.state
    this.canvasRef.getContext("2d").fillStyle="green";
    this.canvasRef.getContext("2d").fillRect(x, y, 50, 50);
    const newImageData = this.canvasRef.getContext('2d').getImageData(0, 0, width, height)
    updateFrameList(newImageData)
  }



  render() {
    const { width, height } = this.props
    const {x, y} = this.state
    return (
      <>
        <canvas
          className="canvas"
          width={width + 'px'}
          height={height + 'px'}
          ref={this.setCanvasRef}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onClick={this.handleClick}
        >
          This browser don't support canvas
    </canvas>
      </>
    )
  }
}
