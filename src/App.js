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
          {name: "B"}
        ]}
      ]}
  }

  render() {
    return (
      <div className="App">
        <Trenu 
          style={{width: `500px`, height: `500px`, backgroundColor: `#EEE`}}
          root={this.state.root}
          size={40}
          scaling={0.75}
        />
      </div>
    );
  }
}

export default App;
