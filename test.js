import test from 'ava';
import sinon from 'sinon';
import fn from './';

let clock;
let stub;
const date = new Date(2015, 10, 10, 10, 0, 0, 0, 0);

test.before(() => {
	clock = sinon.useFakeTimers(date.getTime());
});

test.after(() => {
	clock.restore();
});

test.afterEach(() => {
	if (stub) {
		stub.restore();
		stub = undefined;
	}
});

test('error', t => {
	t.throws(fn.bind(undefined, 'foo'), 'Provide a date');
});

test.serial('no offset', t => {
	stub = sinon.stub(Date.prototype, 'getTimezoneOffset').returns(0);

	t.is(fn(), '2015-11-10T10:00:00+00:00');
	t.is(fn(new Date()), '2015-11-10T10:00:00+00:00');
	t.is(fn(new Date(2015, 11, 25, 11, 0, 0, 0)), '2015-12-25T11:00:00+00:00');
});

test.serial('positive timezone offset', t => {
	stub = sinon.stub(Date.prototype, 'getTimezoneOffset').returns(120);

	t.is(fn(), '2015-11-10T10:00:00-02:00');
});

test.serial('negative timezone offset', t => {
	stub = sinon.stub(Date.prototype, 'getTimezoneOffset').returns(-120);

	t.is(fn(), '2015-11-10T10:00:00+02:00');
});

test.serial('half timezone offset', t => {
	stub = sinon.stub(Date.prototype, 'getTimezoneOffset').returns(-30);

	t.is(fn(), '2015-11-10T10:00:00+00:30');
});
