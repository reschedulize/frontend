import React from 'react';
import { withRouter } from "react-router-dom";

import Reschedulize from '../api/reschedulize';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: false,
			inputValue: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let input = event.target.value;

		input = input.toUpperCase();
		input = input.replace(/[^A-Z\d]/g, ''); // Numbers and capital letters only
		input = input.substring(0, 12);

		let output = '';

		for (let i = 0; i < input.length; i++) {
			if (i > 0 && i % 4 === 0) {
				output += '-';
			}

			output += input.substring(i, i + 1);
		}

		this.setState({
			inputValue: output
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({
			isFetching: true
		});

		Reschedulize.login(this.state.inputValue, ' ')
			.then((success) => {
				if (success) {
					window.location.replace('/plans');
				} else {
					alert('login failed');
				}
			});
	}

	render() {
		return (
			<div>
				<h1>login</h1>

				<form onSubmit={this.handleSubmit}>
					<label>
						key:
						<input type="text" name="key" onChange={this.handleChange} value={this.state.inputValue} disabled={this.state.isWaiting} />
					</label>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default withRouter(Login);