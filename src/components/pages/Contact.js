import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class Contact extends Component {
  render() {
    return (
			<form style={{display: `flex`, justifyContent: 'center', width: `100%`, height: `100%`}}>
				<div style={{boxSizing: `border-box`, overflow: 'hidden', maxWidth: '25em', marginTop: `5%`, width: `100%`, padding: '0.5em', textAlign: `right`}}>
					<TextField label="E-mail" name="email" required style={inputStyle} />
					<TextField label="Message" multiline required style={inputStyle} />
					<div style={{height: `5em`, marginBottom: `1em`, border: `1px solid gray`}} />
					<Button variant='contained' color='primary' type="submit">Send</Button>
				</div>
			</form>
    )
  }
}


const inputStyle = {
	width: '100%',
	marginBottom: '1em'
}