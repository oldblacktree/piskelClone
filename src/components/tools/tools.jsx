import React from 'react';
import './tools.css';

class Tool extends React.PureComponent {

  render() {
    const { toolName, isActive, onClick, keyboardShortCuts} = this.props;
    const activeClass = 'tools-item--active';
    const itemClass = `tools-item--${toolName}`;

    let title;
    for (let key in keyboardShortCuts) {
      if (keyboardShortCuts[key].toolName === toolName){
        title = keyboardShortCuts[key].letter;
      }
    }

    return (
      <li
        className={`tools-item ${itemClass} ${isActive ? activeClass: ''}`}
        onClick={()=>onClick(toolName)}
        title={title}
      />
    )
  }
}

export default class Tools extends React.PureComponent {
  handleToolClick = (toolName) => {
    return this.props.handleToolChange(toolName);
  }

  handleKeyDown = (e) => {
    const keyCode = e.keyCode;

    if (this.keyboardShortCuts[keyCode]){
      const toolName = this.keyboardShortCuts[keyCode].toolName
      this.props.handleToolChange(toolName)
    }
  }

  keyboardShortCuts = {
    '80': { letter: 'P', toolName: 'pen' },
    '86': { letter: 'V', toolName: 'mirror' },
    '66': { letter: 'B', toolName: 'paint-bucket' },
    '65': { letter: 'A', toolName: 'paint-bucket-all' },
    '69': { letter: 'E', toolName: 'eraser' },
    '76': { letter: 'L', toolName: 'stroke' },
    '82': { letter: 'R', toolName: 'rectangle' },
    '67': { letter: 'C', toolName: 'circle' },
    '77': { letter: 'M', toolName: 'move' },
    '90': { letter: 'Z', toolName: 'shape-selection' },
    '83': { letter: 'S', toolName: 'rectangle-selection' },
    '72': { letter: 'H', toolName: 'lasso-selection' },
    '85': { letter: 'U', toolName: 'lighten' },
    '84': { letter: 'T', toolName: 'dithering' },
    '79': { letter: 'O', toolName: 'color-picker' },
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  render() {
    const tools = this.props.toolsList.map((toolName) => {
      const isActive = toolName === this.props.activeToolName ? true : false;
        return (
          <Tool
            key={toolName}
            toolName={toolName}
            onClick={this.handleToolClick}
            isActive={isActive}
            keyboardShortCuts={this.keyboardShortCuts}
          />
        )
      })

    return (
      <ul className="tools">
          {tools}
      </ul>
    );
  }
}
