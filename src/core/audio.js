export class AudioDirector {
  constructor() { this.context = null; this.master = null; this.music = null; this.enabled = true; this.started = false; this.step = 0; }
  start() {
    if (this.started) { this.context?.resume(); return; }
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.context.createGain(); this.master.gain.value = .18; this.master.connect(this.context.destination);
      this.music = this.context.createGain(); this.music.gain.value = .065; this.music.connect(this.master);
      this.started = true; this.startDrone();
    } catch { this.enabled = false; }
  }
  setEnabled(value) { this.enabled = value; if (this.master) this.master.gain.value = value ? .18 : 0; }
  tone({ frequency=440, endFrequency=frequency, duration=.1, type='sine', volume=.2, delay=0, destination=this.master } = {}) {
    if (!this.enabled || !this.context || !destination) return;
    const now=this.context.currentTime + delay; const osc=this.context.createOscillator(); const gain=this.context.createGain();
    osc.type=type; osc.frequency.setValueAtTime(frequency,now); osc.frequency.exponentialRampToValueAtTime(Math.max(20,endFrequency),now+duration);
    gain.gain.setValueAtTime(.0001,now); gain.gain.exponentialRampToValueAtTime(Math.max(.0001,volume),now+.008); gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
    osc.connect(gain); gain.connect(destination); osc.start(now); osc.stop(now+duration+.03);
  }
  noise({ duration=.12, volume=.12, filter=800, delay=0 } = {}) {
    if (!this.enabled || !this.context || !this.master) return;
    const length=Math.max(1,Math.floor(this.context.sampleRate*duration)); const buffer=this.context.createBuffer(1,length,this.context.sampleRate); const data=buffer.getChannelData(0);
    for(let i=0;i<length;i++) data[i]=(Math.random()*2-1)*(1-i/length);
    const source=this.context.createBufferSource(); const band=this.context.createBiquadFilter(); const gain=this.context.createGain(); const now=this.context.currentTime+delay;
    source.buffer=buffer; band.type='bandpass'; band.frequency.value=filter; band.Q.value=.7; gain.gain.setValueAtTime(volume,now); gain.gain.exponentialRampToValueAtTime(.0001,now+duration); source.connect(band); band.connect(gain); gain.connect(this.master); source.start(now);
  }
  startDrone() {
    if (!this.enabled || !this.context || !this.music) return;
    const notes=[55,65.41,73.42,82.41];
    notes.forEach((frequency,index)=>this.tone({frequency,endFrequency:frequency*.997,duration:3.5,type:'sine',volume:.07,delay:index*.55,destination:this.music}));
    const tick=()=>{ if(!this.started) return; const note=notes[this.step++%notes.length]; this.tone({frequency:note*2,endFrequency:note*1.005,duration:2.4,type:'triangle',volume:.018,destination:this.music}); setTimeout(tick,2150); }; setTimeout(tick,1500);
  }
  shot() { this.tone({frequency:520,endFrequency:170,duration:.12,type:'sawtooth',volume:.17}); this.tone({frequency:1040,endFrequency:410,duration:.06,type:'sine',volume:.07}); }
  hit(critical=false) { this.tone({frequency:critical?760:430,endFrequency:critical?220:180,duration:.09,type:'square',volume:critical?.12:.07}); }
  dash() { this.tone({frequency:180,endFrequency:880,duration:.28,type:'sine',volume:.16}); this.noise({duration:.18,volume:.05,filter:1400}); }
  pulse() { [110,165,247,370].forEach((n,i)=>this.tone({frequency:n,endFrequency:n*2,duration:.42,type:'sine',volume:.09,delay:i*.035})); this.noise({duration:.3,volume:.07,filter:420}); }
  hurt() { this.tone({frequency:120,endFrequency:55,duration:.25,type:'sawtooth',volume:.2}); }
  pickup() { this.tone({frequency:510,endFrequency:1040,duration:.18,type:'sine',volume:.1}); }
  level() { [392,523,659,784].forEach((n,i)=>this.tone({frequency:n,endFrequency:n,duration:.22,type:'sine',volume:.1,delay:i*.08})); }
  wave() { [220,330,440,660].forEach((n,i)=>this.tone({frequency:n,endFrequency:n*1.04,duration:.35,type:'triangle',volume:.12,delay:i*.11})); }
  boss() { [92,116,146,184].forEach((n,i)=>this.tone({frequency:n,endFrequency:n*.48,duration:.8,type:'sawtooth',volume:.12,delay:i*.12})); }
  select() { this.tone({frequency:640,endFrequency:960,duration:.12,type:'sine',volume:.1}); }
}
