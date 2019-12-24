import React from 'react';
import {withRouter} from 'react-router-dom'

import ContentContainer from '../components/ContentContainer';
import Header from '../components/Header';

import TermSelector from '../components/CreatePlan/TermSelector';
import CourseSelector from '../components/CreatePlan/CourseSelector';
import Stats from '../components/CreatePlan/Stats';
import ActionBar from '../components/CreatePlan/ActionBar';

import ReschedulizeAPI from '../api/reschedulize';

import {CLASS_TYPE_ORDER, COLORS} from '../constants';

let getClassTypeOrder = (course) => {
	let i = CLASS_TYPE_ORDER.indexOf(course);

	return (i !== -1) ? i : 99;
};

class CreatePlan extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			term: '',
			courseGroups: [
				[]
			],

			courseList: [],
			courseToInfo: {},

			isGenerating: false
		};

		this.updateCourseInfo = this.updateCourseInfo.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleCourseAdd = this.handleCourseAdd.bind(this);
		this.handleCourseRemove = this.handleCourseRemove.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateCourseInfo(course) {
		ReschedulizeAPI.getCourseInfo(this.state.term, course)
			.then((info) => {
				this.setState({
					courseToInfo: {
						...this.state.courseToInfo,
						[course]: {
							units: info.units,
							minutes: info.minutes,
							types: info.types.sort((i, j) => {
								return getClassTypeOrder(i) - getClassTypeOrder(j);
							})
						}
					}
				});
			});
	}

	handleTermChange(term) {
		if (term !== this.state.term) {
			this.setState({
				term: term,
				courseGroups: [
					[]
				],
				courseList: [],
				courseToInfo: {}
			}, () => {
				ReschedulizeAPI.getCourseList(this.state.term)
					.then((courseList) => {
						this.setState({
							courseList: courseList
						});
					});
			});
		}
	}

	handleCourseAdd(course, group) {
		let groups = [...this.state.courseGroups];
		groups[group].push(course);

		this.setState({
			courseGroups: groups
		});

		this.updateCourseInfo(course);

		return true;
	}

	handleCourseRemove(course, group) {
		let arr = [...this.state.courseGroups[group]];
		arr.splice(arr.indexOf(course), 1);

		let groups = [...this.state.courseGroups];
		groups[group] = arr;

		this.setState({
			courseGroups: groups
		});
	}

	handleSubmit() {
		this.setState({
			isGenerating: true
		});

		let groups = [];

		this.state.courseGroups[0].forEach((c) => {
			groups.push([c]);
		});

		ReschedulizeAPI.submitPlan(this.state.term, groups)
			.then((result) => {
				this.props.history.push('/plans/view/' + result.id);
			});
	}

	render() {
		return (
			<ContentContainer>
				<Header title="Create Plan">
					<TermSelector term={this.state.term} handleTermChange={this.handleTermChange} />
				</Header>

				<div className="columns">
					<div className="column is-6">
						{this.state.courseGroups.map((courses, index) => {
							return (
								<CourseSelector key={index}
												title={(index === 0) ? ("Courses") : ("Flex Group #" + index)}
												color={COLORS[index % COLORS.length]}
												courses={courses}
												courseList={this.state.courseList}
												courseToInfo={this.state.courseToInfo}
												handleCourseAdd={(course) => {return this.handleCourseAdd(course, index)}}
												handleCourseRemove={(course) => {this.handleCourseRemove(course, index)}} />
							);
						})}
					</div>

					<div className="column is-6">
						<Stats courseGroups={this.state.courseGroups}
							   courseToInfo={this.state.courseToInfo} />

						<hr />

						<ActionBar isGenerating={this.state.isGenerating} handleSubmit={this.handleSubmit} />
					</div>
				</div>
			</ContentContainer>
		);
	}
}

export default withRouter(CreatePlan);