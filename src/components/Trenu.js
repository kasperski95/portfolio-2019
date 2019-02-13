import React, { Component } from 'react'
import Canvas from './atoms/Canvas.js'
import Node from './atoms/Node.js'

export default class Trenu extends Component {
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
    let root = {...nodeObject, userData: props.root, children: [], expanded: true, visible: true, depth: 0, ref: React.createRef()};
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
    
    //depth -> height
    nodes.forEach((value, index, array) => {
      array[index].height = maxHeight - array[index].depth;
    });

    this.state = {
      nodes,
      root,
      active: root
    }
  }


  handleClick = (node, e) => {
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
        active: node
      })
      
    } else if (node.parent) {
      //go higher
      node.expanded = false;
      node.transforming = true;
      node.parent.visible = true;
      node.parent.children.forEach((value, index, array) => {
        array[index].visible = true;
      });

      this.setState({
        nodes: this.state.nodes,
        active: node.parent
      })
    }
    
    if (node.userData.action) {
      node.userData.action(node, e);
    }
  }


  handleComplete = (node) => {
    node.transforming = false;
    this.setState({nodes: this.state.nodes});
  }


  render() {
    
    const scaling = this.props.scaling || 0.618;
    const size = this.props.nodeSize || 72;

    return (
      <div style={{...this.props.style,
        overflow: `hidden`,
        position: `relative`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`
        }}>
        <Canvas focusOn={this.state.active} scaling={scaling} nodeSize={size}>
          <Node
            style={this.props.nodeStyle}
            lineStyle={this.props.lineStyle}
            lineWidth={this.props.lineWidth}
            onClick={this.handleClick}
            onComplete={this.handleComplete}
            state={this.state.nodes[0]}
            scale={scaling}
            span={this.props.lineLength || 200}
            active={this.state.active} 
            root={this.state.root}
            size={size}
          />
        </Canvas>
      </div>
    )
  }
}