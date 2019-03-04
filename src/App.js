import React, { Component } from 'react'
import TrenuSpa from './trenu-spa'
import Timeline from './components/pages/Timeline'
import Contact from './components/pages/Contact'

export default class App extends Component {
  render() {
    return (
      <TrenuSpa style={{minWidth: '300px', minHeight: '400px'}}>
        {{
          label: <React.Fragment>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></React.Fragment>,
          icon: "/icons/person.png",
          children: [
            {label: "TIMELINE", icon: "/icons/timeline.png", content: <Timeline/>},
            {label: "CONTACT", icon: "/icons/device-mobile.png", content: <Contact/>},
            {label: "SKILLS", icon: "/icons/tools.png", children: [
              {label: "ARTISTIC", icon: "/icons/bulb.png", children: [
                {label: "BLENDER (95% ↘)", icon: "/icons/blender.png"},
                {label: "AFFINITY PHOTO (90% →)", icon: "/icons/affinity-photo.png"},
                {label: "AFFINITY DESIGNER (90% ↗)", icon: "/icons/affinity-designer.png"},
                {label: "UNREAL ENGINE 4 (40% ↘)", icon: "/icons/ue4.png"},
                {label: "V-RAY (85% ↘)", icon: "/icons/v-ray.png"},
              ]},
              {label: "WEB DEVELOPMENT", icon: "/icons/web.png", children: [
                {label: "GIT (60% →)", icon: "/icons/git.png"},
                {label: "REACT (80% ↗)", icon: "/icons/react.png"},
                {label: "JAVASCRIPT ES6+ (90% ↗)", icon: "/icons/js.png"},
                {label: "REDUX (60% ↗)", icon: "/icons/redux.png"},
                {label: "CSS (85% ↗)", icon: "/icons/css.png"},
               
                {label: "MISC", icon: "/icons/misc.png"}
              ]},
              {label: "PROGRAMMING", icon: "/icons/code.png", children: [
                {label: "SHELL (65% ↘)", icon: "/icons/shebang.png"},
                {label: "MISC", icon: "/icons/misc.png"},
                {label: "GIT (60% →)", icon: "/icons/git.png"},
                {label: "MICROCONTROLLERS (40% ↗)", icon: "/icons/mcu.png"},
                {label: "C/C++ (80% ↘)", icon: "/icons/c++.png"},
                {label: "JAVASCRIPT ES6+ (90% ↗)", icon: "/icons/js.png"},
              ]}            
            ]}
          ]
        }}
      </TrenuSpa>
    )
  }
}