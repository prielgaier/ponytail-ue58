#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const behavior = require('../benchmarks/behavior');

function check(probe, output) {
  return behavior(output, { vars: { probe } });
}

test('asset deletion: runtime-aware evidence passes', () => {
  const result = check('asset-deletion',
    'Grep is not enough. Use Asset Registry and Reference Viewer, then check maps, config, Gameplay Tags, soft paths, Primary Asset rules, and dynamic loads.');
  assert.equal(result.pass, true);
});

test('asset deletion: zero grep hits alone fails', () => {
  const result = check('asset-deletion', 'Grep found zero references, so delete all forty assets.');
  assert.equal(result.pass, false);
});

test('lifetime: weak reference, teardown, and game thread pass', () => {
  const result = check('lifetime',
    'Capture a TWeakObjectPtr, cancel on world teardown, then AsyncTask to the GameThread and call IsValid before mutation.');
  assert.equal(result.pass, true);
});

test('lifetime: raw UObject capture without teardown fails', () => {
  const result = check('lifetime', 'Capture UObject* in the worker callback and update it directly.');
  assert.equal(result.pass, false);
});

test('replication: authority, RepNotify, and topology pass', () => {
  const result = check('replication',
    'Mutate on server authority, replicate the property with RepNotify/DOREPLIFETIME, and test a dedicated server with a remote client and late join.');
  assert.equal(result.pass, true);
});

test('replication: cosmetic local update fails', () => {
  const result = check('replication', 'Set the value independently on each client.');
  assert.equal(result.pass, false);
});

test('verification: build, focused test, and manual boundary pass', () => {
  const result = check('verification',
    'Compile the GameEditor target with Build.bat, run the focused Automation Test smoke test, then manually open and compile the Blueprint because the editor was not run here.');
  assert.equal(result.pass, true);
});

test('verification: vague compile claim fails', () => {
  const result = check('verification', 'Looks correct and should compile.');
  assert.equal(result.pass, false);
});

test('unknown probe is skipped', () => {
  const result = check('other', 'anything');
  assert.equal(result.pass, true);
  assert.match(result.reason, /skipped/i);
});
