if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        console.log("Service Worker Registered", reg);
  
        // Example: Register background sync
        document.addEventListener('DOMContentLoaded', () => {
          if ('SyncManager' in window) {
            reg.sync.register('sync-cart');
          }
        });
      });
  }
  
  // Push Notification
  async function subscribePush() {
    const reg = await navigator.serviceWorker.ready;
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BOi8tpmZUO8fF7ARv1y25UXihdT_Ms7_V4P-77GXQhVeoRefy7-PC3y2D8r1EoBEBDIQUR6TcKylwnEKV8jl6yY'
    });
  
    // Send subscription to server
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    alert("Subscribed to Push Notifications!");
  }
  