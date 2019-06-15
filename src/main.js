import { createElementWithClass } from './helpers/helpers';


import './main.css';
import Header from './components/header/header';
import PenSize from './components/pen-size/pen-size';
import Tools from './components/tools/tools';
import Palette from './components/palette/palette';
import Frames from './components/frames/frames';
import Canvas from './components/canvas/canvas';

const main = createElementWithClass('main', 'main');
const toolsColumn = createElementWithClass('section', 'tools-column');
const framesColumn = createElementWithClass('section', 'frames-column');
const mainColumn = createElementWithClass('section', 'main-column');

const header = new Header();
const penSize = new PenSize();
const tools = new Tools();
const palette = new Palette();
const frames = new Frames();
const canvas = new Canvas();

//create template
toolsColumn.appendChild(penSize.element);
toolsColumn.appendChild(tools.element);
toolsColumn.appendChild(palette.element);
main.appendChild(toolsColumn);

framesColumn.appendChild(frames.element);
main.appendChild(framesColumn);

mainColumn.appendChild(canvas.element);
main.appendChild(mainColumn);


document.body.appendChild(header.element);
document.body.appendChild(main);
