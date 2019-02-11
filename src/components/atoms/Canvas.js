import React, { Component } from 'react'

export default class Canvas extends Component {
  render() {
    return (
      <div style={{...canvasStyle,
        transform: `translate(${this.props.x || 0}px, ${this.props.y || 0}px) scale(${this.props.scale || 1})`}}>
        {this.props.children}
      </div>
    )
  }
}

const canvasStyle = {
  position: `relative`,
  width: `5px`,
  height: `5px`,
  marginTop: `50%`,
  marginLeft: `50%`,
  backgroundColor: `green`
}