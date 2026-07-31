# Ponytail UE5.4 MCP

Serves the same mode-aware Unreal Engine 5.4 instructions used by the plugin
hooks. It is private repository tooling, not a published npm package.

```bash
npm install
node index.js
```

Available modes: `lite`, `full`, `ultra`. The default still follows
`PONYTAIL_DEFAULT_MODE` and the Ponytail config file for adapter compatibility.

Run its tests with `npm test`.
