import test from 'ava';
import sinon from 'sinon';
import fn from './';

let clock;
let stub;
const date = new Date(2015, 10, 10, 10, 0, 0, 0, 0);

function setOffset(offset) {
	stub = sinon.stub(Date.prototype, 'getTimezoneOffset').returns(offset);
}

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
	t.throws(() => fn('foo'), 'Expected `date` to be a `Date`, got `string`');
	t.throws(() => fn(new Date(), 'foo'), 'Expected `offset` to be a `number`, got `string`');
});

test.serial('no offset', t => {
	setOffset(0);

	t.is(fn(), '2015-11-10T10:00:00+00:00');
	t.is(fn(new Date()), '2015-11-10T10:00:00+00:00');
	t.is(fn(new Date(2015, 11, 25, 11, 0, 0, 0)), '2015-12-25T11:00:00+00:00');
});

test.serial('positive timezone offset', t => {
	setOffset(120);

	t.is(fn(), '2015-11-10T10:00:00-02:00');
});

test.serial('negative timezone offset', t => {
	setOffset(-120);

	t.is(fn(), '2015-11-10T10:00:00+02:00');
});

test.serial('half timezone offset', t => {
	setOffset(-30);

	t.is(fn(), '2015-11-10T10:00:00+00:30');
});

test.serial('pass in offset', t => {
	setOffset(-120);

	t.is(fn(0), '2015-11-10T08:00:00+00:00');
	t.is(fn(1), '2015-11-10T09:00:00+01:00');
	t.is(fn(2), '2015-11-10T10:00:00+02:00');
	t.is(fn(-1), '2015-11-10T07:00:00-01:00');
	t.is(fn(-2), '2015-11-10T06:00:00-02:00');
	t.is(fn(-2.5), '2015-11-10T05:30:00-02:30');
	t.is(fn(new Date(2015, 11, 25, 11, 0, 0, 0), -1), '2015-12-25T08:00:00-01:00');
});
