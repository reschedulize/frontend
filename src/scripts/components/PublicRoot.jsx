import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from "../routes/LandingPage";
import Login from "../routes/Login";

class PublicRoot extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		);
	}
}

export default PublicRoot;