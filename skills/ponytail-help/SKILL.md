---
name: ponytail-help
description: >
  Show the Ponytail UE5.8 modes, commands, safety boundaries, and usage card.
  Use for /ponytail-help, Ponytail UE help, available commands, or mode help.
  One-shot display; do not change mode.
---

# Ponytail UE5.8 help

Display this compact card when invoked. Do not change mode or write state.

## Levels

| Level | Trigger | Behavior |
|---|---|---|
| Lite | `/ponytail lite` | Build the requested UE5.8 design and name the smaller native option. |
| Full | `/ponytail` | Reuse project and engine systems; minimize files, reflection, Tick, modules, plugins, and assets. Default. |
| Ultra | `/ponytail ultra` | Challenge speculative systems and optimization while preserving every UE safety boundary. |

## Commands

| Command | Result |
|---|---|
| `/ponytail [lite|full|ultra|off]` | Show or change mode. |
| `/ponytail-review` | Review the current UE5.8 diff for removable complexity. |
| `/ponytail-audit` | Audit the whole UE5.8 project. |
| `/ponytail-debt` | Collect `ponytail:` shortcut markers. |
| `/ponytail-gain` | Show an evidence-only simplification scoreboard for the current diff. |
| `/ponytail-help` | Show this card. |

Plugin hosts may namespace commands, for example
`/ponytail-ue58:ponytail-review`. Codex uses `@ponytail-review`.

## Safety floor

Never minimize away UObject lifetime/GC, authority and replication, thread
affinity, serialization/save compatibility, cooking/asset reachability,
redirects/migrations, crash/data-loss handling, or explicit requirements.
Never call an asset unused from grep alone.

Deactivate with `stop ponytail`, `normal mode`, or `/ponytail off`.
Set the default with `PONYTAIL_DEFAULT_MODE=lite|full|ultra|off` or the existing
Ponytail config file.

Repository: https://github.com/prielgaier/ponytail-ue58
