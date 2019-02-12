import React, { Component } from 'react';
import './App.css';
import Trenu from './components/Trenu';

class App extends Component {
  state = {
    root: {
      name: "root",
      children: [
        {name: "1", action: (arg) => {alert(arg)}},
        {name: "2"},
        {name: "3", children: [
          {name: "A"},
          {name: "B"},
          {name: "C"},
          {name: "D"},
          {name: "E"},
          {name: "F"},
        ]}
      ]}
  }

  render() {
    return (
      <div className="App">
        <Trenu 
          style={{width: `100%`, height: `100%`, backgroundColor: `#EEE`}}
          root={this.state.root}
          size={72}
          scaling={0.618}
        />
      </div>
    );
  }
}

export default App;
