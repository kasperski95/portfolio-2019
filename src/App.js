import React, { Component } from 'react'
import TrenuSpa from './trenu-spa'
import Projects3D from './components/pages/Projects3D'

export default class App extends Component {
  render() {
    return (
      <TrenuSpa dark>
        {{
          label: <React.Fragment>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></React.Fragment>,
          icon: "/icons/person.png",
          children: [
            {label: "3D", icon: "/icons/cube.png", children: [
            {label: "PROJECTS PROJECTS PROJECTS", value: 1, content: <Projects3D/>},
              {label: "SKILLS", children: [{}, {}, {}]}
            ]},
            {label: "CONTACT", icon: "/icons/device-mobile.png", children: [
              {label: "790588598"},
              {label: "CONTACT@ARKADIUSZKASPRZYK.PL"},
              {label: "LINKEDIN"},
            ]},
            {label: "TIMELINE", icon: "/icons/timeline.png"},
            {label: "IT", icon: "/icons/code.png", children: [
              {label: "PROJECTS"},
              {label: "SKILLS"}
            ]}
          ]
        }}
      </TrenuSpa>
    )
  }
}