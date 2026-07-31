#!/usr/bin/env node

// Create a version-scoped source tree from the validated UE5.8 base.
// Run only on a new branch created from main/ue5.8.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SOURCE_VERSION = '5.8';
const SUPPORTED = new Set([
  '4.27',
  '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8',
]);
const EXCLUDED = new Set([
  'VERSIONS.md',
  'scripts/specialize-engine-version.js',
  'tests/version-branches.test.js',
]);

function branchFor(version) {
  return `ue${version}`;
}

function trackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean)
    .map((file) => file.replace(/\\/g, '/'));
}

function isText(buffer) {
  return !buffer.includes(0);
}

function specializeText(text, target) {
  const escapedSource = SOURCE_VERSION.replace('.', '\\.');
  const escapedTarget = target.replace('.', '\\.');
  let next = text
    .replaceAll(escapedSource, escapedTarget)
    .replaceAll(SOURCE_VERSION, target);
  if (target === '4.27') {
    next = next
      .replace(/\bUE5\b/g, 'UE4')
      .replace(/\bue5\b/g, 'ue4')
      .replace(/Behavior Tree, StateTree, EQS/g, 'Behavior Tree, EQS');
  }
  return next;
}

function main() {
  const target = String(process.argv[2] || '').trim();
  if (!SUPPORTED.has(target)) {
    throw new Error(`Usage: node scripts/specialize-engine-version.js <${[...SUPPORTED].join('|')}>`);
  }

  const versionPath = path.join(ROOT, 'ENGINE_VERSION');
  const current = fs.readFileSync(versionPath, 'utf8').trim();
  if (current !== SOURCE_VERSION) {
    throw new Error(`Expected UE ${SOURCE_VERSION} base, found UE ${current}. Create the branch from main/ue5.8.`);
  }
  if (target === SOURCE_VERSION) {
    console.log(`Already specialized for UE ${SOURCE_VERSION}.`);
    return;
  }

  let changed = 0;
  for (const relative of trackedFiles()) {
    if (EXCLUDED.has(relative)) continue;
    const absolute = path.join(ROOT, relative);
    const buffer = fs.readFileSync(absolute);
    if (!isText(buffer)) continue;
    const text = buffer.toString('utf8');
    const next = specializeText(text, target);
    if (next === text) continue;
    fs.writeFileSync(absolute, next, 'utf8');
    changed += 1;
  }

  fs.writeFileSync(versionPath, `${target}\n`, 'utf8');

  const marketplacePath = path.join(ROOT, '.agents', 'plugins', 'marketplace.json');
  const marketplace = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
  marketplace.plugins[0].source.ref = branchFor(target);
  fs.writeFileSync(marketplacePath, `${JSON.stringify(marketplace, null, 2)}\n`, 'utf8');

  const readmePath = path.join(ROOT, 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const notice =
    `> **Version branch:** this checkout targets UE ${target}. The marketplace commands below install ` +
    `the default UE 5.8 branch; clone or download \`${branchFor(target)}\` when this version is required.\n\n`;
  fs.writeFileSync(readmePath, readme.replace('## Install: Claude Code\n', notice + '## Install: Claude Code\n'), 'utf8');

  console.log(`Specialized ${changed} tracked text files for UE ${target} (${branchFor(target)}).`);
}

main();
