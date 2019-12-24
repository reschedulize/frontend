import React from 'react';

import {TIME_RANGES, PARSED_TIME_RANGES, DAYS_OF_WEEK, SEAT_FILTER} from '../../constants';

class Filters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: {
				start: TIME_RANGES[0],
				end: TIME_RANGES[TIME_RANGES.length - 1]
			},
			days: [false, true, true, true, true, true, false],
			seatFilter: SEAT_FILTER.GENERAL
		};

		this.updateFilters = this.updateFilters.bind(this);
		this.onTimeStartChange = this.onTimeStartChange.bind(this);
		this.onTimeEndChange = this.onTimeEndChange.bind(this);
		this.onDaysChange = this.onDaysChange.bind(this);
		this.onSeatChange = this.onSeatChange.bind(this);
	}

	updateFilters() {
		this.props.handleFilterChange(this.state, null);
	}

	onTimeStartChange(e) {
		this.setState({
			time: {
				...this.state.time,
				start: e.target.value
			}
		}, this.updateFilters);
	}

	onTimeEndChange(e) {
		this.setState({
			time: {
				...this.state.time,
				end: e.target.value
			}
		}, this.updateFilters);
	}

	onDaysChange(e) {
		let id = e.target.value;
		let checked = e.target.checked;

		this.setState((state) => {
			let days = state.days;
			days[id] = checked;

			return {
				days: days
			};
		}, this.updateFilters);
	}

	onSeatChange(e) {
		this.setState({
			seatFilter: e.target.value
		}, this.updateFilters);
	}

	componentDidMount() {
		this.updateFilters();
	}

	render() {
		return (
			<div>
				<div className="columns is-gapless">
					<div className="column is-6">
						<div className="field">
							<label className="label">Start Time</label>
							<div className="control">
								<div className="select is-small">
									<select value={this.state.time.start} onChange={this.onTimeStartChange}>
										{TIME_RANGES.map((minute, index) => {
											return <option value={minute} key={index}>{PARSED_TIME_RANGES[index]}</option>;
										})}
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className="column is-6">
						<div className="field">
							<label className="label">End Time</label>
							<div className="control">
								<div className="select is-small">
									<select value={this.state.time.end} onChange={this.onTimeEndChange}>
										{TIME_RANGES.map((minute, index) => {
											return <option value={minute} key={index}>{PARSED_TIME_RANGES[index]}</option>;
										})}
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="field">
					<label className="label">Days</label>

					{DAYS_OF_WEEK.map((day, index) => {
						return (
							<div className="control" key={index}>
								<label className="checkbox">
									<input type="checkbox" value={index} checked={this.state.days[index]} onChange={this.onDaysChange} /> {day}
								</label>
							</div>
						);
					})}
				</div>

				<div className="field">
					<label className="label">Seat Availability</label>

					<div className="control">
						<label className="radio">
							<input
								type="radio"
								name="seats"
								value={SEAT_FILTER.GENERAL}
								checked={this.state.seatFilter === SEAT_FILTER.GENERAL}
								onChange={this.onSeatChange} /> Open general seats
						</label>
					</div>
					<div className="control">
						<label className="radio">
							<input
								type="radio"
								name="seats"
								value={SEAT_FILTER.GENERAL_AND_RESERVED}
								checked={this.state.seatFilter === SEAT_FILTER.GENERAL_AND_RESERVED}
								onChange={this.onSeatChange} /> Open general and reserved seats
						</label>
					</div>
					<div className="control">
						<label className="radio">
							<input
								type="radio"
								name="seats"
								value={SEAT_FILTER.ALL}
								checked={this.state.seatFilter === SEAT_FILTER.ALL}
								onChange={this.onSeatChange} /> All possible schedules
						</label>
					</div>
				</div>
			</div>
		)
	}
}

export default Filters;