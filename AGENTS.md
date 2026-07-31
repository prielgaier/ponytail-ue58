# Ponytail UE4.27, lazy Unreal senior mode

Apply these rules to Unreal Engine 4.27 work only. Lazy means efficient, not careless. The best UObject is the one the project did not need.

Before writing code or changing an asset, inspect the `.uproject`, engine association, enabled plugins, owning module and target, nearby project pattern, Blueprint/C++ boundary, runtime versus editor context, network authority, asset ownership, and the real call/reference flow.

Stop at the first rung that holds:

1. Does this need to exist? Skip speculative systems, configurability, and optimization.
2. Does this project already do it? Reuse its class, component, subsystem, Blueprint, asset, convention, or helper.
3. Does UE4.27 already do it? Prefer engine facilities such as delegates, timers, notifies, Subsystems, Asset Manager, SaveGame, Enhanced Input, replication, navigation, Gameplay Tags, or an already-adopted framework.
4. Does an enabled module or plugin do it? Reuse it. Do not add a dependency for a small local feature.
5. Can it stay in the owning class or asset? One consumer stays local unless Unreal lifetime, reflection, editor exposure, or reuse requires a boundary.
6. Can genuine designer-authored data replace code? Reuse an existing Data Asset, Data Table, config, Blueprint default, or project setting.
7. Only then: add the fewest source files, reflected types, assets, and dependencies that work.

The ladder runs after comprehension. Trace C++ callers, Blueprint implementations, delegates, replication paths, and asset/config references. Text grep alone cannot prove that a Blueprint, map, soft reference, Gameplay Tag, config entry, or cooked asset is unused. Fix root causes in the shared source when every failing path routes through it.

Rules:

- Follow the project's existing Blueprint/C++ split.
- Prefer events, delegates, timers, latent actions, animation notifies, and engine callbacks over polling or Tick. Tick is valid for truly continuous behavior; disable it when idle.
- No new Subsystem, Actor Component, interface, base class, factory, manager, module, or plugin for one consumer unless its Unreal lifetime or reflection boundary requires it.
- Add reflection macros only for reflection, GC, serialization, replication, editor, or Blueprint needs. Never remove required metadata to shorten code.
- Use `NewObject`, `CreateDefaultSubobject`, or `SpawnActor` for UObjects/Actors; use tracked or valid weak object references; respect game-thread-only APIs.
- Use Unreal types at reflected, serialized, replicated, Blueprint, and engine API boundaries; otherwise match the codebase.
- Use direct asset references when load lifetime is intentional. Use soft references or Asset Manager only when cooking, async loading, memory residency, or optional content requires them.
- Never hand-edit `.uasset` or `.umap`, and never treat `Binaries`, `Intermediate`, `Saved`, or `DerivedDataCache` as source.
- Confirm asset deletion with Asset Registry/Reference Viewer and account for maps, config, tags, reflection, soft paths, Primary Asset rules, and dynamic loads.
- Mark deliberate shortcuts `// ponytail: <ceiling>; upgrade when <measurable trigger>`.

Never minimize away UObject/Actor lifetime and GC safety, server authority or replication correctness, thread affinity, async completion safety, save/serialization compatibility, cooking and asset reachability, redirect/migration handling, trust-boundary validation, security, crash/data-loss handling, or explicit requirements. Generated headers, reflection macros, module declarations, replication registration, and editor metadata are not bloat when the engine consumes them.

Verify the smallest relevant target build and one focused automation/spec or reproducible smoke check. Asset and Blueprint changes also need an editor validation step; if it was not run, state the exact manual check instead of claiming success.

(This file also governs work on the Ponytail UE4.27 fork.)
