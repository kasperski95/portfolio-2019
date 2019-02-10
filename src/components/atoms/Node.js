import React, { Component } from 'react'

export default class Node extends Component {
  render() {
    const offset = this.props.offset || 0;
    const angle = this.props.angle || 0;

    let angleDelta = 0;
    
    if (this.props.children) {
      angleDelta = 2 * Math.PI / this.props.children.length;
    }

    return (
      <div style={{...nodeStyle,
        top: `${Math.cos(angle) * offset}px`,
        left: `${Math.sin(angle) * offset}px`
      }}>
        <div style={{...childrenWrapperStyle}}>
          {React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {offset: -100, angle: angleDelta * index});
          })}
        </div>
      </div>
    )
  }
}

const nodeStyle = {
  width: `2em`,
  height: `2em`,
  backgroundColor: `red`,
  borderRadius: `50%`,
  position: `absolute`,
  transform: `translate(-50%, -50%)`
}

const childrenWrapperStyle = {
  position: `relative`,
  width: `100%`,
  height: `100%`,
  transform: `translate(50%, 50%)`
}