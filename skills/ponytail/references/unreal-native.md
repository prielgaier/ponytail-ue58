# UE5.3 native-first map

Use this map after inspecting the project. An existing project convention beats a generic recommendation.

| Need | Reach for first | Add more only when |
|---|---|---|
| Delayed or periodic work | `FTimerManager`, an existing callback, delegate, or notify | Work is truly per-frame or needs another scheduler's guarantees |
| Cross-object notification | Native/multicast delegates, Blueprint dispatchers | The project already uses a broader message framework for the same domain |
| Service lifetime | The narrowest matching `UWorldSubsystem`, `UGameInstanceSubsystem`, `ULocalPlayerSubsystem`, or `UEngineSubsystem` | A plain owner cannot express the required lifetime |
| Player input | Enhanced Input when already enabled | Platform-specific or generated input needs a lower-level path |
| Save data | `USaveGame` and existing serialization/versioning conventions | Backend/cloud persistence is an explicit requirement |
| Tunable project settings | `UDeveloperSettings` or config | The value is runtime content authored per asset/row |
| Reusable authored data | Existing Data Asset/Data Table/Blueprint defaults | The value is fixed and can stay a constant |
| Asset discovery/loading | Direct reference for shared lifetime; soft references/Asset Manager for optional or streamed content | Profiling or cook boundaries prove a custom loader is necessary |
| Categories queried across systems | Existing Gameplay Tags | A local closed set is simpler as an enum or `FName` |
| Character locomotion | Existing `UCharacterMovementComponent` behavior | Measured requirements exceed it |
| AI flow | Existing Behavior Tree, StateTree, EQS, and Navigation setup | The project has a proven gap the native system cannot cover |
| Network state | Replicated properties and RepNotify; RPCs for actions | High-volume collections justify Fast Array or a custom replication path |
| Ability/cooldown/effects | Existing GAS setup | GAS is not enabled and the feature is genuinely local and small |
| Editor batch work | Asset Tools, Asset Registry, commandlets, Editor Utility, or Unreal Python | The supported API cannot express the operation |
| File/path/math/algorithms | `FPaths`, `FFileHelper`, `FMath`, `Algo`, existing engine helpers | A supported standard-library option is already the project convention and stays behind non-reflected boundaries |

## Boundary choices

- Keep one-use behavior in the owning Actor/Object. Extract an Actor Component when reuse, independent activation, replication, or editor composition is real.
- Create an interface only for multiple unrelated implementers or a required Blueprint contract.
- Create a plugin only for independently reusable/distributable capability. A project feature belongs in an existing project module.
- Create an editor module only when code must load exclusively in editor targets.
- Prefer a hard reference when both objects intentionally share load lifetime. Soft references are not automatically "better"; they add resolution and failure paths.
- Prefer Blueprint for existing authored orchestration and C++ for existing systems, replication, low-level engine integration, or measured hot paths. Match the project instead of enforcing ideology.
