import React, { Component } from 'react';
import Trenu from './trenu';
import Header from './components/molecules/Header'


export default class App extends Component { 
  state = {
    trenu: React.createRef(),
    headerContent: []
  }

  
  constructor(props) {
    super(props);

    this.theme = brightTheme; //TODO: (this.props.dark)
  }


  componentDidMount() {
    const criticalPath = this.state.trenu.current.getCriticalPath().reverse();
    let headerContent = [];
    criticalPath.forEach((node, index) => {
      headerContent.push({node, expanding: false, collapsing: false, active: index == criticalPath.length - 1});
    })
    this.setState({headerContent});
  }


  //———————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // HANDLERS

  handleLabelClick = (node) => {
    this.state.trenu.current.changeActiveNode(node);
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
    let headerContent = [];
    for(let i = 0; i < this.state.headerContent.length; i++) {
      let skipInclude = false;
      for (let j = 0; j < pathToRoot.length; j++) {   
        if (this.state.headerContent[i].node === pathToRoot[j].node && !this.state.headerContent[i].collapsing) {
          pathToRoot[j].included = true;
          const active = (j === pathToRoot.length - 1);
          headerContent.push({node: pathToRoot[j].node, expanding: false, collapsing: false, active});
          skipInclude = true;
          break;
        }
      }
      if (!skipInclude && !this.state.headerContent[i].collapsing)
      headerContent.push({node: this.state.headerContent[i].node, expanding: false, collapsing: true, active: false});
    }    
    pathToRoot.forEach((el, index) => {
      const active = (index === pathToRoot.length - 1);
      if (!el.included) headerContent.push({node: el.node, expanding: true, collapsing: false, active});
    });    

    // update state
    this.setState({headerContent})
  }
  

  //———————————————————————————————————————————————————————————————————————————————————————————————————————————————

  render() {
    const theme = this.theme;

    return (
      <div style={{width: `100%`, height: `100%`, backgroundColor: theme.bg, ...this.props.style}}>

        <Header
          style={{backgroundColor: theme.header.bg, borderBottom: `1px solid ${theme.header.border}`}}
          labelStyle={{color: theme.header.text}}
          activeLabelStyle={{color: theme.header.activeText}}
          scrollbarTrackStyle={{backgroundColor: theme.header.scrollbar.track}}
          scrollbarThumbStyle={{backgroundColor: theme.header.scrollbar.thumb}}
          onLabelClick={this.handleLabelClick}
        >
          {this.state.headerContent}
        </Header>

        <Trenu
          ref={this.state.trenu}
          style={{width: `100%`, height: `100%`, paddingTop: `4em`, boxSizing: `border-box`}}
          canvasStyle={{backgroundColor: theme.trenu.bg, background: `url(bg-white.png)`, backgroundSize: `30em`}}
          nodeStyle={{backgroundColor: theme.trenu.node.bg, color: theme.trenu.node.text, fontSize: `1.5em`, border: `0.1em solid ${theme.trenu.node.border}`}}
          activeStyle={{backgroundColor: theme.trenu.active.bg, color: theme.trenu.active.text, border: `0.1em solid ${theme.trenu.active.border}`}}
          iconStyle={{opacity: 0.8}}
          contentWrapperTheme={theme.trenu.content}
          activeIconStyle={{opacity: 1}}
          labelStyle={{color: theme.trenu.text}}
          lineStyle={{backgroundImage: `linear-gradient(${theme.trenu.active.border}, ${theme.trenu.node.border})`}}
          nodeSize={100}
          lineWidth={2}
          maxLineLength={150}
          seedData={this.props.children}
          defaultAction={this.handleNodeClick}
        />

      </div>
    );
  }
}



const palette = {
  white: `#FFFFFF`,
  gray100: '#F7F8F9',
  gray200: '#E8EBEE',
  gray300: '#DDE1E6',
  gray400: '#CCD2DA',
  gray500: '#A8B2C0',
  gray600: '#617086',
  gray700: '#424D5C',
  gray800: '#303842',
  gray900: '#1E232A',
}


const brightTheme = {
  bg: palette.white,

  header: {
    bg: palette.white,
    activeText: palette.gray600,
    text: palette.gray500,
    border: palette.gray200,
    scrollbar: {
      track: palette.gray200,
      thumb: palette.gray600
    }
  },

  trenu: {
    bg: palette.white,
    text: palette.gray600,
    node: {
      bg: palette.gray600,
      text: palette.white,
      border: palette.gray600
    },
    active: {
      bg: palette.gray600,
      text: palette.white,
      border: palette.gray500
    },
    content: {
      bg: palette.white,
      text: palette.gray900,
      scrollbar: {
        track: palette.gray200,
        thumb: palette.gray600
      }
    }
  }
}