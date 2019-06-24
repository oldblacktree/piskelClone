import './animation-player.css';
import React from 'react';


export default class AnimationPlayer extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {fps: 0}
  }

  handleChange = (e) => {
    this.setState({fps: e.target.value})
  }

  render() {
    const { props: { width, height }, state: { fps }, handleChange} = this;
    return (
      <div className="animation-player">
        <canvas className="animation-player__canvas" width={width} height={height}></canvas>
        <div className="fps">
          <p className="fps__display">{fps} FPS</p>
          <input className="fps__range" type="range" min="0" max="24" value={fps} onChange={handleChange}/>
        </div>
      </div>
    )
  }
}
