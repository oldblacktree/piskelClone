import './frames.css';
import React from 'react';
import { cloneDeep } from 'lodash';


class Frame extends React.Component {
  setImageData = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.putImageData(this.props.imageData,0,0)
  }

  handleDeleteButtonClick = () => {
    const copyFramesList = this.props.framesList.filter((item) => {
      // return item.index !== this.props.index
      return true
    })

    this.props.handleFramesListChange(copyFramesList)
    // this.props.handleFramesListChange(this.props.framesList)
    console.log('copyFramesList', copyFramesList)
    console.log('this.props.framesList', this.props.framesList)
  }

  render() {
    const { props: { width, height } } = this
    return (
      <li className={`frames__item`} >
        <div className="frames__button frames__button--move"></div>
        <div className="frames__button frames__button--delete" onClick={this.handleDeleteButtonClick}></div>
        <div className="frames__button frames__button--duplicate"></div>
        <canvas
          className="frames__canvas"
          width={width + 'px'}
          height={height + 'px'}
          ref={this.setImageData}
        >
          This browser don't support canvas
        </canvas>
      </li>
    )
  }
}





export default class Frames extends React.Component {

  index = 0;

  createNewImageData = () => {
    const canvasFrame = document.createElement('canvas');
    const ctx = canvasFrame.getContext("2d");
    canvasFrame.setAttribute("width", this.props.width);
    canvasFrame.setAttribute("height", this.props.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(231, 231, 231, 1)';
    ctx.fillRect(0, 0, this.props.width, this.props.height);

    return ctx.getImageData(0, 0, this.props.width, this.props.height)
  }


  handleAddFrame = () => {
    const frame = { imageData: this.createNewImageData(),
                    index : this.index}
    const newFramesList = this.props.framesList.concat(frame);
    this.props.handleFramesListChange(newFramesList);
    this.index++;
  }

  render(){
    console.log('render FRAMES')
    const { props: { framesList, width, height, handleFramesListChange}} = this;
    const frames = framesList.map((item,i) => {
      return (
        <Frame
          key={i}
          width={width}
          height={height}
          imageData={item.imageData}
          index={item.index}
          framesList={framesList}
          handleFramesListChange={handleFramesListChange}
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


// class Frame extends React.Component {
//   handleFrameClick = (e) => {
//     const frameNumber = +e.target.dataset.item
//     this.props.handleFrameActiveChange(frameNumber)
//   }

//   getContext = (canvas) => {
//     this.canvas = canvas;
//     console.log('canvas', canvas)
//     this.ctx = canvas.getContext('2d');
//     this.ctx.putImageData(this.props.framesList[this.props.dataItem].imageData,0,0)
//   }

//   componentDidUpdate() {
//     this.ctx.putImageData(this.props.framesList[this.props.dataItem].imageData, 0, 0)
//   }

//   onDeleteButtonClick = () => {
//     const newFrames = [...this.props.framesList];
//     // newFrames.splice(this.props.dataItem, 1);
//     this.props.handleFramesChange(newFrames)
//     // console.log('onDeleteButtonClick', newFrames)
//   }

//   onCopyButtonClick = () => {
//   const newFrames = cloneDeep(this.props.framesList;
//   newFrames.splice(this.props.dataItem, 0, newFrames[this.props.dataItem]);
//   this.props.handleFramesChange(newFrames)
//   console.log('onCopyButtonClick', newFrames)
//   }


//   render() {
//   const { width, height, dataItem, isActive } = this.props;
//   const activeClass = 'frames__item--active';

//   return (
//     <li className={`frames__item ${isActive ? activeClass : ''}`} >
//       <div className="frames__button frames__button--move"></div>
//       <div className="frames__button frames__button--delete" onClick={this.onDeleteButtonClick}></div>
//       <div className="frames__button frames__button--duplicate" onClick={this.onCopyButtonClick}></div>
//       <canvas
//         className="frames__canvas"
//         width={width + 'px'}
//         height={height + 'px'}
//         data-item={dataItem}
//         onClick={this.handleFrameClick}
//         ref={this.getContext}
//       >
//         This browser don't support canvas
//       </canvas>
//     </li>
//     )
//   }
// }

// export default class Frames extends React.Component {

//   getNewFrame = () => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext("2d");
//     canvas.setAttribute("width", this.props.width);
//     canvas.setAttribute("height", this.props.height);
//     ctx.fillStyle = 'rgba(231, 231, 231, 1)';
//     ctx.fillRect(0, 0, this.props.width, this.props.height);
//     const imageData = ctx.getImageData(0,0, this.props.width, this.props.height);
//     return {imageData: imageData}
//   }

//   handleAddFrame = () => {
//     this.props.handleFrameActiveChange(this.props.framesList.length)
//     const newFrames = this.props.framesList.concat(this.getNewFrame());
//     this.props.handleFramesChange(newFrames)
//   }

//   componentDidMount(){
//     this.handleAddFrame();
//   }

//   render() {
//     const { props: { framesList, width, height, frameActive, handleFramesChange, handleFrameActiveChange}} = this;
//     const frames = this.props.framesList.map((item,i) => {
//     const isActive = frameActive === i ? true : false;

//       return (
//         <Frame
//           key={i}
//           width={width}
//           height={height}
//           dataItem={i}
//           handleFrameActiveChange={handleFrameActiveChange}
//           isActive={isActive}
//           imageData={item.imageData}
//           framesList={framesList}
//           handleFramesChange={handleFramesChange}

//         />
//       )
//     })

//     console.log('RENDOER frames', frames)
//     return (
//       <>
//         <ul className="frames">
//           {frames}
//         </ul>
//         <div className="add-frame" onClick={this.handleAddFrame}>
//           <p className="add-frame__text">Add new frame</p>
//         </div>
//       </>
//     );
//   }
// }
