const TIME_RANGES = [];
const PARSED_TIME_RANGES = [];

for (let i = 420; i <= 1320; i += 60) {
	TIME_RANGES.push(i);

	let hour = (i / 60) % 12;

	PARSED_TIME_RANGES.push((hour === 0 ? 12 : hour) + ':00' + (i > 660 ? 'PM' : 'AM'));
}

const DAYS_OF_WEEK = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const COLORS = [
	'is-info',
	'is-warning',
	'is-success',
	'is-danger'
];

const SEAT_FILTER = {
	GENERAL: 'GENERAL',
	GENERAL_AND_RESERVED: 'GENERAL_AND_RESERVED',
	ALL: 'ALL'
};

const CLASS_TYPE_ORDER = [
	'Lecture',
	'Discussion',
	'Laboratory',
	'Additional Lecture',
	'Workshop',
	'Activity'
];

export { TIME_RANGES, PARSED_TIME_RANGES, DAYS_OF_WEEK, COLORS, SEAT_FILTER, CLASS_TYPE_ORDER };