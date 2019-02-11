import React, { Component } from 'react'

export default class Node extends Component {
  render() {
    const offset = this.props.offset || 0;
    const span = this.props.data.span || 0;
    const angle = this.props.angle || 0;
    const data = span? (this.props.data.children || []) : [];
    let angleDelta = 0;
    if (this.props.data.children)
      angleDelta = 2 * Math.PI / this.props.data.children.length;

    return (
      <div style={{...bigWrapper,
        top: `${Math.cos(angle) * offset}px`,
        left: `${Math.sin(angle) * offset}px`,
        backgroundColor: `blue`
        }}
        >

        <div style={{...miniWrapper}}>

          <div style={{...nodeStyle, opacity: `${this.props.data.opacity}`}}
            onClick={(e) => {this.props.onClick(this.props.data, e)}}
          ></div>

          {data.map((value, index, array) => {
            return (<Node key={index} data={array[index]} onClick={this.props.onClick} offset={span} angle={angleDelta * index}/>);
          })}

        </div>

      </div>
    )
  }
}


const bigWrapper = {
  width: `2em`,
  height: `2em`,
  position: `absolute`,
  transform: `translate(-50%, -50%)`
}

// reference point for children
const miniWrapper = {
  position: `relative`,
  width: `100%`,
  height: `100%`,
  transform: `translate(50%, 50%)`
}

const nodeStyle = {
  width: `100%`,
  height: `100%`,
  backgroundColor: `red`,
  borderRadius: `50%`,
  transform: `translate(-50%, -50%)`
}