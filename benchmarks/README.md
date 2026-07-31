# UE5.5 benchmark harness

This fork does not reuse upstream FastAPI/React measurements as Unreal claims.
The harness checks whether Ponytail UE5.5 produces smaller engine-native choices
without dropping critical Unreal boundaries.

## Deterministic local tests

```bash
node --test ../tests/correctness.test.js ../tests/behavior.test.js
```

These structural gates need no Unreal installation or API key. They verify:

- timers instead of unnecessary Tick;
- authoritative registered replication;
- soft loading for explicitly optional unloaded assets;
- private `Build.cs` dependency placement;
- supported asset/editor automation;
- asset reachability evidence, UObject lifetime, threading, and honest verification.

They do not prove runtime correctness. Real UE projects must also compile the
target and run the focused editor/runtime checks named by the skill.

## Optional model evaluation

```bash
npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml --repeat 10
npx promptfoo@latest eval -c benchmarks/behavior.yaml --repeat 10
```

Set the provider API key required by the selected config. Compare correctness
first, then source LOC and telemetry. Do not publish FPS, memory, package-size,
cook-time, cost, or latency claims without a pinned UE5.5 fixture, identical
hardware/target/configuration, repeated runs, and before/after artifacts.
