import React from 'react';

class LoadingScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="loader-container">
				<div className="loader-inner">
					<div className="loader-animation">
						<div className="loader-animation-box" />
						<div className="loader-animation-shadow" />
					</div>
					<p className="loader-title">Loading Schedules</p>
				</div>
			</div>
		);
	}
}

export default LoadingScreen;