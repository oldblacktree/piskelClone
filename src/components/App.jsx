import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx';
import PenSize from './pen-size/pen-size.jsx';
import Tools from './tools/tools.jsx';
import Palette from './palette/palette.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      penSize: 4,
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF",
    }
  }


  updateStateProperty = (property) => {
    return (value) => {
      this.setState({[property]: value});
    };
  }

  handleSwap = () => {
    const { primaryColor, secondaryColor} = this.state;

    this.setState({
      primaryColor: secondaryColor,
      secondaryColor: primaryColor,
    })
  }

  render() {
    const {primaryColor, secondaryColor, penSize} = this.state;

    return (
      <>
        <Header />
        <main className='main'>
          <section className="tools-column">
            <PenSize
              penSize={penSize}
              updateStatePenSize={this.updateStateProperty('penSize')}
            />
            <Tools />
            <Palette
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onPrimaryColorChange={this.updateStateProperty('primaryColor')}
              onSecondaryColorChange={this.updateStateProperty('secondaryColor')}
              onSwapColors={this.handleSwap}
              />
          </section>
          <section className="frames-column"></section>
          <section className="main-column"></section>
          <section className="settings-column"></section>
          <section className="menu-column"></section>
        </main>
      </>
    );
  }
}


// ========================================

ReactDOM.render(<App />,document.getElementById('root'));


