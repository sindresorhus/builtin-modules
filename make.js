'use strict';
const fs = require('fs');
const builtinModules = require('.');

fs.writeFileSync('builtin-modules.json', JSON.stringify(builtinModules, null, '\t') + '\n');
