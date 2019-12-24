import React from 'react';

class Stats extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let unitsLow = 0;
		let unitsHigh = 0;
		let minutesPerWeek = 0;

		this.props.courseGroups[0].forEach((course) => {
			let info = this.props.courseToInfo[course];

			if (!info) {
				return;
			}

			unitsLow += info.units;
			unitsHigh += info.units;
			minutesPerWeek += info.minutes;
		});

		for (let i = 1; i < this.props.courseGroups.length; i++) {
			let groupUnitsLow = Number.POSITIVE_INFINITY;
			let groupUnitsHigh = Number.NEGATIVE_INFINITY;
			let groupMinutesPerWeek = 0;

			this.props.courseGroups[i].forEach((course) => {
				let info = this.props.courseToInfo[course];

				if (!info) {
					return;
				}

				if (info.units < groupUnitsLow) {
					groupUnitsLow = info.units;
				}

				if (info.units > groupUnitsHigh) {
					groupUnitsHigh = info.units;
				}

				groupMinutesPerWeek += info.minutes;
			});

			unitsLow += groupUnitsLow;
			unitsHigh += groupUnitsHigh;
			minutesPerWeek += (groupMinutesPerWeek / group.length);
		}

		return (
			<nav className="level">
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Units</p>
						<p className="title">{(unitsLow === unitsHigh) ? unitsLow : (unitsLow + " - " + unitsHigh)}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Hours Per Week</p>
						<p className="title">{(minutesPerWeek / 60).toFixed(2)}</p>
					</div>
				</div>
				<div className="level-item has-text-centered">
					<div>
						<p className="heading">Avg Hours Per Day</p>
						<p className="title">{((minutesPerWeek / 60) / 5).toFixed(2)}</p>
					</div>
				</div>
			</nav>
		);
	}
}

export default Stats;