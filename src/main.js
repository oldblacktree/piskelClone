import {
  createElementWithClass,
} from './helpers/helpers';


import './main.css';
import Header from './components/header/header';
import PenSize from './components/pen-size/pen-size';
import Tools from './components/tools/tools';

const main = createElementWithClass('main', 'main');
const toolsColumn = createElementWithClass('section', 'tools-column');
const header = new Header();
const penSize = new PenSize();
const tools = new Tools();

//create template
toolsColumn.appendChild(penSize.element);
toolsColumn.appendChild(tools.element);
main.appendChild(toolsColumn);


document.body.appendChild(header.element);
document.body.appendChild(main);
