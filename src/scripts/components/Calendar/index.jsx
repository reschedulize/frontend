import React from 'react';

import Class from './Class';

import { PARSED_TIME_RANGES, DAYS_OF_WEEK } from '../../constants';

class Calendar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let days = [];

		for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
			days.push([]);
		}

		if (this.props.schedule) {
			this.props.schedule.forEach((c) => {
				c.schedule.forEach((timeRanges, index) => {
					if (timeRanges) {
						timeRanges.forEach((timeRange) => {
							days[index].push({
								timeRange: timeRange,
								classDetails: c
							});
						});
					}
				});
			});
		}

		return (
			<div className="calendar-container">
				<div className="calendar-header">
					{DAYS_OF_WEEK.map(day => {
						return (
							<div className="calendar-dow" key={day}>
								{day}
							</div>
						);
					})}
				</div>

				<div className="calendar-body">
					<div className="calendar-time-label-container">
						{PARSED_TIME_RANGES.map((time) => {
							return (
								<div className="calendar-time-label" key={time}>
									{time}
								</div>
							);
						})}
					</div>

					<div className="calendar-week">
						{days.map((day, dayIndex) => {
							return (
								<div key={dayIndex} className="calendar-day">
									{day.map((classPeriod, index) => {
										return (
											<Class key={index}
												   timeRange={classPeriod.timeRange}
												   classDetails={classPeriod.classDetails}
												   color={this.props.colors.get(classPeriod.classDetails.course)} />
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Calendar;