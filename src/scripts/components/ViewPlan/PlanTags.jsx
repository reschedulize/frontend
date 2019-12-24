import React from 'react';

class PlanTags extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let singles = [];
		let groups = [];

		this.props.courseGroups.forEach((group) => {
			if (group.length === 1) {
				singles.push(group[0]);
			} else {
				groups.push(group);
			}
		});

		return (
			<div className="level-right">
				<div className="level-item plan-tags-container">
					<div className="tags">
						{singles.map((course, index) => {
							return <span key={index} className={'tag ' + this.props.colors.get(course)}>{course}</span>;
						})}
					</div>

					{groups.map((group, index) => {
						return (
							<div key={index} className="tags">
								{group.map((course) => {
									return <span key={course} className={"tag " + this.props.colors.get(course)}>{course}</span>
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default PlanTags;