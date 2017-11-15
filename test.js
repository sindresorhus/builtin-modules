import test from 'ava';
import m2 from './static';
import m from './';

test(t => {
	console.log('Builtin modules:', m);

	t.notThrows(() => {
		for (const x of m) {
			require(x);
		}
	});

	t.true(m.indexOf('fs') !== -1);
	t.true(Array.isArray(m2));
});
