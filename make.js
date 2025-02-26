import fs from 'node:fs';
import process from 'node:process';
import {builtinModules, isBuiltin} from 'node:module';
import childProcess from 'node:child_process';

const JOB_BUILD_LIST = 'buildList';
const LIST_FILE = 'builtin-modules.json';
const NODE_PROTOCOL = 'node:';

const stripNodeProtocol = name => name.startsWith(NODE_PROTOCOL) ? name.slice(NODE_PROTOCOL.length) : name;

const sorter = (nameA, nameB) => {
	const nameAWithoutProtocol = stripNodeProtocol(nameA);
	const nameBWithoutProtocol = stripNodeProtocol(nameB);

	if (nameAWithoutProtocol === nameBWithoutProtocol) {
		return nameA.startsWith(NODE_PROTOCOL) ? -1 : 1;
	}

	return nameAWithoutProtocol.localeCompare(nameBWithoutProtocol);
};

function runInChildProcess(flag) {
	childProcess.execFileSync(process.execPath, [flag, import.meta.filename], {
		encoding: 'utf8',
		env: {
			JOB: JOB_BUILD_LIST,
		},
	});
}

function run() {
	if (!process.argv.includes('--incremental')) {
		fs.writeFileSync(LIST_FILE, '[]');
	}

	console.log('Building list without flags...');
	buildList();

	for (const flag of process.allowedNodeEnvironmentFlags) {
		if (!flag.startsWith('--experimental-')) {
			continue;
		}

		console.log();
		console.log(`Building list with '${flag}'...`);

		try {
			runInChildProcess(flag);
		} catch {}
	}
}

function buildList() {
	const existing = new Set(
		fs.existsSync(LIST_FILE)
			? JSON.parse(fs.readFileSync(LIST_FILE))
			: [],
	);
	const found = builtinModules
		.filter(name => !existing.has(name) && !name.startsWith('_'))
		.flatMap(name =>
			name.startsWith(NODE_PROTOCOL) ? [name] : [name, `${NODE_PROTOCOL}${name}`],
		).filter(name => isBuiltin(name));

	if (found.length === 0) {
		return;
	}

	const final = [...existing, ...found].sort((nameA, nameB) => sorter(nameA, nameB));

	fs.writeFileSync(LIST_FILE, JSON.stringify(final, undefined, '\t') + '\n');

	console.log(`${final.length} module(s) found:\n${final.map(name => ` - ${name}`).join('\n')}`);
}

if (process.env.JOB === JOB_BUILD_LIST) {
	buildList();
} else {
	run();
}
