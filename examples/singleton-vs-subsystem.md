# Singleton versus Unreal lifetime

**Request:** "Create a global matchmaking service."

## Ponytail UE4.27 decision

First inspect the existing Online/EOS integration and owning lifetime. Reuse
it if present. If a new project service is genuinely required, choose the
narrowest matching Subsystem:

- `ULocalPlayerSubsystem` for per-local-player state.
- `UGameInstanceSubsystem` across world travel within one game instance.
- `UWorldSubsystem` for world-bound state.
- `UEngineSubsystem` only for process-wide engine lifetime.

Do not hand-roll a static UObject singleton. A Subsystem is not automatically
minimal either; keep one-use behavior in its current owner when no global
lifetime is required.
