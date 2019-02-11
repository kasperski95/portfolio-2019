import React, { Component } from 'react'
import Canvas from './atoms/Canvas.js'
import Node from './atoms/Node.js'

export default class Trenu extends Component {
  constructor(props) {
    super(props);

    //generate data structure to work with (BFS)
    let root = {userData: props.root, parent: null, children: [], span: 100, opacity: 1};
    let nodes = [root];
    let queue = [];
    root.userData.children.forEach(child => {
      queue.push({userData: child, parent: root, children: [], span: 0, opacity: 1});
      root.children.push(queue[queue.length-1]);
    });
    
    while (queue.length) {
      const node = queue.shift();
      nodes.push(node);
      if (node.userData.children) {
        node.userData.children.forEach((child) => {
          if (queue.indexOf(child) === -1) {
            queue.push({userData: child, parent: node, children: [], span: 0, opacity: 1});
            node.children.push(queue[queue.length-1]);
          }
        });
      }
    }
    
    this.state = {
      nodes,
      active: root
    }
  }


  handleClick = (node, e) => {
		e.stopPropagation();

		this.state.active.children.forEach((value, index, array) => {	
			if (array[index] != node) array[index].opacity = 0;
    });
    if (this.state.active != node)
		  this.state.active.opacity = 0; 

    if (node.span == 0) {
      node.span = 100;
      node.children.forEach((value, index, array) => {
        array[index].opacity = 1;
      });

      this.setState({
        nodes: this.state.nodes,
        active: node
      })
    } else {
      node.span = 0;

      if (node.parent) {
        node.parent.opacity = 1;
        node.parent.children.forEach((value, index, array) => {
          array[index].opacity = 1;
        });
      }

      this.setState({
        nodes: this.state.nodes,
        active: node.parent || node
      })
    }
	
  }


  render() {
    return (
      <div style={{...this.props.style, overflow: `hidden`}}>
        <Canvas>
          <Node data={this.state.nodes[0]} onClick={this.handleClick} />
        </Canvas>
      </div>
    )
  }
}


