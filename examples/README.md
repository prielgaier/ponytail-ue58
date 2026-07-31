# UE5.2 examples

These examples show the decisions Ponytail UE5.2 is designed to produce. They
are authored behavioral fixtures, not measured benchmark output.

| Request | Smaller UE5.2 path |
|---|---|
| [Run a check every second](tick-vs-timer.md) | `FTimerManager`, not Actor Tick |
| [Create a global service](singleton-vs-subsystem.md) | narrow UE lifetime, not a hand-rolled singleton |
| [Extract one-use behavior](component-yagni.md) | keep it in the owner until reuse/lifecycle is real |
| [Reference an asset](hard-vs-soft-reference.md) | choose by load lifetime, not fashion |
| [Replicate health](replication-boundary.md) | preserve authority and late-join state |
| [Use another module](build-dependency.md) | smallest correct `Build.cs` dependency surface |

The expected result is not always the fewest C++ lines. Reflection,
replication, serialization, cooking, and asset metadata count as required when
UE5.2 consumes them.
