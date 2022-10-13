import test from 'ava';
import builtinModulesStatic from './static';
import builtinModules from '.';

const nodejsMajorVersion = Number.parseInt(
	process.version.split('.')[0].replace('v', ''),
	10
);

test('builtinModules', t => {
	console.log(`Builtin modules (Node.js ${nodejsMajorVersion}):`, builtinModules);

	t.notThrows(() => {
		for (const x of builtinModules) {
			require(x);
		}
	});

	t.true(builtinModules.includes('fs'));

	if (nodejsMajorVersion >= 14) {
		t.true(builtinModules.includes('fs/promises'));
	}

	if (nodejsMajorVersion >= 16) {
		t.true(builtinModules.includes('assert/strict'));
	}

	// Some Node.js versions (e.g v10) include some `v8/` and `node-inspect/` modules in `require('module').builtinModules`, but we want to ignore them
	t.false(builtinModules.some(x => x.startsWith('v8/')));
	t.false(builtinModules.some(x => x.startsWith('node-inspect/')));
});

test('builtinModulesStatic', t => {
	t.true(Array.isArray(builtinModulesStatic));
	t.true(builtinModulesStatic.every(x => typeof x === 'string'));
});
