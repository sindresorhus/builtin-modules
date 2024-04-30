import {expectType, expectError} from 'tsd';
import builtinModules from './index.js';

expectType<readonly string[]>(builtinModules);
expectError<string[]>(builtinModules);
