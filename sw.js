// Η σελίδα έκλεισε: ο service worker καθαρίζει ό,τι είχε αποθηκευτεί και αποσύρεται.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try { const ks = await caches.keys(); await Promise.all(ks.map(k => caches.delete(k))); } catch (err) {}
    try { await self.registration.unregister(); } catch (err) {}
    const cs = await self.clients.matchAll();
    cs.forEach(c => { try { c.navigate(c.url); } catch (err) {} });
  })());
});
self.addEventListener('fetch', () => {});
