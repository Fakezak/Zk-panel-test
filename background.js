
(function(){
  const c = document.getElementById('bg');
  if(!c) return; const ctx = c.getContext('2d');
  let w,h,points=[];
  const resize=()=>{w=c.width=innerWidth;h=c.height=innerHeight;makePoints();};
  addEventListener('resize',resize); resize();
  function makePoints(){
    points=[]; const count = Math.min(140, Math.floor((w*h)/18000));
    for(let i=0;i<count;i++){ points.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()*2-1)*0.4,vy:(Math.random()*2-1)*0.4}); }
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<points.length;i++){ const p=points[i]; p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
      for(let j=i+1;j<points.length;j++){ const q=points[j]; const dx=p.x-q.x,dy=p.y-q.y; const d=Math.hypot(dx,dy);
        if(d<150){ ctx.strokeStyle=`rgba(168,85,247,${(1-d/150)*0.35})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke(); } } }
    for(const p of points){ ctx.fillStyle='rgba(168,85,247,.9)'; ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); }
    requestAnimationFrame(step);
  } step();
})();
