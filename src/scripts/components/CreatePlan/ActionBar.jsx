import React from 'react';

import Reschedulize from '../../api/reschedulize';

class ActionBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			credits: 0
		};

		Reschedulize.getUserInfo()
			.then((result) => {
				this.setState({
					credits: result.remaining_plans
				});
			});
	}

	render() {
		return (
			<nav className="level">
				<div className="level-left">
					<p className="has-text-success">
						<strong className="has-text-success">{this.state.credits}</strong> Credits Remaining
					</p>
				</div>

				<div className="level-right">
					<a className={"button is-info " + (this.props.isGenerating ? "is-loading" : "")} onClick={this.props.handleSubmit}>
						<span>Generate Schedules</span>
					</a>
				</div>
			</nav>
		);
	}
}

export default ActionBar;