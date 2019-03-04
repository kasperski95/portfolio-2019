import React, { Component } from 'react'
import TrenuSpa from './trenu-spa'
import Timeline from './components/pages/Timeline'

export default class App extends Component {
  render() {
    return (
      <TrenuSpa style={{minWidth: '300px', minHeight: '400px'}}>
        {{
          label: <React.Fragment>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></React.Fragment>,
          icon: "/icons/person.png",
          children: [
            {label: "TIMELINE", icon: "/icons/timeline.png", content: <Timeline/>},
            {label: "CONTACT", icon: "/icons/device-mobile.png"},
            {label: "SKILLS", icon: "/icons/code.png", children: [
              {label: "ARTISTIC", icon: "/icons/code.png", children: [
                {label: "UNREAL ENGINE 4"},
                {label: "AFFINITY PHOTO"},
                {label: "AFFINITY DESIGNER"},
                {label: "BLENDER"}
              ]},
              {label: "WEB DEVELOPMENT", icon: "/icons/code.png", children: [
                {label: "JAVASCRIPT ES6+"},
                {label: "REACT"},
                {label: "REDUX"},
                {label: "CSS"},
                {label: "GIT"},
                {label: "WEBPACK"},
                {label: "ASP.NET CORE"},
              ]},
              {label: "PROGRAMMING", icon: "/icons/code.png", children: [
                {label: "C/C++"},
                {label: "SHELL"},
                {label: "JAVASCRIPT ES6+"},
                {label: "MICROCONTROLLERS"},
                {label: "MODDING"},
              ]}         
             
            ]}
          ]
        }}
      </TrenuSpa>
    )
  }
}