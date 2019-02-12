import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class Node extends Component {
  render() {
    // nodes from active.parent to root
    let criticalPath = [];
    {
      let tmp = this.props.active.parent;
      while (tmp) {
        criticalPath.push(tmp);
        tmp = tmp.parent;
      }
    }
    
    // init
    const node = this.props.state;
    const size = this.props.size || 72;
    const scale = this.props.scale || 0.618;
    const angle = this.props.angle || 0;
    const offset = this.props.offset / scale; // parent's span
    const span = node.expanded? this.props.span : 0;
    const angleDelta = node.children? (2 * Math.PI / node.children.length) : 0;
    const opacity = { // tricky part - determining wheteher to hide node or tree
      node: (!node.visible && criticalPath.indexOf(node) !== -1)? 0 : 1,
      subtree: (!node.visible && criticalPath.indexOf(node) === -1 && criticalPath.indexOf(node.parent) !== -1)? 0 : 1,
      line: (node.visible && node !== this.props.active)? 1 : 0
    }

    return (
      <Motion 
        defaultStyle={{
          span: 0,
          nodeOpacity: 1,
          subtreeOpacity: 1,
          lineOpacity: 1,
          angle: 0
        }}
        style={{
          span: spring(span),
          nodeOpacity: spring(opacity.node),
          subtreeOpacity: spring(opacity.subtree),
          lineOpacity: spring(opacity.line),
          angle: spring(angle)
        }}>{i => { // i(nterpolated)
          const subtrees = (i.span > 1)? (node.children || []) : [];
          const disabled = (0 < i.span && i.span < size)? true : false;

          return (
            <React.Fragment>
              {/* THE LINE */}
              <div style={{            
                  backgroundColor: `black`,
                  ...this.props.lineStyle,
                  width: `${this.props.lineWidth || 2}px`,
                  position: `absolute`,
                  top: `0px`,
                  left: `0px`,
                  height: `${Math.max(offset - size/scale/2 - size/2, 0)}px`,
                  transformOrigin: `0% 0%`,
                  transform: `rotate(${i.angle + Math.PI}rad) translate(-${this.props.lineWidth/2 || 1}px, ${size/scale/2}px)`,
                  zIndex: `50`,
                  opacity: `${i.lineOpacity}`
                }}>
              </div>
              
              {/* POSITION RELATIVE TO PARENT */}
              <div style={{...bigWrapper,
                width: `${size}px`,
                height: `${size}px`,
                top: `${-Math.cos(-i.angle) * offset}px`,
                left: `${-Math.sin(-i.angle) * offset}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: `${i.subtreeOpacity}`
                }}
                >

                {/* REFERENCE POINT FOR NODES */}
                <div style={miniWrapper}>

                  {/* RECURENCE */}
                  {subtrees.map((value, index, array) => {
                    return (
                      <Node
                        {...this.props}
                        key={index}
                        state={array[index]}
                        offset={i.span}
                        angle={angleDelta * index + angleDelta/2}
                        disabled={disabled}        
                      />);
                  })}

                  {/* THE NODE */}
                  <div style={{...nodeDefaultStyle, borderRadius: `${size}px`, ...this.props.style, ...nodeStyle, transform: `translate(-50%, -50%) scale(${1 / scale})`, opacity: `${i.nodeOpacity}`}}
                    onClick={(e) => {if(!this.props.disabled && node.visible) this.props.onClick(node, e)}}
                    ref={node.ref}
                  >{node.userData.value}</div>
                </div>
              </div>
            </React.Fragment>
      )}}</Motion>
    )
  }
}

// position relative to parent
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

const nodeDefaultStyle = {
  width: `100%`,
  height: `100%`,
  backgroundColor: `rgba(255,0,0,0.5)`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  cursor: `default`,
  userSelect: `none`
}

const nodeStyle = {
  position: `absolute`,
  top: `0`,
  left: `0`,
  zIndex: `100`
}