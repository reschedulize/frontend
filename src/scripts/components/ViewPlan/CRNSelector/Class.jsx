import React from 'react';

class Class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let displayClass;

		if (this.props.isValidCRN || this.props.locked) {
			displayClass = 'is-success';
		} else if (this.props.crn.length > 0) {
			displayClass = 'is-danger';
		}

		return (
			<div>
				<label className="is-size-7">{this.props.typeName}</label>
				<div className="field has-addons">
					<p className="control">
						<a className={"button is-small " + displayClass} onClick={() => {this.props.handleLockToggle(this.props.courseName, this.props.typeName)}}>
							<span className="icon is-small">
								<i className={"fas " + (this.props.locked ? "fa-lock" : "fa-lock-open")} />
							</span>
						</a>
					</p>
					<p className="control">
						<input className={"input is-small " + displayClass}
							   type="text"
							   placeholder={(this.props.locked && this.props.currentScheduleCRN) ? this.props.currentScheduleCRN : "CRN"}
							   value={this.props.crn}
							   onChange={(e) => {this.props.handleTextChange(this.props.courseName, this.props.typeName, e)}} />
					</p>
				</div>
			</div>
		);
	}
}

export default Class;