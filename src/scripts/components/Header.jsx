import React from 'react';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav className="level">
					<div className="level-left">
						<div className="level-item">
							<h3 className="is-size-3 has-text-weight-semibold">{this.props.title}</h3>
						</div>
					</div>
					<div className="level-right">
						<div className="level-item">
							{ (this.props.children) ? this.props.children : null }
						</div>
					</div>
				</nav>

				<hr />
			</div>
		);
	}
}

export default Header;