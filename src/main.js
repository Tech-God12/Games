import { Renderer } from './render/renderer.js';
import { InputManager } from './core/input.js';
import { AudioDirector } from './core/audio.js';
import { GameUI } from './game/ui.js';
import { Game } from './game/game.js';

const canvas=document.getElementById('game-canvas');
let renderer;
try { renderer=new Renderer(canvas); } catch(error) { document.getElementById('loading').innerHTML=`<span style="color:#ff6b75">WEBGL LINK FAILED // ${error.message}</span>`; throw error; }
const input=new InputManager(canvas); const audio=new AudioDirector(); const ui=new GameUI(); const game=new Game(renderer,input,audio,ui);

let last=performance.now();
function frame(now) { const dt=Math.min(.05,(now-last)/1000||.016);last=now;game.update(dt);game.render();if(game.state!=='title')ui.update(game);requestAnimationFrame(frame); }
requestAnimationFrame(frame);

// The browser may suspend an AudioContext until the first user gesture; starting here also
// means a title-screen deploy feels immediate rather than waiting for a later weapon sound.
addEventListener('pointerdown',()=>audio.start(),{once:false,passive:true});
