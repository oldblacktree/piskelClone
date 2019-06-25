import './animation-player.css';
import React from 'react';


export default class AnimationPlayer extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {fps: 1}
  }
  idInterval = '';

  startAnimation =() => {
    if (this.props.framesList.length === 0) {
      console.log('framesList === 0')
      return
    }
    let i = 0;
    this.idInterval = setInterval(() => {
      let imageDataFrame = this.props.framesList[i % this.props.framesList.length].imageData
      this.ctx.putImageData(imageDataFrame,0 ,0)
    i++;
  }, 1000 / this.state.fps);
}

  handleChange = (e) => {
    this.setState({fps: e.target.value})
  }

  getCanvasContext = (canvas) => {
    console.log('canvas AnimationPlalyer',canvas)
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(231, 231, 231, 1)';
    this.ctx.fillRect(0, 0, this.props.width, this.props.height)
  }

  onFullScreenButtonClick = () => {
    this.canvas.requestFullscreen();
  }

  componentDidUpdate(){
    clearInterval(this.idInterval);
    if (this.state.fps > 0) {
      this.startAnimation()
    }
  }

  render() {
    const { props: { width, height }, state: { fps }, handleChange} = this;
    return (
      <>
        <div className="animation-player">
          <canvas className="animation-player__canvas"
            width={width}
            height={height}
            ref={this.getCanvasContext}>
          </canvas>
          <div className="animation-player__button animation-player__button--popup" onClick={this.onFullScreenButtonClick}></div>
        </div>
        <div className="fps">
          <p className="fps__display">{fps} FPS</p>
          <input className="fps__range" type="range" min="0" max="24" value={fps} onChange={handleChange}/>
        </div>
      </>
    )
  }
}
