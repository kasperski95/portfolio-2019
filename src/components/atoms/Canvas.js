import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class Canvas extends Component {
  render() {
    const focused = this.props.focusOn;
    const scaling = this.props.scaling;
    const scale = 1 / scaling**focused.depth;
    let x = 0;
    let y = 0;

    // find out where is active node relative to canvas
    if(focused.ref.current) {
      let node = focused;
      while(node) {
        x -= (node.ref.current.parentNode.parentNode.offsetLeft * scaling**node.depth);    
        y -= (node.ref.current.parentNode.parentNode.offsetTop * scaling**node.depth);
        node = node.parent;
      }
    }

    return (
      <Motion style={{x: spring(x), y: spring(y), scale: spring(scale)}}>{i => (
        <div style={{...canvasStyle,
          transform: `translate(${i.x * i.scale}px, ${i.y * i.scale}px) scale(${i.scale})`}}>
          {this.props.children}
        </div>
      )}
      </Motion>
    )
  }
}


const canvasStyle = {
  position: `relative`,
  width: `0px`,
  height: `0px`
}