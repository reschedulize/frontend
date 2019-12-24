import React from 'react';

import Class from './Class';

class Course extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<article className={"message " + this.props.color}>
				<div className="message-body">
					<strong className="heading">{this.props.courseName}</strong>

					{Object.keys(this.props.types).map((typeName) => {
						return <Class key={typeName}
									  courseName={this.props.courseName}
									  typeName={typeName}

									  crn={this.props.types[typeName].crn}
									  locked={this.props.types[typeName].locked}
									  isValidCRN={this.props.types[typeName].isValidCRN}
									  currentScheduleCRN={this.props.types[typeName].currentScheduleCRN}

									  handleTextChange={this.props.handleTextChange}
									  handleLockToggle={this.props.handleLockToggle} />;
					})}
				</div>
			</article>
		);
	}
}

export default Course;