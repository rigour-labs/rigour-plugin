import fs from 'fs';

const nextVersion = process.argv[2];
const CANONICAL = {
  displayName: 'Rigour',
  pluginName: 'rigour',
};

if (!nextVersion) {
  console.error('Missing next release version argument');
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z-.]+)?(\+[0-9A-Za-z-.]+)?$/.test(nextVersion)) {
  console.error(`Invalid semver version: ${nextVersion}`);
  process.exit(1);
}

const targets = [
  'package.json',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
];

for (const file of targets) {
  const raw = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(raw);
  json.version = nextVersion;

  if (file === '.claude-plugin/marketplace.json' && Array.isArray(json.plugins)) {
    json.name = CANONICAL.displayName;
    json.plugins = json.plugins.map((plugin) => ({
      ...plugin,
      name: CANONICAL.pluginName,
      version: nextVersion,
    }));
  }

  if (file === '.claude-plugin/plugin.json') {
    json.name = CANONICAL.displayName;
  }

  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
}

console.log(`Synchronized release version to ${nextVersion}`);
