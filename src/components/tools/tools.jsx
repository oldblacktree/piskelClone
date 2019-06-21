import React from 'react';
import './tools.css';

class Tool extends React.PureComponent {
  render() {
    const { toolName, isActive, onClick} = this.props;
    const activeClass = 'tools-item--active';
    const itemClass = `tools-item--${toolName}`;

    return (
      <li
        className={`tools-item ${itemClass} ${isActive ? activeClass: ''}`}
        onClick={()=>onClick(toolName)}
      />
    )
  }
}


export default class Tools extends React.PureComponent {
  handleToolClick = (toolName) => () => {
    this.props.onToolClick(toolName);
  }

  render() {
    const tools = this.props.toolsList.map((toolName) => {
        const isActive = toolName === this.props.activeToolName ? true : false;
        return (
          <Tool
            key={toolName}
            toolName={toolName}
            onClick={this.props.onToolClick}
            isActive={isActive}
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
