import React from 'react';

import Course from './Course';

let areSetsEqual = (a, b) => {
	if (a.size !== b.size) {
		return false;
	}

	for (let v of a) {
		if (!b.has(v)) {
			return false;
		}
	}

	return true;
};

class CRNSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: {}
		};

		this.registeredCRNs = new Set();
		this.lockedCRNs = new Set();

		for (let [courseName, types] of props.courseToTypes) {
			this.state.courses[courseName] = {};

			types.forEach((type) => {
				this.state.courses[courseName][type] = {
					crn: '',
					isValidCRN: false,
					locked: false
				};
			});
		}

		this.updateFilters = this.updateFilters.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleLockToggle = this.handleLockToggle.bind(this);
	}

	updateFilters() {
		let registeredCRNs = new Set();
		let lockedCRNs = new Set();

		for (let courseName in this.state.courses) {
			for (let classType in this.state.courses[courseName]) {
				let c = this.state.courses[courseName][classType];

				if (c.isValidCRN) {
					registeredCRNs.add(c.crn);
				}

				if (c.locked) {
					if (c.isValidCRN) {
						lockedCRNs.add(c.crn);
					} else if (c.currentScheduleCRN) {
						lockedCRNs.add(c.currentScheduleCRN);
					}
				}
			}
		}

		if (!areSetsEqual(this.registeredCRNs, registeredCRNs) || !areSetsEqual(this.lockedCRNs, lockedCRNs)) {
			this.props.handleFilterChange(null, registeredCRNs, lockedCRNs);
		}

		this.registeredCRNs = registeredCRNs;
		this.lockedCRNs = lockedCRNs;
	}

	updateClass(courseName, classType, changes) {
		this.setState({
			...this.state,
			courses: {
				...this.state.courses,
				[courseName]: {
					...this.state.courses[courseName],
					[classType]: {
						...this.state.courses[courseName][classType],
						...changes
					}
				}
			}
		}, this.updateFilters);
	}

	handleTextChange(courseName, classType, e) {
		let value = e.target.value.replace(/[^0-9]/g, '').substring(0, 5);
		let isValidCRN = false;

		if (value.length > 0 && this.props.crnToClass.has(value)) {
			let c = this.props.crnToClass.get(value);

			if (c.course === courseName && c.type === classType) {
				isValidCRN = true;
			}
		}

		this.updateClass(courseName, classType, {
			crn: value,
			isValidCRN: isValidCRN,
			locked: this.state.courses[courseName][classType].locked && isValidCRN
		});
	}

	handleLockToggle(courseName, typeName) {
		let type = this.state.courses[courseName][typeName];

		if (type.locked) {
			this.updateClass(courseName, typeName, {
				locked: false
			});
		} else if (type.isValidCRN) {
			this.updateClass(courseName, typeName, {
				locked: true
			});
		} else if (type.crn.length === 0) {
			for (let i = 0; i < this.props.schedule.length; i++) {
				if (this.props.schedule[i].course === courseName && this.props.schedule[i].type === typeName) {
					this.updateClass(courseName, typeName, {
						crn: this.props.schedule[i].crn,
						locked: true
					});

					break;
				}
			}
		}
	}

	render() {
		return (
			<div>
				{Object.keys(this.state.courses).map((courseName) => {
					return (
						<Course key={courseName}
								courseName={courseName}
								types={this.state.courses[courseName]}
								color={this.props.colors.get(courseName)}
								handleTextChange={this.handleTextChange}
								handleLockToggle={this.handleLockToggle} />
					);
				})}
			</div>
		);
	}
}

export default CRNSelector;