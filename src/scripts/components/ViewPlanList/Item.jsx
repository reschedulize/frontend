import React from 'react';

import { Link } from 'react-router-dom';

class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let singles = [];
		let groups = [];

		this.props.plan.course_groups.forEach((group) => {
			if (group.length === 1) {
				singles.push(group[0]);
			} else {
				groups.push(group);
			}
		});

		return (
			<div className="planlist-item">
				<Link to={"/plans/view/" + this.props.plan.id}>
					<article className={"message " + this.props.colorTag}>
						<div className="message-body">
							<p className="heading">Courses</p>
							<div className="tags">
								{singles.map((course) => {
									return <span key={course} className={"tag " + this.props.colorTag}>{course}</span>;
								})}
							</div>

							{groups.map((group, index) => {
								return (
									<div>
										<hr />
										<p className="heading">Course Group #{index + 1}</p>
										<div className="tags">
											{group.map((course) => {
												return <span key={course} className={"tag " + this.props.colorTag}>{course}</span>;
											})}
										</div>
									</div>
								);
							})}
						</div>
					</article>
				</Link>
			</div>
		);
	}
}

export default Item;