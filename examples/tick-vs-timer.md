# Tick versus timer

**Request:** "Check once per second whether this pickup can respawn."

## Over-built

- Enable Actor Tick.
- Accumulate `DeltaSeconds`.
- Branch every frame.
- Keep ticking while the pickup is active and while the world is tearing down.

## Ponytail UE5.2

Schedule the one future transition with `FTimerManager` and clear/replace the
handle with the owner's normal lifecycle. Tick is for truly continuous work,
not a one-second alarm.

```cpp
GetWorldTimerManager().SetTimer(RespawnHandle, this,
    &APickup::Respawn, RespawnDelay, false);
```

The relevant verification is pickup destruction/world teardown plus the
smallest target build and a focused respawn smoke check.
