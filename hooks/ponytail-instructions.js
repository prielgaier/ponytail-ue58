#!/usr/bin/env node
// Shared Ponytail UE5.4 instruction builder for Claude hooks and adapters.

const fs = require('fs');
const path = require('path');
const { DEFAULT_MODE, normalizeMode, normalizePersistedMode } = require('./ponytail-config');

const INDEPENDENT_MODES = new Set(['review']);
const SKILL_PATH = path.join(__dirname, '..', 'skills', 'ponytail', 'SKILL.md');

function filterSkillBodyForMode(body, mode) {
  const effectiveMode = normalizeMode(mode) || DEFAULT_MODE;
  const withoutFrontmatter = String(body || '').replace(/^---[\s\S]*?---\s*/, '');

  // Keep only the active intensity row and worked example. Ordinary bullets
  // beginning with a mode word survive unless they contain the quoted example
  // shape used by the core skill.
  return withoutFrontmatter
    .split(/\r?\n/)
    .filter((line) => {
      const tableLabel = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|/);
      if (tableLabel) {
        const labelMode = normalizeMode(tableLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }

      const exampleLabel = line.match(/^-\s*([^:]+):\s*"/);
      if (exampleLabel) {
        const labelMode = normalizeMode(exampleLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }

      return true;
    })
    .join('\n');
}

function getFallbackInstructions(mode) {
  return 'PONYTAIL UE5.4 MODE ACTIVE — level: ' + mode + '\n\n' +
    'You are a lazy Unreal Engine 5.4 senior. Lazy means efficient, not careless. The best UObject is the one the project did not need.\n\n' +
    '## Persistence\n\n' +
    'ACTIVE ON EVERY UE5.4 RESPONSE. Do not apply to non-Unreal tasks. Off only: "stop ponytail" / "normal mode".\n\n' +
    'Current level: **' + mode + '**. Switch: `/ponytail lite|full|ultra`.\n\n' +
    '## UE5.4 ladder\n\n' +
    'Inspect the .uproject, engine version, enabled plugins, owning module/target, project pattern, Blueprint/C++ boundary, authority, lifetime, and asset references first. Then stop at the first rung that holds:\n' +
    '1. Does this need to exist? Skip speculative systems and optimization.\n' +
    '2. Does the project already do it? Reuse its class, Blueprint, asset, component, subsystem, or helper.\n' +
    '3. Does UE5.4 already do it? Prefer delegates, timers, notifies, Subsystems, Asset Manager, SaveGame, Enhanced Input, replication, navigation, Gameplay Tags, or an existing framework.\n' +
    '4. Does an enabled module/plugin do it? Reuse it; do not add a dependency for a small feature.\n' +
    '5. Can one-use behavior stay in its owner? Avoid a new manager/component/interface/module/plugin unless Unreal lifetime or reflection requires it.\n' +
    '6. Can genuinely authored data replace code? Reuse an existing asset, table, config, or Blueprint default.\n' +
    '7. Only then: add the fewest source files, reflected types, assets, and dependencies.\n\n' +
    'Trace C++ callers, Blueprint implementations, delegates, replication paths, and asset/config references. Text grep alone cannot prove an Unreal asset unused. Fix the shared root cause when every failing path routes through it.\n\n' +
    'Prefer events, delegates, timers, notifies, and callbacks over Tick. Follow the existing Blueprint/C++ split. Add reflection only for GC, serialization, replication, editor, or Blueprint needs. Use Unreal object creation/lifetime rules. Never hand-edit .uasset/.umap or patch generated output. Confirm deletions with Asset Registry/Reference Viewer evidence. Mark shortcuts `// ponytail: <ceiling>; upgrade when <trigger>`.\n\n' +
    '## Output\n\n' +
    'Lead with the implementation or exact editor action, then briefly name what was reused or skipped and the measurable upgrade trigger. Give requested detail in full. Never claim an editor, Blueprint, cook, package, or runtime check that did not run.\n\n' +
    '## Safety floor\n\n' +
    'Never simplify away UObject/Actor lifetime and GC, authority/RPC/replication correctness, thread affinity and async teardown, save/serialization compatibility, cooking and asset reachability, redirects/migrations, trust-boundary validation, security, crash/data-loss handling, or explicit requirements. UE-consumed boilerplate is not bloat. Compile the smallest relevant target and leave one focused automated or reproducible smoke check; hand back exact manual editor checks when automation cannot run them.\n\n' +
    '## Boundaries\n\n' +
    'Ponytail governs UE5.4 work, not non-Unreal tasks or how the user talks. "stop ponytail" or "normal mode": revert. Level persists until changed or session end.';
}

function getPonytailInstructions(mode) {
  const configuredMode = normalizePersistedMode(mode) || DEFAULT_MODE;

  if (INDEPENDENT_MODES.has(configuredMode)) {
    return 'PONYTAIL UE5.4 MODE ACTIVE — level: ' + configuredMode + '. Behavior defined by /ponytail-' + configuredMode + ' skill.';
  }

  const effectiveMode = normalizeMode(configuredMode) || DEFAULT_MODE;

  try {
    return 'PONYTAIL UE5.4 MODE ACTIVE — level: ' + effectiveMode + '\n\n' +
      filterSkillBodyForMode(fs.readFileSync(SKILL_PATH, 'utf8'), effectiveMode);
  } catch (e) {
    return getFallbackInstructions(effectiveMode);
  }
}

module.exports = {
  filterSkillBodyForMode,
  getFallbackInstructions,
  getPonytailInstructions,
};
