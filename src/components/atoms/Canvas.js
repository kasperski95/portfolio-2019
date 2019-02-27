import React, { Component } from 'react'
import { Spring, animated, interpolate } from 'react-spring/renderprops'

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
        x -= (node.ref.current.parentNode.offsetLeft * scaling**node.depth);    
        y -= (node.ref.current.parentNode.offsetTop * scaling**node.depth);
        node = node.parent;
      }
    }
    
    return (
      <Spring immediate={!this.props.animate} native to={{x, y, scale}}>{i => (
        <React.Fragment>
          <animated.div style={{...canvasBgStyle,
            transform: interpolate([i.x, i.y, i.scale], (ix, iy, is) => `translate(${ix * is}px, ${iy * is}px) scale(${is})`)}}>
          </animated.div>
          <animated.div style={{...canvasStyle,
            transform: interpolate([i.x, i.y, i.scale], (ix, iy, is) => `translate(${ix * is}px, ${iy * is}px) scale(${is})`)}}>
            {this.props.children}
          </animated.div>
        </React.Fragment>
      )}
      </Spring>
    )
  }
}



const canvasStyle = {
  position: `relative`,
  width: `0%`,
  height: `0%`
}

const canvasBgStyle = {
  width: `1000%`,
  height: `1000%`,
  position: `absolute`,
  background: `url(bg.png)`,
  backgroundSize: `25em`
}