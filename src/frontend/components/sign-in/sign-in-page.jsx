// CONFIG IMPORTS
import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
// import ControlLabel from 'react-bootstrap/ControlLabel';

// REDUX IMPORTS
import store from '../../../redux-config/store/store.js';
import showCurrentTime from '../../../redux-config/actions/actions.js';

class SignIn extends React.Component {
	constructor (props) {
		super(props);

		this.validate_form = this.validate_form.bind(this);
		this.handle_change = this.handle_change.bind(this);
		this.handle_submit = this.handle_submit.bind(this);

		this.state = {
			email: '',
			password: ''
		};
	}

	// FORM VALIDATION
	validate_form() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handle_change(event) {		
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(this.state);
	}

	handle_submit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<div className='section-sign-in'>
					<h1>Welcome to Earthquake Alert</h1>
					<h3>Please sign in below</h3>
					<hr/>
					<form className='sign-in' onSubmit={this.handle_submit}>

						{/* EMAIL */}
						<label><h4>Enter your username</h4></label>
						<FormGroup controlId='email'>
							
							<FormControl
								autoFocus
								placeholder="Johnsmith@Email.com"
								type = 'email'
								name = 'email'
								onChange = {this.handle_change}
							/>
						</FormGroup>

						<label><h4>Enter your password</h4></label>
						{/* PASSWORD */}
						<FormGroup controlId='password'>
							
							<FormControl		
								placeholder="•••••••"						
								type = 'password'								
								name = 'password'
								onChange = {this.handle_change}
							/>
						</FormGroup>

						{/* SUBMIT BUTTON */}						
						<Button
							block								
							disabled={!this.validate_form()}
							type = 'submit'
						>
							Sign In
						</Button>
						
					</form>
					<br/>
					<br/>
					{/* CONTINUE BUTTON */}
					<Link to="/home">
						<Button block>
							Continue as guest
						</Button>
					</Link>
				</div>
			</div>
		)
	}
}

export default SignIn;