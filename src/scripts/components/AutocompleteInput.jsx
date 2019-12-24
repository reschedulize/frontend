import React from 'react';

class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',

			showSuggestions: false,
			suggestions: [],
			selectedSuggestion: -1,

			isMouseInside: false
		};

		this.updateSuggestions = this.updateSuggestions.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleInputBlur = this.handleInputBlur.bind(this);
		this.handleDropdownMouseEnter = this.handleDropdownMouseEnter.bind(this);
		this.handleDropdownMouseLeave = this.handleDropdownMouseLeave.bind(this);
		this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateSuggestions() {
		let suggestions = [];

		if (this.state.input.length > 0) {
			for (let i = 0; i < this.props.list.length; i++) {
				let str = this.props.list[i];

				if (str.substring(0, this.state.input.length) === this.state.input) {
					suggestions.push(str);
				}

				if (suggestions.length > 5) {
					break;
				}
			}
		}

		if (suggestions.length > 0 && this.props.list.indexOf(this.state.input) === -1) {
			this.setState({
				suggestions: suggestions,
				selectedSuggestion: 0,
				showSuggestions: true
			});
		} else {
			this.setState({
				suggestions: [],
				selectedSuggestion: 0,
				showSuggestions: false
			});
		}
	}

	handleInputChange(event) {
		this.setState({
			input: event.target.value.toUpperCase()
		}, this.updateSuggestions);
	}

	handleKeyDown(event) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();

			let selectedSuggestion = this.state.selectedSuggestion;

			if (event.key === 'ArrowUp') {
				selectedSuggestion = (selectedSuggestion + this.state.suggestions.length - 1) % this.state.suggestions.length;
			} else if (event.key === 'ArrowDown') {
				selectedSuggestion = (selectedSuggestion + 1) % this.state.suggestions.length;
			}

			this.setState({
				selectedSuggestion: selectedSuggestion
			});
		} else if (event.key === 'Enter' || event.key === 'Tab') {
			if (this.state.showSuggestions) {
				event.preventDefault();

				this.setState({
					input: this.state.suggestions[this.state.selectedSuggestion],
					showSuggestions: false,
					selectedSuggestion: 0
				});
			}
		}
	}

	handleInputFocus() {
		this.updateSuggestions();
	}

	handleInputBlur() {
		if (!this.state.isMouseInside) {
			this.setState({
				showSuggestions: false
			});
		}
	}

	handleDropdownMouseEnter() {
		this.setState({
			isMouseInside: true
		});
	}

	handleDropdownMouseLeave() {
		this.setState({
			isMouseInside: false
		});
	}

	handleSuggestionClick(str) {
		this.setState({
			input: str,

			showSuggestions: false,
			selectedSuggestion: 0
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.props.list.indexOf(this.state.input) === -1) {
			return;
		}

		let success = this.props.handleSubmit(this.state.input);

		if (success) {
			this.setState({
				input: '',
				showSuggestions: false,
				suggestions: [],
				selectedSuggestion: -1,
				isMouseInside: false
			});
		}
	}

	render() {
		let color;

		if (this.state.input.length > 0 && this.state.suggestions.length === 0 && this.props.list.indexOf(this.state.input) === -1) {
			color = 'is-danger';
		}

		if (this.props.list.indexOf(this.state.input) !== -1) {
			color = 'is-success';
		}

		return (
			<div className={"dropdown " + ((this.state.showSuggestions ? "is-active" : ""))}>
				<div className="dropdown-trigger">
					<form onSubmit={this.handleSubmit}>
						<div className="field has-addons">
							<div className="control is-expanded">
								<input className={"input " + color}
									   type="text"
									   value={this.state.input}
									   placeholder={this.props.placeholder || ""}
									   autoFocus={this.props.autoFocus}
									   onChange={this.handleInputChange}
									   onKeyDown={this.handleKeyDown}
									   onFocus={this.handleInputFocus}
									   onBlur={this.handleInputBlur} />
							</div>
							<div className="control">
								<button className={"button " + color}>
									<i className="fas fa-plus" />
								</button>
							</div>
						</div>
					</form>
				</div>

				<div className="dropdown-menu"
					 id="dropdown-menu"
					 role="menu"
					 onMouseEnter={this.handleDropdownMouseEnter}
					 onMouseLeave={this.handleDropdownMouseLeave}>
					<div className="dropdown-content">
						{this.state.suggestions.map((str, index) => {
							return (
								<a key={str}
								   className={"dropdown-item " + ((this.state.selectedSuggestion === index) ? "is-active" : "")}
								   onClick={() => {this.handleSuggestionClick(str)}}>
									{str}
								</a>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default AutocompleteInput;