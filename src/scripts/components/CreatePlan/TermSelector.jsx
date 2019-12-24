import React from 'react';

import ReschedulizeAPI from '../../api/reschedulize';

let termToString = (term) => {
	let year = term.substring(0, 4);
	let quarter = term.substring(4, 6);

	let quarterStr = '';

	if (quarter === '10') {
		quarterStr = 'Winter';
	} else if (quarter === '20') {
		quarterStr = 'Spring';
	} else if (quarter === '30') {
		quarterStr = 'Summer';
	} else if (quarter === '40') {
		quarterStr = 'Fall';
	}

	return quarterStr + ' ' + year;
};

class TermSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			terms: []
		};

		ReschedulizeAPI.getTerms()
			.then((terms) => {
				this.setState({
					terms: terms
				});

				this.props.handleTermChange(terms[0]);
			});

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.handleTermChange(e.target.value);
	}

	render() {
		return (
			<div className="select is-small">
				<select value={this.props.term} onChange={this.handleChange}>
					{this.state.terms.map((term) => {
						return <option key={term} value={term}>{termToString(term)}</option>;
					})}
				</select>
			</div>
		);
	}
}

export default TermSelector;