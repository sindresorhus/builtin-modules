/**
A static list of the Node.js builtin modules from the latest Node.js version.

@example
```
import builtinModules from 'builtin-modules';

console.log(builtinModules);
//=> ['assert', 'buffer', …]
```
*/
declare const builtinModules: readonly string[];

export default builtinModules;
