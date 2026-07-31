---
name: ponytail-review
description: "Review a UE5.8 diff for needless Tick, abstractions, modules, dependencies, reflection, and unsafe asset assumptions."
homepage: https://github.com/prielgaier/ponytail-ue58
license: MIT
---

# Ponytail UE5.8 review

Review the current UE5.8 diff for removable complexity after reading the
`.uproject`, affected `Build.cs`/targets, nearby project pattern, and referenced
assets or Blueprints. The best safe result is a shorter diff with fewer Unreal
systems to own.

## Findings

Use one line per finding:

`<file>:L<line>: <tag> <what to cut>. <UE/project-native replacement>.`

Tags:

- `delete:` dead or speculative source with verified reachability evidence.
- `native:` custom code duplicating a UE5.8 facility already available.
- `tick:` polling that can be an event, delegate, timer, notify, or existing callback.
- `layer:` one-consumer manager, Subsystem, Component, interface, base class, module, or plugin.
- `reflect:` reflected API/metadata not consumed by GC, serialization, replication, editor, or Blueprint.
- `dependency:` avoidable module/plugin dependency.
- `shrink:` same safe behavior with fewer files, assets, or lines.

## Evidence rules

- Do not call an asset dead from grep alone. Require Asset Registry/Reference Viewer or equivalent evidence and account for maps, config, tags, reflection, soft paths, Primary Assets, and dynamic loads.
- Do not flag generated headers, required reflection metadata, module declarations, replication registration, redirects, migrations, or editor metadata as boilerplate when UE consumes them.
- Do not trade away UObject lifetime, authority/replication, threading, serialization, cook reachability, crash/data-loss handling, or an explicit requirement.
- Do not recommend switching Blueprint/C++ ownership merely from preference; follow the project boundary.

## Output

Rank high-confidence cuts first. End with:

`net: -<N> source lines, -<M> reflected members, -<P> module/plugin dependencies possible; asset deletions: <verified count>.`

If nothing is safely removable: `Lean for UE5.8 already. Ship.`

Scope is over-engineering only. Route correctness, security, and performance
bugs to a normal review. Do not apply fixes.
