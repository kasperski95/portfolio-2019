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
    const size = this.props.size;
    const borderOffset = this.props.borderOffset;
    const scale = this.props.scale;
    const angle = this.props.angle;

    const labelOffset = this.props.labelOffset / scale;
    const span = node.expanded? this.props.span : 0;
    const angleDelta = node.children? (2 * Math.PI / node.children.length) : 0;
    const labelWidth = this.props.labelWidth / scale;
    
    const opacity = {
      node: (!node.visible && criticalPath.indexOf(node) !== -1)? 0 : 1,
      subtree: (!node.visible && criticalPath.indexOf(node) === -1 && criticalPath.indexOf(node.parent) !== -1)? 0 : 1,
      line: (node.visible && node !== this.props.active)? 1 : 0,
      label: (node.expanded || (node.parent && !node.parent.expanded) || this.props.mobileMode)? 0 : 1
    }

    // responsive parent's span
    const minDimension = Math.min(this.props.wrapper.width, this.props.wrapper.height);
    const offset = this.props.mobileMode? Math.min(this.props.offset/scale, minDimension/scale/2 - size/2 - (borderOffset-size/2)) : (this.props.offset/scale); 

    // label placement
    let labelRightOffset = 0;
    let labelBottomOffset = 0;
    let labelTextAlign = `center`;
    let labelAlignItems = `center`;
    // normalizing angle for determining label placement
    {
      let tmpAngle = angle;
      if (tmpAngle < 0) tmpAngle += 2 * Math.PI;
      if (tmpAngle > 2 * Math.PI) tmpAngle -= 2 * Math.PI;
      if (tmpAngle < Math.PI) {labelRightOffset = labelOffset; labelTextAlign = `flex-start`;}  // right
      if (tmpAngle > Math.PI) {labelRightOffset = -labelOffset; labelTextAlign = `flex-end`;}   // left
      if (tmpAngle == Math.PI) {labelBottomOffset = labelOffset; labelAlignItems = `bottom`;}   // bottom
    }

    const children = node.expanded || node.transforming? (node.children || []) : [];
    
    // node -> page
    let width = size;
    let height = size;
    let borderRadius = size;
    if (children.length == 0 && node == this.props.active) {
      width = this.props.wrapper.width;
      height = this.props.wrapper.height;
      borderRadius = 0;
    }

    return (
      <Spring
        native 
        immediate={!this.props.animate}
        from={{
          offset: 0,
          nodeOpacity: 1,
          subtreeOpacity: 1,
          lineOpacity: 1,
          labelOpacity: 0,
          angle: (node.depth > 1)? (this.props.initialAngle || 0) : angle,
          width: this.props.size,
          height: this.props.size
        }}
        to={{
          offset,
          nodeOpacity: opacity.node,
          subtreeOpacity: opacity.subtree,
          lineOpacity: opacity.line,
          labelOpacity: opacity.label,
          angle,
          width,
          height
        }}
        onRest={() => {
          if (this.props.onCollapsingComplete && node.transforming) this.props.onCollapsingComplete(node)
        }}
        >{i => { // i(nterpolated props)

          return (
            <React.Fragment>
              {/* THE LINE */}
              <animated.div style={{            
                  backgroundColor: `black`,
                  ...this.props.lineStyle,
                  width: `${this.props.lineWidth / scale || 2 / scale}px`,
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
              <animated.div style={{...wrapperStyle,
                top: interpolate([i.offset, i.angle], (o,a) => `${-Math.cos(-a) * o}px`),
                left: interpolate([i.offset, i.angle], (o,a) => `${-Math.sin(-a) * o}px`),
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: i.subtreeOpacity.interpolate(o => `${o}`)
                }}
                >

                  {/* RECURENCE */}
                  {children.map((value, index, array) => {
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

                  
                  {/* LABEL */}
                  <animated.div style={{
                    width: `0`,
                    height: `0`,
                    position: `absolute`,
                    top: `${labelBottomOffset}px`,
                    left: `${labelRightOffset}px`,
                    display: `flex`,
                    alignItems: labelAlignItems,
                    justifyContent: labelTextAlign,
                    transform: `scale(${1/scale})`,
                    opacity: i.labelOpacity.interpolate(o => `${o}`)
                  }}>
                    <span style={{whiteSpace: `nowrap`, color: `white`, fontSize: `${1/scale}em`}}>{node.userData.label}</span>
                  </animated.div>

                  {/* THE NODE */}
                  <animated.div style={{...nodeDefaultStyle, borderRadius: `${borderRadius}px`, ...this.props.style, ...nodeStyle,
                    width: i.width.interpolate(w => `${w}px`),
                    height: i.height.interpolate(h => `${h}px`),
                    backgroundImage: `url(${node.userData.icon})`,
                    transform: `translate(-50%, -50%) scale(${1/scale})`, opacity: i.nodeOpacity.interpolate(o => `${o}`)}}
                    onClick={(e) => {if(node.visible) this.props.onClick(node, e)}}
                    onMouseOver={(e) => {if(node.parent && !node.parent.transforming) this.props.onMouseOver(node, e)}}
                    onMouseLeave={(e) => {if(node.parent && !node.parent.transforming) this.props.onMouseLeave(node, e)}}
                    ref={node.ref}
                  >
                    
                    {node.userData.value}
                  </animated.div>
              </animated.div>
            </React.Fragment>
      )}}</Spring>
    )
  }
}


const wrapperStyle = {
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
  userSelect: `none`,
  backgroundSize: `50% 50%`,
  backgroundRepeat: `no-repeat`,
  backgroundPosition: `center center`,
  fill: `white`
}

const nodeStyle = {
  position: `absolute`,
  top: `0`,
  left: `0`,
  zIndex: `100`
}

const cornerStyle = {
  position: `absolute`,
  width: `0.5em`,
  height: `0.5em`,
  boxSizing: `border-box`
}