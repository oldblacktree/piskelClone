const initialState = {
  penSize: 1,
  primaryColor: 'rgba(0, 0, 0, 1)',
  secondaryColor: 'rgba(255, 255, 255, 1)',
  canvasWidth: 640,
  canvasHeight: 640,
  canvasCellCount: 32,
  // activeToolName: this.toolsList[0],
  activeToolName: '',
  frameList: [],
  activeFrameId: '',
};

export default initialState;
