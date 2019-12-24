import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import CreatePlan from "../routes/CreatePlan";
import ViewPlanList from "../routes/ViewPlanList";
import ViewPlan from "../routes/ViewPlan";

class PrivateRoot extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div id="root-inner">
					<div className="navbar-container">
						<div className="container is-fluid">
							<nav className="navbar is-white" role="navigation">
								<div className="navbar-brand">
									<Link to="/plans" className="navbar-item">
										<img src="/assets/images/logo.png" />
									</Link>
								</div>

								<div className="navbar-menu">
									<div className="navbar-end">
										<div className="navbar-item">
											<div className="field is-grouped">
												<p className="control">
													<a href="/logout" className="button is-rounded is-white">
														<span>Logout</span>
													</a>
												</p>
											</div>
										</div>
									</div>
								</div>
							</nav>
						</div>
					</div>

					<Route exact path="/plans" component={ViewPlanList} />
					<Route exact path="/plans/new" component={CreatePlan} />
					<Route exact path="/plans/view/:id" component={ViewPlan} />
				</div>
			</Router>
		);
	}
}

export default PrivateRoot;