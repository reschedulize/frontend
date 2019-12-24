import React from 'react';

import ContentContainer from '../components/ContentContainer';
import Header from '../components/Header';

import NewPlanButton from '../components/ViewPlanList/NewPlanButton';
import List from '../components/ViewPlanList/List';
import NoPlansMessage from '../components/ViewPlanList/NoPlansMessage';

import ReschedulizeAPI from '../api/reschedulize';

class ViewPlanList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: true,
			plans: []
		};

		ReschedulizeAPI.getPlanList()
			.then((plans) => {
				this.setState({
					isFetching: false,
					plans: plans
				});
			});
	}

	render() {
		return (
			<ContentContainer>
				<Header title="Plans">
					<NewPlanButton />
				</Header>

				{(this.state.isFetching || this.state.plans.length > 0) ? (
					<List isFetching={this.state.isFetching} plans={this.state.plans} />
				) : (
					<NoPlansMessage />
				)}
			</ContentContainer>
		);
	}
}

export default ViewPlanList;