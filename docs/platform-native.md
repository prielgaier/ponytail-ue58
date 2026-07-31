# UE5.1 engine-native decision map

Use this as a decision aid, not a mandate. The project's established pattern
wins when it already solves the same problem safely.

## Lifecycle and communication

| You think you need | Check first | Important boundary |
|---|---|---|
| Per-frame polling | engine callback, delegate, timer, latent action, animation notify | Tick is valid for genuinely continuous behavior; disable it when idle |
| Custom event bus | native/multicast delegate or Blueprint dispatcher | use a broader message system only when the project already standardizes on it |
| Global singleton | narrowest matching Engine, GameInstance, World, or LocalPlayer Subsystem | a plain owner is smaller when global lifetime is not required |
| Custom object factory | `NewObject`, `CreateDefaultSubobject`, `SpawnActor`, existing factory API | never raw-allocate a UObject |
| Manual component discovery cache | stored validated reference or normal component lookup | cache only after a measured hot path and handle teardown |

## Gameplay

| Need | Check first | Add more only when |
|---|---|---|
| Character locomotion | existing `UCharacterMovementComponent` behavior | measured requirements exceed it |
| Input mapping | Enhanced Input when enabled | the project has a platform/device requirement it cannot express |
| Cooldown/delay | owner timer; existing GAS cooldown when GAS is already adopted | multiple real owners need shared coordination |
| Cross-system category | existing Gameplay Tags | a local closed set is not simpler as an enum or `FName` |
| AI decision flow | existing Behavior Tree, StateTree, EQS, and navigation setup | a demonstrated gap requires custom control flow |
| Reusable Actor behavior | existing class first, Actor Component for real composition/reuse | one consumer or one call site does not justify extraction |

## Data, config, and persistence

| Need | Check first | Boundary |
|---|---|---|
| Fixed constant | local constant/default | do not create config nobody changes |
| Project/user setting | existing config or `UDeveloperSettings` | keep secrets out of committed config |
| Designer-authored object data | existing Blueprint defaults or Data Asset | do not create an asset type for one fixed value |
| Tabular authored data | existing Data Table and row struct | schema changes require migration/reimport/editor validation |
| Save data | existing `USaveGame` path and versioning | backend/cloud persistence must be explicit |

## Assets and loading

| Need | Check first | Boundary |
|---|---|---|
| Always-loaded dependency | direct asset reference | simplest when both objects intentionally share lifetime |
| Optional/streamed content | soft object/class reference and existing Asset Manager rules | adds resolution, failure, cook, and async teardown paths |
| Asset search | Asset Registry | text grep cannot see binary, soft, tag, map, config, or dynamic references |
| Batch editor operation | Asset Tools, commandlet, Editor Utility, or Unreal Python | do not hand-edit `.uasset`/`.umap` |
| Renamed reflected symbol/asset | project redirect/migration convention | verify load, resave, cook, and removal timing |

## Networking

| Need | Check first | Boundary |
|---|---|---|
| Replicated state | replicated property plus RepNotify | preserve authority, ownership, relevancy, dormancy, late join |
| Client action | server RPC with validated authoritative mutation | client data is untrusted |
| Cosmetic event | multicast/client path only when state replication cannot express it | do not make cosmetic work authoritative state |
| Large replicated collection | normal replicated state first | Fast Array/custom replication earns itself only with measured scale |

## C++ and module surface

| You think you need | Check first |
|---|---|
| New module/plugin | existing project module and enabled plugin set |
| Public dependency | private dependency or forward declaration if the public API does not expose it |
| New reflected type | plain type when reflection/GC/serialization/replication/editor/Blueprint do not need it |
| New interface/base class | direct method/composition until multiple real implementers exist |
| Custom file/path/math/algorithm helper | `FPaths`, `FFileHelper`, `FMath`, `Algo`, or existing project helper |
| `std` versus UE container/string rewrite | match the codebase; use UE types at engine/reflected/serialized/replicated/Blueprint boundaries |

## Verification

The minimal change is unfinished until the smallest relevant target builds and
one focused check covers non-trivial logic. Blueprint and asset work also needs
an editor validation step. Network, async load, travel, cook, and package tests
are required only when the changed boundary reaches them.
