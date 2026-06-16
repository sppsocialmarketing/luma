(() => {
  const canvas = document.getElementById("ember-canvas");
  const ctx = canvas && canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || !ctx || reduceMotion) return;
  let width=0,height=0,particles=[],wind=0,windTarget=0,last=performance.now();
  const rand=(a,b)=>Math.random()*(b-a)+a;
  function resize(){const dpr=Math.min(window.devicePixelRatio||1,2);width=innerWidth;height=innerHeight;canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
  function ember(off=true){const size=rand(1.2,5.8);return{x:rand(-60,width+60),y:off?rand(height+20,height+220):rand(0,height),size,vx:rand(-.012,.012),vy:rand(-.025,-.08),life:rand(.66,1),decay:rand(.000035,.000085),flicker:rand(0,Math.PI*2),flickerSpeed:rand(.001,.0034),drift:rand(-.013,.013),wobbleAmp:rand(.008,.03),redHot:rand(0,1)}}
  function init(){resize();const count=Math.min(74,Math.max(34,Math.floor(width/26)));particles=Array.from({length:count},()=>ember(false))}
  function draw(p,dt){p.flicker+=dt*p.flickerSpeed;const wobble=Math.sin(p.flicker)*p.wobbleAmp;p.x+=(p.vx+p.drift+wind+wobble)*dt;p.y+=p.vy*dt;p.life-=p.decay*dt;if(p.life<=0||p.y<-90||p.x<-140||p.x>width+140)Object.assign(p,ember(true));const flick=.66+Math.sin(p.flicker*2.1)*.18+Math.sin(p.flicker*.6)*.1;const alpha=Math.max(0,Math.min(1,p.life*flick));const r=p.size*(.9+Math.sin(p.flicker*1.3)*.13);const core=p.redHot>.48?'255, 88, 28':'255, 178, 72';const edge=p.redHot>.48?'255, 38, 18':'255, 92, 24';ctx.save();ctx.globalCompositeOperation='lighter';let g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*7);g.addColorStop(0,`rgba(255,228,160,${alpha*.7})`);g.addColorStop(.2,`rgba(${core},${alpha*.44})`);g.addColorStop(.58,`rgba(${edge},${alpha*.17})`);g.addColorStop(1,`rgba(${edge},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,r*7,0,Math.PI*2);ctx.fill();let e=ctx.createRadialGradient(p.x-r*.25,p.y-r*.25,0,p.x,p.y,r);e.addColorStop(0,`rgba(255,246,205,${alpha})`);e.addColorStop(.42,`rgba(${core},${alpha*.95})`);e.addColorStop(1,`rgba(${edge},${alpha*.16})`);ctx.fillStyle=e;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();ctx.restore()}
  function tick(now){const dt=Math.min(34,now-last);last=now;ctx.clearRect(0,0,width,height);if(Math.random()<.005)windTarget=rand(-.03,.03);wind+=(windTarget-wind)*.01;particles.forEach(p=>draw(p,dt));requestAnimationFrame(tick)}
  addEventListener('resize',init);init();requestAnimationFrame(tick);
})();
(() => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const obs = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
  }), {threshold:.14});
  reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*70,260)}ms`;obs.observe(el)});
})();
