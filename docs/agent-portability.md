# Agent portability

Ponytail UE5.8 retains the upstream adapter layout. The canonical long-form
skill is `skills/ponytail/SKILL.md`; `AGENTS.md` is the compact instruction-only
copy. `hooks/ponytail-instructions.js` supplies mode-aware runtime context.

| Host | Adapter | Install/use |
|---|---|---|
| Claude Code / Desktop Code tab | `.claude-plugin/`, `hooks/`, `skills/` | `/plugin marketplace add prielgaier/ponytail-ue58`, then `/plugin install ponytail-ue58@ponytail-ue58` |
| Codex | `.codex-plugin/`, `.agents/plugins/marketplace.json`, `skills/` | `codex plugin marketplace add prielgaier/ponytail-ue58`, then `codex plugin add ponytail-ue58@ponytail-ue58` |
| GitHub Copilot CLI | `.github/plugin/`, `commands/`, `skills/` | `copilot plugin marketplace add prielgaier/ponytail-ue58`, then `copilot plugin install ponytail-ue58@ponytail-ue58` |
| Gemini CLI | `gemini-extension.json`, `AGENTS.md`, `skills/` | `gemini extensions install https://github.com/prielgaier/ponytail-ue58` |
| OpenCode | `.opencode/plugins/ponytail.mjs`, `.opencode/command/`, `skills/` | load the checkout plugin path; npm publishing is intentionally disabled |
| Pi | `pi-extension/`, `skills/`, `hooks/` | `pi install git:github.com/prielgaier/ponytail-ue58` |
| Hermes | `plugin.yaml`, `__init__.py`, `skills/` | `hermes plugins install prielgaier/ponytail-ue58 --enable` |
| Devin | `.devin-plugin/plugin.json`, `skills/` | `devin plugins install prielgaier/ponytail-ue58` |
| Qoder | `.qoder-plugin/`, `.qoder/rules/`, `hooks/`, `skills/` | plugin or instruction-only rule |
| OpenClaw | `.openclaw/skills/` | copy the generated skills; this fork is not published to ClawHub |
| Cursor | `.cursor/rules/ponytail.mdc` | project rule, scoped to UE source/config files |
| Windsurf | `.windsurf/rules/ponytail.md` | project rule |
| Cline | `.clinerules/ponytail.md` | project rule |
| Kiro | `.kiro/steering/ponytail.md` | auto-scoped UE file rule |
| AGENTS.md readers | `AGENTS.md` or `.agents/rules/ponytail.md` | run from the checkout or copy the rule |

## Commands

The adapter command names remain `/ponytail`, `/ponytail-review`,
`/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, and `/ponytail-help` for
upstream compatibility. Plugin hosts may namespace them under `ponytail-ue58`.

## Scope

The core skill description and compact rule explicitly target Unreal Engine
5.8. Instruction-only adapters do not intentionally apply Ponytail to other
engines or general coding tasks. Runtime hooks inject the rules every session,
so the rules themselves repeat that scope.
