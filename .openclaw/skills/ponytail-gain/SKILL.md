---
name: ponytail-gain
description: "Summarize measurable simplification in the current UE5.7 diff without inventing runtime, cook, package, or cost claims."
homepage: https://github.com/prielgaier/ponytail-ue58
license: MIT
---

# Ponytail UE5.7 gain

Measure the current repository diff. Do not reuse the upstream Ponytail web
benchmark numbers: they were not measured on Unreal Engine and are not evidence
for this fork.

## Collect

- `git diff --numstat` and `git diff --stat` for source/file deltas.
- Added/removed `UCLASS`, `USTRUCT`, `UENUM`, `UFUNCTION`, and `UPROPERTY` declarations.
- Added/removed Tick enablement and `Tick` overrides.
- Added/removed dependencies in `.uproject`, `.uplugin`, and `*.Build.cs`.
- Added/removed binary assets by path only; never claim their internal effect without editor evidence.
- Exact build, automation, editor, network, cook, or runtime checks that actually ran.

## Scoreboard

```text
Ponytail UE5.7 gain — current diff only
source       +A / -D lines, net N across F files
reflection   +R / -R members
tick         +T / -T sites
dependencies +P / -P modules/plugins
assets       +X / -Y files (path count only)
verification <passed checks or outstanding manual checks>
```

If there is no comparison baseline, say so. Never convert code deletion into
FPS, memory, package size, cook time, cost, or token claims. Those require
before/after measurement on the same project, target, hardware, and scenario.

One-shot report. Change no files or mode.
