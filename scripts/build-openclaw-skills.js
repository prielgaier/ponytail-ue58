#!/usr/bin/env node
// Generate the OpenClaw / ClawHub skill package (.openclaw/skills/) from the
// canonical skills/. OpenClaw skills are SKILL.md (frontmatter + body), the same
// format ponytail already uses, with one difference: `description` must be a
// single line under 160 chars. The canonical descriptions are long (tuned for
// Claude's skill picker), so each ships a short one here. The body is copied
// verbatim from skills/<name>/SKILL.md so the ruleset never drifts; only the
// frontmatter is rewritten.
//
// Run:  node scripts/build-openclaw-skills.js
// tests/openclaw-skills.test.js fails if the committed copies are stale.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HOMEPAGE = 'https://github.com/prielgaier/ponytail-ue58';

const DESCRIPTIONS = {
  'ponytail': 'UE5.5 implementation mode: inspect project ownership, prefer native engine facilities, and make the smallest reflection-safe change.',
  'ponytail-review': 'Review a UE5.5 diff for needless Tick, abstractions, modules, dependencies, reflection, and unsafe asset assumptions.',
  'ponytail-audit': 'Audit a UE5.5 repository for unnecessary systems, Tick usage, reflection, dependencies, and asset-loading complexity.',
  'ponytail-debt': 'Collect UE5.5 ponytail shortcut comments into a debt ledger with triggers, ownership, and verification boundaries.',
  'ponytail-gain': 'Summarize measurable simplification in the current UE5.5 diff without inventing runtime, cook, package, or cost claims.',
  'ponytail-help': 'Quick reference for Ponytail UE5.5 modes, skills, safety boundaries, and commands.',
};

const NAMES = Object.keys(DESCRIPTIONS);

function sourceBody(name) {
  const src = fs.readFileSync(path.join(ROOT, 'skills', name, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
  const fm = src.match(/^---\n[\s\S]*?\n---\n?/);
  if (!fm) throw new Error(`skills/${name}/SKILL.md has no frontmatter`);
  return src.slice(fm[0].length);
}

function render(name) {
  const desc = DESCRIPTIONS[name];
  if (desc.length > 160 || desc.includes('\n') || desc.includes('"')) {
    throw new Error(`description for ${name} must be one line, no quotes, under 160 chars`);
  }
  const frontmatter =
    `---\nname: ${name}\ndescription: "${desc}"\nhomepage: ${HOMEPAGE}\nlicense: MIT\n---\n`;
  return frontmatter + sourceBody(name);
}

function outPath(name) {
  return path.join(ROOT, '.openclaw', 'skills', name, 'SKILL.md');
}

module.exports = { DESCRIPTIONS, NAMES, render, outPath, sourceBody };

if (require.main === module) {
  for (const name of NAMES) {
    const p = outPath(name);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, render(name));
    console.log('wrote', path.relative(ROOT, p).replace(/\\/g, '/'));
  }
}
