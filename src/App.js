import React, { Component } from 'react';
import './App.css';
import Trenu from './components/Trenu';

export default class App extends Component {
  state = {
    trenu: React.createRef(),
    header: []
  }


  handleNodeClick = (node, active, e) => {
    // accumulate all nodes in the path to root
    let pathToRoot = [active];
    let tmp = active.parent;
    while(tmp) {
      pathToRoot.push(tmp);
      tmp = tmp.parent;
    }
    pathToRoot.reverse();
    
    this.setState({header: pathToRoot});
  }
  

  render() {
    const root = {
      icon: "/icons/person.svg",
      label: "ARKADIUSZ KASPRZYK",
      children: [
        {label: "3D", icon: "/icons/cube.svg", children: [
          {label: "PROJECTS"},
          {label: "SKILLS"}
        ]},
        {label: "CONTACT", icon: "/icons/device-mobile.svg", children: [
          {label: "790588598"},
          {label: "CONTACT@ARKADIUSZKASPRZYK.PL"},
          {label: "LINKEDIN"},
        ]},
        {label: "TIMELINE", icon: "/icons/timeline.svg"},
        {label: "IT", icon: "/icons/code.svg", children: [
          {label: "PROJECTS"},
          {label: "SKILLS"}
        ]}
      ]}

    // header
    let headerLabels = this.state.header.map((node, index) => {
      const display = (index == 0)? `none` : `inline-block`;

      return (
        <React.Fragment>
          <span style={{margin: `0em 1em`, display}}>|</span>
          <span style={{cursor: `default`, userSelect: `none`}}
            onClick={(e) => {
              this.state.trenu.current.handleExternalActiveChange(node, e);
              this.handleNodeClick(node, node, e);
            }}>
            {node.userData.label}
          </span>
        </React.Fragment>
      )}
    )
    if (headerLabels.length == 0) headerLabels = [<span style={{cursor: `default`, userSelect: `none`}}>{root.label}</span>];

    return (
      <div className="App" style={appStyle}>
        <div style={headerStyle}>
          <div>{
            headerLabels
          }</div>
        </div>
        <Trenu ref={this.state.trenu}
          style={{width: `100%`, height: `100%`, paddingTop: `5em`, boxSizing: `border-box`}}
          nodeStyle={{backgroundColor: `#222`, color: `white`, fontSize: `1.5em`, border: `0.125em solid white`}}
          nodeSize={100}
          lineStyle={{backgroundColor: `white`}}
          lineWidth={2}
          labelWidth={72}
          maxLineLength={250}
          seedData={root}
          defaultAction={this.handleNodeClick}
        />
      </div>
    );
  }
}



const appStyle = {
  backgroundColor: `#121212`
}

const headerStyle = {
  width: `100%`,
  height: `5em`,
  backgroundColor: `#222`,
  color: `white`,
  position: `absolute`,
  display: `flex`,
  boxSizing: `border-box`,
  alignItems: `center`,
  padding: `0em 5em`,
  zIndex: `100`
}