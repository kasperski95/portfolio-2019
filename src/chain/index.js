import React, { Component } from 'react'
import Card from '@material-ui/core/Card'

export default class Chain extends Component {
	config = {
		theme: {
			palette: {
				background: {
					paper: '#FFFFFF'
				},
				primary: {
					main: '#00FF00'
				},
				secondary: {
					main: '#0000FF'
				},
				text: {
					main: '#00FFFF'
				}
			}
		},
		lineWidth: 2,
		nodeSize: 30,
		labelOffset: 20,
		span: 90,
		busSize: 50,
		renderFirstLine: true,
		startFromRightSide: false
	}

	//———————————————————————————————————————————————————————————————————————————————————————————————————————————————
	// LIFECYCLE

	constructor(props) {
		super(props);
		if (this.props.configure) this.config = this.props.configure(this.config);
	}

	//———————————————————————————————————————————————————————————————————————————————————————————————————————————————
	// UTILS
	
	generateComponent = (props, renderer, defaultStyle) => {
		const { style, ...rest } = props;
		props = {...rest,  style: {...defaultStyle, ...style}}
		return renderer? renderer(props) : <div {...props}/>
	}


	getIf = (props) => {
		if (props.condition) return props.children || props.then;
		if (props.else) return props.else;
		return null;
	}

	//------------------
	// ATOMIC COMPONENTS

	getWrapper = (props) => this.generateComponent(props, this.props.wrapperRenderer, {
		display: 'inline-flex',
		alignItems: 'top'
	});


	getPanel = (props) => this.generateComponent(props, this.props.panelRenderer, {
		display: 'inline-block',
	});

	
	getLine = (props) => 	{
		const { style, children, horizontal, ...rest } = props;
		let length = props.length || this.config.span - this.config.nodeSize;
		let width = props.width || this.config.lineWidth;

		if (horizontal) {
			let tmp = length;
			length = width;
			width = tmp;
		}

		props = {...rest, style: {
			width: `${width}px`,
			height: `${length}px`,
			margin: '0 auto',
			backgroundColor: `${this.config.theme.palette.secondary.main}`,
			...style}
		}

		return this.props.lineRenderer? this.props.lineRenderer(props) : <div {...props} />
	}


	getNode = (props) => 
	{	const { completed, ...rest } = props;
		return this.generateComponent(rest, this.props.nodeRenderer, {
			width: `${this.config.nodeSize}px`,
			height: `${this.config.nodeSize}px`,
			borderRadius: `50%`,
			boxSizing: `border-box`,
			boxShadow: `0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)`,
			backgroundColor: `${props.completed? this.config.theme.palette.secondary.main : this.config.theme.palette.background.paper}`,
			border: `2px solid ${this.config.theme.palette.secondary.main}`
		})
	}

	//------------------------
	// COMMENT COMPONENT STUFF

	getCommentWrapper = (props) => this.generateComponent(props, this.props.commentWrapperRenderer, {
		width: `100%`,
		height: `${this.config.span * 2}px`,
		display: 'flex',
		alignItems: 'center'
	})


	getScrollbar = (props) => this.generateComponent(props, this.props.scrollbarRenderer, {
		width: `100%`,
		maxHeight: `${this.config.span * 2}px`,
		overflowY: `auto`,
		overflowX: `hidden`
	})


	getNodeContent = (props) => {
		const { style, children, ...rest } = props;
		props = {...rest, style: {
			width: `100%`,
			...style}
		}
		
		const Scrollbar = props => this.getScrollbar(props);

		return this.props.nodeContentRenderer? this.props.nodeContentRenderer(props) : 
			<Card {...props}>
				<Scrollbar>
					<div style={{textAlign: `left`, boxSizing: `border-box`, padding: `1em`}}>
						<div style={{fontSize: `1.25em`}}>{children.title}</div>
						<div style={{fontSize: `0.8em`, color: this.config.theme.palette.secondary.main}}>{children.date}</div>
						<div style={{marginTop: `0.2em`}}>{children.description}</div>
					</div>
				</Scrollbar>
			</Card>
	}


	getComment = (props) => {
		const { style, children, ...rest } = props;
		props = {...rest, style: {
			// defaultStyle
			...style}
		}

		const If = props => this.getIf(props);
		const CommentWrapper = props => this.getCommentWrapper(props);
		const NodeContent = props => this.getNodeContent(props);

		return this.props.commentRenderer? this.props.commentRenderer(props) :
			<CommentWrapper {...props}>
				<If condition={children}>
					<NodeContent>
						{children}
					</NodeContent>
				</If>
			</CommentWrapper>
	}


	//———————————————————————————————————————————————————————————————————————————————————————————————————————————————

	render() {
		const If = props => this.getIf(props);
		const Wrapper = props => this.getWrapper(props);
		const Panel = props => this.getPanel(props);
		const Line = props => this.getLine(props);
		const Node = props => this.getNode(props);
		const Comment = props => this.getComment(props);
		
		return (
			<Wrapper style={this.props.style}>
				{/* LEFT */}
				<Panel style={{width: `calc(50% - ${this.config.busSize/2}px)`}}>
					<If condition={this.config.startFromRightSide} then={<Comment style={{height: `${this.config.span}px`}} />} />
					{this.props.children.map((node, index) => {
						if (index % 2 == (this.config.startFromRightSide? 0 : 1)) return null;
						return <Comment>{node}</Comment>
					})}
				</Panel>

				{/* BUS */}
				<Panel style={{width: `${this.config.busSize}px`}}>{
					this.props.children.map((node, index) => {
						return <div>
							{/* LINE */}
							<If condition={index === 0}
								then={<Line style={{opacity: (this.config.renderFirstLine && index === 0 || index > 0)? 1 : 0, height: `${this.config.span - this.config.nodeSize/2}px`}} />}
								else={<Line />}
							/>
							{/* NODE + HORIZONTAL LINES */}
							<div style={{display: `flex`, alignItems: `center`}}>
								<Line style={{opacity: (index % 2 === (this.config.startFromRightSide? 1 : 0))? 1 : 0}} horizontal length={(this.config.busSize - this.config.nodeSize)/2} />
								<Node completed={node.completed} />
								<Line style={{opacity: (index % 2 !== (this.config.startFromRightSide? 1 : 0))? 1 : 0}} horizontal length={(this.config.busSize - this.config.nodeSize)/2} />
							</div>	
						</div>
					})
				}</Panel>

				{/* RIGHT */}
				<Panel style={{width: `calc(50% - ${this.config.busSize/2}px)`}}>
					<If condition={!this.config.startFromRightSide} then={<Comment style={{height: `${this.config.span}px`}} />} />
					{this.props.children.map((node, index) => {
						if (index % 2 == (this.config.startFromRightSide? 1 : 0)) return null;
						return <Comment>{node}</Comment>
					})}
				</Panel>
			</Wrapper>
		)
	}
}
