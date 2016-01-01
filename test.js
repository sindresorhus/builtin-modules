import test from 'ava';
import m from './';
import m2 from './static';

test(t => {
	console.log('Builtin modules:', m);

	t.doesNotThrow(() => {
		m.forEach(x => require(x));
	});

	t.true(m.indexOf('fs') !== -1);
	t.true(Array.isArray(m2));
});
