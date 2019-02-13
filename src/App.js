import React, { Component } from 'react';
import './App.css';
import Trenu from './components/Trenu';

class App extends Component {
  state = {
    root: {
      value: "root",
      children: [
        {value: "1", children: [
          {value: "A"},
          {value: "B"}
        ]},
        {value: "2", children: [
          {value: "A"},
          {value: "B"},
          {value: "C"},
          {value: "D"},
          {value: "E"}
        ]},
        {value: "3", children: [
          {value: "A"},
          {value: "B"},
          {value: "C"},
          {value: "D"},
          {value: "E"},
          {value: "F"}
        ]}
      ]}
  }

  render() {
    return (
      <div className="App">
        <Trenu 
          style={{width: `100%`, height: `100%`}}
          nodeStyle={{backgroundColor: `rgb(40,40,40)`, color: `white`, fontSize: `1.5em`, border: `2px solid gray`}}
          nodeSize={100}
          lineStyle={{backgroundColor: `gray`}}
          lineWidth={2}
          lineLength={200}
          root={this.state.root}
        />
      </div>
    );
  }
}

export default App;
