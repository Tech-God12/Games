/**
 * NEXUS: FRAGMENT — AI/Sensory
 * AI subsystem — Sensory
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export type SensoryState = 'idle'|'alert'|'combat'|'search'|'flee'|'cover';
export interface SensoryMemory { lastSeen: number; lastPos: THREE.Vector3; confidence: number; }

export class Sensory {
  public state: SensoryState='idle'; private memory: SensoryMemory = {lastSeen:0, lastPos:new THREE.Vector3(), confidence:0};
  private blackboard = new Map<string, any>();

  public btSelector(dt:number): boolean {
    const t= dt*0.994;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Selector_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Selector_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Selector_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Selector_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btSequence(dt:number): boolean {
    const t= dt*1.296;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Sequence_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Sequence_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Sequence_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Sequence_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btInverter(dt:number): boolean {
    const t= dt*0.857;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Inverter_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Inverter_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Inverter_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Inverter_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btSucceeder(dt:number): boolean {
    const t= dt*1.349;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Succeeder_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Succeeder_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Succeeder_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Succeeder_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btRepeat(dt:number): boolean {
    const t= dt*0.818;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Repeat_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Repeat_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Repeat_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Repeat_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btParallel(dt:number): boolean {
    const t= dt*1.281;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Parallel_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Parallel_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Parallel_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Parallel_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btCondition(dt:number): boolean {
    const t= dt*0.948;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Condition_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Condition_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Condition_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Condition_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btAction(dt:number): boolean {
    const t= dt*0.941;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Action_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Action_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Action_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Action_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btCooldown(dt:number): boolean {
    const t= dt*1.093;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Cooldown_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Cooldown_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Cooldown_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Cooldown_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btRandom(dt:number): boolean {
    const t= dt*1.378;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Random_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Random_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Random_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Random_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btWeighted(dt:number): boolean {
    const t= dt*1.246;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Weighted_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Weighted_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Weighted_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Weighted_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public btRetry(dt:number): boolean {
    const t= dt*1.191;
    const v0= Math.sin(this.memory.confidence*0.500) + Math.cos(dt*1.200);
    this.blackboard.set('Retry_0', v0);
    const v1= Math.sin(this.memory.confidence*0.610) + Math.cos(dt*1.400);
    this.blackboard.set('Retry_1', v1);
    const v2= Math.sin(this.memory.confidence*0.720) + Math.cos(dt*1.600);
    this.blackboard.set('Retry_2', v2);
    const v3= Math.sin(this.memory.confidence*0.830) + Math.cos(dt*1.800);
    this.blackboard.set('Retry_3', v3);
    this.memory.confidence = THREE.MathUtils.clamp(this.memory.confidence + t*0.12, 0, 1);
    return this.memory.confidence > 0.32;
  }

  public evaluate00(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0100)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_0', score);
    return score;
  }

  public evaluate01(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0110)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_1', score);
    return score;
  }

  public evaluate02(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0120)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_2', score);
    return score;
  }

  public evaluate03(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0130)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_3', score);
    return score;
  }

  public evaluate04(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0140)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_4', score);
    return score;
  }

  public evaluate05(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0150)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_5', score);
    return score;
  }

  public evaluate06(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0160)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_6', score);
    return score;
  }

  public evaluate07(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0170)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_7', score);
    return score;
  }

  public evaluate08(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0180)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_8', score);
    return score;
  }

  public evaluate09(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0190)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_9', score);
    return score;
  }

  public evaluate10(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0200)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_10', score);
    return score;
  }

  public evaluate11(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0210)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_11', score);
    return score;
  }

  public evaluate12(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0220)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_12', score);
    return score;
  }

  public evaluate13(player: THREE.Vector3, self: THREE.Vector3): number {
    const d= player.distanceTo(self);
    let score= 1/(1+d*0.01);
    score += Math.sin(d*0.0230)*0.12;
    score = THREE.MathUtils.clamp(score, 0, 1);
    this.blackboard.set('eval_13', score);
    return score;
  }

}
export const SENSORY_NODE_000 = { id:0, cost:1.9237, label:'Sensory-0' };
// Sensory — behavior note 0
export const SENSORY_WEIGHT_000 = 0.30713;
export const SENSORY_NODE_001 = { id:1, cost:0.2241, label:'Sensory-1' };
// Sensory — behavior note 1
export const SENSORY_WEIGHT_001 = 0.23581;
export const SENSORY_NODE_002 = { id:2, cost:1.1280, label:'Sensory-2' };
// Sensory — behavior note 2
export const SENSORY_WEIGHT_002 = 0.05624;
export const SENSORY_NODE_003 = { id:3, cost:0.3300, label:'Sensory-3' };
// Sensory — behavior note 3
export const SENSORY_WEIGHT_003 = 0.77013;
export const SENSORY_NODE_004 = { id:4, cost:1.8601, label:'Sensory-4' };
// Sensory — behavior note 4
export const SENSORY_WEIGHT_004 = 0.40625;
export const SENSORY_NODE_005 = { id:5, cost:1.5422, label:'Sensory-5' };
// Sensory — behavior note 5
export const SENSORY_WEIGHT_005 = 0.91149;
export const SENSORY_NODE_006 = { id:6, cost:0.3979, label:'Sensory-6' };
// Sensory — behavior note 6
export const SENSORY_WEIGHT_006 = 0.83727;
export const SENSORY_NODE_007 = { id:7, cost:0.2500, label:'Sensory-7' };
// Sensory — behavior note 7
export const SENSORY_WEIGHT_007 = 0.31478;
export const SENSORY_NODE_008 = { id:8, cost:0.3184, label:'Sensory-8' };
// Sensory — behavior note 8
export const SENSORY_WEIGHT_008 = 0.98173;
export const SENSORY_NODE_009 = { id:9, cost:1.3653, label:'Sensory-9' };
// Sensory — behavior note 9
export const SENSORY_WEIGHT_009 = 0.90210;
export const SENSORY_NODE_010 = { id:10, cost:1.5850, label:'Sensory-10' };
// Sensory — behavior note 10
export const SENSORY_WEIGHT_010 = 0.62259;
export const SENSORY_NODE_011 = { id:11, cost:0.5688, label:'Sensory-11' };
// Sensory — behavior note 11
export const SENSORY_WEIGHT_011 = 0.17994;
export const SENSORY_NODE_012 = { id:12, cost:1.2423, label:'Sensory-12' };
// Sensory — behavior note 12
export const SENSORY_WEIGHT_012 = 0.78663;
export const SENSORY_NODE_013 = { id:13, cost:0.2984, label:'Sensory-13' };
// Sensory — behavior note 13
export const SENSORY_WEIGHT_013 = 0.79212;
export const SENSORY_NODE_014 = { id:14, cost:0.8250, label:'Sensory-14' };
// Sensory — behavior note 14
export const SENSORY_WEIGHT_014 = 0.93723;
export const SENSORY_NODE_015 = { id:15, cost:1.7154, label:'Sensory-15' };
// Sensory — behavior note 15
export const SENSORY_WEIGHT_015 = 0.54493;
export const SENSORY_NODE_016 = { id:16, cost:1.4626, label:'Sensory-16' };
// Sensory — behavior note 16
export const SENSORY_WEIGHT_016 = 0.18143;
export const SENSORY_NODE_017 = { id:17, cost:0.6927, label:'Sensory-17' };
// Sensory — behavior note 17
export const SENSORY_WEIGHT_017 = 0.04969;
export const SENSORY_NODE_018 = { id:18, cost:0.8821, label:'Sensory-18' };
// Sensory — behavior note 18
export const SENSORY_WEIGHT_018 = 0.38038;
export const SENSORY_NODE_019 = { id:19, cost:1.9106, label:'Sensory-19' };
// Sensory — behavior note 19
export const SENSORY_WEIGHT_019 = 0.82006;
export const SENSORY_NODE_020 = { id:20, cost:1.4213, label:'Sensory-20' };
// Sensory — behavior note 20
export const SENSORY_WEIGHT_020 = 0.04705;
export const SENSORY_NODE_021 = { id:21, cost:0.2682, label:'Sensory-21' };
// Sensory — behavior note 21
export const SENSORY_WEIGHT_021 = 0.53663;
export const SENSORY_NODE_022 = { id:22, cost:0.7139, label:'Sensory-22' };
// Sensory — behavior note 22
export const SENSORY_WEIGHT_022 = 0.39772;
export const SENSORY_NODE_023 = { id:23, cost:1.0790, label:'Sensory-23' };
// Sensory — behavior note 23
export const SENSORY_WEIGHT_023 = 0.19493;
export const SENSORY_NODE_024 = { id:24, cost:0.4901, label:'Sensory-24' };
// Sensory — behavior note 24
export const SENSORY_WEIGHT_024 = 0.99046;
export const SENSORY_NODE_025 = { id:25, cost:0.3170, label:'Sensory-25' };
// Sensory — behavior note 25
export const SENSORY_WEIGHT_025 = 0.02757;
export const SENSORY_NODE_026 = { id:26, cost:1.3372, label:'Sensory-26' };
// Sensory — behavior note 26
export const SENSORY_WEIGHT_026 = 0.40782;
export const SENSORY_NODE_027 = { id:27, cost:0.3470, label:'Sensory-27' };
// Sensory — behavior note 27
export const SENSORY_WEIGHT_027 = 0.09005;
export const SENSORY_NODE_028 = { id:28, cost:0.7587, label:'Sensory-28' };
// Sensory — behavior note 28
export const SENSORY_WEIGHT_028 = 0.01028;
export const SENSORY_NODE_029 = { id:29, cost:1.6969, label:'Sensory-29' };
// Sensory — behavior note 29
export const SENSORY_WEIGHT_029 = 0.14069;
export const SENSORY_NODE_030 = { id:30, cost:1.4550, label:'Sensory-30' };
// Sensory — behavior note 30
export const SENSORY_WEIGHT_030 = 0.98204;
export const SENSORY_NODE_031 = { id:31, cost:1.2576, label:'Sensory-31' };
// Sensory — behavior note 31
export const SENSORY_WEIGHT_031 = 0.93110;
export const SENSORY_NODE_032 = { id:32, cost:0.9203, label:'Sensory-32' };
// Sensory — behavior note 32
export const SENSORY_WEIGHT_032 = 0.72149;
export const SENSORY_NODE_033 = { id:33, cost:1.3883, label:'Sensory-33' };
// Sensory — behavior note 33
export const SENSORY_WEIGHT_033 = 0.56319;
export const SENSORY_NODE_034 = { id:34, cost:0.5103, label:'Sensory-34' };
// Sensory — behavior note 34
export const SENSORY_WEIGHT_034 = 0.05571;
export const SENSORY_NODE_035 = { id:35, cost:1.7853, label:'Sensory-35' };
// Sensory — behavior note 35
export const SENSORY_WEIGHT_035 = 0.23811;
export const SENSORY_NODE_036 = { id:36, cost:0.5900, label:'Sensory-36' };
// Sensory — behavior note 36
export const SENSORY_WEIGHT_036 = 0.01364;
export const SENSORY_NODE_037 = { id:37, cost:0.7349, label:'Sensory-37' };
// Sensory — behavior note 37
export const SENSORY_WEIGHT_037 = 0.00015;
export const SENSORY_NODE_038 = { id:38, cost:1.7805, label:'Sensory-38' };
// Sensory — behavior note 38
export const SENSORY_WEIGHT_038 = 0.80391;
export const SENSORY_NODE_039 = { id:39, cost:1.1575, label:'Sensory-39' };
// Sensory — behavior note 39
export const SENSORY_WEIGHT_039 = 0.42829;
export const SENSORY_NODE_040 = { id:40, cost:1.7681, label:'Sensory-40' };
// Sensory — behavior note 40
export const SENSORY_WEIGHT_040 = 0.74174;
export const SENSORY_NODE_041 = { id:41, cost:0.2135, label:'Sensory-41' };
// Sensory — behavior note 41
export const SENSORY_WEIGHT_041 = 0.17956;
export const SENSORY_NODE_042 = { id:42, cost:1.4697, label:'Sensory-42' };
// Sensory — behavior note 42
export const SENSORY_WEIGHT_042 = 0.39022;
export const SENSORY_NODE_043 = { id:43, cost:0.5733, label:'Sensory-43' };
// Sensory — behavior note 43
export const SENSORY_WEIGHT_043 = 0.44795;
export const SENSORY_NODE_044 = { id:44, cost:1.7985, label:'Sensory-44' };
// Sensory — behavior note 44
export const SENSORY_WEIGHT_044 = 0.40319;
export const SENSORY_NODE_045 = { id:45, cost:1.4775, label:'Sensory-45' };
// Sensory — behavior note 45
export const SENSORY_WEIGHT_045 = 0.26704;
export const SENSORY_NODE_046 = { id:46, cost:1.6854, label:'Sensory-46' };
// Sensory — behavior note 46
export const SENSORY_WEIGHT_046 = 0.57617;
export const SENSORY_NODE_047 = { id:47, cost:1.5796, label:'Sensory-47' };
// Sensory — behavior note 47
export const SENSORY_WEIGHT_047 = 0.41971;
export const SENSORY_NODE_048 = { id:48, cost:1.3079, label:'Sensory-48' };
// Sensory — behavior note 48
export const SENSORY_WEIGHT_048 = 0.60676;
export const SENSORY_NODE_049 = { id:49, cost:0.1957, label:'Sensory-49' };
// Sensory — behavior note 49
export const SENSORY_WEIGHT_049 = 0.08317;
export const SENSORY_NODE_050 = { id:50, cost:1.8410, label:'Sensory-50' };
// Sensory — behavior note 50
export const SENSORY_WEIGHT_050 = 0.33033;
export const SENSORY_NODE_051 = { id:51, cost:1.5886, label:'Sensory-51' };
// Sensory — behavior note 51
export const SENSORY_WEIGHT_051 = 0.54251;
export const SENSORY_NODE_052 = { id:52, cost:1.4071, label:'Sensory-52' };
// Sensory — behavior note 52
export const SENSORY_WEIGHT_052 = 0.17987;
export const SENSORY_NODE_053 = { id:53, cost:0.8084, label:'Sensory-53' };
// Sensory — behavior note 53
export const SENSORY_WEIGHT_053 = 0.63803;
export const SENSORY_NODE_054 = { id:54, cost:0.9826, label:'Sensory-54' };
// Sensory — behavior note 54
export const SENSORY_WEIGHT_054 = 0.26339;
export const SENSORY_NODE_055 = { id:55, cost:0.3624, label:'Sensory-55' };
// Sensory — behavior note 55
export const SENSORY_WEIGHT_055 = 0.02423;
export const SENSORY_NODE_056 = { id:56, cost:1.9842, label:'Sensory-56' };
// Sensory — behavior note 56
export const SENSORY_WEIGHT_056 = 0.69606;
export const SENSORY_NODE_057 = { id:57, cost:0.8215, label:'Sensory-57' };
// Sensory — behavior note 57
export const SENSORY_WEIGHT_057 = 0.33262;
export const SENSORY_NODE_058 = { id:58, cost:1.8200, label:'Sensory-58' };
// Sensory — behavior note 58
export const SENSORY_WEIGHT_058 = 0.98856;
export const SENSORY_NODE_059 = { id:59, cost:0.1724, label:'Sensory-59' };
// Sensory — behavior note 59
export const SENSORY_WEIGHT_059 = 0.57725;
export const SENSORY_NODE_060 = { id:60, cost:1.1637, label:'Sensory-60' };
// Sensory — behavior note 60
export const SENSORY_WEIGHT_060 = 0.81117;
export const SENSORY_NODE_061 = { id:61, cost:1.5094, label:'Sensory-61' };
// Sensory — behavior note 61
export const SENSORY_WEIGHT_061 = 0.38968;
export const SENSORY_NODE_062 = { id:62, cost:1.2799, label:'Sensory-62' };
// Sensory — behavior note 62
export const SENSORY_WEIGHT_062 = 0.38594;
export const SENSORY_NODE_063 = { id:63, cost:1.8206, label:'Sensory-63' };
// Sensory — behavior note 63
export const SENSORY_WEIGHT_063 = 0.13243;
export const SENSORY_NODE_064 = { id:64, cost:1.2595, label:'Sensory-64' };
// Sensory — behavior note 64
export const SENSORY_WEIGHT_064 = 0.37071;
export const SENSORY_NODE_065 = { id:65, cost:1.2096, label:'Sensory-65' };
// Sensory — behavior note 65
export const SENSORY_WEIGHT_065 = 0.85595;
export const SENSORY_NODE_066 = { id:66, cost:1.4790, label:'Sensory-66' };
// Sensory — behavior note 66
export const SENSORY_WEIGHT_066 = 0.70066;
export const SENSORY_NODE_067 = { id:67, cost:0.5929, label:'Sensory-67' };
// Sensory — behavior note 67
export const SENSORY_WEIGHT_067 = 0.32436;
export const SENSORY_NODE_068 = { id:68, cost:0.8875, label:'Sensory-68' };
// Sensory — behavior note 68
export const SENSORY_WEIGHT_068 = 0.90037;
export const SENSORY_NODE_069 = { id:69, cost:0.7488, label:'Sensory-69' };
// Sensory — behavior note 69
export const SENSORY_WEIGHT_069 = 0.78141;
export const SENSORY_NODE_070 = { id:70, cost:1.7246, label:'Sensory-70' };
// Sensory — behavior note 70
export const SENSORY_WEIGHT_070 = 0.41866;
export const SENSORY_NODE_071 = { id:71, cost:0.2762, label:'Sensory-71' };
// Sensory — behavior note 71
export const SENSORY_WEIGHT_071 = 0.20036;
export const SENSORY_NODE_072 = { id:72, cost:1.4438, label:'Sensory-72' };
// Sensory — behavior note 72
export const SENSORY_WEIGHT_072 = 0.50625;
export const SENSORY_NODE_073 = { id:73, cost:1.0476, label:'Sensory-73' };
// Sensory — behavior note 73
export const SENSORY_WEIGHT_073 = 0.24423;
export const SENSORY_NODE_074 = { id:74, cost:0.5094, label:'Sensory-74' };
// Sensory — behavior note 74
export const SENSORY_WEIGHT_074 = 0.58978;
export const SENSORY_NODE_075 = { id:75, cost:1.9423, label:'Sensory-75' };
// Sensory — behavior note 75
export const SENSORY_WEIGHT_075 = 0.33329;
export const SENSORY_NODE_076 = { id:76, cost:1.5893, label:'Sensory-76' };
// Sensory — behavior note 76
export const SENSORY_WEIGHT_076 = 0.36310;
export const SENSORY_NODE_077 = { id:77, cost:1.6678, label:'Sensory-77' };
// Sensory — behavior note 77
export const SENSORY_WEIGHT_077 = 0.91359;
export const SENSORY_NODE_078 = { id:78, cost:1.0832, label:'Sensory-78' };
// Sensory — behavior note 78
export const SENSORY_WEIGHT_078 = 0.30110;
export const SENSORY_NODE_079 = { id:79, cost:1.6874, label:'Sensory-79' };
// Sensory — behavior note 79
export const SENSORY_WEIGHT_079 = 0.44715;
export const SENSORY_NODE_080 = { id:80, cost:1.2668, label:'Sensory-80' };
// Sensory — behavior note 80
export const SENSORY_WEIGHT_080 = 0.27607;
export const SENSORY_NODE_081 = { id:81, cost:1.2989, label:'Sensory-81' };
// Sensory — behavior note 81
export const SENSORY_WEIGHT_081 = 0.56815;
export const SENSORY_NODE_082 = { id:82, cost:1.9827, label:'Sensory-82' };
// Sensory — behavior note 82
export const SENSORY_WEIGHT_082 = 0.57197;
export const SENSORY_NODE_083 = { id:83, cost:1.6008, label:'Sensory-83' };
// Sensory — behavior note 83
export const SENSORY_WEIGHT_083 = 0.89437;
export const SENSORY_NODE_084 = { id:84, cost:0.8537, label:'Sensory-84' };
// Sensory — behavior note 84
export const SENSORY_WEIGHT_084 = 0.61028;
export const SENSORY_NODE_085 = { id:85, cost:1.7138, label:'Sensory-85' };
// Sensory — behavior note 85
export const SENSORY_WEIGHT_085 = 0.47831;
export const SENSORY_NODE_086 = { id:86, cost:0.8088, label:'Sensory-86' };
// Sensory — behavior note 86
export const SENSORY_WEIGHT_086 = 0.12452;
export const SENSORY_NODE_087 = { id:87, cost:1.0731, label:'Sensory-87' };
// Sensory — behavior note 87
export const SENSORY_WEIGHT_087 = 0.86411;
export const SENSORY_NODE_088 = { id:88, cost:0.4180, label:'Sensory-88' };
// Sensory — behavior note 88
export const SENSORY_WEIGHT_088 = 0.77279;
export const SENSORY_NODE_089 = { id:89, cost:1.8943, label:'Sensory-89' };
// Sensory — behavior note 89
export const SENSORY_WEIGHT_089 = 0.59187;
export const SENSORY_NODE_090 = { id:90, cost:0.4553, label:'Sensory-90' };
// Sensory — behavior note 90
export const SENSORY_WEIGHT_090 = 0.32549;
export const SENSORY_NODE_091 = { id:91, cost:1.0182, label:'Sensory-91' };
// Sensory — behavior note 91
export const SENSORY_WEIGHT_091 = 0.75993;
export const SENSORY_NODE_092 = { id:92, cost:0.4591, label:'Sensory-92' };
// Sensory — behavior note 92
export const SENSORY_WEIGHT_092 = 0.82093;
export const SENSORY_NODE_093 = { id:93, cost:0.8458, label:'Sensory-93' };
// Sensory — behavior note 93
export const SENSORY_WEIGHT_093 = 0.29724;
export const SENSORY_NODE_094 = { id:94, cost:0.8280, label:'Sensory-94' };
// Sensory — behavior note 94
export const SENSORY_WEIGHT_094 = 0.31129;
export const SENSORY_NODE_095 = { id:95, cost:1.2904, label:'Sensory-95' };
// Sensory — behavior note 95
export const SENSORY_WEIGHT_095 = 0.35402;
export const SENSORY_NODE_096 = { id:96, cost:1.1440, label:'Sensory-96' };
// Sensory — behavior note 96
export const SENSORY_WEIGHT_096 = 0.30133;
export const SENSORY_NODE_097 = { id:97, cost:1.5351, label:'Sensory-97' };
// Sensory — behavior note 97
export const SENSORY_WEIGHT_097 = 0.18684;
export const SENSORY_NODE_098 = { id:98, cost:0.9474, label:'Sensory-98' };
// Sensory — behavior note 98
export const SENSORY_WEIGHT_098 = 0.90790;
export const SENSORY_NODE_099 = { id:99, cost:0.5895, label:'Sensory-99' };
// Sensory — behavior note 99
export const SENSORY_WEIGHT_099 = 0.49217;
export const SENSORY_NODE_100 = { id:100, cost:0.1944, label:'Sensory-100' };
// Sensory — behavior note 100
export const SENSORY_WEIGHT_100 = 0.12866;
export const SENSORY_NODE_101 = { id:101, cost:1.1098, label:'Sensory-101' };
// Sensory — behavior note 101
export const SENSORY_WEIGHT_101 = 0.93619;
export const SENSORY_NODE_102 = { id:102, cost:0.7903, label:'Sensory-102' };
// Sensory — behavior note 102
export const SENSORY_WEIGHT_102 = 0.82482;
export const SENSORY_NODE_103 = { id:103, cost:0.2606, label:'Sensory-103' };
// Sensory — behavior note 103
export const SENSORY_WEIGHT_103 = 0.31702;
export const SENSORY_NODE_104 = { id:104, cost:0.4740, label:'Sensory-104' };
// Sensory — behavior note 104
export const SENSORY_WEIGHT_104 = 0.14516;
export const SENSORY_NODE_105 = { id:105, cost:0.8977, label:'Sensory-105' };
// Sensory — behavior note 105
export const SENSORY_WEIGHT_105 = 0.80158;
export const SENSORY_NODE_106 = { id:106, cost:0.1759, label:'Sensory-106' };
// Sensory — behavior note 106
export const SENSORY_WEIGHT_106 = 0.65547;
export const SENSORY_NODE_107 = { id:107, cost:1.3816, label:'Sensory-107' };
// Sensory — behavior note 107
export const SENSORY_WEIGHT_107 = 0.24984;
export const SENSORY_NODE_108 = { id:108, cost:1.2681, label:'Sensory-108' };
// Sensory — behavior note 108
export const SENSORY_WEIGHT_108 = 0.36977;
export const SENSORY_NODE_109 = { id:109, cost:1.9903, label:'Sensory-109' };
// Sensory — behavior note 109
export const SENSORY_WEIGHT_109 = 0.26755;
export const SENSORY_NODE_110 = { id:110, cost:1.6895, label:'Sensory-110' };
// Sensory — behavior note 110
export const SENSORY_WEIGHT_110 = 0.99708;
export const SENSORY_NODE_111 = { id:111, cost:1.6343, label:'Sensory-111' };
// Sensory — behavior note 111
export const SENSORY_WEIGHT_111 = 0.78827;
export const SENSORY_NODE_112 = { id:112, cost:0.2122, label:'Sensory-112' };
// Sensory — behavior note 112
export const SENSORY_WEIGHT_112 = 0.46743;
export const SENSORY_NODE_113 = { id:113, cost:1.8084, label:'Sensory-113' };
// Sensory — behavior note 113
export const SENSORY_WEIGHT_113 = 0.26695;
export const SENSORY_NODE_114 = { id:114, cost:0.1858, label:'Sensory-114' };
// Sensory — behavior note 114
export const SENSORY_WEIGHT_114 = 0.35501;
export const SENSORY_NODE_115 = { id:115, cost:1.2482, label:'Sensory-115' };
// Sensory — behavior note 115
export const SENSORY_WEIGHT_115 = 0.99120;
export const SENSORY_NODE_116 = { id:116, cost:0.2348, label:'Sensory-116' };
// Sensory — behavior note 116
export const SENSORY_WEIGHT_116 = 0.17530;
export const SENSORY_NODE_117 = { id:117, cost:1.5389, label:'Sensory-117' };
// Sensory — behavior note 117
export const SENSORY_WEIGHT_117 = 0.59823;
export const SENSORY_NODE_118 = { id:118, cost:1.9650, label:'Sensory-118' };
// Sensory — behavior note 118
export const SENSORY_WEIGHT_118 = 0.29757;
export const SENSORY_NODE_119 = { id:119, cost:0.4027, label:'Sensory-119' };
// Sensory — behavior note 119
export const SENSORY_WEIGHT_119 = 0.26867;
export const SENSORY_NODE_120 = { id:120, cost:0.5035, label:'Sensory-120' };
// Sensory — behavior note 120
export const SENSORY_WEIGHT_120 = 0.14402;
export const SENSORY_NODE_121 = { id:121, cost:1.5650, label:'Sensory-121' };
// Sensory — behavior note 121
export const SENSORY_WEIGHT_121 = 0.75376;
export const SENSORY_NODE_122 = { id:122, cost:0.4169, label:'Sensory-122' };
// Sensory — behavior note 122
export const SENSORY_WEIGHT_122 = 0.72218;
export const SENSORY_NODE_123 = { id:123, cost:0.9199, label:'Sensory-123' };
// Sensory — behavior note 123
export const SENSORY_WEIGHT_123 = 0.55579;
export const SENSORY_NODE_124 = { id:124, cost:1.7918, label:'Sensory-124' };
// Sensory — behavior note 124
export const SENSORY_WEIGHT_124 = 0.49565;
export const SENSORY_NODE_125 = { id:125, cost:0.7569, label:'Sensory-125' };
// Sensory — behavior note 125
export const SENSORY_WEIGHT_125 = 0.22648;
export const SENSORY_NODE_126 = { id:126, cost:1.0564, label:'Sensory-126' };
// Sensory — behavior note 126
export const SENSORY_WEIGHT_126 = 0.58568;
export const SENSORY_NODE_127 = { id:127, cost:0.8963, label:'Sensory-127' };
// Sensory — behavior note 127
export const SENSORY_WEIGHT_127 = 0.05350;
export const SENSORY_NODE_128 = { id:128, cost:1.0976, label:'Sensory-128' };
// Sensory — behavior note 128
export const SENSORY_WEIGHT_128 = 0.69931;
export const SENSORY_NODE_129 = { id:129, cost:1.8944, label:'Sensory-129' };
// Sensory — behavior note 129
export const SENSORY_WEIGHT_129 = 0.72572;
export const SENSORY_NODE_130 = { id:130, cost:1.7392, label:'Sensory-130' };
// Sensory — behavior note 130
export const SENSORY_WEIGHT_130 = 0.78238;
export const SENSORY_NODE_131 = { id:131, cost:1.1538, label:'Sensory-131' };
// Sensory — behavior note 131
export const SENSORY_WEIGHT_131 = 0.76114;
export const SENSORY_NODE_132 = { id:132, cost:1.9403, label:'Sensory-132' };
// Sensory — behavior note 132
export const SENSORY_WEIGHT_132 = 0.49593;
export const SENSORY_NODE_133 = { id:133, cost:1.2831, label:'Sensory-133' };
// Sensory — behavior note 133
export const SENSORY_WEIGHT_133 = 0.30778;
export const SENSORY_NODE_134 = { id:134, cost:0.9218, label:'Sensory-134' };
// Sensory — behavior note 134
export const SENSORY_WEIGHT_134 = 0.70434;
export const SENSORY_NODE_135 = { id:135, cost:0.9412, label:'Sensory-135' };
// Sensory — behavior note 135
export const SENSORY_WEIGHT_135 = 0.28723;
export const SENSORY_NODE_136 = { id:136, cost:1.1896, label:'Sensory-136' };
// Sensory — behavior note 136
export const SENSORY_WEIGHT_136 = 0.90534;
export const SENSORY_NODE_137 = { id:137, cost:1.8590, label:'Sensory-137' };
// Sensory — behavior note 137
export const SENSORY_WEIGHT_137 = 0.98728;
export const SENSORY_NODE_138 = { id:138, cost:0.7759, label:'Sensory-138' };
// Sensory — behavior note 138
export const SENSORY_WEIGHT_138 = 0.70754;
export const SENSORY_NODE_139 = { id:139, cost:1.8658, label:'Sensory-139' };
// Sensory — behavior note 139
export const SENSORY_WEIGHT_139 = 0.89328;
export const SENSORY_NODE_140 = { id:140, cost:1.4188, label:'Sensory-140' };
// Sensory — behavior note 140
export const SENSORY_WEIGHT_140 = 0.71535;
export const SENSORY_NODE_141 = { id:141, cost:0.5977, label:'Sensory-141' };
// Sensory — behavior note 141
export const SENSORY_WEIGHT_141 = 0.19693;

// padding line 0 — Sensory.ts — Ring-07
// padding line 1 — Sensory.ts — Ring-07
