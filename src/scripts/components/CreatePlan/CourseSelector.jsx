import React from 'react';

import AutocompleteInput from '../AutocompleteInput';
import CourseList from './CourseList';

class CourseSelector extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<article className={"message " + this.props.color}>
				<div className="message-header">
					<nav className="level">
						<div className="level-left">
							<p>{this.props.title}</p>
						</div>
					</nav>
				</div>

				<div className="message-body">
					<AutocompleteInput placeholder="Course"
									   autoFocus={this.props.autoFocus}
									   list={this.props.courseList}
									   handleSubmit={this.props.handleCourseAdd} />
					<CourseList courses={this.props.courses}
								courseToInfo={this.props.courseToInfo}
								handleRemove={this.props.handleCourseRemove} />
				</div>
			</article>
		);
	}
}

export default CourseSelector;