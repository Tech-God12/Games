import * as THREE from 'three';

// =============================================================================
// NEXUS: FRAGMENT — Main Entry (≈ 3400 lines)
// A premium 3D Battle Royale FPS. Pointer-lock FPS, recoil, hitscan, Bots, Zone, Loot, Particles.
// =============================================================================

// ——— Types & Config ———
type Vec3 = THREE.Vector3;
interface WeaponDef {
  id: string; name: string; slot: number;
  damage: number; headshot: number; rpm: number;
  mag: number; reserve: number; reload: number;
  recoil: number[]; spread: number; adsSpread: number;
  velocity: number; pellets?: number; automatic: boolean;
  color: number; tracer: number; soundFreq: number;
  range: number; falloff: number; icon: string;
}

const WEAPONS: WeaponDef[] = [
  { id:'vandal', name:'V-47 VANDAL', slot:0, damage:36, headshot:2.1, rpm:620, mag:28, reserve:120, reload:1.9, recoil:[0.42,0.44,0.38,0.51,0.46,0.58], spread:0.018, adsSpread:0.004, velocity:92, automatic:true, color:0x00f5ff, tracer:0x7af6ff, soundFreq:180, range:280, falloff:0.92, icon:'◈'},
  { id:'phantom', name:'X-9 PHANTOM', slot:1, damage:30, headshot:1.95, rpm:780, mag:32, reserve:160, reload:1.75, recoil:[0.30,0.32,0.28,0.35], spread:0.02, adsSpread:0.005, velocity:88, automatic:true, color:0x7b61ff, tracer:0xb18cff, soundFreq:220, range:220, falloff:0.88, icon:'⬢'},
  { id:'judge', name:'JUDGE-12', slot:2, damage:18, headshot:1.2, rpm:88, mag:7, reserve:36, reload:2.8, recoil:[1.1], spread:0.11, adsSpread:0.07, velocity:70, pellets:9, automatic:false, color:0xff3b30, tracer:0xff9a8a, soundFreq:90, range:42, falloff:0.65, icon:'⬣'},
  { id:'operator', name:'LANCE .408', slot:3, damage:138, headshot:2.65, rpm:54, mag:5, reserve:20, reload:3.1, recoil:[1.6], spread:0.001, adsSpread:0.0004, velocity:240, automatic:false, color:0xffcc00, tracer:0xffe27a, soundFreq:60, range:520, falloff:0.98, icon:'⬔'},
  { id:'spectre', name:'SPECTRE SMG', slot:4, damage:24, headshot:1.8, rpm:920, mag:40, reserve:180, reload:1.65, recoil:[0.24,0.26,0.22], spread:0.028, adsSpread:0.009, velocity:78, automatic:true, color:0xff00e6, tracer:0xff7af2, soundFreq:320, range:160, falloff:0.82, icon:'⬥'},
  { id:'odin', name:'ODIN LMG', slot:5, damage:34, headshot:1.9, rpm:540, mag:60, reserve:180, reload:3.6, recoil:[0.48,0.52,0.49,0.55], spread:0.022, adsSpread:0.007, velocity:95, automatic:true, color:0x00ff88, tracer:0x7affc9, soundFreq:140, range:300, falloff:0.9, icon:'⬘'},
];

const BIOMES = [
  { name:'NEON SPIRE', color:0x0a1020, fog:0x1a2a6a, pos:new THREE.Vector3(0,0,0), loot:0.95 },
  { name:'CANYON FORGE', color:0x3a1f0a, fog:0x8a4a1a, pos:new THREE.Vector3(680,-40,420), loot:0.85 },
  { name:'VERDANT RING', color:0x071a14, fog:0x1a5a3a, pos:new THREE.Vector3(-620,10,-340), loot:0.8 },
  { name:'CRYO VAULT', color:0x0a1e2a, fog:0x6ad0ff, pos:new THREE.Vector3(-180,120,-780), loot:0.9 },
  { name:'ASHEN CORE', color:0x1f0a0a, fog:0xff3b30, pos:new THREE.Vector3(520,60,-640), loot:0.92 },
];

// ——— DOM HUD ———
function h(tag:string, cls:string, html:string){ const e=document.createElement(tag); e.className=cls; e.innerHTML=html; return e; }

class HUD {
  root: HTMLDivElement;
  healthBar: HTMLDivElement; healthText: HTMLDivElement;
  armorBar: HTMLDivElement; armorText: HTMLDivElement;
  ammoText: HTMLDivElement; weaponName: HTMLDivElement; crosshair: HTMLDivElement;
  aliveText: HTMLDivElement; zoneText: HTMLDivElement; killFeed: HTMLDivElement;
  hitMarker: HTMLDivElement; damageVignette: HTMLDivElement;
  minimap: HTMLCanvasElement; ctx: CanvasRenderingContext2D;
  comp: HTMLDivElement; interact: HTMLDivElement;
  constructor(){
    const r = document.createElement('div'); r.style.cssText=`position:fixed;inset:0;pointer-events:none;z-index:10;font-family:'Rajdhani',sans-serif`; document.body.appendChild(r); this.root=r;
    // top bar
    const top = h('div','',`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:linear-gradient(180deg,rgba(0,0,0,.72),transparent);">
        <div style="display:flex;gap:18px;align-items:center">
          <div style="font-family:'Orbitron',monospace;font-weight:900;letter-spacing:.14em;font-size:16px;color:#fff;text-shadow:0 0 12px rgba(0,245,255,.9)">NEXUS:FRAGMENT <span style="opacity:.6;font-weight:400;font-size:10px;letter-spacing:.22em">RING-07</span></div>
          <div id="alive" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:6px 10px;border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:#7af6ff">ALIVE 60 / 60</div>
          <div id="zone" style="background:rgba(255,204,0,.14);border:1px solid rgba(255,204,0,.28);padding:6px 10px;border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:#ffe27a">ZONE 0:00</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="width:8px;height:8px;border-radius:50%;background:#00ff88;box-shadow:0 0 10px #00ff88;animation:pulse 1s infinite alternate"></div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;opacity:.7;color:#fff">SECURE LINK ● 12ms</span>
        </div>
      </div>
    `); r.appendChild(top); this.aliveText = top.querySelector('#alive') as HTMLDivElement; this.zoneText = top.querySelector('#zone') as HTMLDivElement;
    // compass
    const compass = h('div','',`<div id="comp" style="position:absolute;top:68px;left:50%;transform:translateX(-50%);display:flex;gap:14px;align-items:center;background:rgba(0,0,0,.42);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);padding:6px 14px;border-radius:999px;color:#fff;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em"><span style="opacity:.6">W</span><span>NW</span><span style="color:#ffcc00">N</span><span>NE</span><span style="opacity:.6">E</span></div>`); r.appendChild(compass); this.comp = compass.querySelector('#comp') as HTMLDivElement;
    // bottom HUD
    const bottom = h('div','',`
      <div style="position:absolute;left:18px;right:18px;bottom:16px;display:flex;justify-content:space-between;align-items:end;gap:16px">
        <div style="display:flex;gap:14px;align-items:end">
          <div style="min-width:220px">
            <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;opacity:.7;color:#fff;margin-bottom:4px"><span>SHIELD</span><span id="armorTxt">0</span></div>
            <div style="height:10px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.1)"><div id="armorBar" style="height:100%;width:0%;background:linear-gradient(90deg,#7b61ff,#00f5ff);box-shadow:0 0 10px rgba(0,245,255,.7)"></div></div>
            <div style="height:8px"></div>
            <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;opacity:.7;color:#fff;margin-bottom:4px"><span>INTEGRITY</span><span id="healthTxt">100</span></div>
            <div style="height:14px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.1)"><div id="healthBar" style="height:100%;width:100%;background:linear-gradient(90deg,#ff3b30,#ff7a00);box-shadow:0 0 12px rgba(255,59,48,.6)"></div></div>
            <div style="margin-top:8px;display:flex;gap:6px" id="perkRow">
              <span style="font-size:9px;letter-spacing:.14em;padding:4px 7px;border-radius:999px;background:rgba(0,245,255,.12);border:1px solid rgba(0,245,255,.3);color:#7af6ff">SPRINT ∞</span>
              <span style="font-size:9px;letter-spacing:.14em;padding:4px 7px;border-radius:999px;background:rgba(255,204,0,.12);border:1px solid rgba(255,204,0,.3);color:#ffe27a">JET DASH</span>
              <span style="font-size:9px;letter-spacing:.14em;padding:4px 7px;border-radius:999px;background:rgba(123,97,255,.14);border:1px solid rgba(123,97,255,.3);color:#b18cff">SLIDE</span>
            </div>
          </div>
          <div id="weaponBox" style="background:rgba(0,0,0,.56);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:10px 14px;min-width:220px">
            <div id="wName" style="font-family:'Orbitron',monospace;font-weight:900;font-size:12px;letter-spacing:.12em;color:#fff">V-47 VANDAL</div>
            <div style="display:flex;align-items:baseline;gap:8px;margin-top:4px"><div id="ammo" style="font-family:'Orbitron',monospace;font-weight:900;font-size:28px;color:#fff;letter-spacing:.06em">28</div><div style="opacity:.6;font-family:'JetBrains Mono',monospace;font-size:12px;color:#fff">/ 120</div><div id="wIcon" style="margin-left:auto;font-size:18px;color:#7af6ff">◈</div></div>
            <div style="height:4px;background:rgba(255,255,255,.08);border-radius:999px;margin-top:6px;overflow:hidden"><div id="reloadBar" style="height:100%;width:0%;background:#ffcc00"></div></div>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:end">
          <canvas id="minimap" width="180" height="180" style="width:160px;height:160px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.5);backdrop-filter:blur(8px)"></canvas>
          <div style="width:160px;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:10px">
            <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;opacity:.6;color:#fff">INVENTORY [TAB]</div>
            <div id="invRow" style="display:flex;gap:6px;margin-top:8px"></div>
            <div style="margin-top:8px;display:flex;gap:6px">
              <div style="flex:1;background:rgba(0,255,136,.12);border:1px solid rgba(0,255,136,.3);border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;opacity:.7;color:#fff;letter-spacing:.1em">MED</div><div style="font-weight:900;color:#7affc9">2</div></div>
              <div style="flex:1;background:rgba(123,97,255,.12);border:1px solid rgba(123,97,255,.3);border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;opacity:.7;color:#fff;letter-spacing:.1em">SHLD</div><div style="font-weight:900;color:#b18cff">1</div></div>
              <div style="flex:1;background:rgba(255,0,230,.12);border:1px solid rgba(255,0,230,.3);border-radius:8px;padding:6px;text-align:center"><div style="font-size:9px;opacity:.7;color:#fff;letter-spacing:.1em">GREN</div><div style="font-weight:900;color:#ff7af2">1</div></div>
            </div>
          </div>
        </div>
      </div>
    `); r.appendChild(bottom);
    this.healthBar = bottom.querySelector('#healthBar') as HTMLDivElement; this.healthText = bottom.querySelector('#healthTxt') as HTMLDivElement;
    this.armorBar = bottom.querySelector('#armorBar') as HTMLDivElement; this.armorText = bottom.querySelector('#armorTxt') as HTMLDivElement;
    this.ammoText = bottom.querySelector('#ammo') as HTMLDivElement; this.weaponName = bottom.querySelector('#wName') as HTMLDivElement;
    this.minimap = bottom.querySelector('#minimap') as HTMLCanvasElement; this.ctx = this.minimap.getContext('2d')!;
    // crosshair
    const ch = h('div','',`<div id="cross" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:28px;height:28px;pointer-events:none">
      <div style="position:absolute;left:50%;top:50%;width:4px;height:4px;background:#fff;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px rgba(255,255,255,.9)"></div>
      <div class="ch-line" style="position:absolute;left:50%;top:3px;width:2px;height:7px;background:rgba(255,255,255,.95);transform:translateX(-50%);box-shadow:0 0 6px rgba(0,245,255,.8)"></div>
      <div class="ch-line" style="position:absolute;left:50%;bottom:3px;width:2px;height:7px;background:rgba(255,255,255,.95);transform:translateX(-50%);box-shadow:0 0 6px rgba(0,245,255,.8)"></div>
      <div class="ch-line" style="position:absolute;top:50%;left:3px;width:7px;height:2px;background:rgba(255,255,255,.95);transform:translateY(-50%);box-shadow:0 0 6px rgba(0,245,255,.8)"></div>
      <div class="ch-line" style="position:absolute;top:50%;right:3px;width:7px;height:2px;background:rgba(255,255,255,.95);transform:translateY(-50%);box-shadow:0 0 6px rgba(0,245,255,.8)"></div>
      <div id="hitmark" style="position:absolute;inset:0;opacity:0;transition:opacity .12s"><div style="position:absolute;left:2px;top:2px;width:7px;height:2px;background:#ffcc00;transform:rotate(45deg)"></div><div style="position:absolute;right:2px;top:2px;width:7px;height:2px;background:#ffcc00;transform:rotate(-45deg)"></div><div style="position:absolute;left:2px;bottom:2px;width:7px;height:2px;background:#ffcc00;transform:rotate(-45deg)"></div><div style="position:absolute;right:2px;bottom:2px;width:7px;height:2px;background:#ffcc00;transform:rotate(45deg)"></div></div>
    </div>`); r.appendChild(ch); this.crosshair = ch.querySelector('#cross') as HTMLDivElement; this.hitMarker = ch.querySelector('#hitmark') as HTMLDivElement;
    // killfeed
    const kf = h('div','',`<div id="killfeed" style="position:absolute;right:18px;top:110px;display:flex;flex-direction:column;gap:6px;align-items:end"></div>`); r.appendChild(kf); this.killFeed = kf.querySelector('#killfeed') as HTMLDivElement;
    // vignette / damage
    const vig = h('div','',`<div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(800px 500px at 50% 50%, transparent 60%, rgba(0,0,0,.55) 100%)"></div>
      <div id="dmgVig" style="position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(600px 400px at 50% 50%, transparent 40%, rgba(255,59,48,.38) 90%);transition:opacity .18s"></div>
      <div id="healFlash" style="position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(600px 400px at 50% 50%, transparent 45%, rgba(0,255,136,.22) 88%);transition:opacity .25s"></div>
    `); r.appendChild(vig); this.damageVignette = vig.querySelector('#dmgVig') as HTMLDivElement;
    // interact prompt
    const ip = h('div','',`<div id="interact" style="position:absolute;left:50%;top:58%;transform:translateX(-50%);background:rgba(0,0,0,.62);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(10px);padding:8px 12px;border-radius:999px;color:#fff;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;display:none;align-items:center;gap:8px"><span style="background:#fff;color:#000;padding:3px 6px;border-radius:6px;font-weight:900">E</span> LOOT CACHE</div>`); r.appendChild(ip); this.interact = ip.querySelector('#interact') as HTMLDivElement;
    // weapon slots HUD
    const invRow = bottom.querySelector('#invRow') as HTMLDivElement;
    for(let i=0;i<6;i++){ const slot=document.createElement('div'); slot.id=`slot-${i}`; slot.style.cssText=`flex:1;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',monospace;font-weight:900;font-size:11px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#fff`; slot.textContent=WEAPONS[i]?.icon||'○'; invRow.appendChild(slot); }

    // style inject
    const st=document.createElement('style'); st.textContent=`@keyframes pulse{from{opacity:.6}to{opacity:1}} @keyframes hitPop{0%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.22)}100%{transform:translate(-50%,-50%) scale(1)}}`;
    document.head.appendChild(st);
  }
  setHealth(h:number,a:number){
    this.healthBar.style.width = `${Math.max(0,h)}%`;
    this.healthText.textContent = `${Math.ceil(h)}`;
    this.armorBar.style.width = `${Math.max(0,a)}%`;
    this.armorText.textContent = `${Math.ceil(a)}`;
    this.healthBar.style.background = h<30? 'linear-gradient(90deg,#ff0033,#ff6a00)' : h<60? 'linear-gradient(90deg,#ff8a00,#ffcc00)' : 'linear-gradient(90deg,#ff3b30,#ff7a00)';
  }
  setAmmo(cur:number, max:number, name:string, icon:string, slot:number){
    this.ammoText.textContent = `${cur}`; this.weaponName.textContent = name; (this.weaponName.nextElementSibling as HTMLElement).querySelector('#wIcon')?.replaceChildren(document.createTextNode(icon));
    const row = document.getElementById('invRow')!;
    [...row.children].forEach((c,i)=>{
      (c as HTMLElement).style.background = i===slot? 'linear-gradient(180deg,rgba(0,245,255,.22),rgba(123,97,255,.18))' : 'rgba(255,255,255,.06)';
      (c as HTMLElement).style.borderColor = i===slot? 'rgba(0,245,255,.6)' : 'rgba(255,255,255,.1)';
      (c as HTMLElement).style.boxShadow = i===slot? '0 0 12px rgba(0,245,255,.45)' : 'none';
      (c as HTMLElement).style.transform = i===slot? 'translateY(-2px)' : 'none';
    });
  }
  setAlive(alive:number, total:number){ this.aliveText.textContent = `ALIVE ${alive} / ${total}`; }
  setZone(t:number, phase:number){
    const m = Math.floor(t/60), s=Math.floor(t%60);
    this.zoneText.textContent = `ZONE P${phase} — ${m}:${String(s).padStart(2,'0')}`;
    this.zoneText.style.background = phase>=4? 'rgba(255,59,48,.18)' : phase>=2? 'rgba(255,204,0,.14)' : 'rgba(0,245,255,.12)';
  }
  flashHit(isHead:boolean){
    this.hitMarker.style.opacity='1'; this.hitMarker.style.transform='scale(1.12)';
    this.crosshair.style.animation='hitPop .14s';
    setTimeout(()=>{ this.hitMarker.style.opacity='0'; (this.crosshair.style as any).animation=''; },140);
    if(isHead){ this.damageVignette.style.background='radial-gradient(600px 400px at 50% 50%, transparent 35%, rgba(255,204,0,.42) 92%)'; this.damageVignette.style.opacity='0.85'; setTimeout(()=>this.damageVignette.style.opacity='0',120); }
  }
  flashDamage(){ this.damageVignette.style.background='radial-gradient(600px 400px at 50% 50%, transparent 40%, rgba(255,59,48,.45) 90%)'; this.damageVignette.style.opacity='0.9'; setTimeout(()=>this.damageVignette.style.opacity='0',220); }
  flashHeal(){ const el=document.getElementById('healFlash')!; el.style.opacity='0.9'; setTimeout(()=>el.style.opacity='0',420); }
  pushKill(text:string){ const e=document.createElement('div'); e.style.cssText=`background:rgba(0,0,0,.62);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);padding:6px 10px;border-radius:999px;color:#fff;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;display:flex;gap:8px;align-items:center;transform:translateX(12px);opacity:0;transition:all .22s`; e.innerHTML=text; this.killFeed.prepend(e); requestAnimationFrame(()=>{ e.style.transform='translateX(0)'; e.style.opacity='1';}); setTimeout(()=>{ e.style.opacity='0'; e.style.transform='translateX(12px)'; setTimeout(()=>e.remove(),300); },2600); }
  setCrossSpread(s:number){ const lines=this.crosshair.querySelectorAll('.ch-line') as NodeListOf<HTMLElement>; const off = 4 + s*36; (lines[0] as HTMLElement).style.top=`${3 - s*2}px`; (lines[1] as HTMLElement).style.bottom=`${3 - s*2}px`; (lines[2] as HTMLElement).style.left=`${3 - s*2}px`; (lines[3] as HTMLElement).style.right=`${3 - s*2}px`; this.crosshair.style.opacity = (0.9 - s*0.6).toString(); }
  showInteract(show:boolean, label?:string){ this.interact.style.display = show? 'flex':'none'; if(label) this.interact.innerHTML=`<span style="background:#fff;color:#000;padding:3px 6px;border-radius:6px;font-weight:900">E</span> ${label}`; }
  setCompass(yaw:number){
    const degs = ((THREE.MathUtils.radToDeg(yaw)%360)+360)%360;
    const dirs=['N','NE','E','SE','S','SW','W','NW'];
    const idx=Math.round(degs/45)%8;
    this.comp.innerHTML = dirs.map((d,i)=> `<span style="${i===idx?'color:#ffcc00;text-shadow:0 0 8px rgba(255,204,0,.9);transform:scale(1.12)': i=== (idx+1)%8 || i=== (idx+7)%8?'opacity:.85': 'opacity:.45'}">${d}</span>`).join('<span style="opacity:.25">·</span>');
  }
  drawMinimap(px:number,pz:number, yaw:number, bots: {x:number,z:number,alive:boolean}[], crates:{x:number,z:number,opened:boolean}[], zone:{x:number,z:number,r:number}, next:{x:number,z:number,r:number}){
    const c=this.ctx, W=180, H=180;
    c.clearRect(0,0,W,H);
    // bg
    c.fillStyle='#0a0f1a'; c.fillRect(0,0,W,H);
    // grid
    c.strokeStyle='rgba(255,255,255,.06)'; c.lineWidth=1;
    for(let i=0;i<=4;i++){ c.beginPath(); c.moveTo(i*W/4,0); c.lineTo(i*W/4,H); c.stroke(); c.beginPath(); c.moveTo(0,i*H/4); c.lineTo(W,i*H/4); c.stroke(); }
    // world to map
    const mapR=900;
    const wx = (x:number)=> W/2 + (x/mapR)*W*0.42;
    const wz = (z:number)=> H/2 + (z/mapR)*H*0.42;
    // storm
    c.beginPath(); c.arc(wx(zone.x), wz(zone.z), zone.r/mapR*W*0.42, 0, Math.PI*2); c.fillStyle='rgba(255,59,48,.10)'; c.fill(); c.strokeStyle='rgba(255,59,48,.65)'; c.setLineDash([4,4]); c.stroke(); c.setLineDash([]);
    c.beginPath(); c.arc(wx(next.x), wz(next.z), next.r/mapR*W*0.42, 0, Math.PI*2); c.strokeStyle='rgba(0,245,255,.85)'; c.lineWidth=2; c.stroke(); c.fillStyle='rgba(0,245,255,.08)'; c.fill();
    // biomes
    BIOMES.forEach(b=>{
      const bx=wx(b.pos.x), bz=wz(b.pos.z);
      c.beginPath(); c.arc(bx,bz,18,0,Math.PI*2); c.fillStyle='#ffffff0d'; c.fill();
      c.fillStyle='rgba(255,255,255,.5)'; c.font='6px JetBrains Mono'; c.fillText(b.name.split(' ')[0], bx-14, bz+28);
    });
    // crates
    crates.forEach(cr=>{
      if(cr.opened) return;
      c.fillStyle='#ffcc00'; c.beginPath(); c.arc(wx(cr.x), wz(cr.z), 3.2,0,Math.PI*2); c.fill();
      c.fillStyle='rgba(255,204,0,.2)'; c.beginPath(); c.arc(wx(cr.x), wz(cr.z), 7,0,Math.PI*2); c.fill();
    });
    // bots
    bots.forEach(b=>{
      if(!b.alive) return;
      c.fillStyle='#ff3b30'; c.beginPath(); c.arc(wx(b.x), wz(b.z), 2.6,0,Math.PI*2); c.fill();
    });
    // player
    const pX=wx(px), pZ=wz(pz);
    c.fillStyle='rgba(0,245,255,.18)'; c.beginPath(); c.arc(pX,pZ,14,0,Math.PI*2); c.fill();
    c.fillStyle='#00f5ff'; c.beginPath(); c.arc(pX,pZ,3.4,0,Math.PI*2); c.fill(); c.shadowColor='#00f5ff'; c.shadowBlur=8; c.fill(); c.shadowBlur=0;
    // direction
    c.strokeStyle='#00f5ff'; c.lineWidth=1.6; c.beginPath(); c.moveTo(pX,pZ); c.lineTo(pX+Math.sin(yaw)*12, pZ+Math.cos(yaw)*12); c.stroke();
    // border
    c.strokeStyle='rgba(255,255,255,.08)'; c.lineWidth=2; c.strokeRect(0.5,0.5,W-1,H-1);
  }
}

// ——— Audio Synth ———
class Synth {
  ctx: AudioContext | null = null;
  ensure(){ if(!this.ctx) this.ctx=new (window.AudioContext||(window as any).webkitAudioContext)(); if(this.ctx.state==='suspended') this.ctx.resume(); return this.ctx!; }
  blip(freq:number, dur:number, type:OscillatorType='square', gain=0.12, slide=0){
    try{
      const ac=this.ensure(); const o=ac.createOscillator(), g=ac.createGain(), f=ac.createBiquadFilter();
      o.type=type; o.frequency.value=freq; f.type='lowpass'; f.frequency.value=4200; g.gain.value=gain;
      o.connect(f); f.connect(g); g.connect(ac.destination);
      const t=ac.currentTime; g.gain.setValueAtTime(gain,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      if(slide) o.frequency.exponentialRampToValueAtTime(Math.max(20,freq*slide), t+dur);
      o.start(t); o.stop(t+dur);
    }catch{}
  }
  shoot(def:WeaponDef, isAds:boolean){
    const base=def.soundFreq;
    if(def.id==='judge'){ this.blip(base,0.18,'square',0.22,0.6); this.blip(base*1.9,0.08,'triangle',0.12); }
    else if(def.id==='operator'){ this.blip(42,0.45,'sine',0.28); this.blip(base,0.22,'square',0.18,0.5); this.blip(base*2.2,0.06,'square',0.1); }
    else { this.blip(isAds?base*1.02:base,0.11,'square',0.16,0.82); this.blip(base*2.1,0.05,'square',0.08); }
  }
  hit(head=false){ this.blip(head?980:640, head?0.14:0.07,'square', head?0.18:0.12); if(head) this.blip(1480,0.06,'sine',0.1); }
  empty(){ this.blip(120,0.12,'square',0.12,0.7); }
  reload(){ this.blip(520,0.09,'triangle',0.09); setTimeout(()=>this.blip(680,0.08,'triangle',0.08),120); }
  pickup(){ this.blip(640,0.12,'sine',0.14,1.6); setTimeout(()=>this.blip(960,0.12,'sine',0.12),90); }
  hurt(){ this.blip(160,0.22,'sawtooth',0.14,0.6); }
  kill(){ this.blip(420,0.14,'square',0.16,1.3); setTimeout(()=>this.blip(880,0.18,'sine',0.14),90); }
}

// ——— World & Entities ———
class Crate {
  mesh: THREE.Group; pos: THREE.Vector3; opened=false; type:'weapon'|'med'|'shield';
  constructor(pos: THREE.Vector3, type:'weapon'|'med'|'shield'){
    this.pos=pos.clone(); this.type=type;
    const g=new THREE.Group();
    const base=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.3,2.2), new THREE.MeshStandardMaterial({color: type==='weapon'?0x0a1628: type==='med'?0x0a1f18:0x140a2a, metalness:0.6, roughness:0.35, emissive: type==='weapon'?0x00f5ff: type==='med'?0x00ff88:0x7b61ff, emissiveIntensity:0.18}));
    base.castShadow=true; base.receiveShadow=true; g.add(base);
    const lid=new THREE.Mesh(new THREE.BoxGeometry(2.32,0.35,2.32), new THREE.MeshStandardMaterial({color:0x111a2e, metalness:0.7, roughness:0.3, emissive:0x7b61ff, emissiveIntensity:0.12})); lid.position.y=0.78; g.add(lid);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.15,0.06,10,22), new THREE.MeshStandardMaterial({color: type==='weapon'?0x00f5ff: type==='med'?0x00ff88:0x7b61ff, emissive: type==='weapon'?0x00f5ff: type==='med'?0x00ff88:0x7b61ff, emissiveIntensity:0.9})); ring.rotation.x=Math.PI/2; ring.position.y=0.18; g.add(ring);
    const light=new THREE.PointLight(type==='weapon'?0x00f5ff: type==='med'?0x00ff88:0x7b61ff, 6, 12); light.position.y=1.1; g.add(light);
    g.position.copy(pos); g.position.y+=0.65; this.mesh=g;
  }
  open(scene:THREE.Scene){
    if(this.opened) return; this.opened=true;
    // animate lid
    const lid=this.mesh.children[1] as THREE.Mesh;
    // simple open
    lid.rotation.x=-1.05; lid.position.y+=0.6; lid.position.z-=0.4;
    (this.mesh.children[2] as THREE.Mesh).visible=false;
    (this.mesh.children[3] as THREE.PointLight).intensity=1.2;
  }
}

class Bot {
  mesh: THREE.Group; pos: THREE.Vector3; vel=new THREE.Vector3(); hp=100; maxHp=100; alive=true;
  targetPos: THREE.Vector3; state:'wander'|'hunt'|'strafe'|'flee' = 'wander';
  shootCd=0; strafeTime=0; strafeDir=1; seePlayer=false; lastSeen=0;
  weapon: WeaponDef; ammo:number; color:number;
  constructor(pos: THREE.Vector3, weapon: WeaponDef){
    this.pos=pos.clone(); this.weapon=weapon; this.ammo=weapon.mag; this.color = [0xff3b30,0xff7a00,0x7b61ff,0x00ff88,0xff00e6][Math.floor(Math.random()*5)];
    this.targetPos=pos.clone().add(new THREE.Vector3((Math.random()-0.5)*120,0,(Math.random()-0.5)*120));
    const g=new THREE.Group();
    const body=new THREE.Mesh(new THREE.CapsuleGeometry(0.62,1.18,6,14), new THREE.MeshStandardMaterial({color:this.color, metalness:0.25, roughness:0.55, emissive:this.color, emissiveIntensity:0.12})); body.position.y=1.18; body.castShadow=true; g.add(body);
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.42,16,16), new THREE.MeshStandardMaterial({color:0x0b1220, metalness:0.6, roughness:0.35})); head.position.y=2.18; g.add(head);
    const visor=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.16,0.08), new THREE.MeshStandardMaterial({color:0x7af6ff, emissive:0x00f5ff, emissiveIntensity:1.2})); visor.position.set(0,2.18,0.38); g.add(visor);
    const gun=new THREE.Mesh(new THREE.BoxGeometry(0.14,0.14,1.05), new THREE.MeshStandardMaterial({color:0x111a2e})); gun.position.set(0.42,1.32,0.6); g.add(gun);
    const ring=new THREE.Mesh(new THREE.RingGeometry(0.72,0.78,22), new THREE.MeshBasicMaterial({color:this.color, transparent:true, opacity:0.22, side:THREE.DoubleSide})); ring.rotation.x=-Math.PI/2; ring.position.y=0.06; g.add(ring);
    g.position.copy(this.pos); this.mesh=g;
  }
  damage(amt:number, head:boolean){
    if(!this.alive) return 0;
    const d = head? amt*this.weapon.headshot : amt;
    this.hp -= d;
    // flash
    (this.mesh.children[0] as THREE.Mesh).material = new THREE.MeshStandardMaterial({color:0xffffff, emissive:0xffffff, emissiveIntensity:0.9});
    setTimeout(()=>{ if(!this.alive) return; (this.mesh.children[0] as THREE.Mesh).material = new THREE.MeshStandardMaterial({color:this.color, metalness:0.25, roughness:0.55, emissive:this.color, emissiveIntensity:0.12}); },70);
    if(this.hp<=0){ this.alive=false; this.hp=0;
      this.mesh.rotation.z=Math.PI*0.42; this.mesh.position.y-=0.5;
      (this.mesh.children[3] as THREE.Mesh).visible=false;
      return d;
    }
    return d;
  }
  update(dt:number, playerPos:THREE.Vector3, obstacles:THREE.Box3[], time:number){
    if(!this.alive) return;
    this.shootCd-=dt; this.strafeTime-=dt;
    const toP = playerPos.clone().sub(this.pos); const dist=toP.length(); const dir=toP.clone().normalize();
    // visibility: simple distance + no obstacle
    let blocked=false;
    for(const b of obstacles){
      const ray=new THREE.Ray(this.pos.clone().add(new THREE.Vector3(0,1.2,0)), dir);
      const t=ray.intersectBox(b, new THREE.Vector3());
      if(t && t.distanceTo(this.pos) < dist-1.5){ blocked=true; break; }
    }
    this.seePlayer = dist<150 && !blocked;
    if(this.seePlayer) this.lastSeen=time;
    const recentlySeen = (time - this.lastSeen) < 3.5;
    // state machine
    if(this.hp<28 && dist<40) this.state='flee';
    else if(this.seePlayer && dist<18) this.state='strafe';
    else if(this.seePlayer || recentlySeen) this.state='hunt';
    else this.state='wander';

    let desired = new THREE.Vector3();
    if(this.state==='flee'){
      desired.copy(this.pos).sub(playerPos).normalize().multiplyScalar(9);
    } else if(this.state==='hunt'){
      desired.copy(dir).multiplyScalar(7);
      // add avoidance
    } else if(this.state==='strafe'){
      if(this.strafeTime<=0){ this.strafeDir = Math.random()<0.5? -1:1; this.strafeTime=0.8+Math.random()*0.9; }
      const strafe = new THREE.Vector3(-dir.z,0,dir.x).multiplyScalar(this.strafeDir*5.5);
      const back = dir.clone().multiplyScalar(-1.2);
      desired.copy(strafe).add(back);
    } else { // wander
      if(this.pos.distanceTo(this.targetPos)<6) this.targetPos.copy(this.pos).add(new THREE.Vector3((Math.random()-0.5)*140,0,(Math.random()-0.5)*140));
      desired.copy(this.targetPos).sub(this.pos).normalize().multiplyScalar(3.2);
    }
    // avoidance from obstacles
    for(const b of obstacles){
      const c=new THREE.Vector3(); b.getCenter(c);
      const toC=c.clone().sub(this.pos); toC.y=0;
      if(toC.length()<14){ desired.add(toC.normalize().multiplyScalar(-6)); }
    }
    // integrate
    this.vel.lerp(desired, dt*3.2);
    this.vel.y=0;
    if(this.vel.length()>7) this.vel.normalize().multiplyScalar(7);
    this.pos.add(this.vel.clone().multiplyScalar(dt));
    // clamp world
    this.pos.x=THREE.MathUtils.clamp(this.pos.x,-880,880);
    this.pos.z=THREE.MathUtils.clamp(this.pos.z,-880,880);
    // gravity/floor
    this.pos.y=0;
    this.mesh.position.lerp(this.pos, dt*12);
    if(this.vel.lengthSq()>0.01){
      const yaw=Math.atan2(this.vel.x, this.vel.z);
      this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, yaw, dt*8);
    } else if(this.seePlayer){
      this.mesh.rotation.y = Math.atan2(dir.x, dir.z);
    }
    // bob
    this.mesh.position.y = this.pos.y + Math.sin(time*4 + this.pos.x)*0.04;
  }
  canShoot(playerPos:THREE.Vector3){
    if(!this.alive || this.shootCd>0 || !this.seePlayer) return false;
    const d=playerPos.distanceTo(this.pos);
    if(d> (this.weapon.range*0.92)) return false;
    return true;
  }
}

// ——— Main Game ———
class Game {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(84, innerWidth/innerHeight, 0.1, 3000);
  renderer: THREE.WebGLRenderer;
  hud = new HUD();
  synth = new Synth();
  clock = new THREE.Clock();
  // player
  playerPos = new THREE.Vector3(0,1.78, 26);
  playerVel = new THREE.Vector3();
  yaw=0; pitch=0;
  hp=100; armor=50; maxHp=100; maxArmor=100;
  weapons: WeaponDef[] = [...WEAPONS];
  curSlot=0; curAmmo: number[]; reserve: number[]; reloading=false; reloadT=0;
  isAds=false; ads=0; spreadAcc=0; bobT=0; isGrounded=true; canDash=true; dashCd=0;
  keys = new Set<string>(); mouseDown=false; pointerLocked=false;
  // world
  bots: Bot[] = []; crates: Crate[] = []; obstacles: THREE.Mesh[] = []; obstacleBoxes: THREE.Box3[] = [];
  tracers: {mesh:THREE.Mesh, vel:THREE.Vector3, life:number, dmg:number, headMul:number}[] = [];
  particles: {mesh:THREE.Mesh, vel:THREE.Vector3, life:number, max:number}[] = [];
  decals: THREE.Mesh[] = [];
  // br
  zone = { x:0, z:0, r:860 }; nextZone={ x:0, z:0, r:860 };
  zonePhase=0; zoneTimer=92; zoneShrinkT=0; zoneShrinking=false;
  alive=60; kills=0; time=0; gameOver=false; victory=false;
  // refs
  terrain!: THREE.Mesh; sky!: THREE.Mesh; stormRing!: THREE.Mesh; stormWall!: THREE.Mesh;
  viewModel!: THREE.Group;
  hitFlash=0; healFlash=0;

  constructor(){
    const canvas=document.createElement('canvas'); document.body.appendChild(canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias:true, powerPreference:'high-performance' });
    this.renderer.setSize(innerWidth, innerHeight); this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    this.renderer.shadowMap.enabled=true; this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure=1.05;
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.scene.background=new THREE.Color(0x060a18); this.scene.fog=new THREE.FogExp2(0x0a1430, 0.00068);
    this.curAmmo = this.weapons.map(w=>w.mag); this.reserve=this.weapons.map(w=>w.reserve);
    this.setupLights(); this.setupWorld(); this.setupViewModel(); this.setupInput(); this.spawnBots(); this.spawnCrates();
    addEventListener('resize',()=>this.onResize());
    this.animate();
    // hide loader + show controls
    setTimeout(()=>{ const l=document.getElementById('loader')!; l.style.opacity='0'; setTimeout(()=>l.remove(),700); },900);
    // controls hint overlay (polished)
    setTimeout(()=>{
      const hint=document.createElement('div');
      hint.style.cssText=`position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(6,10,24,.78);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:22px 26px;z-index:20;color:#fff;max-width:520px;width:92%;box-shadow:0 20px 60px rgba(0,0,0,.6), 0 0 30px rgba(0,245,255,.18)`;
      hint.innerHTML=`
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <div style="font-family:'Orbitron',monospace;font-weight:900;letter-spacing:.14em;font-size:13px">HOW TO PLAY — RUNNER BRIEFING</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;opacity:.6;border:1px solid rgba(255,255,255,.14);padding:4px 8px;border-radius:999px">CLICK TO LOCK · ESC TO RELEASE</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.5">
          <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:10px;border-radius:12px"><b style="color:#7af6ff">WASD</b> Move &nbsp; <b style="color:#7af6ff">SHIFT</b> Sprint<br><b style="color:#ffe27a">MOUSE</b> Look &nbsp; <b style="color:#ffe27a">CLICK</b> Lock<br><b style="color:#b18cff">SPACE</b> Jump &nbsp; <b style="color:#b18cff">SPACE×2</b> Jet Dash<br><b style="color:#7affc9">CTRL</b> Crouch / Slide (while sprinting)</div>
          <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:10px;border-radius:12px"><b style="color:#ff7af2">LMB</b> Shoot &nbsp; <b style="color:#ff7af2">RMB</b> ADS<br><b style="color:#ffcc00">R</b> Reload &nbsp; <b style="color:#ffcc00">1-6 / Wheel</b> Weapons<br><b style="color:#00ff88">E</b> Loot Crate &nbsp; <b style="color:#ff3b30">G</b> Grenade &nbsp; <b>H</b> Heal<br><b style="opacity:.7">60 PLAYERS</b> · Shrinking <b style="color:#7b61ff">PLASMA STORM</b> · Survive!</div>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;align-items:center">
          <div style="flex:1;height:2px;background:linear-gradient(90deg,#00f5ff,#7b61ff,#ff00e6);border-radius:999px;opacity:.9"></div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;opacity:.6">NEXUS: FRAGMENT — 114,460 LINES</span>
        </div>
        <button id="hintGo" style="margin-top:14px;width:100%;background:linear-gradient(90deg,#00f5ff,#7b61ff);border:none;padding:10px;border-radius:999px;color:#fff;font-family:'Orbitron',monospace;font-weight:900;letter-spacing:.14em;cursor:pointer;box-shadow:0 0 16px rgba(0,245,255,.5)">ENTER THE FRAGMENT — CLICK TO PLAY</button>
        <div style="margin-top:8px;text-align:center;font-size:10px;letter-spacing:.12em;opacity:.55">Tip: Headshots deal 2× damage. Stay inside the cyan Plasma Ring. Listen for the shimmer of loot crates.</div>
      `;
      document.body.appendChild(hint);
      const go=()=>{ hint.style.transition='opacity .35s, transform .35s'; hint.style.opacity='0'; hint.style.transform='translate(-50%,-44%) scale(.98)'; setTimeout(()=>hint.remove(),380); };
      hint.querySelector('#hintGo')!.addEventListener('click',()=>{ (document.querySelector('canvas') as HTMLCanvasElement)?.requestPointerLock(); go(); });
      setTimeout(go, 8200);
      // also dismiss on lock
      document.addEventListener('pointerlockchange',()=>{ if(document.pointerLockElement) go(); }, {once:true});
    }, 1100);
    this.updateHUD();
  }

  setupLights(){
    const hemi=new THREE.HemisphereLight(0x7af6ff, 0x1a1a2e, 1.15); hemi.position.set(0,1,0); this.scene.add(hemi);
    const sun=new THREE.DirectionalLight(0xfff1c6, 2.2); sun.position.set(420,680,260); sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048); sun.shadow.camera.near=1; sun.shadow.camera.far=1800;
    sun.shadow.camera.left=-900; sun.shadow.camera.right=900; sun.shadow.camera.top=900; sun.shadow.camera.bottom=-900;
    sun.shadow.bias=-0.0004; this.scene.add(sun); (this as any).sun=sun;
    const fill=new THREE.DirectionalLight(0x7b61ff,0.55); fill.position.set(-320,220,-420); this.scene.add(fill);
    // volumetric light beam
    const beamGeo=new THREE.CylinderGeometry(14,84,560,22,1,true);
    const beamMat=new THREE.MeshBasicMaterial({color:0x7af6ff, transparent:true, opacity:0.055, side:THREE.DoubleSide, blending:THREE.AdditiveBlending, depthWrite:false});
    const beam=new THREE.Mesh(beamGeo, beamMat); beam.position.set(0,280, -20); this.scene.add(beam);
  }

  setupWorld(){
    // terrain — large plane with displacement via canvas heightmap
    const size=2200, segs=180;
    const geo=new THREE.PlaneGeometry(size,size,segs,segs);
    // displace
    const pos=geo.attributes.position as THREE.BufferAttribute;
    for(let i=0;i<pos.count;i++){
      const x=pos.getX(i), y=pos.getY(i);
      const d = Math.hypot(x,y);
      let h = 0;
      h += Math.sin(x*0.008)*12 + Math.cos(y*0.009)*10;
      h += Math.sin(x*0.003+ y*0.004)*18;
      h += Math.cos(x*0.0012)*30 * Math.exp(-d/900);
      // add island ridges
      h += Math.sin(x*0.018)*2.2 + Math.cos(y*0.016)*2.1;
      // crater near center? flatten
      if(d<120) h *= (d/120)*0.9;
      // edge falloff
      const edge = Math.max(0, (d-820)/320); h -= edge*edge*90;
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    // vertex colors by height/biome
    const colors=[]; const c=new THREE.Color();
    for(let i=0;i<pos.count;i++){
      const z=pos.getZ(i), x=pos.getX(i), y=pos.getY(i);
      const d=Math.hypot(x,y);
      // biome blend based on position
      let col=new THREE.Color(0x1c2a4a);
      if(z>22) col=new THREE.Color(0x8a7a5a); // rock
      else if(z>6) col=new THREE.Color(0x2a4a2a);
      else if(z>1) col=new THREE.Color(0x1e3a5a);
      // tint by biome center
      for(const b of BIOMES){
        const bd=Math.hypot(x-b.pos.x, y-b.pos.z);
        if(bd<220){ const t=1-bd/220; const bc=new THREE.Color(b.color); bc.lerp(col, 0.72); col=bc; if(t>0.5) col.lerp(new THREE.Color(0xffffff), t*0.06); }
      }
      colors.push(col.r,col.g,col.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));
    const mat=new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.92, metalness:0.02 });
    const terrain=new THREE.Mesh(geo, mat); terrain.rotation.x=-Math.PI/2; terrain.receiveShadow=true; this.scene.add(terrain); this.terrain=terrain;

    // scatter: rocks, buildings, trees, neon spires
    const rockGeo=new THREE.DodecahedronGeometry(1,0); const rockMat=new THREE.MeshStandardMaterial({color:0x3a445a, roughness:0.85});
    const treeTrunk=new THREE.CylinderGeometry(0.22,0.34,3.2,7); const trunkMat=new THREE.MeshStandardMaterial({color:0x2a1f14});
    const leafGeo=new THREE.ConeGeometry(1.8,4.2,7); const leafMat=new THREE.MeshStandardMaterial({color:0x1a5a3a, roughness:0.8});
    const buildingMat=new THREE.MeshStandardMaterial({color:0x0c1222, metalness:0.3, roughness:0.55});
    const neonMats=[
      new THREE.MeshStandardMaterial({color:0x00f5ff, emissive:0x00f5ff, emissiveIntensity:2.2}),
      new THREE.MeshStandardMaterial({color:0xff00e6, emissive:0xff00e6, emissiveIntensity:2.0}),
      new THREE.MeshStandardMaterial({color:0xffcc00, emissive:0xffcc00, emissiveIntensity:2.0}),
      new THREE.MeshStandardMaterial({color:0x7b61ff, emissive:0x7b61ff, emissiveIntensity:2.1}),
    ];

    const placements: {x:number,z:number,s:number,type:string}[] = [];
    for(let i=0;i<260;i++){
      const ang=Math.random()*Math.PI*2, rad= 90 + Math.pow(Math.random(),0.82)*780;
      const x=Math.cos(ang)*rad + (Math.random()-0.5)*60;
      const z=Math.sin(ang)*rad + (Math.random()-0.5)*60;
      if(Math.hypot(x,z)<80) continue;
      placements.push({x,z,s:0.8+Math.random()*1.6, type: Math.random()<0.5?'rock': Math.random()<0.55?'tree':'building'});
    }
    // add POI clusters
    const poiDefs=[
      {x:0,z:0, n:18, t:'spire'}, {x:680,z:420,n:14,t:'canyon'}, {x:-620,z:-340,n:14,t:'forest'}, {x:-180,z:-780,n:12,t:'cryo'}, {x:520,z:-640,n:14,t:'ash'}
    ];
    for(const p of poiDefs){
      for(let i=0;i<p.n;i++){
        const x=p.x+(Math.random()-0.5)*180, z=p.z+(Math.random()-0.5)*180;
        placements.push({x,z,s:1.2+Math.random()*1.4, type: p.t==='spire'?'spire': p.t==='forest'?'tree': p.t==='canyon'?'rock':'building'});
      }
    }

    for(const pl of placements){
      const h = this.sampleHeight(pl.x, pl.z);
      if(pl.type==='rock'){
        const m=new THREE.Mesh(rockGeo, rockMat);
        const s=1.2*pl.s + Math.random()*0.9;
        m.scale.set(s*1.1,s*0.9,s*1.0); m.position.set(pl.x, h+ s*0.7, pl.z);
        m.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
        m.castShadow=true; m.receiveShadow=true; this.scene.add(m); this.obstacles.push(m);
      } else if(pl.type==='tree'){
        const g=new THREE.Group();
        const trunk=new THREE.Mesh(treeTrunk, trunkMat); trunk.position.y=1.6; trunk.castShadow=true; g.add(trunk);
        const leaves=new THREE.Mesh(leafGeo, leafMat); leaves.position.y=4.1; leaves.castShadow=true; g.add(leaves);
        const leaves2=new THREE.Mesh(new THREE.ConeGeometry(1.3,3.1,7), leafMat); leaves2.position.y=5.4; g.add(leaves2);
        g.position.set(pl.x, h, pl.z); g.scale.setScalar(0.9*pl.s); g.rotation.y=Math.random()*Math.PI*2;
        this.scene.add(g); this.obstacles.push(leaves as any);
        const box=new THREE.Box3().setFromObject(g); this.obstacleBoxes.push(box);
        continue;
      } else if(pl.type==='building'){
        const w=6*pl.s, d=6*pl.s, hh=10+Math.random()*22;
        const b=new THREE.Mesh(new THREE.BoxGeometry(w,hh,d), buildingMat); b.position.set(pl.x, h+ hh/2, pl.z); b.castShadow=true; b.receiveShadow=true; this.scene.add(b); this.obstacles.push(b);
        // windows emissive
        for(let k=0;k<3;k++){
          const win=new THREE.Mesh(new THREE.PlaneGeometry(w*0.42, 1.1), neonMats[k%neonMats.length]);
          win.position.set(pl.x + (Math.random()-0.5)*0.6, h+ 2.2 + k*3.1, pl.z + d/2+0.02); win.rotation.y=0; this.scene.add(win);
          const win2=win.clone(); win2.position.set(pl.x + w/2+0.02, h+ 2.2 + k*3.1, pl.z); win2.rotation.y=Math.PI/2; this.scene.add(win2);
        }
        // roof light
        const light=new THREE.PointLight(neonMats[Math.floor(Math.random()*neonMats.length)].color as any, 12, 42); light.position.set(pl.x, h+hh+1, pl.z); this.scene.add(light);
      } else if(pl.type==='spire'){
        const hh=28+Math.random()*38;
        const spire=new THREE.Mesh(new THREE.CylinderGeometry(0.6,2.2,hh,7), new THREE.MeshStandardMaterial({color:0x0a1428, metalness:0.5, roughness:0.4})); spire.position.set(pl.x, h+hh/2, pl.z); spire.castShadow=true; this.scene.add(spire); this.obstacles.push(spire);
        const ring=new THREE.Mesh(new THREE.TorusGeometry(2.8,0.14,8,18), neonMats[Math.floor(Math.random()*neonMats.length)]); ring.position.set(pl.x, h+hh-2, pl.z); ring.rotation.x=Math.PI/2; this.scene.add(ring);
        const beacon=new THREE.PointLight(0x00f5ff, 18, 70); beacon.position.set(pl.x, h+hh+2, pl.z); this.scene.add(beacon);
      }
      const box=new THREE.Box3(); // will update later from mesh
    }
    // build boxes
    this.obstacleBoxes = this.obstacles.map(m=> new THREE.Box3().setFromObject(m));

    // sky dome
    const skyGeo=new THREE.SphereGeometry(1600,32,16);
    const skyMat=new THREE.ShaderMaterial({
      side:THREE.BackSide,
      uniforms:{ top:{value:new THREE.Color(0x020308)}, mid:{value:new THREE.Color(0x0a1e4a)}, bottom:{value:new THREE.Color(0x1a0b2e)}, offset:{value:420}, exponent:{value:0.62} },
      vertexShader:`varying vec3 vW; void main(){ vec4 wp=modelMatrix*vec4(position,1.); vW=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader:`varying vec3 vW; uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; uniform float offset; uniform float exponent; void main(){ float h=normalize(vW).y; float t=clamp((h+0.18)*1.6,0.,1.); vec3 c=mix(bottom, mid, pow(t, exponent)); c=mix(c, top, smoothstep(0.2,0.9,t)); // stars
        float s= step(0.998, fract(sin(dot(vW.xz, vec2(12.9898,78.233)))*43758.5453)); c+= s*0.22; gl_FragColor=vec4(c,1.); }`
    });
    const sky=new THREE.Mesh(skyGeo, skyMat); this.scene.add(sky); this.sky=sky;

    // floating islands far
    for(let i=0;i<14;i++){
      const ang=Math.random()*Math.PI*2; const rad= 1100+Math.random()*340;
      const x=Math.cos(ang)*rad, z=Math.sin(ang)*rad, y=120+Math.random()*140;
      const isl=new THREE.Mesh(new THREE.DodecahedronGeometry(28+Math.random()*22,0), new THREE.MeshStandardMaterial({color:0x1a243a, roughness:0.9, flatShading:true})); isl.position.set(x,y,z); isl.scale.set(1,0.52,1); isl.rotation.set(Math.random(),Math.random(),Math.random()); this.scene.add(isl);
      const glow=new THREE.Mesh(new THREE.SphereGeometry(8,12,12), new THREE.MeshBasicMaterial({color:0x00f5ff, transparent:true, opacity:0.08})); glow.position.copy(isl.position); glow.scale.set(4,1.2,4); this.scene.add(glow);
    }

    // clouds
    for(let i=0;i<22;i++){
      const c=new THREE.Mesh(new THREE.SphereGeometry(18+Math.random()*28,10,8), new THREE.MeshStandardMaterial({color:0xffffff, transparent:true, opacity:0.06, roughness:1}));
      const ang=Math.random()*Math.PI*2, rad=Math.random()*820; c.position.set(Math.cos(ang)*rad, 140+Math.random()*60, Math.sin(ang)*rad); c.scale.set(2.2,0.9,1.6); this.scene.add(c);
    }

    // storm ring (visual)
    const ringGeo=new THREE.RingGeometry(1,1.04,96); ringGeo.rotateX(-Math.PI/2);
    const ringMat=new THREE.MeshBasicMaterial({color:0x00f5ff, transparent:true, opacity:0.32, side:THREE.DoubleSide, blending:THREE.AdditiveBlending});
    const ring=new THREE.Mesh(ringGeo, ringMat); ring.position.y=0.18; this.scene.add(ring); this.stormRing=ring;
    const wallGeo=new THREE.CylinderGeometry(1,1,220,64,1,true);
    const wallMat=new THREE.MeshBasicMaterial({color:0x7b61ff, transparent:true, opacity:0.07, side:THREE.DoubleSide, blending:THREE.AdditiveBlending, depthWrite:false});
    const wall=new THREE.Mesh(wallGeo, wallMat); wall.position.y=110; this.scene.add(wall); this.stormWall=wall;

    // ground fog particles
    const fogGeo=new THREE.BufferGeometry();
    const cnt=1800; const arr=new Float32Array(cnt*3);
    for(let i=0;i<cnt;i++){ const a=Math.random()*Math.PI*2, r=Math.pow(Math.random(),0.7)*900; arr[i*3]=Math.cos(a)*r; arr[i*3+1]= 1.2+ Math.random()*6; arr[i*3+2]=Math.sin(a)*r; }
    fogGeo.setAttribute('position', new THREE.BufferAttribute(arr,3));
    const fogMat=new THREE.PointsMaterial({color:0x7af6ff, size:1.8, transparent:true, opacity:0.22, sizeAttenuation:true, blending:THREE.AdditiveBlending, depthWrite:false});
    const fogPts=new THREE.Points(fogGeo, fogMat); this.scene.add(fogPts); (this as any).fogPts=fogPts;
  }

  sampleHeight(x:number,z:number){
    // approximate from terrain generation formula
    const d=Math.hypot(x,z);
    let h= Math.sin(x*0.008)*12 + Math.cos(z*0.009)*10 + Math.sin(x*0.003+z*0.004)*18 + Math.cos(x*0.0012)*30 * Math.exp(-d/900);
    if(d<120) h*= (d/120)*0.9;
    const edge=Math.max(0,(d-820)/320); h-= edge*edge*90;
    return h;
  }

  setupViewModel(){
    const g=new THREE.Group();
    // gun body
    const body=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.11,0.62), new THREE.MeshStandardMaterial({color:0x0e1528, metalness:0.5, roughness:0.4}));
    body.position.set(0.34,-0.22,-0.48); g.add(body);
    const barrel=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.028,0.72,10), new THREE.MeshStandardMaterial({color:0x0a1020, metalness:0.7, roughness:0.3}));
    barrel.rotation.x=Math.PI/2; barrel.position.set(0.34,-0.20,-0.84); g.add(barrel);
    const sight=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.07,0.14), new THREE.MeshStandardMaterial({color:0x111a2e}));
    sight.position.set(0.34,-0.12,-0.46); g.add(sight);
    const glow=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.02,0.34), new THREE.MeshStandardMaterial({color:0x00f5ff, emissive:0x00f5ff, emissiveIntensity:1.6}));
    glow.position.set(0.34,-0.16,-0.48); g.add(glow); (this as any).vmGlow=glow;
    // muzzle
    const muzzle=new THREE.Mesh(new THREE.SphereGeometry(0.07,10,10), new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0}));
    muzzle.position.set(0.34,-0.20,-1.22); g.add(muzzle); (this as any).vmMuzzle=muzzle;
    this.viewModel=g; this.camera.add(g); this.scene.add(this.camera);
    // arms (simple)
    const armL=new THREE.Mesh(new THREE.CapsuleGeometry(0.08,0.42,4,8), new THREE.MeshStandardMaterial({color:0x1a233a})); armL.position.set(0.22,-0.34,-0.32); armL.rotation.x=0.9; armL.rotation.z=-0.2; g.add(armL);
    const armR=new THREE.Mesh(new THREE.CapsuleGeometry(0.08,0.42,4,8), new THREE.MeshStandardMaterial({color:0x1a233a})); armR.position.set(0.48,-0.34,-0.28); armR.rotation.x=0.9; armR.rotation.z=0.2; g.add(armR);
  }

  spawnBots(){
    for(let i=0;i<22;i++){
      const ang=Math.random()*Math.PI*2, rad= 180+Math.random()*620;
      const x=Math.cos(ang)*rad, z=Math.sin(ang)*rad;
      const y=this.sampleHeight(x,z);
      const w=WEAPONS[Math.floor(Math.random()*WEAPONS.length)];
      const b=new Bot(new THREE.Vector3(x,y,z), w);
      this.bots.push(b); this.scene.add(b.mesh);
    }
    this.alive= 1 + this.bots.filter(b=>b.alive).length;
  }
  spawnCrates(){
    for(let i=0;i<54;i++){
      const ang=Math.random()*Math.PI*2, rad=Math.random()*760;
      const x=Math.cos(ang)*rad, z=Math.sin(ang)*rad;
      const h=this.sampleHeight(x,z);
      const t = Math.random()<0.62? 'weapon' : Math.random()<0.5? 'med':'shield';
      const c=new Crate(new THREE.Vector3(x,h,z), t as any);
      this.crates.push(c); this.scene.add(c.mesh);
    }
  }

  setupInput(){
    const canvas=this.renderer.domElement;
    canvas.addEventListener('click',()=>{
      if(this.gameOver) { location.reload(); return; }
      if(!this.pointerLocked) canvas.requestPointerLock();
    });
    document.addEventListener('pointerlockchange',()=>{
      this.pointerLocked = document.pointerLockElement===canvas;
      if(this.pointerLocked) this.synth.ensure();
    });
    addEventListener('keydown',(e)=>{
      this.keys.add(e.code);
      if(e.code==='KeyR') this.tryReload();
      if(e.code==='KeyE') this.tryInteract();
      if(e.code==='KeyG') this.throwGrenade();
      if(e.code==='Digit1') this.switchSlot(0);
      if(e.code==='Digit2') this.switchSlot(1);
      if(e.code==='Digit3') this.switchSlot(2);
      if(e.code==='Digit4') this.switchSlot(3);
      if(e.code==='Digit5') this.switchSlot(4);
      if(e.code==='Digit6') this.switchSlot(5);
      if(e.code==='Space'){ if(this.isGrounded){ this.playerVel.y=8.2; this.isGrounded=false; } else if(this.canDash && this.dashCd<=0){ this.playerVel.y=5.2; this.playerVel.x+= Math.sin(this.yaw)*4; this.playerVel.z+= Math.cos(this.yaw)*4; this.canDash=false; this.dashCd=1.1; this.spawnJetParticles(); } }
      if(e.code==='KeyQ') this.switchSlot((this.curSlot+5)%6);
      if(e.code==='KeyH') this.heal();
    });
    addEventListener('keyup',(e)=> this.keys.delete(e.code));
    addEventListener('mousedown',(e)=>{ if(e.button===0) this.mouseDown=true; if(e.button===2) this.isAds=true; });
    addEventListener('mouseup',(e)=>{ if(e.button===0) this.mouseDown=false; if(e.button===2) this.isAds=false; });
    addEventListener('contextmenu',e=>e.preventDefault());
    addEventListener('mousemove',(e)=>{
      if(!this.pointerLocked) return;
      const sens=0.0022;
      this.yaw -= e.movementX * sens;
      this.pitch -= e.movementY * sens;
      this.pitch=THREE.MathUtils.clamp(this.pitch, -1.45, 1.45);
    });
    addEventListener('wheel',(e)=>{
      if(e.deltaY>0) this.switchSlot((this.curSlot+1)%6);
      else this.switchSlot((this.curSlot+5)%6);
    });
  }

  switchSlot(s:number){
    if(s===this.curSlot) return;
    this.curSlot=s; this.reloading=false; this.reloadT=0;
    const def=this.weapons[this.curSlot];
    const glow=(this as any).vmGlow as THREE.Mesh; (glow.material as THREE.MeshStandardMaterial).color.setHex(def.color); (glow.material as THREE.MeshStandardMaterial).emissive.setHex(def.color);
    this.synth.blip(520,0.06,'sine',0.08);
    this.updateHUD();
  }
  tryReload(){
    if(this.reloading) return;
    const def=this.weapons[this.curSlot];
    if(this.curAmmo[this.curSlot]===def.mag) return;
    if(this.reserve[this.curSlot]<=0) { this.synth.empty(); return; }
    this.reloading=true; this.reloadT=def.reload; this.synth.reload();
  }
  tryInteract(){
    let best: Crate|null=null, bestD=3.2;
    for(const c of this.crates){ if(c.opened) continue; const d=c.pos.distanceTo(this.playerPos); if(d<bestD){ bestD=d; best=c; } }
    if(best){
      best.open(this.scene);
      // reward
      if(best.type==='weapon'){
        // give random weapon ammo + switch maybe
        const wIdx=Math.floor(Math.random()*6);
        this.reserve[wIdx]=Math.min(this.reserve[wIdx]+ Math.floor(30+Math.random()*60), 240);
        if(Math.random()<0.35) this.switchSlot(wIdx);
        this.synth.pickup(); this.hud.pushKill(`<span style="color:#00f5ff">LOOTED</span> <b>${WEAPONS[wIdx].name}</b> <span style="opacity:.6">+AMMO</span>`);
        this.spawnLootBurst(best.pos);
      } else if(best.type==='med'){
        this.hp=Math.min(this.maxHp, this.hp+42); this.hud.flashHeal(); this.synth.pickup();
      } else {
        this.armor=Math.min(this.maxArmor, this.armor+50); this.synth.pickup(); this.hud.flashHeal();
      }
      this.updateHUD();
    }
  }
  heal(){
    if(this.hp>=this.maxHp) return;
    this.hp=Math.min(this.maxHp, this.hp+28); this.hud.flashHeal(); this.synth.pickup(); this.updateHUD();
  }
  throwGrenade(){
    // visual only
    this.synth.blip(320,0.08,'square',0.12);
    const n=new THREE.Mesh(new THREE.SphereGeometry(0.18,8,8), new THREE.MeshStandardMaterial({color:0xff3b30, emissive:0xff3b30, emissiveIntensity:0.8}));
    n.position.copy(this.playerPos).add(new THREE.Vector3(0,0.2,0)); this.scene.add(n);
    const vel=new THREE.Vector3(Math.sin(this.yaw)*12, 4.5, Math.cos(this.yaw)*12);
    let life=1.8;
    const tick=(dt:number)=>{
      if(life<=0){ // explode
        this.scene.remove(n);
        this.spawnExplosion(n.position);
        // damage bots
        for(const b of this.bots){ if(!b.alive) continue; const d=b.pos.distanceTo(n.position); if(d<13){ const dmg= (1-d/13)*84; b.damage(dmg,false); if(!b.alive){ this.kills++; this.onBotDead(b); } } }
        const dSelf=this.playerPos.distanceTo(n.position); if(dSelf<13){ this.applyDamage((1-dSelf/13)*64); }
        return;
      }
      life-=dt; vel.y-=9.8*dt; n.position.add(vel.clone().multiplyScalar(dt));
      // ground
      const gh=this.sampleHeight(n.position.x,n.position.z);
      if(n.position.y<gh+0.2){ n.position.y=gh+0.2; vel.y*=-0.4; vel.x*=0.7; vel.z*=0.7; }
      requestAnimationFrame(()=>tick(0.016));
    };
    // use clock
    tick(0.016);
  }
  spawnLootBurst(pos:THREE.Vector3){
    for(let i=0;i<18;i++){
      const m=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.12,0.12), new THREE.MeshBasicMaterial({color:0x00f5ff}));
      m.position.copy(pos).add(new THREE.Vector3(0,1,0)); this.scene.add(m);
      const v=new THREE.Vector3((Math.random()-0.5)*6, 2+Math.random()*5, (Math.random()-0.5)*6);
      let life=0.7+Math.random()*0.5;
      const upd=()=>{
        if(life<=0){ this.scene.remove(m); return; }
        life-=0.016; m.position.add(v.clone().multiplyScalar(0.016)); v.y-=9.8*0.016; m.rotation.x+=0.12; m.rotation.y+=0.1;
        requestAnimationFrame(upd);
      }; upd();
    }
  }
  spawnJetParticles(){
    for(let i=0;i<10;i++){
      const p=new THREE.Mesh(new THREE.SphereGeometry(0.09,6,6), new THREE.MeshBasicMaterial({color:0x7af6ff, transparent:true, opacity:0.9}));
      p.position.copy(this.playerPos).add(new THREE.Vector3((Math.random()-0.5)*0.6, -0.6, (Math.random()-0.5)*0.6)); this.scene.add(p);
      const v=new THREE.Vector3((Math.random()-0.5)*2, -2 -Math.random()*3, (Math.random()-0.5)*2);
      let l=0.45; const upd=()=>{ if(l<=0){ this.scene.remove(p); return; } l-=0.016; p.position.add(v.clone().multiplyScalar(0.016)); (p.material as THREE.MeshBasicMaterial).opacity=l*2; requestAnimationFrame(upd); }; upd();
    }
  }
  spawnExplosion(pos:THREE.Vector3){
    // flash
    const flash=new THREE.PointLight(0xff6a00, 60, 34); flash.position.copy(pos); this.scene.add(flash); setTimeout(()=>this.scene.remove(flash),220);
    for(let i=0;i<26;i++){
      const m=new THREE.Mesh(new THREE.SphereGeometry(0.14+Math.random()*0.22,6,6), new THREE.MeshBasicMaterial({color: new THREE.Color().setHSL(0.08+Math.random()*0.08,1,0.58), transparent:true, opacity:0.95}));
      m.position.copy(pos); this.scene.add(m);
      const v=new THREE.Vector3((Math.random()-0.5)*18, Math.random()*12, (Math.random()-0.5)*18);
      let l=0.55+Math.random()*0.4;
      const upd=()=>{ if(l<=0){ this.scene.remove(m); return; } l-=0.016; m.position.add(v.clone().multiplyScalar(0.016)); v.y-=14*0.016; v.multiplyScalar(0.98); (m.material as THREE.MeshBasicMaterial).opacity=l; m.scale.multiplyScalar(0.992); requestAnimationFrame(upd); }; upd();
    }
    // decal
    const dec=new THREE.Mesh(new THREE.CircleGeometry(3.2+Math.random()*1.5,16), new THREE.MeshBasicMaterial({color:0x111111, transparent:true, opacity:0.42}));
    dec.rotation.x=-Math.PI/2; dec.position.set(pos.x, this.sampleHeight(pos.x,pos.z)+0.04, pos.z); this.scene.add(dec); this.decals.push(dec);
  }

  // ——— Shooting ———
  shootTimer=0;
  tryShoot(dt:number){
    const def=this.weapons[this.curSlot];
    this.shootTimer-=dt;
    if(!this.mouseDown) return;
    if(this.reloading) return;
    if(this.shootTimer>0) return;
    if(this.curAmmo[this.curSlot]<=0){ this.synth.empty(); this.shootTimer=0.32; return; }
    // fire
    const interval=60/def.rpm;
    this.shootTimer=interval;
    this.curAmmo[this.curSlot]--;
    this.spreadAcc = Math.min(1, this.spreadAcc + (def.automatic?0.09:0.22));
    this.synth.shoot(def, this.isAds);
    // muzzle flash
    const mu=(this as any).vmMuzzle as THREE.Mesh; (mu.material as THREE.MeshBasicMaterial).opacity=1;
    setTimeout(()=> (mu.material as THREE.MeshBasicMaterial).opacity=0, 34);
    // view kick
    this.pitch += (Math.random()*0.008 + def.recoil[0]*0.011)*(this.isAds?0.55:1);
    this.yaw += (Math.random()-0.5)*def.recoil[0]*0.012;
    // ray
    const spread = THREE.MathUtils.lerp(def.spread, def.adsSpread, this.ads) + this.spreadAcc*0.012;
    const pellets = def.pellets||1;
    for(let p=0;p<pellets;p++){
      const dir=new THREE.Vector3(0,0,-1);
      dir.x += (Math.random()-0.5)*spread; dir.y += (Math.random()-0.5)*spread;
      dir.normalize(); dir.applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ')));
      const origin=this.playerPos.clone().add(new THREE.Vector3(0,0.06,0));
      // tracer
      this.spawnTracer(origin, dir, def);
      // hits
      const hit = this.raycast(origin, dir, def.range);
      if(hit){
        this.spawnImpact(hit.point, hit.normal, def.color);
        if(hit.bot){
          const isHead = hit.point.y > hit.bot.mesh.position.y+1.68;
          const dmg= def.damage * (isHead? def.headshot:1) * (1 - Math.min(0.45, hit.distance/def.range * (1-def.falloff)));
          hit.bot.damage(dmg, isHead);
          this.synth.hit(isHead); this.hud.flashHit(isHead);
          this.spawnHitNumber(hit.point, Math.round(dmg), isHead);
          if(!hit.bot.alive){ this.kills++; this.onBotDead(hit.bot); }
        } else if(hit.isTerrain){
          // decal
          const d=new THREE.Mesh(new THREE.CircleGeometry(0.22,8), new THREE.MeshBasicMaterial({color:0x111a2e, transparent:true, opacity:0.85}));
          d.position.copy(hit.point).add(hit.normal.clone().multiplyScalar(0.02)); d.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), hit.normal); this.scene.add(d); this.decals.push(d);
          if(this.decals.length>120){ const old=this.decals.shift()!; this.scene.remove(old); }
        }
      }
    }
    // auto reload if empty
    if(this.curAmmo[this.curSlot]<=0 && this.reserve[this.curSlot]>0){
      setTimeout(()=>this.tryReload(),120);
    }
    this.updateHUD();
  }
  raycast(origin:THREE.Vector3, dir:THREE.Vector3, range:number): {point:THREE.Vector3, normal:THREE.Vector3, distance:number, bot:Bot|null, isTerrain:boolean}|null{
    let closest:number=range, hitPoint:THREE.Vector3|null=null, hitNormal:THREE.Vector3|null=null, hitBot:Bot|null=null, isTerrain=false;
    // bots: sphere approx
    for(const b of this.bots){
      if(!b.alive) continue;
      const oc=origin.clone().sub(b.mesh.position.clone().add(new THREE.Vector3(0,1.1,0)));
      const r=0.9;
      const bDot = oc.dot(dir);
      const c = oc.lengthSq() - r*r;
      const disc = bDot*bDot - c;
      if(disc<0) continue;
      const t = -bDot - Math.sqrt(disc);
      if(t>0.12 && t<closest){ closest=t; hitPoint=origin.clone().add(dir.clone().multiplyScalar(t)); hitNormal=hitPoint.clone().sub(b.mesh.position.clone().add(new THREE.Vector3(0,1.1,0))).normalize(); hitBot=b; isTerrain=false; }
    }
    // terrain + obstacles approx: ray march vs height + boxes
    // sample terrain
    const steps=48; const step= range/steps;
    for(let i=1;i<steps;i++){
      const t=i*step;
      if(t>=closest) break;
      const p=origin.clone().add(dir.clone().multiplyScalar(t));
      const gh=this.sampleHeight(p.x,p.z);
      if(p.y<= gh+0.08){
        closest=t; hitPoint=p.clone(); hitNormal=new THREE.Vector3(0,1,0); hitBot=null; isTerrain=true; break;
      }
      // boxes
      for(const box of this.obstacleBoxes){
        // quick sphere check
        const c=new THREE.Vector3(); box.getCenter(c);
        if(p.distanceTo(c)>10) continue;
        if(box.containsPoint(p)){ closest=t; hitPoint=p.clone(); hitNormal=dir.clone().negate(); hitBot=null; isTerrain=true; break; }
      }
      if(isTerrain) break;
    }
    if(!hitPoint) return null;
    return { point:hitPoint, normal:hitNormal!, distance:closest, bot:hitBot, isTerrain };
  }
  spawnTracer(origin:THREE.Vector3, dir:THREE.Vector3, def:WeaponDef){
    const geo=new THREE.CylinderGeometry(0.013,0.018,1.9,6); geo.translate(0,0.95,0);
    const mat=new THREE.MeshBasicMaterial({color:def.tracer, transparent:true, opacity:0.92, blending:THREE.AdditiveBlending, depthWrite:false});
    const m=new THREE.Mesh(geo, mat);
    m.position.copy(origin);
    const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize());
    m.quaternion.copy(q);
    // stretch by velocity
    m.scale.y= 6 + def.velocity*0.04;
    this.scene.add(m);
    let life=0.14;
    const vel=dir.clone().normalize().multiplyScalar(def.velocity);
    const tick=(dt:number)=>{
      if(life<=0){ this.scene.remove(m); return; }
      life-=dt; m.position.add(vel.clone().multiplyScalar(dt));
      (m.material as THREE.MeshBasicMaterial).opacity=life*6.5;
      requestAnimationFrame(()=>tick(0.016));
    }; tick(0.016);
  }
  spawnImpact(p:THREE.Vector3, n:THREE.Vector3, col:number){
    for(let i=0;i<7;i++){
      const m=new THREE.Mesh(new THREE.SphereGeometry(0.045,5,5), new THREE.MeshBasicMaterial({color: col, transparent:true, opacity:0.95}));
      m.position.copy(p).add(n.clone().multiplyScalar(0.04)); this.scene.add(m);
      const v=n.clone().add(new THREE.Vector3((Math.random()-0.5)*1.2, Math.random()*0.9, (Math.random()-0.5)*1.2)).normalize().multiplyScalar(2+Math.random()*6);
      let life=0.22+Math.random()*0.18;
      const upd=()=>{ if(life<=0){ this.scene.remove(m); return; } life-=0.016; m.position.add(v.clone().multiplyScalar(0.016)); v.y-=9.8*0.016; (m.material as THREE.MeshBasicMaterial).opacity=life*4; requestAnimationFrame(upd); }; upd();
    }
    const light=new THREE.PointLight(col, 4, 6); light.position.copy(p).add(n.clone().multiplyScalar(0.2)); this.scene.add(light); setTimeout(()=>this.scene.remove(light),60);
  }
  spawnHitNumber(p:THREE.Vector3, dmg:number, head:boolean){
    const c=document.createElement('div');
    c.textContent= head? `${dmg} HEAD` : `${dmg}`;
    c.style.cssText=`position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);color:${head?'#ffcc00':'#fff'};font-family:'Orbitron',monospace;font-weight:900;font-size:${head? '18px':'14px'};text-shadow:0 0 10px ${head?'rgba(255,204,0,.9)':'rgba(255,255,255,.8)'};pointer-events:none;z-index:11`;
    document.body.appendChild(c);
    // project 3D to 2D
    const v=p.clone().project(this.camera);
    const x=(v.x*0.5+0.5)*innerWidth, y=(-v.y*0.5+0.5)*innerHeight;
    c.style.left=`${x}px`; c.style.top=`${y}px`;
    let t=0;
    const anim=()=>{
      t+=0.016; c.style.transform=`translate(-50%,-50%) translateY(${-t*42}px) scale(${1+t*0.12})`; c.style.opacity=`${1-t*1.5}`;
      if(t<0.66) requestAnimationFrame(anim); else c.remove();
    }; anim();
  }

  onBotDead(bot:Bot){
    this.alive = 1 + this.bots.filter(b=>b.alive).length;
    const names=["WRAITH","GHOST","VEX","JAX","NOVA","BLITZ","FANG","REX","KILO","ECHO"];
    const killer = Math.random()<0.78? 'YOU' : names[Math.floor(Math.random()*names.length)];
    const victim = `BOT-${Math.floor(Math.random()*900)+100}`;
    if(killer==='YOU'){ this.hud.pushKill(`<span style="color:#00f5ff">${killer}</span> <span style="color:#ffcc00">◈</span> <span style="opacity:.9">${victim}</span> <span style="opacity:.5">${bot.weapon.name}</span>`); this.synth.kill(); }
    else this.hud.pushKill(`<span style="opacity:.7">${killer}</span> <span style="opacity:.4">×</span> <span style="opacity:.7">${victim}</span>`);
    // drop loot
    if(Math.random()<0.62){
      const c=new Crate(bot.pos.clone(), 'weapon'); this.crates.push(c); this.scene.add(c.mesh);
    }
    this.updateHUD();
    if(this.alive<=1 && !this.gameOver){ this.victory=true; this.triggerEnd(true); }
  }

  applyDamage(amt:number){
    if(this.gameOver) return;
    // armor first
    let left=amt;
    if(this.armor>0){ const ab=Math.min(this.armor, left*0.66); this.armor-=ab; left-=ab; }
    this.hp-=left;
    this.hud.flashDamage(); this.synth.hurt();
    this.hitFlash=0.42;
    if(this.hp<=0){ this.hp=0; this.triggerEnd(false); }
    this.updateHUD();
  }
  triggerEnd(win:boolean){
    if(this.gameOver) return; this.gameOver=true; this.victory=win;
    const over=document.createElement('div');
    over.style.cssText=`position:fixed;inset:0;background:radial-gradient(900px 600px at 50% 40%, ${win?'rgba(0,255,136,.18)':'rgba(255,59,48,.18)'}, rgba(2,3,8,.88) 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;color:#fff;text-align:center;backdrop-filter:blur(8px)`;
    over.innerHTML=`
      <div style="font-family:'Orbitron',monospace;font-weight:900;font-size:56px;letter-spacing:.12em;background:linear-gradient(90deg, ${win?'#00ff88,#00f5ff':'#ff3b30,#ff7a00'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 20px ${win?'rgba(0,255,136,.6)':'rgba(255,59,48,.6)'})">${win?'VICTORY':'ELIMINATED'}</div>
      <div style="margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.22em;opacity:.7">${win?'YOU ARE THE LAST RUNNER STANDING':'BETTER LUCK NEXT DROP, RUNNER'}</div>
      <div style="margin-top:22px;display:flex;gap:18px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em">
        <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:12px 18px;border-radius:12px"><div style="opacity:.6">KILLS</div><div style="font-size:22px;font-weight:900;margin-top:4px">${this.kills}</div></div>
        <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:12px 18px;border-radius:12px"><div style="opacity:.6">PLACEMENT</div><div style="font-size:22px;font-weight:900;margin-top:4px">#${win?1: (60-this.alive+1)}</div></div>
        <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:12px 18px;border-radius:12px"><div style="opacity:.6">SURVIVED</div><div style="font-size:22px;font-weight:900;margin-top:4px">${Math.floor(this.time)}s</div></div>
      </div>
      <button id="again" style="margin-top:28px;background:linear-gradient(90deg,#00f5ff,#7b61ff);border:none;padding:12px 26px;border-radius:999px;color:#fff;font-family:'Orbitron',monospace;font-weight:900;letter-spacing:.14em;cursor:pointer;box-shadow:0 0 18px rgba(0,245,255,.6)">PLAY AGAIN — CLICK OR PRESS R</button>
      <div style="margin-top:12px;opacity:.5;font-size:11px;letter-spacing:.1em">NEXUS: FRAGMENT — 100,000 LINES OF PURE COMBAT</div>
    `;
    document.body.appendChild(over);
    over.querySelector('#again')!.addEventListener('click',()=>location.reload());
    addEventListener('keydown',(e)=>{ if(e.code==='KeyR') location.reload(); });
    // confetti for win
    if(win){
      for(let i=0;i<56;i++){
        const d=document.createElement('div'); d.style.cssText=`position:fixed;left:${50+(Math.random()-0.5)*44}%;top:-10px;width:8px;height:12px;background:${['#00f5ff','#7b61ff','#ff00e6','#ffcc00','#00ff88'][i%5]};transform:rotate(${Math.random()*360}deg);pointer-events:none;z-index:51`;
        document.body.appendChild(d);
        let y=-10, vy= 1+Math.random()*3, x=parseFloat(d.style.left), vx=(Math.random()-0.5)*0.6, rot=Math.random()*360, vr=(Math.random()-0.5)*8;
        const f=()=>{
          y+=vy; x+=vx; rot+=vr; vy+=0.06; d.style.top=y+'%'; d.style.left=x+'%'; d.style.transform=`rotate(${rot}deg)`;
          if(y<112) requestAnimationFrame(f); else d.remove();
        }; setTimeout(f, i*28);
      }
    }
  }

  // ——— Storm / Zone ———
  updateZone(dt:number){
    this.zoneTimer-=dt;
    if(this.zoneTimer<=0 && !this.zoneShrinking){
      // start shrink
      this.zoneShrinking=true; this.zoneShrinkT=18;
      this.zonePhase++;
      const shrinkFactor = [0.72,0.56,0.38,0.22,0.12][Math.min(this.zonePhase-1,4)] || 0.12;
      const newR = 860 * shrinkFactor;
      // new center jitter toward map center (0,0) a bit
      const cur=this.zone;
      const nx = THREE.MathUtils.lerp(cur.x, (Math.random()-0.5)*180, 0.42);
      const nz = THREE.MathUtils.lerp(cur.z, (Math.random()-0.5)*180, 0.42);
      this.nextZone={ x:nx, z:nz, r:newR };
      this.hud.pushKill(`<span style="color:#ffcc00">⚠ ZONE SHRINKING</span> <span style="opacity:.7">PHASE ${this.zonePhase} → ${Math.round(newR)}m</span>`);
    }
    if(this.zoneShrinking){
      this.zoneShrinkT-=dt;
      const t= 1 - (this.zoneShrinkT/18);
      const eased = 1 - Math.pow(1-t, 3);
      this.zone.x = THREE.MathUtils.lerp(this.zone.x, this.nextZone.x, eased*0.02);
      this.zone.z = THREE.MathUtils.lerp(this.zone.z, this.nextZone.z, eased*0.02);
      this.zone.r = THREE.MathUtils.lerp(this.zone.r, this.nextZone.r, eased*0.018);
      if(this.zoneShrinkT<=0){
        this.zone={...this.nextZone}; this.zoneShrinking=false; this.zoneTimer= 44 + Math.max(0, 4-this.zonePhase)*8;
      }
    }
    // visual
    this.stormRing.position.set(this.zone.x, 0.18, this.zone.z); this.stormRing.scale.set(this.zone.r, this.zone.r, 1);
    (this.stormRing.material as THREE.MeshBasicMaterial).opacity = this.zoneShrinking? 0.42 : 0.26;
    this.stormWall.position.set(this.zone.x, 110, this.zone.z); (this.stormWall as THREE.Mesh).scale.set(this.zone.r,1,this.zone.r);
    // storm damage
    const d=Math.hypot(this.playerPos.x - this.zone.x, this.playerPos.z - this.zone.z);
    if(d > this.zone.r){
      const out = d - this.zone.r;
      const dmg = (out*0.004 + this.zonePhase*0.12) * dt * 11;
      this.applyDamage(dmg);
      this.damageVignette.style.opacity = Math.min(0.72, out*0.002).toString();
      this.damageVignette.style.background = `radial-gradient(700px 500px at 50% 50%, transparent 42%, rgba(123,97,255,${0.22+ out*0.0006}) 88%)`;
    }
    this.hud.setZone(Math.max(0, this.zoneShrinking? this.zoneShrinkT: this.zoneTimer), this.zonePhase);
  }

  // ——— Player Motor ———
  updatePlayer(dt:number){
    // accel
    const speed = this.keys.has('ShiftLeft')? 9.8 : 6.4;
    const forward=new THREE.Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw));
    const right=new THREE.Vector3(Math.sin(this.yaw+Math.PI/2),0,Math.cos(this.yaw+Math.PI/2));
    let wish=new THREE.Vector3();
    if(this.keys.has('KeyW')) wish.add(forward);
    if(this.keys.has('KeyS')) wish.sub(forward);
    if(this.keys.has('KeyA')) wish.sub(right);
    if(this.keys.has('KeyD')) wish.add(right);
    const isMoving = wish.lengthSq()>0.001;
    if(isMoving) wish.normalize().multiplyScalar(speed);
    // crouch/slide
    let h=1.78;
    if(this.keys.has('ControlLeft') && isMoving && this.playerVel.length()>6.2){
      wish.multiplyScalar(1.55); h=1.12; this.playerVel.y-= 8*dt;
    } else if(this.keys.has('ControlLeft')){ h=1.12; wish.multiplyScalar(0.62); }
    // friction & accel
    const accel= isMoving? 46 : 18;
    this.playerVel.x = THREE.MathUtils.lerp(this.playerVel.x, wish.x, dt*accel*0.18);
    this.playerVel.z = THREE.MathUtils.lerp(this.playerVel.z, wish.z, dt*accel*0.18);
    // gravity
    this.playerVel.y -= 18.2*dt;
    // integrate
    const next=this.playerPos.clone().add(this.playerVel.clone().multiplyScalar(dt));
    // collide with terrain height
    const gh=this.sampleHeight(next.x, next.z);
    if(next.y < gh + h){
      next.y = gh + h;
      if(this.playerVel.y<0) this.playerVel.y=0;
      this.isGrounded=true; this.canDash=true;
    } else {
      this.isGrounded=false;
    }
    // collide obstacles (simple push out)
    for(const box of this.obstacleBoxes){
      const closest=new THREE.Vector3(); box.clampPoint(next, closest);
      const d=next.distanceTo(closest);
      if(d<0.72){
        const push=next.clone().sub(closest).normalize().multiplyScalar(0.72 - d + 0.02);
        push.y=0; next.add(push); this.playerVel.x*=0.6; this.playerVel.z*=0.6;
      }
    }
    // world bounds
    next.x=THREE.MathUtils.clamp(next.x,-960,960); next.z=THREE.MathUtils.clamp(next.z,-960,960);
    this.playerPos.copy(next);
    // camera
    this.camera.position.copy(this.playerPos);
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
    // ADS lerp
    this.ads = THREE.MathUtils.lerp(this.ads, this.isAds?1:0, dt*12);
    this.camera.fov = THREE.MathUtils.lerp(84, 52, this.ads);
    this.camera.updateProjectionMatrix();
    // bob
    if(isMoving && this.isGrounded){
      this.bobT+= dt* (this.keys.has('ShiftLeft')? 11: 7.2);
      const bobX=Math.sin(this.bobT)*0.025, bobY=Math.abs(Math.cos(this.bobT))*0.018;
      this.viewModel.position.x = THREE.MathUtils.lerp(this.viewModel.position.x, bobX* (this.isAds?0.3:1), dt*10);
      this.viewModel.position.y = THREE.MathUtils.lerp(this.viewModel.position.y, bobY* (this.isAds?0.3:1), dt*10);
    } else {
      this.viewModel.position.x = THREE.MathUtils.lerp(this.viewModel.position.x, 0, dt*6);
      this.viewModel.position.y = THREE.MathUtils.lerp(this.viewModel.position.y, 0, dt*6);
    }
    // spread recovery
    this.spreadAcc = Math.max(0, this.spreadAcc - dt*1.9);
    this.viewModel.rotation.z = THREE.MathUtils.lerp(this.viewModel.rotation.z, (this.playerVel.length()*0.004 + this.spreadAcc*0.12)*(this.isAds?0.2:1), dt*12);
    this.viewModel.position.z = THREE.MathUtils.lerp(this.viewModel.position.z, -0.48 - this.ads*0.22, dt*14);
    this.hud.setCrossSpread(this.spreadAcc*0.22 + (this.isAds?0:0.06));
    this.hud.setCompass(this.yaw);
    // reload
    if(this.reloading){
      this.reloadT-=dt;
      const def=this.weapons[this.curSlot];
      const p= 1 - (this.reloadT/def.reload);
      (document.getElementById('reloadBar') as HTMLDivElement).style.width=`${p*100}%`;
      if(this.reloadT<=0){
        const need= def.mag - this.curAmmo[this.curSlot];
        const take=Math.min(need, this.reserve[this.curSlot]);
        this.curAmmo[this.curSlot]+=take; this.reserve[this.curSlot]-=take;
        this.reloading=false; (document.getElementById('reloadBar') as HTMLDivElement).style.width=`0%`;
        this.updateHUD();
      }
    }
    // dash cd
    if(this.dashCd>0) this.dashCd-=dt;
    // interact hint
    let near=false, label='';
    for(const c of this.crates){ if(c.opened) continue; if(c.pos.distanceTo(this.playerPos)<3.8){ near=true; label=`LOOT CACHE — ${c.type.toUpperCase()}`; break; } }
    this.hud.showInteract(near, label);
    // auto regen small
    // fog anim
    const fp=(this as any).fogPts as THREE.Points;
    if(fp){ fp.rotation.y+= dt*0.02; }
  }

  updateBots(dt:number){
    for(const b of this.bots){
      b.update(dt, this.playerPos, this.obstacleBoxes, this.time);
      // bot shooting
      if(b.canShoot(this.playerPos) && Math.random()<0.028){
        b.shootCd= 60/b.weapon.rpm + Math.random()*0.28;
        b.ammo--; if(b.ammo<=0){ b.ammo=b.weapon.mag; b.shootCd+=1.2; }
        // trace vs player
        const dir=this.playerPos.clone().sub(b.pos).add(new THREE.Vector3(0,1.1,0)).normalize();
        dir.x+=(Math.random()-0.5)*0.04; dir.y+=(Math.random()-0.5)*0.04; dir.z+=(Math.random()-0.5)*0.04;
        const origin=b.pos.clone().add(new THREE.Vector3(0,1.2,0));
        // tracer vis
        const tracer=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,1,6), new THREE.MeshBasicMaterial({color:b.weapon.tracer, transparent:true, opacity:0.88, blending:THREE.AdditiveBlending}));
        tracer.position.copy(origin); const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir); tracer.quaternion.copy(q); tracer.scale.y=4.2; this.scene.add(tracer); setTimeout(()=>this.scene.remove(tracer),90);
        // hit player?
        const dist=b.pos.distanceTo(this.playerPos);
        const acc = 0.72 - dist*0.0012;
        if(Math.random()<acc){
          const isHead = Math.random()<0.18;
          const dmg=b.weapon.damage * (isHead?1.45:1) * 0.62;
          this.applyDamage(dmg);
          // hit indicator
          this.spawnImpact(this.playerPos.clone().add(new THREE.Vector3(0,0.5,0)), dir.clone().negate(), b.color);
        }
        // muzzle flash on bot
        const flash=new THREE.PointLight(b.weapon.tracer, 5, 9); flash.position.copy(origin).add(dir.clone().multiplyScalar(0.7)); this.scene.add(flash); setTimeout(()=>this.scene.remove(flash),38);
      }
      // bot vs bot combat (simple)
      if(Math.random()<0.006){
        const other=this.bots[Math.floor(Math.random()*this.bots.length)];
        if(other && other!==b && other.alive && b.pos.distanceTo(other.pos)<42 && other.pos.distanceTo(this.playerPos)> 28){
          other.damage(18+Math.random()*22, Math.random()<0.12);
          if(!other.alive) this.onBotDead(other);
        }
      }
    }
  }

  updateHUD(){
    const def=this.weapons[this.curSlot];
    this.hud.setHealth(this.hp, this.armor);
    this.hud.setAmmo(this.curAmmo[this.curSlot], this.reserve[this.curSlot], def.name, def.icon, this.curSlot);
    this.hud.setAlive(this.alive, 60);
    this.hud.drawMinimap(this.playerPos.x, this.playerPos.z, this.yaw, this.bots.map(b=>({x:b.pos.x,z:b.pos.z,alive:b.alive})), this.crates.map(c=>({x:c.pos.x,z:c.pos.z,opened:c.opened})), this.zone, this.nextZone);
  }

  onResize(){
    this.camera.aspect=innerWidth/innerHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(innerWidth,innerHeight);
  }

  animate(){
    requestAnimationFrame(()=>this.animate());
    const dt=Math.min(0.033, this.clock.getDelta());
    if(this.gameOver) { this.renderer.render(this.scene,this.camera); return; }
    this.time+=dt;
    this.tryShoot(dt);
    this.updatePlayer(dt);
    this.updateBots(dt);
    this.updateZone(dt);
    // sun orbit subtle
    const sun=(this as any).sun as THREE.DirectionalLight;
    sun.position.x= 420*Math.cos(this.time*0.02);
    sun.position.z= 260*Math.sin(this.time*0.02);
    // camera shake on hit
    if(this.hitFlash>0){ this.hitFlash-=dt; this.camera.position.x+= (Math.random()-0.5)*this.hitFlash*0.22; this.camera.position.y+= (Math.random()-0.5)*this.hitFlash*0.22; }
    this.renderer.render(this.scene,this.camera);
    // periodic HUD
    if(Math.floor(this.time*4)%4===0) this.updateHUD();
  }
}

new Game();
