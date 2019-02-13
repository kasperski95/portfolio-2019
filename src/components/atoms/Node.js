import React, { Component } from 'react'
import { Spring, animated, interpolate } from 'react-spring/renderprops'

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
    let subtrees = node.expanded || node.transforming? (node.children || []) : [];

    return (
      <Spring
        native 
        from={{
          offset: 0,
          nodeOpacity: 1,
          subtreeOpacity: 1,
          lineOpacity: 1,
          angle: (node.depth > 1)? (this.props.initialAngle || 0) : angle
        }}
        to={{
          offset,
          nodeOpacity: opacity.node,
          subtreeOpacity: opacity.subtree,
          lineOpacity: opacity.line,
          angle
        }}
        onRest={() => {if (this.props.onComplete && node.transforming) this.props.onComplete(node)}}
        >{i => { // i(nterpolated props)
          //const subtrees = (i.span > 1)? (node.children || []) : [];
          
          //const disabled = (0 < i.span && i.span < size)? true : false;

          return (
            <React.Fragment>
              {/* THE LINE */}
              <animated.div style={{            
                  backgroundColor: `black`,
                  ...this.props.lineStyle,
                  width: `${this.props.lineWidth || 2}px`,
                  position: `absolute`,
                  top: `0px`,
                  left: `0px`,
                  height: i.offset.interpolate(o => `${Math.max(o - size/scale/2 - size/2, 0)}px`),
                  transformOrigin: `0% 0%`,
                  transform: i.angle.interpolate(a => `rotate(${a + Math.PI}rad) translate(-${this.props.lineWidth/2 || 1}px, ${size/scale/2}px)`),
                  zIndex: `50`,
                  opacity: i.lineOpacity.interpolate(o => `${o}`)
                }}>
              </animated.div>
              
              {/* POSITION RELATIVE TO PARENT */}
              <animated.div style={{...bigWrapper,
                top: interpolate([i.offset, i.angle], (o,a) => `${-Math.cos(-a) * o}px`),
                left: interpolate([i.offset, i.angle], (o,a) => `${-Math.sin(-a) * o}px`),
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: i.subtreeOpacity.interpolate(o => `${o}`)
                }}
                >



                  {/* RECURENCE */}
                  {subtrees.map((value, index, array) => {
                    let childAngle = (angleDelta * index + angleDelta/2);
                    
                    // minimize rotation
                    if (childAngle < angle - Math.PI) childAngle += 2 * Math.PI;
                    if (childAngle > angle + Math.PI) childAngle -= 2 * Math.PI;
                    
                    return (
                      <Node
                        {...this.props}
                        key={index}
                        state={array[index]}
                        offset={span}
                        angle={childAngle}
                        initialAngle={angle}        
                      />);
                  })}

                  {/* THE NODE */}
                  <animated.div style={{...nodeDefaultStyle, borderRadius: `${size}px`, ...this.props.style, ...nodeStyle,
                    width: `${size}px`, height: `${size}px`,
                    transform: `translate(-50%, -50%) scale(${1 / scale})`, opacity: i.nodeOpacity.interpolate(o => `${o}`)}}
                    onClick={(e) => {if(node.visible) this.props.onClick(node, e)}}
                    ref={node.ref}
                  >{node.userData.value}</animated.div>

              </animated.div>
            </React.Fragment>
      )}}</Spring>
    )
  }
}

// position relative to parent
const bigWrapper = {
  width: `0px`,
  height: `0px`,
  position: `absolute`,
  zIndex: `100`
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