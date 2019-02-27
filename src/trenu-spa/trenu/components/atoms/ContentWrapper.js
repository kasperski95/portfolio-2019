import React, { Component } from 'react'
import Scrollbar from 'react-scrollbars-custom';

export default class ContentWrapper extends Component {
  render() {
    return (
      <Scrollbar style={{
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
            return <span {...restProps} style={{...style, backgroundColor: this.props.theme.scrollbar.track}} ref={elementRef}/>
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
      </Scrollbar>
    )
  }
}
  