import {builtinModules as builtinModulesOnCurrentVersion, isBuiltin} from 'node:module';
import test from 'ava';
import builtinModules from './index.js';

test('main', async t => {
	console.log('Builtin modules:', builtinModules);

	for (const builtinModule of builtinModules) {
		// Only test modules available on current version
		if (
			!isBuiltin(builtinModule)
			// https://nodejs.org/api/errors.html#err_trace_events_unavailable
			|| builtinModule === 'trace_events'
			|| builtinModule === 'node:trace_events'
		) {
			continue;
		}

		// eslint-disable-next-line no-await-in-loop
		await t.notThrowsAsync(() => import(builtinModule), `Can't import '${builtinModule}'.`);
	}

	// Deprecated modules
	t.false(builtinModules.includes('sys'));
	t.false(builtinModules.includes('punycode'));
	t.false(builtinModules.includes('node:sys'));
	t.false(builtinModules.includes('node:punycode'));

	t.true(Array.isArray(builtinModules));
	t.true(builtinModules.includes('node:fs'));
	t.true(builtinModules.includes('fs'));
	t.true(builtinModules.includes('node:test'));
	t.false(builtinModules.includes('test'));

	t.true(builtinModulesOnCurrentVersion.every(
		name =>
			name.startsWith('_')
			|| name === 'sys'
			|| name === 'punycode'
			|| builtinModules.includes(name)
	));
});
