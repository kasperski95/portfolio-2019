import React, { Component } from 'react'
import Scrollbar from 'react-scrollbars-custom';
import { Spring, animated, interpolate } from 'react-spring/renderprops'

export default class ContentWrapper extends Component {
  render() {
    console.log(this.props.ready);
    
    return (
      <Spring
        native
        to={{opacity: this.props.ready? 1 : 0}}
      >{i => {
        
        
        return (<Scrollbar style={{
          width: `100%`,
          height: `100%`       
          }}
          wrapperRenderer={
            props => {
              const {elementRef, style, ...restProps} = props;
              return <span {...restProps} style={{...style, marginRight: `0`}} ref={elementRef}/>
          }}
          trackYRenderer={
            props => {
              const {elementRef, style, ...restProps} = props;
              return <animated.span {...restProps} style={{...style, backgroundColor: this.props.theme.scrollbar.track,
                opacity: i.opacity}} ref={elementRef}/>
          }}
          thumbYRenderer={
            props => {
              const {elementRef, style, ...restProps} = props;
              return <div {...restProps} style={{...style, backgroundColor: this.props.theme.scrollbar.thumb}} ref={elementRef}/>
          }}
          contentRenderer={
            props => {           
              const {elementRef, style, ...restProps} = props;
              return <div ref={elementRef} {...restProps} 
                style={{...style, backgroundColor: this.props.theme.bg, color: this.props.theme.text
              }}/>
        }}>
          {this.props.children}
        </Scrollbar>)
      }}
      </Spring>
    )
  }
}
  