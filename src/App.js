import React, { Component } from 'react'
import TrenuSpa from './trenu-spa'
import timeline from './components/pages/timeline.js'
import Contact from './components/pages/Contact'
import Skill from './components/templates/Skill'
import skills from './components/pages/skills/index.js'
import color from '@material-ui/core/colors/lightBlue'
import Color from 'color'
import { createMuiTheme } from '@material-ui/core/styles'


const saturation = -0.7;
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
            {label: "TIMELINE", icon: "/icons/timeline.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={timeline} theme={theme}/>},
            {label: "CONTACT", icon: "/icons/contact.png", content: node => <Contact node={node} theme={theme}/>},
            {label: "SKILLS", icon: "/icons/tools.png", children: [
              {label: "ARTISTIC", icon: "/icons/bulb.png", children: [
                {label: "BLENDER", icon: "/icons/blender.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.blender} theme={theme}/>},
                {label: "AFFINITY PHOTO", mobileLabel: "A. PHOTO", icon: "/icons/affinity-photo.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.photo} theme={theme}/>},
                {label: "AFFINITY DESIGNER", mobileLabel: "A. DESIGNER", icon: "/icons/affinity-designer.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.designer} theme={theme}/>},
                {label: "UNREAL ENGINE 4", mobileLabel: "UE4", icon: "/icons/ue4.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.ue4} theme={theme}/>},
                {label: "MISC", icon: "/icons/misc.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.artisticMisc} theme={theme}/>},
              ]},
              {label: "WEB DEVELOPMENT", mobileLabel: "WEB", icon: "/icons/web.png", children: [
                {label: "GITHUB.COM", preventDefault: true, icon: "/icons/git.png", action: (node, active, e) => {window.open('https://github.com/kasperski95/', '_blank');}},
                {label: "JAVASCRIPT ES6+", mobileLabel: "JS", icon: "/icons/js.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.js} theme={theme}/>},
                {label: "REACT", icon: "/icons/react.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.react} theme={theme}/>},
                {label: "REDUX", icon: "/icons/redux.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.redux} theme={theme}/>},
                {label: "CSS", icon: "/icons/css.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.css} theme={theme}/>},
                {label: "MISC", icon: "/icons/misc.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.webMisc} theme={theme}/>}
              ]},
              {label: "PROGRAMMING", mobileLabel: "CODING", icon: "/icons/code.png", children: [
                {label: "GITHUB.COM", preventDefault: true, icon: "/icons/git.png", action: (node, active, e) => {window.open('https://github.com/kasperski95/', '_blank');}},
                {label: "JAVASCRIPT ES6+", mobileLabel: "JS", icon: "/icons/js.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.js} theme={theme}/>},
                {label: "SHELL", icon: "/icons/shebang.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.shell} theme={theme}/>},
                {label: "MICROCONTROLLERS", mobileLabel: "MCU", icon: "/icons/mcu.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.mcu} theme={theme}/>},
                {label: "C/C++", icon: "/icons/c++.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.cpp} theme={theme}/>},
                {label: "MISC", icon: "/icons/misc.png", content: (node, onNodeClick) => <Skill node={node} onNodeClick={onNodeClick} children={skills.programmingMisc} theme={theme}/>},
              ]}            
            ]}
          ]
        }}
      </TrenuSpa>
    )
  }
}