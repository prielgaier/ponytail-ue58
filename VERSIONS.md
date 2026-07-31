# Unreal Engine version branches

Each branch contains version-scoped skills, compact rules, hooks, examples,
benchmarks, and tests. Do not use one branch's instructions for a different
engine version: APIs, modules, plugin maturity, deprecations, and editor
behavior can differ between releases.

| Engine | Branch | Status |
|---|---|---|
| UE 5.8 | [`main`](https://github.com/prielgaier/ponytail-ue58/tree/main), [`ue5.8`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.8) | Default |
| UE 5.7 | [`ue5.7`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.7) | Version-scoped |
| UE 5.6 | [`ue5.6`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.6) | Version-scoped |
| UE 5.5 | [`ue5.5`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.5) | Version-scoped |
| UE 5.4 | [`ue5.4`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.4) | Version-scoped |
| UE 5.3 | [`ue5.3`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.3) | Version-scoped |
| UE 5.2 | [`ue5.2`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.2) | Version-scoped |
| UE 5.1 | [`ue5.1`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.1) | Version-scoped |
| UE 5.0 | [`ue5.0`](https://github.com/prielgaier/ponytail-ue58/tree/ue5.0) | Version-scoped |
| UE 4.27 | [`ue4.27`](https://github.com/prielgaier/ponytail-ue58/tree/ue4.27) | Legacy modern baseline |

`main` remains UE5.8. Older engine variants are distributed as source branches;
the default Claude marketplace commands install `main`. Clone or download the
required branch when using an older engine version.

The repository and adapter identifier remains `ponytail-ue58` on every branch
so existing host configuration, command names, and state paths stay compatible.
The selected branch and `ENGINE_VERSION` define the actual engine scope.

Version branches are generated from the validated UE5.8 base with
`node scripts/specialize-engine-version.js <version>`. UE4.27 also removes the
UE5-only StateTree recommendation. Agents must still inspect the project's
exact engine association and enabled plugins before choosing an API.
