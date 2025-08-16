
window.Android = window.Android || {
  onPanelEvent: function(event, payload){
    // Placeholder for Sketchware/Android WebView bridge
    // Example: Android.onPanelEvent('login', {user:'souza1'})
    console.log('[Bridge]', event, payload);
  }
};
function callAndroid(event, payload){ try{ window.Android.onPanelEvent(event, payload || {}); }catch(e){ console.warn('Bridge error', e);} }
