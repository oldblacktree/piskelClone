// import { createElementWithClass } from './helpers/helpers';


// import './main.css';
// import Header from './components/header/header';
// import PenSize from './components/pen-size/pen-size';
// import Tools from './components/tools/tools';
// import Palette from './components/palette/palette';
// import Frames from './components/frames/frames';
// import Canvas from './components/canvas/canvas';
// import AnimationPlayer from './components/animation-player/animation-player';
// import PositionOnCanvas from './components/positionOnCanvas/positionOnCanvas';
// import Menu from './components/menu/menu';

// const state = {
//   canvasWidth: 800,
//   canvasHeight: 800,
//   canvasCellCount: 32,

//   primaryColor: null,
//   secondaryColor: null,
// };
// const updateStatePropery = property => (value) => {
//   state[property] = value;
//   console.log(state);
// };


// const main = createElementWithClass('main', 'main');
// const toolsColumn = createElementWithClass('section', 'tools-column');
// const framesColumn = createElementWithClass('section', 'frames-column');
// const mainColumn = createElementWithClass('section', 'main-column');
// const settingsColumn = createElementWithClass('section', 'settings-column');
// const menuColumn = createElementWithClass('section', 'menu-column');

// const header = new Header();
// const penSize = new PenSize();
// const tools = new Tools();
// const palette = new Palette(
//   updateStatePropery('primaryColor'),
//   updateStatePropery('secondaryColor'),
// );
// const frames = new Frames();
// const canvas = new Canvas();
// const animationPlayer = new AnimationPlayer();
// const menu = new Menu();
// const positionOnCanvas = new PositionOnCanvas(
//   state.canvasWidth,
//   state.canvasHeight,
//   state.canvasCellCount,
// );
// // create template
// toolsColumn.appendChild(penSize.element);
// toolsColumn.appendChild(tools.element);
// toolsColumn.appendChild(palette.element);
// main.appendChild(toolsColumn);

// framesColumn.appendChild(frames.element);
// main.appendChild(framesColumn);

// mainColumn.appendChild(canvas.element);
// main.appendChild(mainColumn);

// settingsColumn.appendChild(animationPlayer.element);
// settingsColumn.appendChild(positionOnCanvas.element);
// main.appendChild(settingsColumn);

// menuColumn.appendChild(menu.element);
// main.appendChild(menuColumn);

// document.body.appendChild(header.element);
// document.body.appendChild(main);

// logic

// ----palette change color-----------
