import React, { Component } from 'react'
import Canvas from './atoms/Canvas.js'
import Node from './atoms/Node.js'

export default class Trenu extends Component {
  constructor(props) {
    super(props);

    //generate data structure to work with (BFS)
    let root = {userData: props.root, parent: null};
    let nodes = [root];
    let queue = []; //consider implementation of real queue
    root.userData.children.forEach(child => {
      queue.push({userData: child, parent: nodes[0]});
    });
    
    while (queue.length) {
      const node = queue.shift()
      nodes.push(node);
      if (node.userData.children)
        node.userData.children.forEach(child => {
          if (queue.indexOf(child) === -1)
            queue.push({userData: child, parent: node});
        });
    }
    

    this.state = {
      nodes,
      active: root
    }
  }



  render() {
    return (
      <div style={{...this.props.style, overflow: `hidden`}}>
        <Canvas>
          <Node>
            <Node></Node>
            <Node></Node>
            <Node></Node>
          </Node>
        </Canvas>
      </div>
    )
  }
}


