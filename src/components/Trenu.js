import React, { Component } from 'react'
import Canvas from './atoms/Canvas.js'
import Node from './atoms/Node.js'

export default class Trenu extends Component {
  constructor(props) {
    super(props);

    //generate data structure to work with (BFS)
    let root = {userData: props.root, parent: null, children: [], expanded: true, visible: true, height: 0};
    let nodes = [root];
    let queue = [];
    let maxHeight = 0;
    
    root.userData.children.forEach(child => {
      queue.push({userData: child, parent: root, children: [], expanded: false, visible: true, height: 1});
      root.children.push(queue[queue.length-1]);
      maxHeight = 1;
    });
    
    while (queue.length) {
      const node = queue.shift();
      nodes.push(node);
      if (node.userData.children) {
        node.userData.children.forEach((child) => {
          if (queue.indexOf(child) === -1) {
            queue.push({userData: child, parent: node, children: [], expanded: false, visible: false, height: node.height + 1});
            node.children.push(queue[queue.length-1]);
            if (node.height + 1 > maxHeight) maxHeight = node.height + 1;
          }
        });
      }
    }
    
    //depth -> height
    nodes.forEach((value, index, array) => {
      array[index].height = maxHeight - array[index].height;
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
      node.parent.visible = true;
      node.parent.children.forEach((value, index, array) => {
        array[index].visible = true;
      });

      this.setState({
        nodes: this.state.nodes,
        active: node.parent
      })
    }
  }


  render() {
    return (
      <div style={{...this.props.style, overflow: `hidden`}}>
        <Canvas>
          <Node
            onClick={this.handleClick}
            data={this.state.nodes[0]}
            scaling={this.props.scaling}
            span={100}
            active={this.state.active} 
            root={this.state.root}
            size={this.props.size}
          />
        </Canvas>
      </div>
    )
  }
}


