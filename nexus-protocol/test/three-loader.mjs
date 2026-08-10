// Loader hook: stubs `three` / `three/addons` imports so the game's data and
// logic modules can be imported under Node (no WebGL/DOM) for verification.
const PROXY_PRE = `
const THREE = new Proxy({}, { get: () => makeProxy() });
function makeProxy(){
  const f = function(){};
  return new Proxy(f, {
    construct(){ return makeObj(); },
    apply(){ return makeObj(); },
    get(t,p){ if(p==='prototype') return {}; if(p===Symbol.toPrimitive) return () => 0; return makeProxy(); }
  });
}
function makeObj(){ return new Proxy({}, { get:(o,p)=>{ if(p===Symbol.toPrimitive) return () => 0; return makeProxy(); }, set:()=>true }); }
`;

export async function load(url, context, nextLoad) {
  const res = await nextLoad(url, context);
  if (res.format === 'module' && url.startsWith('file:') && url.includes('/src/')) {
    let src = typeof res.source === 'string' ? res.source : res.source.toString('utf8');
    src = src.replace(/^import[^\n]*from\s*['"]three[^\n]*['"];?[^\n]*$/gm, '');
    res.source = PROXY_PRE + src;
  }
  return res;
}
