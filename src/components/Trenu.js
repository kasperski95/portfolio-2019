import React, { Component } from 'react'
import Canvas from './atoms/Canvas.js'
import Node from './atoms/Node.js'

export default class Trenu extends Component {
  config = {
    size: this.props.nodeSize || 72,
    scale: this.props.scaling || 0.618,
    span: this.props.maxLineLength || 200,
    borderOffset: this.props.borderOffset || this.props.nodeSize/2 * 1.25,
    labelOffset: this.props.labelOffset || this.props.nodeSize/2 * 1.5,
    labelWidth: this.props.labelWidth || 72,
    lineWidth: this.props.lineWidth || 2,
    lineStyle: this.props.lineStyle,
    angle: 0
  }
  

  constructor(props) {
    super(props);

    const nodeObject = {
      userData: null,
      parent: null,
      children: [],
      expanded: false,
      visible: false,
      transforming: false,
      depth: -1,
      height: -1,
      ref: null
    }

    //generate data structure to work with (BFS)
    let root = {...nodeObject, userData: props.seedData, children: [], expanded: true, visible: true, depth: 0, ref: React.createRef()};
    let nodes = [root];
    let queue = [];
    let maxHeight = 0;
    
    root.userData.children.forEach(child => {
      queue.push({...nodeObject, userData: child, children: [], parent: root, visible: true, depth: 1, ref: React.createRef()});
      root.children.push(queue[queue.length-1]);
      maxHeight = 1;
    });
    
    while (queue.length) {
      const node = queue.shift();
      nodes.push(node);
      if (node.userData.children) {
        node.userData.children.forEach((child) => {
          if (queue.indexOf(child) === -1) {
            queue.push({...nodeObject, userData: child, children: [], parent: node, depth: node.depth + 1, ref: React.createRef()});
            node.children.push(queue[queue.length-1]);
            if (node.depth + 1 > maxHeight) maxHeight = node.depth + 1;
          }
        });
      }
    }
    
    // depth -> height
    nodes.forEach((value, index, array) => {
      array[index].height = maxHeight - array[index].depth;
    });

    this.state = {
      nodes,
      root,
      active: root,
      wrapper: {
        ref: React.createRef(),
        mounted: false,
        width: -1,
        height: -1
      },
      mouseOver: null,
      mouseOverLabel: '',
      mobileMode: false,
      animate: false
    }
  }


  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
    

  handleClick = (node, e) => {
    if (node.parent) {
      var animate = true;
      node.transforming = true;
    }
    
    if (node !== this.state.active) {
      //go deeper
      
      //hide all visible nodes except the pressed one
      this.state.active.children.forEach((value, index, array) => {	
        if (array[index] !== node) array[index].visible = false;
      });
      if (this.state.active !== node)
        this.state.active.visible = false; 
      node.expanded = true;
      node.children.forEach((value, index, array) => {
        array[index].visible = true;
      });

      this.setState({
        nodes: this.state.nodes,
        active: node,
        animate
      })
      
    } else if (node.parent) {
      //go higher
      node.expanded = false;
      
      node.parent.visible = true;
      node.parent.children.forEach((value, index, array) => {
        array[index].visible = true;
      });

      this.setState({
        nodes: this.state.nodes,
        active: node.parent,
        animate
      })
    }
    
    if (node.userData.action) {
      node.userData.action(node, e);
    }
  }


  handleMouseOver = (node, e) => {
    this.setState({mouseOver: node, mouseOverLabel: node.userData.label});
  }


  handleMouseLeave = (node, e) => {
    this.setState({mouseOver: null});
  }


  handleCollapsingComplete = (node) => {
    node.transforming = false;
    this.setState((prevState) => ({nodes: prevState.nodes}));
  }


  handleResize = (e) => {  
    const width = this.state.wrapper.ref.current.offsetWidth;
    const height = this.state.wrapper.ref.current.offsetHeight;
    const mobileMode = this.config.span * 2 + this.config.borderOffset + this.config.labelWidth * 2 > Math.min(width, height);

    this.setState((prevState) => ({
      wrapper: {
        ...prevState.wrapper,
        mounted: true,
        width,
        height
      },
      mobileMode,
      animate: false
    }));    

    this.forceUpdate();
  }


  includeContent = () => {
    if (this.state.wrapper.ref) {
      const opacity = this.state.mouseOver && this.state.mobileMode? 1 : 0;
      const transitionDelay = this.state.mouseOver? `1s` : `0s`;

      return (
        <React.Fragment>
          <h1 style={{...mobileTopBarStyle, opacity, transitionDelay}}>{this.state.mouseOverLabel}</h1>
          <Canvas animate={this.state.animate} focusOn={this.state.active} scaling={this.config.scale} nodeSize={this.config.size}>
            <Node
              style={this.props.nodeStyle}
              onClick={this.handleClick}
              onMouseOver={this.handleMouseOver}
              onMouseLeave={this.handleMouseLeave}
              onCollapsingComplete={this.handleCollapsingComplete}
              state={this.state.nodes[0]}
              active={this.state.active} 
              root={this.state.root}
              wrapper={this.state.wrapper}
              mobileMode={this.state.mobileMode}
              animate={this.state.animate}
              {...this.config}
            />
          </Canvas>
        </React.Fragment>
      )
    }
  }


  render() {       
    return (        
      <div ref={this.state.wrapper.ref}
        style={{...this.props.style,
          overflow: `hidden`,
          position: `relative`,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        {this.includeContent()}
      </div>
    )
  }
}


const mobileTopBarStyle = {
  width: `100%`,
  fontSize: `1.5em`,
  height: `1.5em`,
  position: `absolute`,
  top: `0`,
  marginTop: `0em`,
  fontWeight: `normal`,
  color: `gray`,
  transition: `0.2s all`,
  fontWeight: `normal`
}