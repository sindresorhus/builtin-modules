'use strict';
var assert = require('assert');
var test = require('ava');
var builtinModules = require('./');
var staticList = require('./static');

test(function (t) {
	console.log('Builtin modules:', builtinModules);

	assert.doesNotThrow(function () {
		builtinModules.forEach(function (el) {
			require(el);
		});
	});

	t.assert(builtinModules.indexOf('fs') !== -1);
	t.assert(Array.isArray(staticList));

	t.end();
});
