const CACHE='chc-vt-91de1b9daa';
const FILES=['./','index.html','manifest.webmanifest','apple-touch-icon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    const net=fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put('index.html',cp))}return r});
    e.respondWith(caches.match('index.html').then(c=>c||net).catch(()=>net));e.waitUntil(net.catch(()=>{}));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
