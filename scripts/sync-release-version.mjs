import fs from 'fs';

const nextVersion = process.argv[2];

if (!nextVersion) {
  console.error('Missing next release version argument');
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z-.]+)?(\+[0-9A-Za-z-.]+)?$/.test(nextVersion)) {
  console.error(`Invalid semver version: ${nextVersion}`);
  process.exit(1);
}

// Only the version moves on release; names and sources are checked by validate-metadata.mjs.
for (const file of ['package.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json.version = nextVersion;
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
}

console.log(`Synchronized release version to ${nextVersion}`);
