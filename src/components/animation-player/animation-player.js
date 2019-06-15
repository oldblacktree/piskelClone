import './animation-player.css';
import framesTemplate from './animation-player.html';
import { createElementWithClass } from '../../helpers/helpers';

export default class AnimationPlayer {
  constructor() {
    const animationPlayer = createElementWithClass('div', 'animation-player', framesTemplate);
    animationPlayer.id = 'animation-player';

    this.element = animationPlayer;
  }
}
