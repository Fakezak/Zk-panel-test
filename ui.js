
(function(){
  const fab = document.getElementById('fab');
  const panel = document.getElementById('panel');
  const closePanel = document.getElementById('closePanel');

  function openPanel(){ panel.style.display='block'; callAndroid('panel_open'); }
  function hidePanel(){ panel.style.display='none'; callAndroid('panel_close'); }
  closePanel.addEventListener('click', hidePanel);
  fab.addEventListener('click', openPanel);

  // Draggable FAB
  let dragging=false, startX=0, startY=0;
  fab.addEventListener('mousedown', e=>{ dragging=true; startX=e.clientX - fab.offsetLeft; startY=e.clientY - fab.offsetTop; });
  document.addEventListener('mouseup', ()=> dragging=false);
  document.addEventListener('mousemove', e=>{ if(!dragging) return; fab.style.left=(e.clientX-startX)+'px'; fab.style.top=(e.clientY-startY)+'px'; fab.style.right='auto'; fab.style.bottom='auto'; });

  // Touch support
  fab.addEventListener('touchstart', e=>{ dragging=true; const t=e.touches[0]; startX=t.clientX - fab.offsetLeft; startY=t.clientY - fab.offsetTop; });
  document.addEventListener('touchend', ()=> dragging=false);
  document.addEventListener('touchmove', e=>{ if(!dragging) return; const t=e.touches[0]; fab.style.left=(t.clientX-startX)+'px'; fab.style.top=(t.clientY-startY)+'px'; fab.style.right='auto'; fab.style.bottom='auto'; });
})();
