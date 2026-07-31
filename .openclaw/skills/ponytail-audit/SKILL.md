---
name: ponytail-audit
description: "Audit a UE5.4 repository for unnecessary systems, Tick usage, reflection, dependencies, and asset-loading complexity."
homepage: https://github.com/prielgaier/ponytail-ue58
license: MIT
---

# Ponytail UE5.4 audit

Audit the complete UE5.4 project, not only the diff. Read the `.uproject`,
`.uplugin`, targets, `Build.cs`, config, source layout, content roots, and project
instructions first. Skip `Binaries`, `Intermediate`, `Saved`, and
`DerivedDataCache`.

## Hunt

- Enabled plugins and module dependencies with no verified consumer.
- Tick-enabled classes whose work can be event-, delegate-, timer-, notify-, or callback-driven.
- One-use managers, Subsystems, Actor Components, interfaces, base classes, factories, and editor modules.
- Reflected functions/properties/types with no GC, serialization, replication, editor, or Blueprint consumer.
- Wrappers around UE5.4 facilities already used elsewhere in the project.
- Duplicate settings, Data Assets, Data Tables, Gameplay Tags, input mappings, and project helpers.
- Hard/soft asset-reference complexity that does not match the intended load lifetime.
- Source or assets that are safe to delete with runtime-aware reference evidence.

Use the review tags: `delete`, `native`, `tick`, `layer`, `reflect`,
`dependency`, `shrink`.

## Evidence and boundaries

Do not infer asset deletion from text search. Confirm with Asset Registry or
Reference Viewer evidence and account for maps, config, tags, reflection, soft
paths, Primary Asset rules, and dynamic loading. Preserve UObject lifetime,
authority/replication, threading, save/serialization compatibility, cooking,
redirects/migrations, crash/data-loss handling, and explicit requirements.

## Output

Rank highest-confidence, largest cuts first:

`<tag> <what to cut>. <replacement>. [path/evidence]`

End with:

`net: -<N> source lines, -<M> reflected members, -<P> module/plugin dependencies possible; <A> asset deletions verified, <U> need editor verification.`

If nothing is safely removable: `Lean for UE5.4 already. Ship.` Report only.
