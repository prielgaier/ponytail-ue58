# Replicated health

**Request:** "Make this health variable visible on clients with the fewest lines."

## Wrong shortcut

Updating health independently on every client is shorter source code but breaks
authority, cheating resistance, late join, and reconciliation.

## Ponytail UE5.8

Keep mutation authoritative, replicate the state, and use RepNotify only when a
client-side reaction is needed. Register the property for replication and
preserve ownership/relevancy rules. Those lines are engine-consumed behavior,
not boilerplate.

Verify dedicated/listen server, at least one remote client, late join when
relevant, and the smallest server/client target builds.
