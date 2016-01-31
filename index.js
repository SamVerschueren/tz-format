'use strict';
function pad(n) {
	n = Math.abs(n);
	return n < 10 ? '0' + n : n;
}

module.exports = function (date) {
	date = date || new Date();

	if (!(date instanceof Date)) {
		throw new TypeError('Provide a date');
	}

	var tzHours = Math.floor(Math.abs(date.getTimezoneOffset()) / 60);
	var tzMinutes = Math.abs(date.getTimezoneOffset()) % 60;
	var sign = date.getTimezoneOffset() > 0 ? '-' : '+';

	return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + sign + pad(tzHours) + ':' + pad(tzMinutes);
};
