import React, { Component } from 'react';
import { Spring, animated, interpolate } from 'react-spring/renderprops'
import './App.css';
import Trenu from './components/Trenu';



const theme = {
  dark1: `#121212`,
  dark1b: `rgba(18,18,18,0.25)`,
  dark2: `#1B1B1B`,
  dark2b: `rgba(27,27,27,0.25)`,
  dark3: `#222222`,
  dark3b: `rgba(34,34,34,0.25)`,
  tWhite: `rgba(255,255,255,0.05)`,
  accent: `#7592F0`,
  marginX: `10%`
}



export default class App extends Component { 
  state = {
    trenu: React.createRef(),
    header: {
      content: [],
      transition: 1.0
    }
  }


  handleNodeClick = (node, active, e) => {
    // accumulate all nodes in the path to root
    let pathToRoot = [{node: active, bTransitioning: true}];
    let tmp = active.parent;
    while(tmp) {
      pathToRoot.push({node: tmp, bTransitioning: true});
      tmp = tmp.parent;
    }
    pathToRoot.reverse();
    
    // determine which labels shouldn't be animated
    for (let i = 0; i < pathToRoot.length; i++) {
      for (let j = 0; j < this.state.header.content.length; j++) {
        if (pathToRoot[i].node == this.state.header.content[j].node) {
          pathToRoot[i].bTransitioning = false;
          break;
        }
      }
    }

    this.setState({header: {content: pathToRoot}});
  }
  

  render() {
    const root = {
      icon: "/icons/person.svg",
      label: <React.Fragment>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></React.Fragment>,
      children: [
        {label: "3D", icon: "/icons/cube.svg", children: [
          {label: "PROJECTS PROJECTS PROJECTS", value: 1, content: generateNodePage("test")},
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

        {/* HEADER */}
        <div style={headerStyle}><div style={{width: `100%`, overflowX: `hidden`}}>{
          this.state.header.content.map((el, index) => {
            const display = (index == 0)? `none` : `inline-block`;
            return (
              <span>
                <Spring native from={{transition: 0}} to={{transition: this.state.header.transition}}>{i => ( // i(nterpolated props)
                  <React.Fragment>
                    <animated.div style={{cursor: `default`, userSelect: `none`, display}}>|</animated.div>
                    <animated.div style={{
                      width: `${el.node.labelWidth}px`, //i.transition.interpolate(t => `${el.node.labelWidth}px`),
                      display: `inline-block`,
                      overflow: `hidden`}}
                    >
                      <animated.div style={{cursor: `default`, userSelect: `none`, textAlign: `left`, marginLeft: `0%`}}
                        onClick={(e) => {
                          this.state.trenu.current.handleExternalActiveChange(el.node, e);
                          this.handleNodeClick(el.node, el.node, e);
                        }}>
                        {el.node.userData.label}
                      </animated.div>
                    </animated.div>
                  </React.Fragment>
                  )}
                </Spring>
              </span>
            )}
          )
        }</div></div>
        

        {/* TRENU */}
        <Trenu ref={this.state.trenu}
          style={{width: `100%`, height: `100%`, paddingTop: `4em`, boxSizing: `border-box`}}
          nodeStyle={{backgroundColor: theme.dark2, color: `white`, fontSize: `1.5em`, border: `0.125em solid white`}}
          activeLeafStyle={{background: `url(bg.svg)`, backgroundSize: `25em`}}
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
  backgroundColor: theme.dark1
}

const headerStyle = {
  width: `100%`,
  height: `4em`,
  backgroundColor: theme.tWhite,
  color: `white`,
  position: `absolute`,
  display: `flex`,
  boxSizing: `border-box`,
  alignItems: `center`,
  padding: `0em ${theme.marginX}`,
  zIndex: `100`,
  whiteSpace: `nowrap`,
  boxShadow: `0em 1em 1em rgba(0,0,0,0.01)`
}


function generateNodePage (content) {
  return (
  <div style={{
    boxSizing: `border-box`,
    width: `100%`,
    height: `100%`,
    color: `white`,
    fontSize: `1em`,
    padding: `5em ${theme.marginX}`,
  }}>
    lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor 
    lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor 
    lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor 
  </div>)
}