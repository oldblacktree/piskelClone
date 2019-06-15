import { createElementWithClass } from './helpers/helpers';

import Header from './components/header/header';
import './main.css';


const main = createElementWithClass('main', 'main');
const header = new Header();


document.body.appendChild(header.element);
document.body.appendChild(main);
