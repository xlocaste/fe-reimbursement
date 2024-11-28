self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};

    const options = {
        body: data.body || 'Notifikasi default',
        icon: '/icon-192x192.png',
        badge: '/badge.png',
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Notifikasi Baru', options)
    );
});
