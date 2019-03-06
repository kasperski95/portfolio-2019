import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';




export default class Contact extends Component {
	constructor(props) {
		super(props);

		this.defaultTheme = createMuiTheme({
			palette: {
				primary: {
					main: blueGrey[600]
				},
				secondary: {
					main: blueGrey[400]
				},
				text: {
					primary: blueGrey[600],
					secondary: blueGrey[300]
				}
			},
			typography: {
				useNextVariants: true,
			},
		});

	}

	getTheme = () => {
		if (this.props.theme) return this.props.theme;
		return this.defaultTheme;
	}

  render() {
		const theme = this.getTheme();

    return (
			<form style={{display: `flex`, justifyContent: 'center', width: `100%`, padding: '0em 1em', boxSizing: `border-box`}}>
				<Card style={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.main, boxSizing: `border-box`, overflow: 'hidden', maxWidth: '25em', margin: `5% 0em 1em 0em`, width: `100%`, padding: '2em 1em', textAlign: `right`, height: `auto`}}>
					<TextField label="E-mail" name="email" required style={inputStyle} />
					<TextField label="Message" multiline required style={inputStyle} />
					{/* <div style={{height: `5em`, marginBottom: `1em`, border: `1px solid gray`}} /> */}
					<Button variant='contained' color='primary' type="submit">Send</Button>
				</Card>
			</form>
    )
  }
}


const inputStyle = {
	width: '100%',
	marginBottom: '1em'
}