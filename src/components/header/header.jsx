import './header.css';
import React from 'react';
import Authorization from '../authorization/authorization.jsx'

export default class App extends React.Component {
  render() {
    return (
      <header className='header'>
        <a href="#">
          <img className='logo' src="./assets/img/logo.png" alt="Logo"/>
        </a>
        <Authorization />
      </header>
    );
  }
}
