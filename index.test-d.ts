import {expectType, expectError} from 'tsd';
import builtinModules = require('.');
import builtinModulesStatic = require ('./static');

expectType<readonly string[]>(builtinModules);
expectError<string[]>(builtinModules);

expectType<readonly string[]>(builtinModulesStatic);
expectError<string[]>(builtinModulesStatic);
