import React, { Component } from 'react'
import CustomScrollbar from 'react-scrollbars-custom'



export default class Chain extends Component {

	getProps = () => {
		return {
			nodes: this.props.children.nodes || [],
			processes: this.props.children.processes || [],
			spacing: this.props.spacing || 100,
			nodeSize: this.props.nodeSize || 48,
			lineWidth: this.props.lineWidth || 2
		}
	}


	//---------------------------------------------------------------------------------------
	// COMPONENTS
	
	getWrapper = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: {
			width: `100%`,
			maxWidth: `40em`,
			padding: `0em 0.5em`,
			margin: `0em auto`,
			...style,
			...this.props.style,
		}};
		
		return this.props.wrapperRenderer? this.props.wrapperRenderer(props) : <div {...props}/>;
	}


	getElementWrapper = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: {
			height: `${this.getProps().nodeSize}px`,
			position: `relative`,
			...style
		}};
		
		return this.props.nodeWrapperRenderer? this.props.nodeWrapperRenderer(props) : <div {...props}/>;
	}


	getLine = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: { 
			width: `${this.getProps().lineWidth}px`,
			height: `${this.getProps().spacing}px`,
			margin: `0em auto`,
			backgroundColor: `red`,
			...style,
		}};
		
		return this.props.lineRenderer? this.props.lineRenderer(props) : <div {...props}/>;
	}


	getScrollbar = props => {
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			width: `calc(50% - ${this.getProps().nodeSize/2}px)`,
			height: `calc(${this.getProps().nodeSize + this.getProps().spacing}px - 0.5em)`,
			position: `absolute`,
			top: `${this.getProps().nodeSize/2}px`,
			transform: `translate(0%, -50%)`,
			overflow: `hidden`
		}};

		return this.props.scrollbarRenderer? this.props.scrollbarRenderer(props) : <div {...props}/>;
	}


	getLabel = (props) => {
		if (!props.children) return null;

		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			width: `100%`,
			minHeight: `100%`,
			padding: `0em 0.5em`,
			boxSizing: `border-box`,
			display: `flex`,
			alignItems: 'center'			
		}};
		
		return this.props.labelRenderer? this.props.labelRenderer(props) : <div {...props}/>;
	}


	getSide = (props) => {
		const Scrollbar = (props) => this.getScrollbar(props);
		const Label = (props) => this.getLabel(props);

		if (props.right && props.children)
			return <Scrollbar style={{right: '0px'}}>
				<Label>{props.children}</Label>
			</Scrollbar>

		if (props.children)
			return <Scrollbar style={{left: '0px'}}>
				<Label style={{justifyContent: 'flex-end'}}>{props.children}</Label>
			</Scrollbar>

		return null;
	}


	getNode = (props) => {
		const nodeSize = this.getProps().nodeSize;
		const { style, ...rest } = props;
		const lineWidth = this.getProps().lineWidth;

		if (props.type === 'dots') {
			const dotStyle = {
				backgroundColor: `red`,
				width: `${lineWidth}px`,
				height: `${lineWidth}px`,
				margin: `${(nodeSize - lineWidth * 3)/4}px 0px`,
				borderRadius: `50%`,
				transform: `translate(-50%, 0%)`,
			}
			props = {...rest, style: { ...style, 
				width: `0px`,
				height: `${nodeSize}px`,
				position: `absolute`,
				backgroundColor: `rgba(255,0,0,0.1)`,
				left: `50%`
			}};
			return this.props.nodeRenderer? this.props.nodeRenderer(props) : <div {...props}>
				<div style={dotStyle}></div>
				<div style={dotStyle}></div>
				<div style={dotStyle}></div>
			</div>;

		} else {
			props = {...rest, style: { ...style,
				backgroundColor: `rgba(255, 0, 0, 0.1)`,
				width: `${nodeSize}px`,
				height: `${nodeSize}px`,
				position: `absolute`,
				left: `50%`,
				transform: `translate(-50%, 0%)`,
				borderRadius: `50%`,
			}};
			return this.props.nodeRenderer? this.props.nodeRenderer(props) : <div {...props}/>;
		}
	}

	//---------------------------------------------------------------------------------------

	render() {
		const Wrapper = (props) => this.getWrapper(props);
		const ElementWrapper = (props) => this.getElementWrapper(props);
		const Line = (props) => this.getLine(props);
		const Side = (props) => this.getSide(props);
		const Node = (props) => this.getNode(props);

		const props = this.getProps();

    return (
      <Wrapper>{props.nodes.map((node, index) => {
				const lineDisplay = (index === 0)? 'none' : 'block';
				const lineHeight = (node.halfLine)? props.spacing : props.spacing/2;

				return (
					<React.Fragment>
						<Line style={{display: lineDisplay, height: `${lineHeight}px`}} />
						<ElementWrapper>
							<Side left>{node.leftLabel}</Side>
							<Node type={node.type}/>
							<Side right>{node.rightLabel}</Side>
						</ElementWrapper>
					</React.Fragment>
				)
			})}</Wrapper>
    )
  }
}