const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("Tidak mendukung untuk service worker");
    }

    if (!('Notification' in window)) {
        throw new Error("Tidak support notifikasi API");
    }
};

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('../src/service-worker.js');
    return registration;
};

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notifikasi tidak diizinkan");
    }
};

const postReimbursement = async (data) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/reimbursement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Gagal mengirim reimbursement');
        }

        const registration = await navigator.serviceWorker.ready;
        registration.showNotification('Berhasil', {
            body: 'Reimbursement berhasil diajukan!',
            icon: '/icon-192x192.png',
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const main = async () => {
    checkPermission();
    await requestNotificationPermission();
    await registerSW();

    document.getElementById('submit-reimbursement').addEventListener('click', async () => {
        const data = { amount: 100000, description: 'Keperluan kantor' };
        await postReimbursement(data);
    });
};

main();
