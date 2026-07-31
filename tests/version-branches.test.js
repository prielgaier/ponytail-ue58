#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const supported = new Set([
  '4.27',
  '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8',
]);

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

test('branch declares a supported Unreal Engine version', () => {
  const version = read('ENGINE_VERSION').trim();
  assert.ok(supported.has(version), `unsupported ENGINE_VERSION: ${version}`);
});

test('load-bearing rules and metadata match ENGINE_VERSION', () => {
  const version = read('ENGINE_VERSION').trim();
  for (const relative of [
    'README.md',
    'AGENTS.md',
    'skills/ponytail/SKILL.md',
    '.claude-plugin/plugin.json',
    'package.json',
  ]) {
    assert.ok(read(relative).includes(version), `${relative} does not target UE ${version}`);
  }
});

test('branch marketplace ref selects the matching source branch', () => {
  const version = read('ENGINE_VERSION').trim();
  const manifest = JSON.parse(read('.agents/plugins/marketplace.json'));
  const expected = version === '5.8' ? 'main' : `ue${version}`;
  assert.equal(manifest.plugins[0].source.ref, expected);
});

test('UE4.27 guidance excludes the UE5-only StateTree recommendation', () => {
  const version = read('ENGINE_VERSION').trim();
  if (version !== '4.27') return;
  assert.doesNotMatch(read('skills/ponytail/references/unreal-native.md'), /StateTree/);
});
