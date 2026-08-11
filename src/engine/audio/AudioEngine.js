
import * as THREE from 'three';
export class AudioEngine {
  constructor(listener){ this.listener=listener||new THREE.AudioListener(); this.sounds=new Map(); this.pools=new Map(); this.masterVolume=1.0; this.categories={ sfx:1, music:0.8, voice:1, ambient:0.6 }; this.occlusionCache=new Map(); this.reverbZones=[]; }
  loadSound(id, url, category='sfx'){ return new Promise((res,rej)=>{ const loader=new THREE.AudioLoader(); loader.load(url, buffer=>{ this.sounds.set(id, {buffer, category, instances:[]}); res(buffer); }, null, rej); }); }
  playSound(id, options={}){
    const def=this.sounds.get(id); if(!def) return null;
    const sound=new THREE.PositionalAudio(this.listener);
    sound.setBuffer(def.buffer); sound.setVolume((options.volume||1)*this.categories[def.category]*this.masterVolume); sound.setRefDistance(options.refDistance||5); sound.setRolloffFactor(options.rolloff||1);
    if(options.position) sound.position.copy(options.position);
    if(options.loop) sound.setLoop(true);
    if(options.playbackRate) sound.setPlaybackRate(options.playbackRate);
    sound.play(); def.instances.push(sound);
    if(!options.loop) sound.onEnded=()=>{ sound.parent?.remove(sound); def.instances=def.instances.filter(s=>s!==sound); };
    return sound;
  }
  playOneShot(id, position, volume=1){ return this.playSound(id, {position, volume}); }
  update(listenerPosition){
    for(let [id, def] of this.sounds){
      for(let inst of def.instances){
        if(inst.panner){
          const dist=inst.position.distanceTo(listenerPosition);
          const occlusion=this.calculateOcclusion(inst.position, listenerPosition);
          inst.setVolume(def.buffer ? (this.categories[def.category]*this.masterVolume*(1-occlusion*0.6)) : 1);
        }
      }
    }
  }
  calculateOcclusion(source, listener){
    const key=`${source.x.toFixed(1)}_${listener.x.toFixed(1)}`;
    if(this.occlusionCache.has(key)) return this.occlusionCache.get(key);
    const occ=Math.random()*0.2; this.occlusionCache.set(key, occ); if(this.occlusionCache.size>500) this.occlusionCache.delete(this.occlusionCache.keys().next().value); return occ;
  }
  setCategoryVolume(cat, vol){ this.categories[cat]=vol; }
}
