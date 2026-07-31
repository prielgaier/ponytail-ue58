<p align="center">
  <img src="assets/logo.png" alt="Ponytail UE5.2" width="180">
</p>

# Ponytail UE5.2

The lazy Unreal senior: reuse the project, use the engine, add the smallest
safe UE5.2 change.

This is an Unreal Engine 5.2-specific fork of
[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail). It keeps
Ponytail's YAGNI discipline and replaces its generic web/stdlib guidance with
Unreal-aware decisions, safety boundaries, reviews, examples, and tests.

This checkout's target is recorded in `ENGINE_VERSION`. See
[VERSIONS.md](VERSIONS.md) for the UE4.27 and UE5.0-UE5.2 branch matrix.

## What it changes

Before adding code or assets, the agent checks:

1. Does the feature need to exist?
2. Does the project already have the class, Blueprint, asset, helper, component, or convention?
3. Does UE5.2 already provide the lifecycle or system?
4. Does an enabled module/plugin already cover it?
5. Can one-use behavior stay in its owner?
6. Can genuinely authored data use an existing asset/config path?
7. Only then: what is the smallest safe source/asset/dependency change?

"Native" now means UE facilities such as delegates, `FTimerManager`, notifies,
Subsystems, Asset Manager, SaveGame, Enhanced Input, replication, navigation,
Gameplay Tags, and frameworks the project has already adopted.

### Before / after

Task: "Add a global cooldown manager for this Actor."

Without UE-aware Ponytail: a singleton UObject, new module, interface, settings
object, Tick loop, and Blueprint wrapper.

With Ponytail UE5.2:

```cpp
GetWorldTimerManager().SetTimer(CooldownHandle, this,
    &AMyActor::FinishCooldown, CooldownSeconds, false);
```

Skipped the global manager. Add shared coordination only when a second real
owner and a cross-lifetime requirement exist.

## Safety floor

Ponytail UE5.2 never minimizes away:

- UObject/Actor lifetime and garbage collection
- server authority, RPC ownership, replication, relevancy, and prediction
- thread affinity, async cancellation, and teardown
- save/serialization compatibility and reflected-name migrations
- cooking, asset reachability, redirectors, and Primary Asset rules
- required reflection, generated headers, module declarations, and editor metadata
- crash/data-loss handling, trust-boundary validation, or explicit requirements

It never calls an asset unused from source grep alone. Asset deletion requires
runtime-aware evidence such as Asset Registry/Reference Viewer results plus
checks for maps, config, tags, soft paths, reflection, and dynamic loads.

## Install: Claude Code

Run these as separate prompts in Claude Code or the Claude Desktop Code tab:

```text
/plugin marketplace add prielgaier/ponytail-ue58
```

```text
/plugin install ponytail-ue58@ponytail-ue58
```

Then activate the loaded plugin:

```text
/reload-plugins
/ponytail full
```

Choose user scope for all your UE projects, project scope for a team repository,
or local scope for one checkout. The lifecycle hooks require `node` on the
non-interactive shell PATH.

## Modes and commands

| Command | Purpose |
|---|---|
| `/ponytail [lite|full|ultra|off]` | Show or change intensity. `full` is the safe default. |
| `/ponytail-review` | Review the current UE5.2 diff for removable complexity. |
| `/ponytail-audit` | Audit the entire UE5.2 project. |
| `/ponytail-debt` | Collect `ponytail:` shortcuts and their upgrade triggers. |
| `/ponytail-gain` | Report measurable current-diff simplification only. |
| `/ponytail-help` | Show the quick-reference card. |

Plugin hosts may expose namespaced forms such as
`/ponytail-ue58:ponytail-review`.

Use `full` for normal UE work. `lite` is useful when an existing architecture
must be followed exactly. `ultra` challenges speculative systems aggressively
but keeps every Unreal safety boundary.

Set the default with `PONYTAIL_DEFAULT_MODE=lite|full|ultra|off`, or:

```json
{ "defaultMode": "full" }
```

in `~/.config/ponytail/config.json` (`%APPDATA%\ponytail\config.json` on
Windows). Existing Ponytail state paths are retained for adapter compatibility.

## Other hosts

The fork retains upstream adapters for Codex, GitHub Copilot CLI, Gemini CLI,
OpenCode, Qoder, Devin, Pi, Hermes, OpenClaw, Cursor, Windsurf, Cline, Kiro,
and AGENTS.md readers. See [docs/agent-portability.md](docs/agent-portability.md).

Instruction-only hosts can copy the matching rules file or use `AGENTS.md`.
Those rules are UE5.2-scoped and do not ask agents to apply Ponytail to
non-Unreal tasks.

## UE5.2 references

- [Engine-native decision map](docs/platform-native.md)
- [Core skill](skills/ponytail/SKILL.md)
- [Safety boundaries](skills/ponytail/references/unreal-safety.md)
- [Verification ladder](skills/ponytail/references/unreal-verification.md)
- [Examples](examples/README.md)

## Benchmarks and validation

The original Ponytail results measured FastAPI/React work. They are not claimed
for Unreal Engine. This fork ships UE5.2-specific behavioral and structural
gates, but publishes no FPS, memory, package-size, cook-time, code-size, token,
cost, or latency claims until they are measured on reproducible UE5.2 fixtures.

Run the local validation suite:

```bash
npm test
node scripts/check-rule-copies.js
node scripts/check-versions.js
```

Optional model evaluations live in `benchmarks/` and require the provider API
key documented there.

## Upstream and license

Forked from [Ponytail](https://github.com/DietrichGebert/ponytail), created by
Dietrich Gebert. The original MIT copyright notice is preserved in `LICENSE`.
UE5.2 conversion maintained at
[prielgaier/ponytail-ue58](https://github.com/prielgaier/ponytail-ue58).
