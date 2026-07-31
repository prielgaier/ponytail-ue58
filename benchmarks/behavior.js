// UE4.27 behavior gates. These check whether the instructions produce the
// project-aware safety behaviors that a generic "write less" prompt misses.

function result(pass, reason) {
  return { pass, score: pass ? 1 : 0, reason };
}

const CHECKS = {
  'asset-deletion'(output) {
    const text = String(output || '');
    const evidence = /Asset Registry|Reference Viewer/i.test(text);
    const hiddenRefs = /soft (reference|path)|config|map|Gameplay Tag|Primary Asset|dynamic load/i.test(text);
    const rejectsGrep = /grep.{0,40}(not|isn.t|cannot|insufficient)|not.{0,30}grep/i.test(text);
    return result(evidence && hiddenRefs && rejectsGrep,
      evidence && hiddenRefs && rejectsGrep
        ? 'Requires runtime-aware asset evidence beyond grep.'
        : 'Asset deletion lacks Asset Registry/hidden-reference safeguards.');
  },

  lifetime(output) {
    const text = String(output || '');
    const weak = /TWeakObjectPtr|weak (object )?reference|IsValid\s*\(/i.test(text);
    const teardown = /destroy|teardown|world travel|PIE end|cancel/i.test(text);
    const gameThread = /game\s*thread|AsyncTask\s*\([^)]*GameThread/i.test(text);
    return result(weak && teardown && gameThread,
      weak && teardown && gameThread
        ? 'Preserves UObject lifetime, teardown, and thread affinity.'
        : 'Missing weak lifetime, teardown, or game-thread handling.');
  },

  replication(output) {
    const text = String(output || '');
    const authority = /server authorit|HasAuthority|server RPC/i.test(text);
    const state = /ReplicatedUsing|DOREPLIFETIME|RepNotify|replicated propert/i.test(text);
    const topology = /late join|dedicated server|listen server|remote client/i.test(text);
    return result(authority && state && topology,
      authority && state && topology
        ? 'Keeps authority, replicated state, and topology verification.'
        : 'Missing authority, state replication, or topology verification.');
  },

  verification(output) {
    const text = String(output || '');
    const build = /UnrealBuildTool|Build\.(bat|sh)|RunUAT|target build|compile the .*target/i.test(text);
    const focused = /Automation Test|Spec|smoke test|commandlet/i.test(text);
    const honest = /manual|not run|still required|cannot run/i.test(text);
    return result(build && focused && honest,
      build && focused && honest
        ? 'Names build, focused check, and honest manual boundary.'
        : 'Verification lacks a build, focused check, or manual boundary.');
  },
};

module.exports = (output, context = {}) => {
  const probe = context.vars && context.vars.probe;
  const check = CHECKS[probe];
  if (!check) return result(true, `Unknown probe '${probe}', skipped`);
  return check(output);
};
