const ReschedulizeAPI = {
	login: (key, captcha) => {
		let body = {
			key: key,
			captcha_response: captcha
		};

		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};

		return fetch('/login', options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.success;
			});
	},
	getUserInfo: () => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/user', options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},
	getPlanList: () => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/plans', options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},
	getPlan: (id) => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/plans/' + id, options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},
	submitPlan: (term, courseGroups) => {
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'term': term,
				'course_groups': courseGroups
			})
		};

		return fetch('/api/plans/', options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},
	getClasses: (term, courses) => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/data/classes/' + term + '/' + courses.join(','), options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},

	getTerms: () => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/data/terms/', options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},
	getCourseList: (term) => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/data/course_list/' + term, options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	},
	getCourseInfo: (term, course) => {
		let options = {
			method: 'GET'
		};

		return fetch('/api/data/course_stats/' + term + '/' + course, options)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				return body.result;
			});
	}
};

export default ReschedulizeAPI;