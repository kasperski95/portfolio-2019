import React, { Component } from 'react';
import Trenu from './trenu';
import Header from './components/molecules/Header'
import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';



const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[600]
    },
    secondary: {
      main: blueGrey[400]
    },
    text: {
      primary: blueGrey[600],
      secondary: blueGrey[300]
    }
  },
  typography: {
    useNextVariants: true,
  },
});



export default class App extends Component { 
  state = {
    trenu: React.createRef(),
    headerContent: []
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
    const MuiPalette = MuiTheme.palette;

    console.log(MuiTheme);
    

    const theme = {
      bg: MuiPalette.background.default,
    
      header: {
        bg: MuiPalette.background.paper,
        activeText: MuiPalette.text.primary,
        text: MuiPalette.text.secondary,
        border: MuiPalette.divider,
        scrollbar: {
          track: MuiPalette.secondary.main,
          thumb: MuiPalette.primary.main
        }
      },
    
      trenu: {
        bg: MuiPalette.background.default,
        text: MuiPalette.primary.main,
        node: {
          bg: MuiPalette.primary.main,
          text: MuiPalette.primary.contrastText,
          border: MuiPalette.primary.main,
        },
        active: {
          bg: MuiPalette.primary.main,
          text: MuiPalette.primary.contrastText,
          border: MuiPalette.primary.light,
        },
        empty: {
          bg:  MuiPalette.secondary.main,
          text:  MuiPalette.secondary.contrastText,
          border: MuiPalette.secondary.main,
        },
        content: {
          bg: MuiPalette.background.default,
          text: MuiPalette.text.primary,
          scrollbar: {
            track: MuiPalette.secondary.light,
            thumb: MuiPalette.primary.main
          }
        }
      }
    }

    const headerShadowStrength = 0.25;
    return (
      <MuiThemeProvider theme={MuiTheme}>
        <div style={{width: `100%`, height: `100%`, backgroundColor: theme.bg, ...this.props.style}}>
          <Header
            style={{backgroundColor: theme.header.bg, borderBottom: `1px solid ${theme.header.border}`,
              boxShadow: `0px 6px 6px -3px rgba(0,0,0,${0.2 * headerShadowStrength}),0px 10px 14px 1px rgba(0,0,0,${0.14 * headerShadowStrength}),0px 4px 18px 3px rgba(0,0,0,${0.12 * headerShadowStrength})`
          }}
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
            nodeStyle={{backgroundColor: theme.trenu.node.bg, color: theme.trenu.node.text, fontSize: `1.5em`, border: `0.1em solid ${theme.trenu.node.border}`,
            //boxShadow: `0px 6px 6px -3px rgba(0,0,0,${0.2 * headerShadowStrength}),0px 10px 14px 1px rgba(0,0,0,${0.14 * headerShadowStrength}),0px 4px 18px 3px rgba(0,0,0,${0.12 * headerShadowStrength})`
            }}
            activeStyle={{backgroundColor: theme.trenu.active.bg, color: theme.trenu.active.text, border: `0.1em solid ${theme.trenu.active.border}`}}
            emptyNodeStyle={{backgroundColor: theme.trenu.empty.bg, color: theme.trenu.empty.text, border: `0.1em solid ${theme.trenu.empty.border}`}}
            iconStyle={{opacity: 0.8}}
            contentWrapperTheme={theme.trenu.content}
            activeIconStyle={{opacity: 1}}
            labelStyle={{color: theme.trenu.text}}
            lineStyle={{backgroundImage: `linear-gradient(${theme.trenu.active.border}, ${theme.trenu.node.border})`}}
            lineToEmptyStyle={{backgroundImage: `linear-gradient(${theme.trenu.active.border}, ${theme.trenu.empty.border})`}}
            nodeSize={100}
            lineWidth={2}
            maxLineLength={150}
            seedData={this.props.children}
            defaultAction={this.handleNodeClick}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}



