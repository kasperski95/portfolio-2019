import React, { Component } from 'react';
import './App.css';
import Trenu from './components/Trenu';

export default class App extends Component {
  render() {
    const root = {
      icon: "/icons/person.svg",
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

    return (
      <div className="App" style={appStyle}>
        <div style={headerStyle}>
          <div>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></div>
        </div>
        <Trenu
          style={{width: `100%`, height: `100%`, paddingTop: `5em`, boxSizing: `border-box`}}
          nodeStyle={{backgroundColor: `#222`, color: `white`, fontSize: `1.5em`, border: `0.125em solid white`}}
          nodeSize={100}
          lineStyle={{backgroundColor: `white`}}
          lineWidth={2}
          labelWidth={72}
          maxLineLength={250}
          seedData={root}
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