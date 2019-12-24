import React from 'react';

class Class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalActive: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClick() {
		this.setState({
			modalActive: true
		});
	}

	handleClose() {
		this.setState({
			modalActive: false
		});
	}

	render() {
		let style = {
			top: ((this.props.timeRange.begin / 60) - 6) * 30,
			height: ((this.props.timeRange.end - this.props.timeRange.begin) / 60) * 30,
			lineHeight: ((this.props.timeRange.end - this.props.timeRange.begin) / 60) * 30 + "px"
		};

		return (
			<div>
				<div className={"calendar-class " + this.props.color} style={style} onClick={this.handleClick}>
					<div>
						{this.props.classDetails.course}
					</div>
				</div>

				<div className={"modal " + (this.state.modalActive ? "is-active" : "")}>
					<div className="modal-background" onClick={this.handleClose}>

					</div>

					<div className="modal-card">
						<header className="modal-card-head">
							<p className="modal-card-title">{this.props.classDetails.course}</p>
							<button className="delete" onClick={this.handleClose}></button>
						</header>

						<section className="modal-card-body">
							<p>
								<b>CRN: </b> {this.props.classDetails.crn}
							</p>
							<p>
								<b>Available Unreserved: </b> {this.props.classDetails.seats.available_unreserved}
							</p>
							<p>
								<b>Available Reserved: </b> {this.props.classDetails.seats.available_reserved}
							</p>
							<p>
								<b>Waitlist Availablility: </b> {this.props.classDetails.waitlist.available_unreserved}
							</p>

						</section>

						<footer className="modal-card-foot">
						</footer>
					</div>
				</div>
			</div>
		);
	}
}

export default Class;