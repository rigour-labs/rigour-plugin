import fs from 'fs';

const CANONICAL = {
  pluginName: 'rigour',
  marketplaceName: 'rigour-labs',
  pluginSource: './',
  // Hooks and MCP fetch these with npx; a major-version pin keeps fixes flowing without a plugin release.
  packages: ['@rigour-labs/cli@6', '@rigour-labs/mcp@6'],
  developmentPlaceholderVersion: '0.0.0-development',
};

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isAllowedVersion(value) {
  return value === CANONICAL.developmentPlaceholderVersion
    || /^\d+\.\d+\.\d+(-[0-9A-Za-z-.]+)?(\+[0-9A-Za-z-.]+)?$/.test(value);
}

const packageJson = readJson('package.json');
const pluginJson = readJson('.claude-plugin/plugin.json');
const marketplaceJson = readJson('.claude-plugin/marketplace.json');
const mcpJson = readJson('.mcp.json');
const hooksJson = readJson('hooks/hooks.json');

for (const [file, json] of [['package.json', packageJson], ['plugin.json', pluginJson], ['marketplace.json', marketplaceJson]]) {
  assert(isAllowedVersion(json.version), `${file} version must be semver or ${CANONICAL.developmentPlaceholderVersion}: ${json.version}`);
}
assert(
  packageJson.version === pluginJson.version && packageJson.version === marketplaceJson.version,
  `Version mismatch: package.json=${packageJson.version}, plugin.json=${pluginJson.version}, marketplace.json=${marketplaceJson.version}`
);

assert(pluginJson.name === CANONICAL.pluginName, `plugin.json name must be "${CANONICAL.pluginName}"`);
assert(pluginJson.author?.name, 'plugin.json author.name is required');

assert(marketplaceJson.name === CANONICAL.marketplaceName, `marketplace.json name must be "${CANONICAL.marketplaceName}"`);
assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(marketplaceJson.owner?.email || ''), 'marketplace.json owner.email must be a valid email');
assert(Array.isArray(marketplaceJson.plugins) && marketplaceJson.plugins.length === 1, 'marketplace.json must list exactly one plugin');
const entry = marketplaceJson.plugins[0];
assert(entry.name === CANONICAL.pluginName, `marketplace plugin name must be "${CANONICAL.pluginName}"`);
assert(entry.source === CANONICAL.pluginSource, `marketplace plugin source must be "${CANONICAL.pluginSource}" (this repository is the plugin)`);
assert(entry.version === undefined, 'marketplace plugin entry must not set version; plugin.json owns it');

const commands = [
  ...Object.values(mcpJson.mcpServers ?? {}).map((server) => [server.command, ...(server.args ?? [])].join(' ')),
  ...Object.values(hooksJson.hooks ?? {}).flat().flatMap((matcher) => matcher.hooks ?? []).map((hook) => hook.command),
];
for (const pkg of CANONICAL.packages) {
  assert(commands.some((command) => command.includes(pkg)), `expected a command that runs ${pkg}`);
}
for (const command of commands) {
  for (const match of command.matchAll(/@rigour-labs\/[a-z-]+(@\S+)?/g)) {
    assert(CANONICAL.packages.includes(match[0]), `pin ${match[0]} to one of: ${CANONICAL.packages.join(', ')}`);
  }
}

const skill = 'skills/review/SKILL.md';
assert(fs.existsSync(skill), `${skill} is missing`);
assert(/^---\nname: review\ndescription: .+\n---\n/.test(fs.readFileSync(skill, 'utf8')), `${skill} needs name and description frontmatter`);

console.log('Metadata validation passed.');
