import React, { Component } from 'react';
import { Spring, animated, interpolate } from 'react-spring/renderprops'
import './App.css';
import Trenu from './components/Trenu';
import Scrollbar from 'react-scrollbars-custom';

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
      scrollbarRef: React.createRef()
    }
  }


  handleNodeClick = (node, active, e) => {
    // accumulate all nodes in the path to root
    let pathToRoot = [{node: active, included: false}];
    let tmp = active.parent;
    while(tmp) {
      pathToRoot.push({node: tmp, included: false});
      tmp = tmp.parent;
    }
    pathToRoot.reverse();

    // determine animation & combine old and new labels
    let content = [];
    for(let i = 0; i < this.state.header.content.length; i++) {
      let skipInclude = false;
      for (let j = 0; j < pathToRoot.length; j++) {   
        if (this.state.header.content[i].node == pathToRoot[j].node && !this.state.header.content[i].collapsing) {
          pathToRoot[j].included = true;
          const active = (j == pathToRoot.length - 1);
          content.push({node: pathToRoot[j].node, expanding: false, collapsing: false, active});
          skipInclude = true;
          break;
        }
      }
      if (!skipInclude && !this.state.header.content[i].collapsing)
        content.push({node: this.state.header.content[i].node, expanding: false, collapsing: true, active: false});
    }    
    pathToRoot.forEach((el, index) => {
      const active = (index == pathToRoot.length - 1);
      if (!el.included) content.push({node: el.node, expanding: true, collapsing: false, active});
    });    

    // update state
    this.setState(prevState => ({header: {...prevState.header, content}}))
  }
  

  render() {
    const root = {
      icon: "/icons/person.svg",
      label: <React.Fragment>ARKADIUSZ <span style={{fontWeight: `bold`}}>KASPRZYK</span></React.Fragment>,
      children: [
        {label: "3D", icon: "/icons/cube.svg", children: [
          {label: "PROJECTS PROJECTS PROJECTS", value: 1, content: generateNodePage("test")},
          {label: "SKILLS", children: [{}, {}, {}]}
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
        <div style={headerStyle}>

          <Spring native reset from={{mix: 0}} to={{mix: 1}}>{i => (
        
            <Scrollbar ref={this.state.header.scrollbarRef}
              style={{width: '100%', height: '100%', padding: `0em 0.5em`}}
              trackXRenderer={
                props => {
                  const {elementRef, style, ...restProps} = props;
                  return <span {...restProps} style={{...style, backgroundColor: theme.tWhite}} ref={elementRef}/>
              }}
              thumbXRenderer={
                props => {
                  const {elementRef, style, ...restProps} = props;
                  return <div {...restProps} style={{...style, backgroundColor: `rgba(255,255,255,0.25)`}} ref={elementRef}/>
              }}
              contentRenderer={
                props => {           
                  const {elementRef, style, ...restProps} = props;
                  return <animated.div ref={elementRef} {...restProps} style={{...style, paddingTop: `1em`}}
                    scrollLeft={i.mix.interpolate(m => {
                      return 9999999999 /* just scroll Right */})}
                  />
            }}>
              {this.state.header.content.map((el, index) => {
                const display = (index == 0)? `none` : `inline-flex`;
                const from = (el.collapsing || (!el.collapsing && !el.expanding))? 1 : 0;
                const to = el.collapsing? 0 : 1;
                
                return (
                  <animated.span style={{display: `inline-flex`, alignItems: `center`}}>

                    {/* LINE */}
                    <animated.div style={{cursor: `default`, userSelect: `none`, display, alignItems: `center`, justifyContent: `center`, overflow: `hidden`,
                      width: i.mix.interpolate(t => `${(from*(1-t)+to*t)}em`),
                      opacity: i.mix.interpolate(t => `${(from*(1-t)+to*t) * 0.5}`)
                    }}>
                      |
                    </animated.div>

                    {/* LABEL */}
                    <animated.div style={{display: `inline-flex`, alignItems: `center`, overflow: `hidden`,
                      height: `2em`,
                      width: i.mix.interpolate(t => `${el.node.labelWidth * (from*(1-t)+to*t)}px`)
                    }}>
                      <animated.div style={{cursor: `default`, userSelect: `none`, textAlign: `right`,
                          marginLeft: i.mix.interpolate(t => `${-(1-(from*(1-t)+to*t)) * el.node.labelWidth}px`),
                          opacity: i.mix.interpolate(t => `${el.active? 1 : (from*(1-t)+to*t) * 0.5}`)
                        }}
                        onClick={(e) => {
                          this.state.trenu.current.handleExternalActiveChange(el.node, e);
                          this.handleNodeClick(el.node, el.node, e);
                      }}>
                        {el.node.userData.label}
                      </animated.div>
                    </animated.div>

                  </animated.span>
                )})}
              </Scrollbar>
            )}</Spring>
          </div>
        



        

        {/* TRENU */}
        <Trenu ref={this.state.trenu}
          style={{width: `100%`, height: `100%`, paddingTop: `4em`, boxSizing: `border-box`}}
          nodeStyle={{backgroundColor: theme.dark2, color: `white`, fontSize: `1.5em`, border: `0.125em solid white`}}
          activeLeafStyle={{background: `url(bg.svg)`, backgroundSize: `25em`}}
          nodeSize={100}
          lineStyle={{backgroundColor: `white`}}
          lineWidth={2}
          labelWidth={72}
          maxLineLength={200}
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