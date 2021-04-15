import React, { Component } from 'react';
import './App.css';
import { ResultsList } from './components/ResultsList.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ResultsList /> 
      </div>
    );
  }
}

export default App;
