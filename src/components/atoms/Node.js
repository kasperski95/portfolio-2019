import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class Node extends Component {
  render() {
    let hiddenNodes = [];
    let tmp = this.props.active.parent;
    while (tmp) {
      hiddenNodes.push(tmp);
      tmp = tmp.parent;
    }
    
    const deadzone = this.props.size;
    const offset = this.props.offset || 0;
    const span = this.props.data.expanded? this.props.span : 0;
    const angle = this.props.angle || 0;
    const angleDelta = this.props.data.children? 2 * Math.PI / this.props.data.children.length : 0;
    const nodeOpacity = (!this.props.data.visible && hiddenNodes.indexOf(this.props.data) !== -1)? 0 : 1;
    const subtreeOpacity = (!this.props.data.visible && hiddenNodes.indexOf(this.props.data) === -1 && hiddenNodes.indexOf(this.props.data.parent) !== -1)? 0 : 1;
    const lineOpacity = this.props.data.visible && this.props.data !== this.props.active? 1 : 0;
     

    return (
      <Motion style={{nodeOpacity: spring(nodeOpacity), span: spring(span), subtreeOpacity: spring(subtreeOpacity), lineOpacity: spring(lineOpacity)}}>{interpolated => {
        const data = interpolated.span? (this.props.data.children || []) : [];
        const disabled = (0 < interpolated.span && interpolated.span < deadzone)? true : false;

        return (
          <React.Fragment>
            {/* THE LINE */}
            <div style={{
                position: `absolute`,
                top: `0px`,
                left: `0px`,
                width: `2px`,
                backgroundColor: `black`,
                height: `${Math.max(offset - deadzone/this.props.scaling/2 - deadzone/2, 0)}px`,
                transformOrigin: `0% 0%`,
                transform: `rotate(${-angle}rad) translate(-1px, ${deadzone/this.props.scaling/2}px)`,
                zIndex: `50`,
                opacity: `${interpolated.lineOpacity}`
              }}>
            </div>

            <div style={{...bigWrapper,
              width: `${this.props.size}px`,
              height: `${this.props.size}px`,
              top: `${Math.cos(angle) * offset}px`,
              left: `${Math.sin(angle) * offset}px`,
              transform: `translate(-50%, -50%) scale(${this.props.scaling})`,
              opacity: `${interpolated.subtreeOpacity}`
              }}
              >
              <div style={{...miniWrapper}}>
                


                {/* RECURENCE */}
                {data.map((value, index, array) => {
                  return (
                    <Node key={index}
                      data={array[index]}
                      onClick={this.props.onClick}
                      offset={interpolated.span}
                      angle={angleDelta * index}
                      disabled={disabled}
                      scaling={this.props.scaling}
                      span={this.props.span}
                      active={this.props.active}
                      root={this.props.root}
                      size={this.props.size}
                    />);
                })}

                {/* THE NODE */}
                <div style={{...nodeStyle, transform: `translate(-50%, -50%) scale(${1 / this.props.scaling})`, opacity: `${interpolated.nodeOpacity}`}}
                  onClick={(e) => {if(!this.props.disabled && this.props.data.visible) this.props.onClick(this.props.data, e)}}
                ></div>
              </div>
            </div>
          </React.Fragment>
      )}}</Motion>
    )
  }
}


const bigWrapper = {
  position: `absolute`,
  zIndex: `100`
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
  backgroundColor: `rgba(255,0,0,0.5)`,
  borderRadius: `50%`,
  position: `absolute`,
  top: `0`,
  left: `0`,
  zIndex: `100`
}