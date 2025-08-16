
(function(){
  // Tabs
  document.querySelectorAll('.tab').forEach(t=>{
    t.addEventListener('click',()=>{
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const id = t.dataset.tab;
      document.querySelectorAll('.tabpane').forEach(p=>p.style.display='none');
      document.getElementById(id).style.display='block';
    });
  });

  // Toggles
  document.querySelectorAll('[data-toggle]').forEach(el=>{
    el.addEventListener('click',()=>{ el.classList.toggle('on'); callAndroid('toggle', {id:el.id, on:el.classList.contains('on')}); });
  });

  // FOV slider
  const fov = document.getElementById('fov'); const fovValue = document.getElementById('fovValue');
  function updateFill(){ const percent = ((fov.value - fov.min) / (fov.max - fov.min)) * 100; fov.style.setProperty('--fill', percent+'%'); fovValue.textContent = fov.value; if(window.ZKOverlay) ZKOverlay.setFov(parseInt(fov.value,10)); callAndroid('fov_change', {value:parseInt(fov.value,10)}); }
  fov.addEventListener('input', updateFill); updateFill();

  // FOV toggle
  const drawFov = document.getElementById('drawFov');
  drawFov.addEventListener('change',()=>{ if(window.ZKOverlay) ZKOverlay.toggleFov(drawFov.checked); callAndroid('fov_toggle',{on:drawFov.checked}); });

  // Hit options -> character highlight
  document.querySelectorAll('.badge').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.badge').forEach(x=>x.classList.remove('active')); b.classList.add('active');
      const hit=b.dataset.hit; if(window.ZKOverlay) ZKOverlay.setHit(hit); callAndroid('hit_select',{hit});
    });
  });

  // Draw mannequin inside the small canvas for preview (mirrors overlay)
  const ch = document.getElementById('char'); const cctx = ch.getContext('2d');
  function drawCharPreview(){ cctx.clearRect(0,0,ch.width,ch.height); // center small mannequin
    cctx.fillStyle='#223'; cctx.fillRect(ch.width/2-20, 80, 40, 80); // body
    cctx.fillStyle='#223'; cctx.fillRect(ch.width/2-10, 60, 20, 20); // neck
    cctx.beginPath(); cctx.arc(ch.width/2, 44, 18, 0, Math.PI*2); cctx.fillStyle='#223'; cctx.fill(); }
  drawCharPreview();

  // Login flow -> auto open panel and show FAB
  const loginBtn=document.getElementById('loginBtn'); const loginWrap=document.getElementById('loginWrap'); const fab=document.getElementById('fab'); const panel=document.getElementById('panel');
  function openAfterLogin(){ loginWrap.style.display='none'; fab.style.display='grid'; panel.style.display='block'; if(navigator.vibrate) navigator.vibrate(30); callAndroid('login',{user:document.getElementById('user').value}); }
  loginBtn.addEventListener('click', openAfterLogin);
})();
