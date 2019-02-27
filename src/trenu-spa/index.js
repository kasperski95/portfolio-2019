import React, { Component } from 'react';
import Trenu from './trenu';
import Header from './components/molecules/Header'


export default class App extends Component { 
  state = {
    trenu: React.createRef(),
    header: {
      content: [],
      scrollbarRef: React.createRef()
    }
  }


  componentDidMount() {
    const root = this.state.trenu.current.getRootNode();
    this.setState(prevState => ({
      header: {...prevState.header, content: [{node: root, expanding: false, collapsing: false, active: true}]}
    }))
  }


  //———————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // HANDLERS

  handleLabelClick = (node) => {
    this.state.trenu.current.handleExternalActiveChange(node);
		this.handleNodeClick(node, node);
  }


  handleNodeClick = (node, active) => {
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
  

  //———————————————————————————————————————————————————————————————————————————————————————————————————————————————

  render() {
    return (
      <div style={style.app}>

        <Header
          style={{backgroundColor: theme.b3, ...this.props.headerStyle}}
          scrollbarTrackStyle={{backgroundColor: theme.c1}}
          scrollbarThumbStyle={{backgroundColor: theme.c2}}
          onLabelClick={this.handleLabelClick}
        >
          {this.state.header.content}
        </Header>

        <Trenu
          ref={this.state.trenu}
          style={{width: `100%`, height: `100%`, paddingTop: `4em`, boxSizing: `border-box`}}
          nodeStyle={{backgroundColor: theme.b2, color: theme.c2, fontSize: `1.5em`, border: `0.1em solid ${theme.c2}`}}
          activeStyle={{backgroundColor: theme.b3, border: `0.1em solid ${theme.c3}`}}
          iconStyle={{opacity: 0.75}}
          activeIconStyle={{opacity: 1}}
          labelStyle={{color: theme.c2}}
          activeLeafStyle={{background: `url(bg.svg)`, backgroundSize: `25em`}}
          nodeSize={100}
          lineStyle={{backgroundImage: `linear-gradient(${theme.c3}, ${theme.c2})`}}
          lineWidth={2}
          labelWidth={72}
          maxLineLength={200}
          seedData={this.props.children}
          defaultAction={this.handleNodeClick}
        />

      </div>
    );
  }
}



let theme = {
  b1: `#121212`,
  c1: `#666666`,
  b2: `#1B1B1B`,
  c2: `#AAAAAA`,
  b3: `#222222`,
  c3: `#FFFFFF`
}

const style = {
  app: {
    width: `100%`,
    height: `100%`,
    backgroundColor: theme.b1
  }
}