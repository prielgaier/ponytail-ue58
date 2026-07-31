---
name: ponytail-gain
description: >
  Produce an evidence-only Unreal Engine 4.27 simplification scoreboard from the
  current diff: source lines/files, reflected API, Tick sites, module/plugin
  dependencies, and assets added or removed, with verification status. Use for
  /ponytail-gain, UE4.27 simplification impact, or what Ponytail changed. Never
  invent performance, package-size, cook-time, token, or cost savings.
---

# Ponytail UE4.27 gain

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
Ponytail UE4.27 gain — current diff only
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
