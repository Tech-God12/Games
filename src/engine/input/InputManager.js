
export class InputManager {
  constructor(){ this.keys=new Map(); this.mouse={ x:0,y:0, deltaX:0, deltaY:0, buttons:new Map(), wheel:0 }; this.gamepad=null; this.actions=new Map(); this.bindings=new Map(); this.sensitivity=0.002; this.invertY=false; this.setupListeners(); this.setupDefaultBindings(); }
  setupDefaultBindings(){
    this.bindings.set('move_forward',['KeyW','ArrowUp']); this.bindings.set('move_back',['KeyS','ArrowDown']); this.bindings.set('move_left',['KeyA','ArrowLeft']); this.bindings.set('move_right',['KeyD','ArrowRight']);
    this.bindings.set('jump',['Space']); this.bindings.set('crouch',['ControlLeft','KeyC']); this.bindings.set('sprint',['ShiftLeft']); this.bindings.set('interact',['KeyE']);
    this.bindings.set('fire',['Mouse0']); this.bindings.set('ads',['Mouse2']); this.bindings.set('reload',['KeyR']); this.bindings.set('melee',['KeyV']); this.bindings.set('ability',['KeyQ']); this.bindings.set('ultimate',['KeyX']);
    this.bindings.set('weapon_1',['Digit1']); this.bindings.set('weapon_2',['Digit2']); this.bindings.set('weapon_3',['Digit3']); this.bindings.set('inventory',['Tab','KeyI']); this.bindings.set('map',['KeyM']);
  }
  setupListeners(){
    window.addEventListener('keydown', e=>{ this.keys.set(e.code, true); });
    window.addEventListener('keyup', e=>{ this.keys.set(e.code, false); });
    window.addEventListener('mousedown', e=>{ this.mouse.buttons.set(e.button, true); if(e.button===0) this.keys.set('Mouse0', true); if(e.button===2) this.keys.set('Mouse2', true); });
    window.addEventListener('mouseup', e=>{ this.mouse.buttons.set(e.button, false); if(e.button===0) this.keys.set('Mouse0', false); if(e.button===2) this.keys.set('Mouse2', false); });
    window.addEventListener('mousemove', e=>{ this.mouse.deltaX=e.movementX||0; this.mouse.deltaY=e.movementY||0; this.mouse.x+=this.mouse.deltaX; this.mouse.y+=this.mouse.deltaY; });
    window.addEventListener('wheel', e=>{ this.mouse.wheel=e.deltaY; });
    window.addEventListener('contextmenu', e=>e.preventDefault());
  }
  isActionPressed(action){ const binds=this.bindings.get(action)||[]; return binds.some(b=>this.keys.get(b)); }
  isActionJustPressed(action){ /* simplified */ return this.isActionPressed(action); }
  getMovementVector(){ const v={x:0,y:0,z:0}; if(this.isActionPressed('move_forward')) v.z-=1; if(this.isActionPressed('move_back')) v.z+=1; if(this.isActionPressed('move_left')) v.x-=1; if(this.isActionPressed('move_right')) v.x+=1; return v; }
  getMouseDelta(){ const d={x:this.mouse.deltaX*this.sensitivity, y:this.mouse.deltaY*this.sensitivity*(this.invertY?1:-1)}; this.mouse.deltaX=0; this.mouse.deltaY=0; return d; }
  update(){ this.mouse.wheel*=0.9; }
}
