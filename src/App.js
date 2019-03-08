import React, { Component } from 'react'
import TrenuSpa from './trenu-spa'
import Timeline from './components/pages/Timeline'
import Contact from './components/pages/Contact'
import Skill from './components/templates/Skill'
import skills from './components/pages/skills'
import color from '@material-ui/core/colors/lightBlue'
import Color from 'color'
import { createMuiTheme } from '@material-ui/core/styles'


const saturation = -0.65;
const hue = 215;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Color(color[600]).saturate(saturation).hue(hue).hex()
    },
    secondary: {
      main: Color(color[200]).saturate(saturation).hue(hue).hex()
    },
    text: {
      primary: '#000000',
      secondary: Color(color[500]).saturate(saturation).hue(hue).hex()
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
                {label: "SHELL", icon: "/icons/shebang.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.shell} theme={theme}/>},
                {label: "MISC", icon: "/icons/misc.png"},
                {label: "GIT", icon: "/icons/git.png"},
                {label: "MICROCONTROLLERS", icon: "/icons/mcu.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.mcu} theme={theme}/>},
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