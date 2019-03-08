import React, { Component } from 'react'
import TrenuSpa from './trenu-spa'
import Timeline from './components/pages/Timeline'
import Contact from './components/pages/Contact'
import Skill from './components/templates/Skill'
import skills from './components/pages/skills'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { createMuiTheme } from '@material-ui/core/styles'



const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[600]
    },
    secondary: {
      main: blueGrey[200]
    },
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[500]
    }
  },
  typography: {
    useNextVariants: true,
  },
});



export default class App extends Component {
  render() {
    
    return (
      <TrenuSpa theme={theme} style={{minWidth: '300px', minHeight: '550px'}}>
        {{
          label: <React.Fragment>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></React.Fragment>,
          icon: "/icons/person.png",
          children: [
            {label: "TIMELINE", icon: "/icons/timeline.png", content: node => <Timeline node={node} />},
            {label: "CONTACT", icon: "/icons/contact.png", content: node => <Contact node={node} theme={theme}/>},
            {label: "SKILLS", icon: "/icons/tools.png", children: [
              {label: "ARTISTIC", icon: "/icons/bulb.png", children: [
                {label: "BLENDER", icon: "/icons/blender.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.blender} theme={theme}/>},
                {label: "AFFINITY PHOTO", icon: "/icons/affinity-photo.png"},
                {label: "AFFINITY DESIGNER", icon: "/icons/affinity-designer.png"},
                {label: "UNREAL ENGINE 4", icon: "/icons/ue4.png"},
                {label: "V-RAY", icon: "/icons/v-ray.png"},
              ]},
              {label: "WEB DEVELOPMENT", icon: "/icons/web.png", children: [
                {label: "GIT", icon: "/icons/git.png"},
                {label: "REACT", icon: "/icons/react.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.react} theme={theme}/>},
                {label: "JAVASCRIPT ES6+", icon: "/icons/js.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.js} theme={theme}/>},
                {label: "REDUX", icon: "/icons/redux.png"},
                {label: "CSS", icon: "/icons/css.png"},    
                {label: "MISC", icon: "/icons/misc.png"}
              ]},
              {label: "PROGRAMMING", icon: "/icons/code.png", children: [
                {active: true, label: "SHELL", icon: "/icons/shebang.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.shell} theme={theme}/>},
                {label: "MISC", icon: "/icons/misc.png"},
                {label: "GIT", icon: "/icons/git.png"},
                {label: "MICROCONTROLLERS", icon: "/icons/mcu.png"},
                {label: "C/C++", icon: "/icons/c++.png"},
                {label: "JAVASCRIPT ES6+", icon: "/icons/js.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.js} theme={theme}/>},
              ]}            
            ]}
          ]
        }}
      </TrenuSpa>
    )
  }
}