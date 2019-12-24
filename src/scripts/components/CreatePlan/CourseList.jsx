import React from 'react';

import {COLORS, CLASS_TYPE_ORDER} from '../../constants';

class CourseList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="course-list">
				{this.props.courses.map((course) => {
					let info = this.props.courseToInfo[course];

					return (
						<div key={course} className="course-list-item">
							<div className="left">
								<a onClick={() => {this.props.handleRemove(course)}}>
									<i className="course-list-item-icon fas fa-times" aria-hidden="true" />
								</a>

								<span>
									{course}
								</span>
							</div>

							<div className="right tags">
								{info && info.types.map((type) => {
									let index = CLASS_TYPE_ORDER.indexOf(type);
									let color = COLORS[index % COLORS.length];

									return <span key={type} className={"tag " + color}>{type}</span>;
								})}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default CourseList;