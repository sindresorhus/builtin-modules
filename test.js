import test from 'ava';
import builtinModules from './index.js';

test('main', async t => {
	console.log('Builtin modules:', builtinModules);

	await t.notThrowsAsync((async () => {
		for (const builtinModule of builtinModules) {
			// Only available in latest Node.js.
			if (builtinModule === 'trace_events') {
				continue;
			}

			await import(builtinModule);
		}
	})());

	t.true(builtinModules.includes('fs'));
	t.true(Array.isArray(builtinModules));
});
