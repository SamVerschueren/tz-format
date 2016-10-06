'use strict';
function pad(n) {
	n = Math.abs(n);
	return n < 10 ? '0' + n : n;
}

function getOffset(date, offset) {
	var timezoneOffset = offset === undefined ? date.getTimezoneOffset() : offset;

	var tzHours = Math.floor(Math.abs(timezoneOffset) / 60);
	var tzMinutes = Math.abs(timezoneOffset) % 60;
	var sign;

	if (offset === undefined) {
		sign = date.getTimezoneOffset() > 0 ? '-' : '+';
	} else {
		sign = offset >= 0 ? '+' : '-';
	}

	return sign + pad(tzHours) + ':' + pad(tzMinutes);
}

module.exports = function (date, offset) {
	if (typeof date === 'number') {
		offset = date;
		date = new Date();
	}

	date = date || new Date();

	if (!(date instanceof Date)) {
		throw new TypeError('Expected `date` to be a `Date`, got `' + (typeof date) + '`');
	}

	if (offset !== undefined && typeof offset !== 'number') {
		throw new TypeError('Expected `offset` to be a `number`, got `' + (typeof offset) + '`');
	}

	offset = offset && offset * 60;

	var timezoneOffset = getOffset(date, offset);

	if (offset !== undefined) {
		date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + offset);
	}

	return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + timezoneOffset;
};
