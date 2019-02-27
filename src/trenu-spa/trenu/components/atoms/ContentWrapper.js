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
            return <span {...restProps} style={{...style, backgroundColor: `rgba(0,0,0,0.25)`}} ref={elementRef}/>
        }}
        thumbYRenderer={
          props => {
            const {elementRef, style, ...restProps} = props;
            return <div {...restProps} style={{...style, backgroundColor: 'black'}} ref={elementRef}/>
        }}
        contentRenderer={
          props => {           
            const {elementRef, style, ...restProps} = props;
            return <div ref={elementRef} {...restProps} style={{...style, backgroundColor: `white`}}/>
      }}>
        {this.props.children}
      </Scrollbar>
    )
  }
}
  