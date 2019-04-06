/**
List of the Node.js builtin modules.

@example
```
import builtinModules = require('builtin-modules');

console.log(builtinModules);
//=> ['assert', 'buffer', ...]
```
*/
declare const builtinModules: readonly string[];

export = builtinModules;
