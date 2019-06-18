import './header.css';
import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  render() {
    return (
      <header className = 'header'>
        <a href="#">
          <img className='logo' src="./assets/img/logo.png" alt=""/>
        </a>
      </header>
    );
  }
}
