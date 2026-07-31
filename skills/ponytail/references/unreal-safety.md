# UE5.2 safety boundaries

Read the relevant section before simplifying code or assets in that area.

## UObject and Actor lifetime

- Never allocate a `UObject` with raw `new` or destroy it with raw `delete`.
- Preserve references required by GC, serialization, replication, editor exposure, or Blueprint access.
- Use weak references for non-owning relationships that can outlive their target; validate before use.
- Respect CDO, constructor, `PostInitProperties`, `BeginPlay`, component registration, teardown, world travel, and PIE lifecycle differences.
- Do not capture short-lived UObjects blindly in delayed, async, delegate, or timer callbacks.

## Networking

- Preserve server authority and ownership rules. Client input is untrusted.
- Do not remove replication registration, RepNotify behavior, RPC direction/reliability, relevancy, dormancy, or prediction just to reduce lines.
- Keep cosmetic work separate from authoritative state mutation.
- Treat listen server, dedicated server, late join, reconnect, and teardown as distinct paths when the feature touches them.

## Assets, cooking, and editor data

- Never infer asset reachability from source grep alone. Check Asset Registry/Reference Viewer plus config, maps, tags, soft paths, Primary Asset rules, redirectors, and dynamic loads.
- Never hand-edit binary assets. Use the editor, commandlets, supported Python/editor APIs, or import/reimport.
- Never save an asset that has unresolved parent classes, row structs, missing imports, or broken references.
- Preserve redirects and explicit data migrations when reflected names or serialized layouts change.
- Confirm new assets and plugin content are included by the intended cook/package rules.

## Threads and async work

- Keep UObject mutation and game-thread-only engine APIs on the game thread.
- Define ownership and cancellation for async loads, tasks, HTTP callbacks, and latent work.
- Guard completion callbacks against world teardown, PIE end, actor destruction, and stale weak references.

## Generated and transient output

Treat `Binaries`, `Intermediate`, `Saved`, and `DerivedDataCache` as disposable output, not implementation. Do not patch generated headers or generated project files. Change the source configuration and regenerate.
