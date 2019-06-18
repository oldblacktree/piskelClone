import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './header/header.jsx'

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {this.props.value}
//       </button>
//     );
//   }
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return <Square value={i}/>;
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className='main'>
          <section className="tools-colunm"></section>
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


