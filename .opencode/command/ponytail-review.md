---
description: Review a UE5.4 diff for removable architecture and engine duplication
---

Review the current UE5.4 diff for over-engineering only. Inspect the `.uproject`, affected modules, Blueprint/C++ boundary, and reference flow. Use `<file>:L<line>: <tag> <cut>. <UE/project-native replacement>.` Tags: `delete`, `native`, `tick`, `layer`, `reflect`, `dependency`, `shrink`. Never call an asset dead from grep alone or remove required GC, replication, serialization, cook, redirect, or editor metadata. End with measurable cuts. If none: `Lean for UE5.4 already. Ship.`
