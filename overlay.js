
(function(){
  const overlay = document.getElementById('overlay'); if(!overlay) return;
  const ctx = overlay.getContext('2d'); let w,h; let showFov=true; let fov=360; let hit='head';
  const center=()=>({x:innerWidth/2,y:innerHeight/2});
  function resize(){ w=overlay.width=innerWidth; h=overlay.height=innerHeight; draw(); }
  addEventListener('resize', resize); resize();

  function drawCharacter(){
    // simple mannequin
    const cw = 200, ch = 180; const x = w/2 - cw/2, y = h/2 + 140;
    ctx.save(); ctx.translate(x, y);
    // body
    ctx.fillStyle = hit==='body' ? 'rgba(239,68,68,.85)' : 'rgba(148,163,184,.25)';
    ctx.fillRect(cw/2-20, -ch+40, 40, 80);
    // neck
    ctx.fillStyle = hit==='neck' ? 'rgba(239,68,68,.85)' : 'rgba(148,163,184,.25)';
    ctx.fillRect(cw/2-10, -ch+20, 20, 20);
    // head
    ctx.beginPath();
    ctx.arc(cw/2, -ch+10, 18, 0, Math.PI*2);
    ctx.fillStyle = hit==='head' ? 'rgba(239,68,68,.9)' : 'rgba(148,163,184,.25)';
    ctx.fill();
    ctx.restore();
  }

  function drawFovCircle(){
    const {x,y} = center();
    ctx.beginPath(); ctx.arc(x, y, Math.max(30, fov), 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(99,102,241,.8)'; ctx.lineWidth = 3; ctx.stroke();
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    if(showFov) drawFovCircle();
    drawCharacter();
  }

  // Public API
  window.ZKOverlay = {
    setFov(v){ fov = v; draw(); },
    toggleFov(v){ showFov = v; draw(); },
    setHit(area){ hit = area; draw(); }
  };
})();
