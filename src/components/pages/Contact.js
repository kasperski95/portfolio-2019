import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import blueGrey from '@material-ui/core/colors/blueGrey'
import { createMuiTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import axios from 'axios'


export default class Contact extends Component {
	state={
		submitLabel: 'Send',
		submitButtonDisabled: false,
	}

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

	
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({submitLabel: 'Sending...', submitButtonDisabled: true});
		const data = new FormData(e.target);
		axios.post('/mail.php', data)
			.then(result => {				
				if (result.status === 200) {
					this.setState({submitLabel: 'Sent', submitButtonDisabled: true});
				} 
			})
			.catch(result => {
				alert("Message couldn't been sent. Check captcha.");
				this.setState({submitLabel: 'Send', submitButtonDisabled: false});
			});
	}


  render() {
		const theme = this.getTheme();

    return (
				<form method="POST" onSubmit={(e) => this.handleSubmit(e)} style={{display: `flex`, justifyContent: 'center', width: `100%`, padding: '0em 1em', boxSizing: `border-box`}}>
					<Card style={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.main, boxSizing: `border-box`, overflow: 'hidden', maxWidth: '25em', margin: `5% 0em 1em 0em`, width: `100%`, padding: '2em 1em', textAlign: `right`, height: `auto`}}>
						<TextField label="E-mail" name="email" required style={inputStyle} />
						<TextField label="Message" name="message" multiline required style={inputStyle} />
						<div style={{display: `flex`, alignItems: `center`}}>
							<div style={{flex: `3`, height: `4em`, marginBottom: `1em`, background: `url(/img/captcha.png)`, backgroundSize: `contain`, backgroundRepeat: `no-repeat`}} 
							/><div style={{flex: `1`}}><TextField name="captcha" required style={inputStyle} /></div>
						</div>
						<Button style={{width: `7em`}} variant='contained' color='primary' onClick={this.handleSubmitClick} disabled={this.state.submitButtonDisabled} type="submit">{this.state.submitLabel}</Button>
					</Card>
				</form>
    )
  }
}


const inputStyle = {
	width: '100%',
	marginBottom: '1em'
}