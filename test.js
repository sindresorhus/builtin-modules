import test from 'ava';
import builtinModulesStatic from './static';
import builtinModules from '.';

test('main', t => {
	console.log('Builtin modules:', builtinModules);

	t.notThrows(() => {
		for (const x of builtinModules) {
			require(x);
		}
	});

	t.true(builtinModules.includes('fs'));
	t.true(Array.isArray(builtinModulesStatic));
});
