#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const correctness = require('../benchmarks/correctness');

function check(task, output) {
  return correctness(output, { vars: { task } });
}

test('timer: TimerManager without Tick passes', () => {
  const result = check(
    'In Unreal Engine 5.5 C++, make an Actor respawn once after 5 seconds. It currently has Tick disabled.',
    'GetWorldTimerManager().SetTimer(RespawnHandle, this, &APickup::Respawn, 5.0f, false);',
  );
  assert.equal(result.pass, true);
});

test('timer: adding Tick for a one-shot delay fails', () => {
  const result = check(
    'In Unreal Engine 5.5 C++, make an Actor respawn once after 5 seconds. It currently has Tick disabled.',
    'PrimaryActorTick.bCanEverTick = true;\nvoid APickup::Tick(float DeltaSeconds) { Elapsed += DeltaSeconds; }',
  );
  assert.equal(result.pass, false);
});

test('replication: authority plus property registration passes', () => {
  const result = check(
    'Implement server-authoritative replicated health in Unreal Engine 5.5 C++ so remote clients and late joiners receive state.',
    `UPROPERTY(ReplicatedUsing=OnRep_Health) float Health;
void AUnit::ApplyDamage(float Amount) { if (HasAuthority()) Health -= Amount; }
void AUnit::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& Out) const {
  Super::GetLifetimeReplicatedProps(Out); DOREPLIFETIME(AUnit, Health);
}`,
  );
  assert.equal(result.pass, true);
});

test('replication: local client variable fails', () => {
  const result = check(
    'Implement server-authoritative replicated health in Unreal Engine 5.5 C++ so remote clients and late joiners receive state.',
    'float Health; void ApplyDamage(float Amount) { Health -= Amount; }',
  );
  assert.equal(result.pass, false);
});

test('optional asset: soft reference with load path passes', () => {
  const result = check(
    'In UE5.5 C++, reference an optional skin that should remain unloaded until selected, then load it safely.',
    'UPROPERTY(EditDefaultsOnly) TSoftObjectPtr<USkeletalMesh> Skin;\nSkin.LoadSynchronous();',
  );
  assert.equal(result.pass, true);
});

test('optional asset: constructor hard load fails', () => {
  const result = check(
    'In UE5.5 C++, reference an optional skin that should remain unloaded until selected, then load it safely.',
    'static ConstructorHelpers::FObjectFinder<USkeletalMesh> Skin(TEXT("/Game/Skin"));',
  );
  assert.equal(result.pass, false);
});

test('Build.cs: private cpp dependency stays private', () => {
  const result = check(
    'A private cpp file needs TargetModule in this UE5.5 module. Show the smallest correct Build.cs dependency change.',
    'PrivateDependencyModuleNames.Add("TargetModule");',
  );
  assert.equal(result.pass, true);
});

test('Build.cs: exposing private dependency publicly fails', () => {
  const result = check(
    'A private cpp file needs TargetModule in this UE5.5 module. Show the smallest correct Build.cs dependency change.',
    'PublicDependencyModuleNames.Add("TargetModule");',
  );
  assert.equal(result.pass, false);
});

test('editor assets: AssetTools automation passes', () => {
  const result = check(
    'Batch rename Unreal Engine 5.5 assets while preserving references. Give the supported minimal editor automation path.',
    'Use Asset Registry to collect assets and AssetTools.RenameAssets to rename them, then fix redirectors in the editor.',
  );
  assert.equal(result.pass, true);
});

test('editor assets: binary patching fails', () => {
  const result = check(
    'Batch rename Unreal Engine 5.5 assets while preserving references. Give the supported minimal editor automation path.',
    'Open every .uasset in a hex editor and write bytes for the new names.',
  );
  assert.equal(result.pass, false);
});

test('unknown task is skipped', () => {
  const result = check('Explain quantum computing.', 'No UE code.');
  assert.equal(result.pass, true);
  assert.match(result.reason, /unknown task/i);
});
