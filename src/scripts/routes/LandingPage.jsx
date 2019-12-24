import React from 'react';

import { Link } from "react-router-dom";

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>landing page</h1>

				<Link to="/login">login</Link>
			</div>
		);
	}
}

export default LandingPage;