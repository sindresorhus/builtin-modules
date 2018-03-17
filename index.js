'use strict';
const builtinModules = require('module').builtinModules;

const blacklist = [
	'freelist',
	'sys'
];

module.exports = (builtinModules || Object.keys(process.binding('natives')))
	.filter(x => !/^_|^(internal|v8|node-inspect)\/|\//.test(x) && blacklist.indexOf(x) === -1)
	.sort();
