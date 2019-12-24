import React from 'react';

class ContentContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content-container container is-fluid section">
				{ (this.props.children) ? this.props.children : null }
			</div>
		);
	}
}

export default ContentContainer;