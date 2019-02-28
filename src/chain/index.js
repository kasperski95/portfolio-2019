import React, { Component } from 'react'
import CustomScrollbar from 'react-scrollbars-custom'



export default class Chain extends Component {

	getProps = () => {
		return {
			nodes: this.props.children.nodes || [],
			processes: this.props.children.processes || [],
			spacing: this.props.spacing || 100,
			nodeSize: this.props.nodeSize || 48
		}
	}


	//---------------------------------------------------------------------------------------
	// COMPONENTS
	
	getWrapper = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			backgroundColor: `rgba(255, 0, 0, 0.1)`,
			width: `100%`,
			maxWidth: `40em`,
			margin: `0em auto`
		}}; return this.props.wrapperRenderer? this.props.wrapperRenderer(props) : <div {...props}/>;
	}

	getElementWrapper = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			backgroundColor: `rgba(255, 0, 0, 0.1)`,
			height: `${this.getProps().nodeSize}px`,
			position: `relative`
		}}; return this.props.nodeWrapperRenderer? this.props.nodeWrapperRenderer(props) : <div {...props}/>;
	}

	getLine = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			width: `0.125em`,
			height: `${this.getProps().spacing}px`,
			margin: `0em auto`,
			backgroundColor: `rgba(0, 0, 0, 0.1)`,
		}}; return this.props.lineRenderer? this.props.lineRenderer(props) : <div {...props}/>;
	}

	getScrollbar = props => {
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			width: `calc(50% - ${this.getProps().nodeSize/2}px)`,
			height: `calc(${this.getProps().nodeSize + this.getProps().spacing}px - 0.5em)`,
			position: `absolute`,
			top: `${this.getProps().nodeSize/2}px`,
			transform: `translate(0%, -50%)`
		}};
		return this.props.scrollbarRenderer? this.props.scrollbarRenderer(props) : <CustomScrollbar {...props}/>;
	}

	getLabel = (props) => {
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			width: `100%`,
			minHeight: `100%`,
			padding: `0em 0.5em`,
			boxSizing: `border-box`,
			backgroundColor: `rgba(255, 0, 0, 0.1)`,
			display: `flex`,
			alignItems: 'center'			
		}}; return this.props.labelRenderer? this.props.labelRenderer(props) : <div {...props}/>;
	}

	getNode = (props) => {
		const nodeSize = this.getProps().nodeSize;
		const { style, ...rest } = props;
		props = {...rest, style: { ...style,
			backgroundColor: `rgba(255, 0, 0, 0.1)`,
			width: `${nodeSize}px`,
			height: `${nodeSize}px`,
			position: `absolute`,
			left: `50%`,
			transform: `translate(-50%, 0%)`,
			borderRadius: `50%`,
		}}; return this.props.nodeRenderer? this.props.nodeRenderer(props) : <div {...props}/>;
	}

	//---------------------------------------------------------------------------------------

	render() {
		const Wrapper = (props) => this.getWrapper(props);
		const ElementWrapper = (props) => this.getElementWrapper(props);
		const Line = (props) => this.getLine(props);
		const Scrollbar = (props) => this.getScrollbar(props);
		const Label = (props) => this.getLabel(props);
		const Node = (props) => this.getNode(props);

		const props = this.getProps();

    return (
      <Wrapper>{props.nodes.map(node => {
				return (
					<React.Fragment>
						<Line />
						<ElementWrapper>
							<Scrollbar style={{left: '0px'}}>
								<Label style={{justifyContent: 'flex-end'}}>{node.leftLabel}</Label>
							</Scrollbar>
							<Node type={node.type}/>
							<Scrollbar style={{right: '0px'}}>
								<Label>{node.rightLabel}</Label>
							</Scrollbar>
						</ElementWrapper>
					</React.Fragment>
				)
			})}</Wrapper>
    )
  }
}