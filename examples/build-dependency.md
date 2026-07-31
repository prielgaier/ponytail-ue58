# Build.cs dependency surface

**Request:** "Add another engine module so this `.cpp` can call one API."

## Ponytail UE5.2

1. Check whether the owning module already depends on it transitively only by accident; declare direct dependencies that public/private code genuinely uses.
2. Put a dependency in `PrivateDependencyModuleNames` when public headers do not expose its types.
3. Promote it to `PublicDependencyModuleNames` only when the module's public API requires it.
4. Do not enable an entire plugin when an already-enabled project or engine module covers the need.

Compile the smallest affected target. A successful IDE parse is not a UBT
verification.
