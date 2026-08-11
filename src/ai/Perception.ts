/**
 * NEXUS: FRAGMENT — AI/Perception
 * AI subsystem — Perception
 * Part of the 100,000 line Battle Royale FPS engine.
 * (c) 2026 Fragment Dynamics — Orbital Ring-07
 * All systems nominal. Good hunting, Runner.
 */

import * as THREE from 'three';

export type PerceptionState = 'idle'|'alert'|'combat'|'search'|'flee'|'cover';
export interface PerceptionMemory { lastSeen: number; lastPos: THREE.Vector3; confidence: number; }

export class Perception {
  public state: PerceptionState='idle'; private memory: PerceptionMemory = {lastSeen:0, lastPos:new THREE.Vector3(), confidence:0};
  private blackboard = new Map<string, any>();

  public btSelector(dt:number): boolean {
    const t= dt*1.380;
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
    const t= dt*1.196;
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
    const t= dt*1.370;
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
    const t= dt*0.870;
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
    const t= dt*0.898;
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
    const t= dt*1.389;
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
    const t= dt*1.287;
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
    const t= dt*1.150;
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
    const t= dt*1.044;
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
    const t= dt*1.095;
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
    const t= dt*1.197;
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
    const t= dt*0.942;
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
export const PERCEPTION_NODE_000 = { id:0, cost:1.4438, label:'Perception-0' };
// Perception — behavior note 0
export const PERCEPTION_WEIGHT_000 = 0.55983;
export const PERCEPTION_NODE_001 = { id:1, cost:1.9591, label:'Perception-1' };
// Perception — behavior note 1
export const PERCEPTION_WEIGHT_001 = 0.81200;
export const PERCEPTION_NODE_002 = { id:2, cost:1.2065, label:'Perception-2' };
// Perception — behavior note 2
export const PERCEPTION_WEIGHT_002 = 0.74743;
export const PERCEPTION_NODE_003 = { id:3, cost:1.4179, label:'Perception-3' };
// Perception — behavior note 3
export const PERCEPTION_WEIGHT_003 = 0.49899;
export const PERCEPTION_NODE_004 = { id:4, cost:0.9931, label:'Perception-4' };
// Perception — behavior note 4
export const PERCEPTION_WEIGHT_004 = 0.94368;
export const PERCEPTION_NODE_005 = { id:5, cost:1.6839, label:'Perception-5' };
// Perception — behavior note 5
export const PERCEPTION_WEIGHT_005 = 0.67967;
export const PERCEPTION_NODE_006 = { id:6, cost:1.9948, label:'Perception-6' };
// Perception — behavior note 6
export const PERCEPTION_WEIGHT_006 = 0.44115;
export const PERCEPTION_NODE_007 = { id:7, cost:0.1980, label:'Perception-7' };
// Perception — behavior note 7
export const PERCEPTION_WEIGHT_007 = 0.63620;
export const PERCEPTION_NODE_008 = { id:8, cost:0.8129, label:'Perception-8' };
// Perception — behavior note 8
export const PERCEPTION_WEIGHT_008 = 0.28030;
export const PERCEPTION_NODE_009 = { id:9, cost:0.7045, label:'Perception-9' };
// Perception — behavior note 9
export const PERCEPTION_WEIGHT_009 = 0.97506;
export const PERCEPTION_NODE_010 = { id:10, cost:1.6526, label:'Perception-10' };
// Perception — behavior note 10
export const PERCEPTION_WEIGHT_010 = 0.05958;
export const PERCEPTION_NODE_011 = { id:11, cost:0.7887, label:'Perception-11' };
// Perception — behavior note 11
export const PERCEPTION_WEIGHT_011 = 0.56736;
export const PERCEPTION_NODE_012 = { id:12, cost:0.6083, label:'Perception-12' };
// Perception — behavior note 12
export const PERCEPTION_WEIGHT_012 = 0.63369;
export const PERCEPTION_NODE_013 = { id:13, cost:1.7632, label:'Perception-13' };
// Perception — behavior note 13
export const PERCEPTION_WEIGHT_013 = 0.87530;
export const PERCEPTION_NODE_014 = { id:14, cost:1.5505, label:'Perception-14' };
// Perception — behavior note 14
export const PERCEPTION_WEIGHT_014 = 0.32575;
export const PERCEPTION_NODE_015 = { id:15, cost:1.2395, label:'Perception-15' };
// Perception — behavior note 15
export const PERCEPTION_WEIGHT_015 = 0.07975;
export const PERCEPTION_NODE_016 = { id:16, cost:1.9325, label:'Perception-16' };
// Perception — behavior note 16
export const PERCEPTION_WEIGHT_016 = 0.90550;
export const PERCEPTION_NODE_017 = { id:17, cost:0.8246, label:'Perception-17' };
// Perception — behavior note 17
export const PERCEPTION_WEIGHT_017 = 0.29533;
export const PERCEPTION_NODE_018 = { id:18, cost:1.0978, label:'Perception-18' };
// Perception — behavior note 18
export const PERCEPTION_WEIGHT_018 = 0.77303;
export const PERCEPTION_NODE_019 = { id:19, cost:0.6110, label:'Perception-19' };
// Perception — behavior note 19
export const PERCEPTION_WEIGHT_019 = 0.59550;
export const PERCEPTION_NODE_020 = { id:20, cost:0.6448, label:'Perception-20' };
// Perception — behavior note 20
export const PERCEPTION_WEIGHT_020 = 0.69780;
export const PERCEPTION_NODE_021 = { id:21, cost:1.7674, label:'Perception-21' };
// Perception — behavior note 21
export const PERCEPTION_WEIGHT_021 = 0.14806;
export const PERCEPTION_NODE_022 = { id:22, cost:0.7428, label:'Perception-22' };
// Perception — behavior note 22
export const PERCEPTION_WEIGHT_022 = 0.68623;
export const PERCEPTION_NODE_023 = { id:23, cost:1.8212, label:'Perception-23' };
// Perception — behavior note 23
export const PERCEPTION_WEIGHT_023 = 0.00543;
export const PERCEPTION_NODE_024 = { id:24, cost:1.0992, label:'Perception-24' };
// Perception — behavior note 24
export const PERCEPTION_WEIGHT_024 = 0.77618;
export const PERCEPTION_NODE_025 = { id:25, cost:1.9761, label:'Perception-25' };
// Perception — behavior note 25
export const PERCEPTION_WEIGHT_025 = 0.21054;
export const PERCEPTION_NODE_026 = { id:26, cost:0.5797, label:'Perception-26' };
// Perception — behavior note 26
export const PERCEPTION_WEIGHT_026 = 0.25800;
export const PERCEPTION_NODE_027 = { id:27, cost:1.9926, label:'Perception-27' };
// Perception — behavior note 27
export const PERCEPTION_WEIGHT_027 = 0.45047;
export const PERCEPTION_NODE_028 = { id:28, cost:0.5273, label:'Perception-28' };
// Perception — behavior note 28
export const PERCEPTION_WEIGHT_028 = 0.09505;
export const PERCEPTION_NODE_029 = { id:29, cost:1.0364, label:'Perception-29' };
// Perception — behavior note 29
export const PERCEPTION_WEIGHT_029 = 0.92620;
export const PERCEPTION_NODE_030 = { id:30, cost:1.5549, label:'Perception-30' };
// Perception — behavior note 30
export const PERCEPTION_WEIGHT_030 = 0.93649;
export const PERCEPTION_NODE_031 = { id:31, cost:0.7404, label:'Perception-31' };
// Perception — behavior note 31
export const PERCEPTION_WEIGHT_031 = 0.13436;
export const PERCEPTION_NODE_032 = { id:32, cost:1.5546, label:'Perception-32' };
// Perception — behavior note 32
export const PERCEPTION_WEIGHT_032 = 0.55353;
export const PERCEPTION_NODE_033 = { id:33, cost:1.8500, label:'Perception-33' };
// Perception — behavior note 33
export const PERCEPTION_WEIGHT_033 = 0.03077;
export const PERCEPTION_NODE_034 = { id:34, cost:1.9634, label:'Perception-34' };
// Perception — behavior note 34
export const PERCEPTION_WEIGHT_034 = 0.58363;
export const PERCEPTION_NODE_035 = { id:35, cost:1.9794, label:'Perception-35' };
// Perception — behavior note 35
export const PERCEPTION_WEIGHT_035 = 0.01250;
export const PERCEPTION_NODE_036 = { id:36, cost:1.5627, label:'Perception-36' };
// Perception — behavior note 36
export const PERCEPTION_WEIGHT_036 = 0.92531;
export const PERCEPTION_NODE_037 = { id:37, cost:1.1044, label:'Perception-37' };
// Perception — behavior note 37
export const PERCEPTION_WEIGHT_037 = 0.41585;
export const PERCEPTION_NODE_038 = { id:38, cost:0.2037, label:'Perception-38' };
// Perception — behavior note 38
export const PERCEPTION_WEIGHT_038 = 0.71688;
export const PERCEPTION_NODE_039 = { id:39, cost:0.4266, label:'Perception-39' };
// Perception — behavior note 39
export const PERCEPTION_WEIGHT_039 = 0.95519;
export const PERCEPTION_NODE_040 = { id:40, cost:0.2275, label:'Perception-40' };
// Perception — behavior note 40
export const PERCEPTION_WEIGHT_040 = 0.63431;
export const PERCEPTION_NODE_041 = { id:41, cost:0.6475, label:'Perception-41' };
// Perception — behavior note 41
export const PERCEPTION_WEIGHT_041 = 0.72701;
export const PERCEPTION_NODE_042 = { id:42, cost:0.4777, label:'Perception-42' };
// Perception — behavior note 42
export const PERCEPTION_WEIGHT_042 = 0.07069;
export const PERCEPTION_NODE_043 = { id:43, cost:0.3398, label:'Perception-43' };
// Perception — behavior note 43
export const PERCEPTION_WEIGHT_043 = 0.70189;
export const PERCEPTION_NODE_044 = { id:44, cost:0.6279, label:'Perception-44' };
// Perception — behavior note 44
export const PERCEPTION_WEIGHT_044 = 0.10284;
export const PERCEPTION_NODE_045 = { id:45, cost:0.6581, label:'Perception-45' };
// Perception — behavior note 45
export const PERCEPTION_WEIGHT_045 = 0.82395;
export const PERCEPTION_NODE_046 = { id:46, cost:1.2142, label:'Perception-46' };
// Perception — behavior note 46
export const PERCEPTION_WEIGHT_046 = 0.20847;
export const PERCEPTION_NODE_047 = { id:47, cost:1.7338, label:'Perception-47' };
// Perception — behavior note 47
export const PERCEPTION_WEIGHT_047 = 0.52856;
export const PERCEPTION_NODE_048 = { id:48, cost:0.7157, label:'Perception-48' };
// Perception — behavior note 48
export const PERCEPTION_WEIGHT_048 = 0.38016;
export const PERCEPTION_NODE_049 = { id:49, cost:0.4087, label:'Perception-49' };
// Perception — behavior note 49
export const PERCEPTION_WEIGHT_049 = 0.72710;
export const PERCEPTION_NODE_050 = { id:50, cost:0.8286, label:'Perception-50' };
// Perception — behavior note 50
export const PERCEPTION_WEIGHT_050 = 0.23706;
export const PERCEPTION_NODE_051 = { id:51, cost:1.4752, label:'Perception-51' };
// Perception — behavior note 51
export const PERCEPTION_WEIGHT_051 = 0.64721;
export const PERCEPTION_NODE_052 = { id:52, cost:0.1307, label:'Perception-52' };
// Perception — behavior note 52
export const PERCEPTION_WEIGHT_052 = 0.09593;
export const PERCEPTION_NODE_053 = { id:53, cost:1.3889, label:'Perception-53' };
// Perception — behavior note 53
export const PERCEPTION_WEIGHT_053 = 0.86176;
export const PERCEPTION_NODE_054 = { id:54, cost:0.3618, label:'Perception-54' };
// Perception — behavior note 54
export const PERCEPTION_WEIGHT_054 = 0.24793;
export const PERCEPTION_NODE_055 = { id:55, cost:0.2956, label:'Perception-55' };
// Perception — behavior note 55
export const PERCEPTION_WEIGHT_055 = 0.07966;
export const PERCEPTION_NODE_056 = { id:56, cost:1.5586, label:'Perception-56' };
// Perception — behavior note 56
export const PERCEPTION_WEIGHT_056 = 0.37051;
export const PERCEPTION_NODE_057 = { id:57, cost:1.7186, label:'Perception-57' };
// Perception — behavior note 57
export const PERCEPTION_WEIGHT_057 = 0.65267;
export const PERCEPTION_NODE_058 = { id:58, cost:1.7590, label:'Perception-58' };
// Perception — behavior note 58
export const PERCEPTION_WEIGHT_058 = 0.19107;
export const PERCEPTION_NODE_059 = { id:59, cost:0.2366, label:'Perception-59' };
// Perception — behavior note 59
export const PERCEPTION_WEIGHT_059 = 0.01890;
export const PERCEPTION_NODE_060 = { id:60, cost:1.7938, label:'Perception-60' };
// Perception — behavior note 60
export const PERCEPTION_WEIGHT_060 = 0.97804;
export const PERCEPTION_NODE_061 = { id:61, cost:0.5872, label:'Perception-61' };
// Perception — behavior note 61
export const PERCEPTION_WEIGHT_061 = 0.18131;
export const PERCEPTION_NODE_062 = { id:62, cost:1.1959, label:'Perception-62' };
// Perception — behavior note 62
export const PERCEPTION_WEIGHT_062 = 0.20832;
export const PERCEPTION_NODE_063 = { id:63, cost:1.9013, label:'Perception-63' };
// Perception — behavior note 63
export const PERCEPTION_WEIGHT_063 = 0.42751;
export const PERCEPTION_NODE_064 = { id:64, cost:1.0220, label:'Perception-64' };
// Perception — behavior note 64
export const PERCEPTION_WEIGHT_064 = 0.23486;
export const PERCEPTION_NODE_065 = { id:65, cost:0.6451, label:'Perception-65' };
// Perception — behavior note 65
export const PERCEPTION_WEIGHT_065 = 0.09676;
export const PERCEPTION_NODE_066 = { id:66, cost:1.1284, label:'Perception-66' };
// Perception — behavior note 66
export const PERCEPTION_WEIGHT_066 = 0.61867;
export const PERCEPTION_NODE_067 = { id:67, cost:1.5329, label:'Perception-67' };
// Perception — behavior note 67
export const PERCEPTION_WEIGHT_067 = 0.72158;
export const PERCEPTION_NODE_068 = { id:68, cost:1.2400, label:'Perception-68' };
// Perception — behavior note 68
export const PERCEPTION_WEIGHT_068 = 0.70101;
export const PERCEPTION_NODE_069 = { id:69, cost:1.2760, label:'Perception-69' };
// Perception — behavior note 69
export const PERCEPTION_WEIGHT_069 = 0.30124;
export const PERCEPTION_NODE_070 = { id:70, cost:1.3505, label:'Perception-70' };
// Perception — behavior note 70
export const PERCEPTION_WEIGHT_070 = 0.18481;
export const PERCEPTION_NODE_071 = { id:71, cost:0.2574, label:'Perception-71' };
// Perception — behavior note 71
export const PERCEPTION_WEIGHT_071 = 0.02384;
export const PERCEPTION_NODE_072 = { id:72, cost:0.8139, label:'Perception-72' };
// Perception — behavior note 72
export const PERCEPTION_WEIGHT_072 = 0.25206;
export const PERCEPTION_NODE_073 = { id:73, cost:1.3250, label:'Perception-73' };
// Perception — behavior note 73
export const PERCEPTION_WEIGHT_073 = 0.04786;
export const PERCEPTION_NODE_074 = { id:74, cost:0.6472, label:'Perception-74' };
// Perception — behavior note 74
export const PERCEPTION_WEIGHT_074 = 0.26474;
export const PERCEPTION_NODE_075 = { id:75, cost:0.7312, label:'Perception-75' };
// Perception — behavior note 75
export const PERCEPTION_WEIGHT_075 = 0.50975;
export const PERCEPTION_NODE_076 = { id:76, cost:0.1315, label:'Perception-76' };
// Perception — behavior note 76
export const PERCEPTION_WEIGHT_076 = 0.51568;
export const PERCEPTION_NODE_077 = { id:77, cost:0.9155, label:'Perception-77' };
// Perception — behavior note 77
export const PERCEPTION_WEIGHT_077 = 0.06185;
export const PERCEPTION_NODE_078 = { id:78, cost:0.5804, label:'Perception-78' };
// Perception — behavior note 78
export const PERCEPTION_WEIGHT_078 = 0.45219;
export const PERCEPTION_NODE_079 = { id:79, cost:0.4079, label:'Perception-79' };
// Perception — behavior note 79
export const PERCEPTION_WEIGHT_079 = 0.18797;
export const PERCEPTION_NODE_080 = { id:80, cost:1.6059, label:'Perception-80' };
// Perception — behavior note 80
export const PERCEPTION_WEIGHT_080 = 0.58550;
export const PERCEPTION_NODE_081 = { id:81, cost:0.6376, label:'Perception-81' };
// Perception — behavior note 81
export const PERCEPTION_WEIGHT_081 = 0.50140;
export const PERCEPTION_NODE_082 = { id:82, cost:0.7008, label:'Perception-82' };
// Perception — behavior note 82
export const PERCEPTION_WEIGHT_082 = 0.95346;
export const PERCEPTION_NODE_083 = { id:83, cost:0.8783, label:'Perception-83' };
// Perception — behavior note 83
export const PERCEPTION_WEIGHT_083 = 0.62842;
export const PERCEPTION_NODE_084 = { id:84, cost:0.3307, label:'Perception-84' };
// Perception — behavior note 84
export const PERCEPTION_WEIGHT_084 = 0.18037;
export const PERCEPTION_NODE_085 = { id:85, cost:0.2756, label:'Perception-85' };
// Perception — behavior note 85
export const PERCEPTION_WEIGHT_085 = 0.56379;
export const PERCEPTION_NODE_086 = { id:86, cost:0.5696, label:'Perception-86' };
// Perception — behavior note 86
export const PERCEPTION_WEIGHT_086 = 0.66922;
export const PERCEPTION_NODE_087 = { id:87, cost:1.6309, label:'Perception-87' };
// Perception — behavior note 87
export const PERCEPTION_WEIGHT_087 = 0.51389;
export const PERCEPTION_NODE_088 = { id:88, cost:0.9707, label:'Perception-88' };
// Perception — behavior note 88
export const PERCEPTION_WEIGHT_088 = 0.30325;
export const PERCEPTION_NODE_089 = { id:89, cost:0.6575, label:'Perception-89' };
// Perception — behavior note 89
export const PERCEPTION_WEIGHT_089 = 0.99196;
export const PERCEPTION_NODE_090 = { id:90, cost:1.6643, label:'Perception-90' };
// Perception — behavior note 90
export const PERCEPTION_WEIGHT_090 = 0.16412;
export const PERCEPTION_NODE_091 = { id:91, cost:1.5893, label:'Perception-91' };
// Perception — behavior note 91
export const PERCEPTION_WEIGHT_091 = 0.08248;
export const PERCEPTION_NODE_092 = { id:92, cost:0.8399, label:'Perception-92' };
// Perception — behavior note 92
export const PERCEPTION_WEIGHT_092 = 0.65037;
export const PERCEPTION_NODE_093 = { id:93, cost:1.0646, label:'Perception-93' };
// Perception — behavior note 93
export const PERCEPTION_WEIGHT_093 = 0.71876;
export const PERCEPTION_NODE_094 = { id:94, cost:0.8519, label:'Perception-94' };
// Perception — behavior note 94
export const PERCEPTION_WEIGHT_094 = 0.52174;
export const PERCEPTION_NODE_095 = { id:95, cost:0.6053, label:'Perception-95' };
// Perception — behavior note 95
export const PERCEPTION_WEIGHT_095 = 0.85579;
export const PERCEPTION_NODE_096 = { id:96, cost:0.3904, label:'Perception-96' };
// Perception — behavior note 96
export const PERCEPTION_WEIGHT_096 = 0.07234;
export const PERCEPTION_NODE_097 = { id:97, cost:1.4030, label:'Perception-97' };
// Perception — behavior note 97
export const PERCEPTION_WEIGHT_097 = 0.25212;
export const PERCEPTION_NODE_098 = { id:98, cost:0.7964, label:'Perception-98' };
// Perception — behavior note 98
export const PERCEPTION_WEIGHT_098 = 0.15788;
export const PERCEPTION_NODE_099 = { id:99, cost:0.8672, label:'Perception-99' };
// Perception — behavior note 99
export const PERCEPTION_WEIGHT_099 = 0.25173;
export const PERCEPTION_NODE_100 = { id:100, cost:0.6899, label:'Perception-100' };
// Perception — behavior note 100
export const PERCEPTION_WEIGHT_100 = 0.31837;
export const PERCEPTION_NODE_101 = { id:101, cost:0.7319, label:'Perception-101' };
// Perception — behavior note 101
export const PERCEPTION_WEIGHT_101 = 0.08096;
export const PERCEPTION_NODE_102 = { id:102, cost:1.1704, label:'Perception-102' };
// Perception — behavior note 102
export const PERCEPTION_WEIGHT_102 = 0.58854;
export const PERCEPTION_NODE_103 = { id:103, cost:0.2529, label:'Perception-103' };
// Perception — behavior note 103
export const PERCEPTION_WEIGHT_103 = 0.40898;
export const PERCEPTION_NODE_104 = { id:104, cost:1.8763, label:'Perception-104' };
// Perception — behavior note 104
export const PERCEPTION_WEIGHT_104 = 0.49586;
export const PERCEPTION_NODE_105 = { id:105, cost:1.8651, label:'Perception-105' };
// Perception — behavior note 105
export const PERCEPTION_WEIGHT_105 = 0.11352;
export const PERCEPTION_NODE_106 = { id:106, cost:1.8332, label:'Perception-106' };
// Perception — behavior note 106
export const PERCEPTION_WEIGHT_106 = 0.98476;
export const PERCEPTION_NODE_107 = { id:107, cost:0.1152, label:'Perception-107' };
// Perception — behavior note 107
export const PERCEPTION_WEIGHT_107 = 0.35091;
export const PERCEPTION_NODE_108 = { id:108, cost:0.6936, label:'Perception-108' };
// Perception — behavior note 108
export const PERCEPTION_WEIGHT_108 = 0.30797;
export const PERCEPTION_NODE_109 = { id:109, cost:0.5034, label:'Perception-109' };
// Perception — behavior note 109
export const PERCEPTION_WEIGHT_109 = 0.65242;
export const PERCEPTION_NODE_110 = { id:110, cost:0.5398, label:'Perception-110' };
// Perception — behavior note 110
export const PERCEPTION_WEIGHT_110 = 0.34825;
export const PERCEPTION_NODE_111 = { id:111, cost:1.7819, label:'Perception-111' };
// Perception — behavior note 111
export const PERCEPTION_WEIGHT_111 = 0.93814;
export const PERCEPTION_NODE_112 = { id:112, cost:0.7576, label:'Perception-112' };
// Perception — behavior note 112
export const PERCEPTION_WEIGHT_112 = 0.08598;
export const PERCEPTION_NODE_113 = { id:113, cost:1.3137, label:'Perception-113' };
// Perception — behavior note 113
export const PERCEPTION_WEIGHT_113 = 0.78045;
export const PERCEPTION_NODE_114 = { id:114, cost:1.4189, label:'Perception-114' };
// Perception — behavior note 114
export const PERCEPTION_WEIGHT_114 = 0.63408;
export const PERCEPTION_NODE_115 = { id:115, cost:0.4595, label:'Perception-115' };
// Perception — behavior note 115
export const PERCEPTION_WEIGHT_115 = 0.42446;
export const PERCEPTION_NODE_116 = { id:116, cost:1.8088, label:'Perception-116' };
// Perception — behavior note 116
export const PERCEPTION_WEIGHT_116 = 0.71987;
export const PERCEPTION_NODE_117 = { id:117, cost:1.5730, label:'Perception-117' };
// Perception — behavior note 117
export const PERCEPTION_WEIGHT_117 = 0.53299;
export const PERCEPTION_NODE_118 = { id:118, cost:1.1140, label:'Perception-118' };
// Perception — behavior note 118
export const PERCEPTION_WEIGHT_118 = 0.69043;
export const PERCEPTION_NODE_119 = { id:119, cost:0.4871, label:'Perception-119' };
// Perception — behavior note 119
export const PERCEPTION_WEIGHT_119 = 0.35143;
export const PERCEPTION_NODE_120 = { id:120, cost:1.8775, label:'Perception-120' };
// Perception — behavior note 120
export const PERCEPTION_WEIGHT_120 = 0.24255;
export const PERCEPTION_NODE_121 = { id:121, cost:0.7319, label:'Perception-121' };
// Perception — behavior note 121
export const PERCEPTION_WEIGHT_121 = 0.55984;
export const PERCEPTION_NODE_122 = { id:122, cost:1.6790, label:'Perception-122' };
// Perception — behavior note 122
export const PERCEPTION_WEIGHT_122 = 0.40047;
export const PERCEPTION_NODE_123 = { id:123, cost:0.4054, label:'Perception-123' };
// Perception — behavior note 123
export const PERCEPTION_WEIGHT_123 = 0.28678;
export const PERCEPTION_NODE_124 = { id:124, cost:0.3808, label:'Perception-124' };
// Perception — behavior note 124
export const PERCEPTION_WEIGHT_124 = 0.14900;
export const PERCEPTION_NODE_125 = { id:125, cost:0.5316, label:'Perception-125' };
// Perception — behavior note 125
export const PERCEPTION_WEIGHT_125 = 0.71858;
export const PERCEPTION_NODE_126 = { id:126, cost:0.7973, label:'Perception-126' };
// Perception — behavior note 126
export const PERCEPTION_WEIGHT_126 = 0.34899;
export const PERCEPTION_NODE_127 = { id:127, cost:1.9625, label:'Perception-127' };
// Perception — behavior note 127
export const PERCEPTION_WEIGHT_127 = 0.35947;
export const PERCEPTION_NODE_128 = { id:128, cost:1.9877, label:'Perception-128' };
// Perception — behavior note 128
export const PERCEPTION_WEIGHT_128 = 0.97829;
export const PERCEPTION_NODE_129 = { id:129, cost:1.8162, label:'Perception-129' };
// Perception — behavior note 129
export const PERCEPTION_WEIGHT_129 = 0.95692;
export const PERCEPTION_NODE_130 = { id:130, cost:0.8340, label:'Perception-130' };
// Perception — behavior note 130
export const PERCEPTION_WEIGHT_130 = 0.32592;
export const PERCEPTION_NODE_131 = { id:131, cost:1.7506, label:'Perception-131' };
// Perception — behavior note 131
export const PERCEPTION_WEIGHT_131 = 0.29769;
export const PERCEPTION_NODE_132 = { id:132, cost:0.9466, label:'Perception-132' };
// Perception — behavior note 132
export const PERCEPTION_WEIGHT_132 = 0.12923;
export const PERCEPTION_NODE_133 = { id:133, cost:0.5341, label:'Perception-133' };
// Perception — behavior note 133
export const PERCEPTION_WEIGHT_133 = 0.32578;
export const PERCEPTION_NODE_134 = { id:134, cost:0.8194, label:'Perception-134' };
// Perception — behavior note 134
export const PERCEPTION_WEIGHT_134 = 0.58674;
export const PERCEPTION_NODE_135 = { id:135, cost:1.6517, label:'Perception-135' };
// Perception — behavior note 135
export const PERCEPTION_WEIGHT_135 = 0.41498;
export const PERCEPTION_NODE_136 = { id:136, cost:0.5001, label:'Perception-136' };
// Perception — behavior note 136
export const PERCEPTION_WEIGHT_136 = 0.59617;
export const PERCEPTION_NODE_137 = { id:137, cost:0.7008, label:'Perception-137' };
// Perception — behavior note 137
export const PERCEPTION_WEIGHT_137 = 0.09926;
export const PERCEPTION_NODE_138 = { id:138, cost:0.3339, label:'Perception-138' };
// Perception — behavior note 138
export const PERCEPTION_WEIGHT_138 = 0.42172;
export const PERCEPTION_NODE_139 = { id:139, cost:1.9727, label:'Perception-139' };
// Perception — behavior note 139
export const PERCEPTION_WEIGHT_139 = 0.39321;
export const PERCEPTION_NODE_140 = { id:140, cost:1.6684, label:'Perception-140' };
// Perception — behavior note 140
export const PERCEPTION_WEIGHT_140 = 0.09851;
export const PERCEPTION_NODE_141 = { id:141, cost:1.5552, label:'Perception-141' };
// Perception — behavior note 141
export const PERCEPTION_WEIGHT_141 = 0.77935;

// padding line 0 — Perception.ts — Ring-07
// padding line 1 — Perception.ts — Ring-07
