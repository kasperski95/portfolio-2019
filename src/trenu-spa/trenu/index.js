import React, { Component } from 'react'
import Canvas from './components/molecules/Canvas'
import Node from './components/molecules/Node'

export default class Trenu extends Component {
  config = {
    size: this.props.nodeSize || 72,
    scale: this.props.scaling || 0.618,
    span: this.props.maxLineLength || 200,
    borderOffset: this.props.borderOffset || this.props.nodeSize/2 * 1.25,
    labelOffset: this.props.labelOffset || this.props.nodeSize/2 * 1.5,
    labelStyle: this.props.labelStyle,
    iconStyle: this.props.iconStyle,
    activeIconStyle: this.props.activeIconStyle,
    nodeStyle: this.props.nodeStyle,
    activeStyle: this.props.activeStyle,
    labelWidth: this.props.labelWidth || 72,
    lineWidth: this.props.lineWidth || 2,
    lineStyle: this.props.lineStyle,
    activeLeafStyle: this.props.activeLeafStyle,
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
      ref: null,
      labelDummyRef: null,
      labelWidth: 0
    }

    //generate data structure to work with (BFS)
    let root = {...nodeObject, userData: props.seedData, children: [], expanded: true, visible: true, depth: 0, ref: React.createRef(), labelDummyRef: React.createRef()};
    let nodes = [root];
    let queue = [];
    let maxHeight = 0;
    
    root.userData.children.forEach(child => {
      queue.push({...nodeObject, userData: child, children: [], parent: root, visible: true, depth: 1, ref: React.createRef(), labelDummyRef: React.createRef()});
      root.children.push(queue[queue.length-1]);
      maxHeight = 1;
    });
    
    while (queue.length) {
      const node = queue.shift();
      nodes.push(node);
      if (node.userData.children) {
        node.userData.children.forEach((child) => {
          if (queue.indexOf(child) === -1) {
            queue.push({...nodeObject, userData: child, children: [], parent: node, depth: node.depth + 1, ref: React.createRef(), labelDummyRef: React.createRef()});
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

    this.state.nodes.forEach(node => {     
      node.labelWidth = node.labelDummyRef.current.offsetWidth;
    })
    this.setState({nodes: this.state.nodes});

    this.handleResize();
  }
   
  
  getRootNode() {
    return this.state.root;
  }


  handleExternalActiveChange = (newActive, e) => {
    // collapse and hide all nodes
    this.state.nodes.forEach(node => {node.expanded = false; node.visible = false;});
    this.state.active.transforming = true;

    // expand all parents
    let tmp = newActive.parent;
    while (tmp) {
      tmp.expanded = true;
      tmp = tmp.parent;
    }

    // expand and show node
    newActive.expanded = true;
    newActive.visible = true;
    newActive.transforming = true;
    newActive.children.forEach(node => {node.visible = true;});

    // update state
    this.setState({nodes: this.state.nodes, active: newActive, animate: true});
  }


  handleClick = (node, e) => {
    let active = this.state.active;

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

      active = node;
      this.setState({
        nodes: this.state.nodes,
        active,
        animate
      })
      
    } else if (node.parent) {
      //go higher
      node.expanded = false;
      
      node.parent.visible = true;
      node.parent.children.forEach((value, index, array) => {
        array[index].visible = true;
      });

      active = node.parent;
      this.setState({
        nodes: this.state.nodes,
        active,
        animate
      })
    }
    
    // users action
    if (node.userData.action) {
      node.userData.action(node, active, e);
    } else if (this.props.defaultAction) {
      this.props.defaultAction(node, active, e);
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
    const style = window.getComputedStyle(this.state.wrapper.ref.current);
    const width = parseInt(style.getPropertyValue("width")) - parseInt(style.getPropertyValue("padding-left") || 0) - parseInt(style.getPropertyValue("padding-right") || 0);
    const height = parseInt(style.getPropertyValue("height")) - parseInt(style.getPropertyValue("padding-top") || 0) - parseInt(style.getPropertyValue("padding-bottom") || 0);        

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
      return (
        <React.Fragment>
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

        {/* DETERMINE LABELS WIDTH */}
        <div style={{visibility: `hidden`, position: `absolute`}}>
          {this.state.nodes.map((node, index) => (
            <span style={{whiteSpace: `nowrap`}} ref={node.labelDummyRef} key={index}>{node.userData.label}</span>
          ))}
        </div>

        {/* CORE */}
        {this.includeContent()}
      </div>
    )
  }
}


