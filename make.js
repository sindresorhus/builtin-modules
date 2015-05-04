'use strict';
var fs = require('fs');
var builtinModules = require('./');

fs.writeFileSync('builtin-modules.json', JSON.stringify(builtinModules, null, '\t') + '\n');
