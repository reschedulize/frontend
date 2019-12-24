import React from 'react';

import Item from './Item';

import {COLORS} from '../../constants';

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.isFetching) {
			return (
				<div>

				</div>
			);
		} else {
			return this.props.plans.map((plan, index) => {
				return (
					<Item key={plan.id}
						  plan={plan}
						  colorTag={COLORS[index % COLORS.length]} />
				);
			});
		}
	}
}

export default List;