export const MODEL='https://cdn.jsdelivr.net/gh/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0@main/addons/kaykit_character_pack_adventures/Characters/gltf/Rogue.glb';
export function interfaceLab(engine){
 const style=document.createElement('style');
 style.textContent=`*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;font-family:system-ui,Arial;background:#111936;color:white;touch-action:none}canvas{width:100%;height:100%;display:block;touch-action:none}#hud{position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;z-index:3;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:14px;pointer-events:none}#stats,#actions{background:#11213ed9;backdrop-filter:blur(8px);border:1px solid #a2ccff4d;border-radius:16px;padding:11px;font-size:12px;pointer-events:auto;max-width:60vw}#stats b{font-size:16px}#status{font-size:11px;color:#a8ecf5;margin-top:5px}#actions{display:flex;flex-direction:column;gap:6px}button{font:inherit;touch-action:none;cursor:pointer;border:0;border-radius:12px;padding:10px 12px;background:#f9e5b4;color:#263152;font-weight:750}#actions a{color:#a8e9ff;font-size:11px}#pad{position:fixed;bottom:max(18px,env(safe-area-inset-bottom));right:18px;z-index:4;display:grid;grid-template-columns:repeat(3,58px);grid-template-rows:repeat(3,58px);gap:5px;direction:ltr}#pad button{background:#ffffffc9;color:#25325d;font-size:26px;box-shadow:0 2px 12px #12182e8a;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}#pad .up{grid-column:2;grid-row:1}#pad .left{grid-column:1;grid-row:2}#pad .right{grid-column:3;grid-row:2}#pad .down{grid-column:2;grid-row:3}#footer{position:fixed;bottom:max(26px,env(safe-area-inset-bottom));left:12px;background:#14213cbb;padding:10px;z-index:3;border-radius:12px;font-size:11px;max-width:42vw}#alert{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:16px;background:#3b1738ed;border-radius:12px;z-index:10;display:none;max-width:90vw}`;
 document.head.append(style);
 document.body.insertAdjacentHTML('beforeend',`<div id="hud"><div id="stats"><b>${engine} · מעבדת תנועה</b><div id="metrics">FPS: — | מרחק: 0</div><div id="status" role="status">טוען סצנה…</div></div><div id="actions"><button id="auto">▶️ בדיקת כיוונים אוטומטית</button><button id="anim">🎞️ אנימציה: כבויה</button><a href="./">מעבר למנוע השני</a></div></div><div id="pad"><button class="up" data-dir="up">▲</button><button class="left" data-dir="left">◀</button><button class="right" data-dir="right">▶</button><button class="down" data-dir="down">▼</button></div><div id="footer">שני המנועים · אותה דמות Rogue.glb · התחילו עם אנימציה כבויה כדי לבודד סטיית מרכז, ואז הפעילו אותה.</div><div id="alert"></div>`);
 const keys=new Set(),pointer=new Map();let auto=false,elapsed=0,speedX=0,speedZ=0,posX=0,posZ=0,heading=0,dist=0,anim=false,timer=0,frames=0,fps=0;
 const stop=()=>{keys.clear();pointer.clear();speedX=speedZ=0};
 for(const btn of document.querySelectorAll('[data-dir]')){
   btn.addEventListener('contextmenu',e=>e.preventDefault());
   btn.addEventListener('pointerdown',e=>{e.preventDefault();try{btn.setPointerCapture(e.pointerId)}catch{};pointer.set(e.pointerId,btn.dataset.dir);keys.add(btn.dataset.dir)});
   const release=e=>{const v=pointer.get(e.pointerId);pointer.delete(e.pointerId);if(v&&![...pointer.values()].includes(v))keys.delete(v)};
   for(const name of ['pointerup','pointercancel','lostpointercapture','pointerleave'])btn.addEventListener(name,release);
 }
 const map={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'};
 document.addEventListener('keydown',e=>{if(map[e.code]){e.preventDefault();keys.add(map[e.code])}});
 document.addEventListener('keyup',e=>{if(map[e.code])keys.delete(map[e.code])});
 window.addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 document.querySelector('#auto').onclick=()=>{auto=!auto;elapsed=0;stop();document.querySelector('#auto').textContent=auto?'⏹ עצירת בדיקה':'▶️ בדיקת כיוונים אוטומטית'};
 document.querySelector('#anim').onclick=()=>{anim=!anim;document.querySelector('#anim').textContent=anim?'🎞️ אנימציה: פעילה':'🎞️ אנימציה: כבויה'};
 function step(dt){
  dt=Math.min(.05,Math.max(.0001,dt));
  let x=0,z=0;if(auto){elapsed+=dt;const dir=Math.floor(elapsed/2.5)%8;const vectors=[[0,-1],[1,0],[0,1],[-1,0],[1,-1],[-1,1],[1,1],[-1,-1]];[x,z]=vectors[dir]}else{if(keys.has('left'))x--;if(keys.has('right'))x++;if(keys.has('up'))z--;if(keys.has('down'))z++;}
  const len=Math.hypot(x,z)||1,xTarget=x/len*5,zTarget=z/len*5,k=1-Math.exp(-(x||z?11:17)*dt);
  speedX+=(xTarget-speedX)*k;speedZ+=(zTarget-speedZ)*k;
  if(Math.hypot(speedX,speedZ)<.01&&!x&&!z)speedX=speedZ=0;
  posX=Math.max(-12,Math.min(12,posX+speedX*dt));posZ=Math.max(-12,Math.min(12,posZ+speedZ*dt));
  dist+=Math.hypot(speedX,speedZ)*dt;
  if(Math.hypot(speedX,speedZ)>.1){const target=Math.atan2(speedX,speedZ);heading+=Math.atan2(Math.sin(target-heading),Math.cos(target-heading))*(1-Math.exp(-dt*12));}
  timer+=dt;frames++;
  if(timer>=1){fps=Math.round(frames/timer);timer=0;frames=0;}
  document.querySelector('#metrics').textContent=`FPS: ${fps||'…'} | מרחק: ${dist.toFixed(0)}מ׳ | X:${posX.toFixed(1)} Z:${posZ.toFixed(1)}`;
  return {x:posX,z:posZ,yaw:heading,walking:Math.hypot(speedX,speedZ)>.15,animation:anim,fps};
 }
 return {step,status:message=>document.querySelector('#status').textContent=message,error:message=>{const el=document.querySelector('#alert');el.textContent=message;el.style.display='block'},stop};
}
