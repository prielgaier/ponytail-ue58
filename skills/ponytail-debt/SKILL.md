---
name: ponytail-debt
description: >
  Collect every Ponytail shortcut marker in an Unreal Engine 5.6 project into a
  debt ledger with its ceiling, measurable upgrade trigger, owning module or
  asset, and required editor/runtime verification. Use for /ponytail-debt,
  shortcut ledgers, deferred UE work, or questions about Ponytail compromises.
  Read and report only.
---

# Ponytail UE5.6 debt ledger

Collect deliberate shortcuts marked as:

`ponytail: <ceiling>; upgrade when <measurable trigger>`

## Scan

Search source, Build.cs, config, scripts, and text assets while skipping `.git`,
`Binaries`, `Intermediate`, `Saved`, and `DerivedDataCache`. Recognize `//`,
`#`, and `;` comment prefixes. Use `rg -n "ponytail:"` when available.

For every marker, record:

`<file>:<line> | owner/module | ceiling | upgrade trigger | verification boundary`

Verification boundaries include editor asset validation, Blueprint compile,
target build, network topology, cook/package, async teardown, or runtime
profiling. Pull facts from the marker and nearby code; do not invent them.

Tag a marker:

- `no-trigger` when no measurable revisit condition exists.
- `stale` when the trigger is already met with repository evidence.
- `asset-check` when the upgrade touches binary assets or reachability.
- `network-check` when authority or replication is involved.

End with `<N> markers; <M> no-trigger; <S> stale; <A> asset/editor checks.`
Nothing found: `No ponytail: debt. Clean UE5.6 ledger.`

Read and report only. Write a ledger file only when explicitly requested.
