import React from 'react';

import { Link } from 'react-router-dom';

class NewPlanButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Link to="/plans/new" className="button is-light">
				<span className="icon">
					<i className="fas fa-plus" />
				</span>
				<span>New Plan</span>
			</Link>
		);
	}
}

export default NewPlanButton;