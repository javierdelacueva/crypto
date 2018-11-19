import React, { Component } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>CryptoWallet</h1>
          <Dashboard />
          <p className="App-subtext">
            Information updates every 30 seconds.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
