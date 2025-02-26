import test from 'ava';
import builtinModules from './index.js';

test('main', async t => {
	console.log('Builtin modules:', builtinModules);

	for (const builtinModule of builtinModules) {
		await t.notThrowsAsync((async () => {
			// Only available in latest Node.js or requires flags.
			if (
				builtinModule === 'trace_events'
        || builtinModule === 'inspector'
        || builtinModule === 'inspector/promises'
        || builtinModule === 'node:quic'
        || builtinModule === 'node:trace_events'
			) {
				return;
			}

			await import(builtinModule);
		})(), `Can't import '${builtinModule}'.`);
	}

	t.true(Array.isArray(builtinModules));
	t.true(builtinModules.includes('node:fs'));
	t.true(builtinModules.includes('fs'));
	t.true(builtinModules.includes('node:test'));
	t.false(builtinModules.includes('test'));
});
