import fs from 'node:fs';
import {builtinModules} from 'node:module';

const final = builtinModules
	.filter(x => !/^_|^sys$/.test(x))
	.sort();

fs.writeFileSync('builtin-modules.json', JSON.stringify(final, undefined, '\t') + '\n');
