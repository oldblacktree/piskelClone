import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx';
import PenSize from './pen-size/pen-size.jsx';
import Tools from './tools/tools.jsx';
import Palette from './palette/palette.jsx';

// class ToolsColumn extends React.Component {
//   render() {
//     return (
//       <section className="tools-column">
//         <PenSize />
//         <Tools />
//         <Palette />
//       </section>
//     );
//   }
// }
// class FramesColumn extends React.Component {
//   render() {
//     return (
//       <section className="frames-column"></section>
//     );
//   }
// }

// class MainColumn extends React.Component {
//   render() {
//     return (
//       <section className="main-column"></section>
//     );
//   }
// }

// class SettingsColumn extends React.Component {
//   render() {
//     return (
//       <section className="settings-column"></section>
//     );
//   }
// }

// class MenuColumn extends React.Component {
//   render() {
//     return (
//       <section className="menu-column"></section>
//     );
//   }
// }
const initialState = {
  // canvasWidth: 800,
  // canvasHeight: 800,
  // canvasCellCount: 32,

  primaryColor: "#000000",
  secondaryColor: "#FFFFFF",
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.updateStateProperty = this.updateStateProperty.bind(this);
  }

  // handleChangeColor(e) {
  //   this.setState({primaryColor: e.target.value});
  //   console.log(this.state)
  // }
  updateStateProperty(property) {
    return (value) => {
      this.setState({[property]: value});
    };
  }

  render() {
    return (
      <>
        <Header />
        <main className='main'>
          <section className="tools-column">
            <PenSize />
            <Tools />
            <Palette updateStatePrimaryColor = {this.updateStateProperty('primaryColor')}
              updateStateSecondaryColor={this.updateStateProperty('secondaryColor')}
              primaryColor = {this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}/>
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

ReactDOM.render(<App state={initialState}/>,document.getElementById('root'));


