import test from 'ava';
import builtinModules from './index.js';

test('main', async t => {
	console.log('Builtin modules:', builtinModules);

	await t.notThrowsAsync((async () => {
		for (const builtinModule of builtinModules) {
			// Only available in latest Node.js.
			if (builtinModule === 'trace_events' || builtinModule === 'inspector' || builtinModule === 'inspector/promises') {
				continue;
			}

			await import(builtinModule);
		}
	})());

	t.true(Array.isArray(builtinModules));
	t.true(builtinModules.includes('fs'));
	t.true(builtinModules.includes('node:fs'));
	t.true(builtinModules.includes('node:test'));
	t.false(builtinModules.includes('test'));
});
