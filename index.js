'use strict';
const {builtinModules} = require('module');

module.exports = (builtinModules || [])
	.filter(x => !/^_|^v8\/|^node-inspect\/|^sys$/.test(x))
	.sort();
