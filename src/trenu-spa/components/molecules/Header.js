import React, { Component } from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import Scrollbar from 'react-scrollbars-custom';
import Color from 'color'


export default class Header extends Component {
  render() {
    return (
		<div style={{...style, ...this.props.style}}><Spring native reset from={{mix: 0}} to={{mix: 1}}>{i => (

			<Scrollbar style={{width: '100%', height: '100%'}}
				removeTracksWhenNotUsed={true}

				trackXRenderer={props => {
					const {elementRef, style, ...restProps} = props;
					return <span {...restProps} style={{...style, padding: 0, width: `100%`, height: `4px`, left: 0, ...this.props.scrollbarTrackStyle}} ref={elementRef}/>
				}}

				thumbXRenderer={ props => {
					const {elementRef, style, ...restProps} = props;
					return <div {...restProps} style={{...style, ...this.props.scrollbarThumbStyle}} ref={elementRef}/>
				}}

				contentRenderer={ props => {           
					const {elementRef, style, ...restProps} = props;
					return <animated.div
						{...restProps} 
						ref={elementRef}
						style={{...style, paddingTop: `0.75em`, textAlign: `center`, ...this.props.scrollbarContentStyle}}
						scrollLeft={i.mix.interpolate(m => {
							return 9999999999 /* just scroll Right */
					})}/>
			}}>

				{/* CONTENT */}
				{this.props.children.map((el, index) => {

					// hide line for the first element
					const display = (index === 0)? `none` : `inline-flex`;

					// determine key values of transition
					const from = (el.collapsing || (!el.collapsing && !el.expanding))? 1 : 0;
					const to = el.collapsing? 0 : 1;

					return (
						<span style={{display: `inline-flex`, alignItems: `center`}}>

							{/* LINE */}
							<animated.div style={{ ...this.props.labelStyle, userSelect: `none`, display, alignItems: `center`, justifyContent: `center`, overflow: `hidden`,
								width: i.mix.interpolate(t => `${(from*(1-t)+to*t)}em`),
								opacity: i.mix.interpolate(t => `${(from*(1-t)+to*t)}`),
								color: this.props.labelStyle.color || 'inherit'
							}}>|</animated.div>

							{/* LABEL */}
							<animated.div style={{height: `2em`, ...this.props.labelStyle, display: `inline-flex`, alignItems: `center`, overflow: `hidden`,
								width: i.mix.interpolate(t => `${el.node.labelWidth * (from*(1-t)+to*t)}px`)
							}}>
								<animated.div style={{userSelect: `none`, textAlign: `right`, cursor: `pointer`,
									marginLeft: i.mix.interpolate(t => `${-(1-(from*(1-t)+to*t)) * el.node.labelWidth}px`),
									opacity: i.mix.interpolate(t => `${el.active? 1 : (from*(1-t)+to*t) }`),
									color: i.mix.interpolate(t => {
										const mix = el.active? 1 : 0;
										return Color(this.props.labelStyle.color).mix(Color(this.props.activeLabelStyle.color), mix);
									})
								}}
								onClick={(e) => {this.props.onLabelClick(el.node);}}>
									{el.node.userData.label}
								</animated.div>
							</animated.div>

						</span>
					)})
				}</Scrollbar>
			)}</Spring></div>
    )
  }
}

const style = {
	boxSizing: `border-box`,
	width: `100%`,
	height: `4em`,
	padding: `0.25em 8px`,
	color: `white`,
	position: `absolute`,
	display: `flex`,
	alignItems: `center`,
	zIndex: `300`,
	whiteSpace: `nowrap`,
	boxShadow: `0em 0.1em 1em rgba(0,0,0,0.1)`
}