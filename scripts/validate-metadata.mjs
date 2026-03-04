import fs from 'fs';

const CANONICAL = {
  displayName: 'Rigour',
  pluginName: 'rigour',
  npmPackage: '@rigour-labs/mcp',
  developmentPlaceholderVersion: '0.0.0-development',
};

function readJson(path) {
  const raw = fs.readFileSync(path, 'utf8');
  return JSON.parse(raw);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isSemver(value) {
  return /^\d+\.\d+\.\d+(-[0-9A-Za-z-.]+)?(\+[0-9A-Za-z-.]+)?$/.test(value);
}

function isAllowedVersion(value) {
  return value === CANONICAL.developmentPlaceholderVersion || isSemver(value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const packageJson = readJson('package.json');
const pluginJson = readJson('.claude-plugin/plugin.json');
const marketplaceJson = readJson('.claude-plugin/marketplace.json');

assert(
  isAllowedVersion(packageJson.version),
  `package.json version must be semver or ${CANONICAL.developmentPlaceholderVersion}: ${packageJson.version}`
);
assert(
  isAllowedVersion(pluginJson.version),
  `.claude-plugin/plugin.json version must be semver or ${CANONICAL.developmentPlaceholderVersion}: ${pluginJson.version}`
);
assert(
  isAllowedVersion(marketplaceJson.version),
  `.claude-plugin/marketplace.json version must be semver or ${CANONICAL.developmentPlaceholderVersion}: ${marketplaceJson.version}`
);

assert(
  packageJson.version === pluginJson.version && packageJson.version === marketplaceJson.version,
  `Version mismatch: package.json=${packageJson.version}, plugin.json=${pluginJson.version}, marketplace.json=${marketplaceJson.version}`
);

assert(pluginJson.name === CANONICAL.displayName, `plugin.json name must be "${CANONICAL.displayName}"`);
assert(marketplaceJson.name === CANONICAL.displayName, `marketplace.json name must be "${CANONICAL.displayName}"`);

assert(isValidEmail(marketplaceJson.owner?.email || ''), 'marketplace.json owner.email must be a valid email');
assert(Array.isArray(marketplaceJson.plugins) && marketplaceJson.plugins.length > 0, 'marketplace.json plugins must be non-empty');

const firstPlugin = marketplaceJson.plugins[0];
assert(firstPlugin.name === CANONICAL.pluginName, `marketplace plugin name must be "${CANONICAL.pluginName}"`);
assert(firstPlugin.version === marketplaceJson.version, 'marketplace plugin version must match marketplace version');
assert(firstPlugin.source?.type === 'npm', 'marketplace plugin source.type must be "npm"');
assert(firstPlugin.source?.package === CANONICAL.npmPackage, `marketplace plugin source.package must be "${CANONICAL.npmPackage}"`);

console.log('Metadata validation passed.');
