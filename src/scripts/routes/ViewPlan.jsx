import React from 'react';

import ContentContainer from '../components/ContentContainer';
import Header from '../components/Header';

import LoadingScreen from '../components/ViewPlan/LoadingScreen';

import PlanTags from '../components/ViewPlan/PlanTags';
import Filters from '../components/ViewPlan/Filters';
import PlanSelector from '../components/ViewPlan/PlanSelector';
import Calendar from '../components/Calendar';
import CRNSelector from '../components/ViewPlan/CRNSelector';

import ReschedulizeAPI from '../api/reschedulize';

import {COLORS, SEAT_FILTER} from '../constants';

let arrayEqual = (x, y) => {
	if (x.length !== y.length) {
		return false;
	}

	for (let i = 0; i < x.length; i++) {
		if (y.indexOf(x[i]) === -1) {
			return false;
		}
	}

	return true;
};

class ViewPlan extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: true,

			courseGroups: [],
			crnToClass: new Map(),
			courseToTypes: new Map(),
			schedules: [],

			filteredSchedules: [],
			selectedSchedule: 0,

			colors: new Map(),

			filters: {
				options: {},
				registeredCRNs: new Set(),
				lockedCRNs: new Set()
			}
		};

		ReschedulizeAPI.getPlan(this.props.match.params.id)
			.then((plan) => {
				let colors = new Map();
				let index = 0;

				plan.details.course_groups.forEach((group) => {
					group.forEach((course) => {
						colors.set(course, COLORS[index % COLORS.length]);
					});

					index++;
				});

				this.setState({
					isFetching: false,

					courseGroups: plan.details.course_groups,
					crnToClass: new Map(Object.entries(plan.crn_to_class)),
					courseToTypes: new Map(Object.entries(plan.course_to_types)),
					schedules: plan.schedules,

					colors: colors
				});
			});

		this.handleNext = this.handleNext.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	handleNext() {
		if (this.state.selectedSchedule < this.state.filteredSchedules.length - 1) {
			this.setState({
				selectedSchedule: this.state.selectedSchedule + 1
			});
		}
	}

	handlePrevious() {
		if (this.state.selectedSchedule > 0) {
			this.setState({
				selectedSchedule: this.state.selectedSchedule - 1
			});
		}
	}

	handleFilterChange(options, registeredCRNs, lockedCRNs) {
		let start = performance.now();

		// registeredCRNs = [];
		// lockedCRNs = [];

		options = options || this.state.filters.options;
		registeredCRNs = registeredCRNs || this.state.filters.registeredCRNs;
		lockedCRNs = lockedCRNs || this.state.filters.lockedCRNs;

		let filteredCRNs = new Set();

		this.state.crnToClass.forEach((c, crn) => {
			// Seat filter
			if (options.seatFilter === SEAT_FILTER.GENERAL) {
				if (c.seats.available_unreserved <= 0 && !registeredCRNs.has(c.crn)) {
					return;
				}
			} else if (options.seatFilter === SEAT_FILTER.GENERAL_AND_RESERVED) {
				if (c.seats.available_unreserved + c.seats.available_reserved <= 0 && !registeredCRNs.has(c.crn)) {
					return;
				}
			}

			// Time/day filters
			for (let i = 0; i < c.schedule.length; i++) {
				let day = c.schedule[i];

				if (day) {
					if (!options.days[i]) {
						return;
					}

					for (let j = 0; j < day.length; j++) {
						let timeRange = day[j];

						if (timeRange.begin < options.time.start || timeRange.end > options.time.end) {
							return;
						}
					}
				}
			}

			filteredCRNs.add(crn);
		});

		console.log(performance.now() - start);

		let schedules = this.state.schedules.filter((schedule) => {
			for (let i = 0; i < schedule.length; i++) {
				if (!filteredCRNs.has(schedule[i])) {
					return false;
				}
			}

			for (let crn of lockedCRNs) {
				if (schedule.indexOf(crn) === -1) {
					return false;
				}
			}

			return true;
		});

		console.log(performance.now() - start);

		// Only update if schedule actually changes
		// if (!arrayEqual(schedules, this.state.filteredSchedules)) {
			this.setState({
				selectedSchedule: 0,
				filteredSchedules: schedules,
			});
		// }

		console.log(performance.now() - start);

		this.setState({
			filters: {
				options: options,
				registeredCRNs : registeredCRNs,
				lockedCRNs: lockedCRNs
			}
		});
	}

	render() {
		let schedule = [];

		if (!this.state.isFetching && this.state.filteredSchedules.length > 0) {
			schedule = this.state.filteredSchedules[this.state.selectedSchedule].map((crn) => {
				return this.state.crnToClass.get(crn);
			});
		}

		return (
			<ContentContainer>
				<Header title="Viewing Plan">
					<PlanTags courseGroups={this.state.courseGroups} colors={this.state.colors} />
				</Header>

				{(this.state.isFetching) ? (
					<LoadingScreen />
				) : (
					<div className="columns">
						<div className="column is-3">
							<Filters handleFilterChange={this.handleFilterChange} />
						</div>
						<div className="column is-9">
							<PlanSelector selectedSchedule={this.state.selectedSchedule}
										  totalSchedules={this.state.filteredSchedules.length}
										  handleNext={this.handleNext}
										  handlePrevious={this.handlePrevious} />
							<div className="columns">
								<div className="column is-10">
									<Calendar schedule={schedule} colors={this.state.colors} />
								</div>
								<div className="column is-2">
										<CRNSelector schedule={schedule}
													 crnToClass={this.state.crnToClass}
													 courseToTypes={this.state.courseToTypes}
													 colors={this.state.colors}
													 handleFilterChange={this.handleFilterChange} />
								</div>
							</div>
						</div>
					</div>
				)}
			</ContentContainer>
		);
	}
}

export default ViewPlan;