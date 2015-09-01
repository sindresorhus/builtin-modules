'use strict';
var test = require('ava');
var builtinModules = require('./');
var staticList = require('./static');

test(function (t) {
	console.log('Builtin modules:', builtinModules);

	t.doesNotThrow(function () {
		builtinModules.forEach(function (el) {
			require(el);
		});
	});

	t.true(builtinModules.indexOf('fs') !== -1);
	t.true(Array.isArray(staticList));
	t.end();
});
