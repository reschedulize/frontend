import React from 'react';

class PlanSelector extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className="level">
				<div className="level-left">
					<div className="level-item">
						<p className={"subtitle is-6"}>
							<strong>{this.props.totalSchedules}</strong> schedules found
						</p>
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<p className="subtitle is-6">
							{this.props.totalSchedules > 0 ? this.props.selectedSchedule + 1 : 0}/{this.props.totalSchedules}
						</p>
					</div>

					<div className="level-item field has-addons">
						<p className="control">
							<button className="button is-small" disabled={this.props.selectedSchedule <= 0} onClick={this.props.handlePrevious}>
								<span className="icon is-small">
									<i className="fas fa-caret-left"></i>
								</span>
							</button>
						</p>
						<p className="control">
							<button className="button is-small" disabled={this.props.selectedSchedule >= this.props.totalSchedules - 1} onClick={this.props.handleNext}>
								<span className="icon is-small">
									<i className="fas fa-caret-right"></i>
								</span>
							</button>
						</p>
					</div>
				</div>
			</nav>
		);
	}
}

export default PlanSelector;