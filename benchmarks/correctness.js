// Structural correctness gate for UE5.8 benchmark prompts. The benchmark
// environment does not ship the engine, so this checks the load-bearing UE API
// and safety choices. Real projects must additionally build and run the checks
// described by the skill.

function identifyTask(task) {
  const text = String(task || '').toLowerCase();
  if (text.includes('respawn') && text.includes('5 seconds')) return 'timer';
  if (text.includes('replicated health')) return 'replication';
  if (text.includes('optional skin') && text.includes('unloaded')) return 'soft-asset';
  if (text.includes('private cpp') && text.includes('build.cs')) return 'private-dependency';
  if (text.includes('batch rename') && text.includes('assets')) return 'editor-assets';
  return null;
}

function result(pass, reason) {
  return { pass, score: pass ? 1 : 0, reason };
}

const CHECKS = {
  timer(source) {
    const usesTimer = /FTimerManager|GetWorldTimerManager\s*\(|SetTimer\s*\(/i.test(source);
    const addsTick = /PrimaryActorTick\.bCanEverTick\s*=\s*true|void\s+\w*Tick\s*\(/i.test(source);
    return result(usesTimer && !addsTick,
      usesTimer && !addsTick ? 'Uses a UE timer without adding Tick.' : 'Expected TimerManager/SetTimer and no new Tick.');
  },

  replication(source) {
    const replicated = /ReplicatedUsing|\bReplicated\b|DOREPLIFETIME/i.test(source);
    const registered = /DOREPLIFETIME|GetLifetimeReplicatedProps/i.test(source);
    const authoritative = /HasAuthority\s*\(|ROLE_Authority|\bServer\w*\s*\(|UFUNCTION\s*\([^)]*Server/i.test(source);
    return result(replicated && registered && authoritative,
      replicated && registered && authoritative
        ? 'Preserves authoritative replicated state and registration.'
        : 'Expected authority plus replicated-property registration.');
  },

  'soft-asset'(source) {
    const soft = /TSoftObjectPtr|TSoftClassPtr|FSoftObjectPath/i.test(source);
    const load = /RequestAsyncLoad|LoadSynchronous|UAssetManager|FStreamableManager/i.test(source);
    const hardConstructor = /ConstructorHelpers::FObjectFinder/i.test(source);
    return result(soft && load && !hardConstructor,
      soft && load && !hardConstructor
        ? 'Uses a soft reference with an explicit load path.'
        : 'Expected a soft reference/load path and no constructor hard load.');
  },

  'private-dependency'(source) {
    const privateDep = /PrivateDependencyModuleNames[\s\S]*Add(?:Range)?/i.test(source);
    const publicDep = /PublicDependencyModuleNames[\s\S]*TargetModule/i.test(source);
    return result(privateDep && !publicDep,
      privateDep && !publicDep
        ? 'Keeps a private implementation dependency private.'
        : 'Expected TargetModule in PrivateDependencyModuleNames only.');
  },

  'editor-assets'(source) {
    const supported = /AssetRegistry|AssetTools|Editor Utility|Unreal Python|commandlet|RenameAssets/i.test(source);
    const binaryEdit = /hex editor|edit (the )?\.uasset|write bytes|binary patch/i.test(source);
    return result(supported && !binaryEdit,
      supported && !binaryEdit
        ? 'Uses a supported Unreal editor/asset API.'
        : 'Expected AssetRegistry/AssetTools/editor automation and no binary edits.');
  },
};

module.exports = (output, context = {}) => {
  const task = identifyTask(context.vars && context.vars.task);
  if (!task) return result(true, 'Unknown task, skipped correctness check');
  const source = String(output || '');
  if (!source.trim()) return result(false, 'Empty output');
  return CHECKS[task](source);
};
