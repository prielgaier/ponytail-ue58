# UE5.7 verification ladder

Run the cheapest check that can actually fail for the changed behavior, then move outward only as risk requires.

1. **Static inspection:** confirm includes, module dependencies, reflection metadata, config/asset paths, authority, lifetime, and callers/references.
2. **Smallest build:** compile the touched game/editor/server/client target and configuration with the project's documented UBT command.
3. **Focused automated check:** run the nearest Automation Test, Spec, commandlet, or deterministic test for non-trivial logic.
4. **Editor validation:** compile affected Blueprints, load touched assets/maps, check logs, and save only when references and schemas resolve.
5. **Runtime path:** exercise standalone/PIE, dedicated or listen server, client count, travel, async load, or packaging only when the change touches that boundary.

Never invent an engine path or build command. Discover it from the `.uproject`, engine association, installed engine, target files, scripts, or project documentation.

Report checks as one of:

- `passed: <exact command/check>`
- `failed: <exact command/check> — <first actionable error>`
- `manual: <exact editor/runtime steps still required>`

Do not say "verified" when only source inspection ran.
