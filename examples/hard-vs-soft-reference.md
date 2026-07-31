# Hard versus soft asset reference

**Request:** "Convert every asset pointer to a soft reference to reduce memory."

## Ponytail UE5.0

Do not bulk-convert. A hard reference is the smaller and safer choice when the
owner and asset intentionally share load lifetime. A soft reference adds asset
resolution, async/failure paths, cook reachability, cancellation, and teardown
handling.

Use a soft reference or Asset Manager when optional content, streaming,
downloadable content, or measured residency requires decoupled loading. Verify
the cook and exercise load failure plus world teardown.
