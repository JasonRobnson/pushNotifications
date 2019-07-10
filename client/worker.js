console.log('Service Worker Loaded!');

self.addEventListener('push', e => {
	const data = e.data.json();

	console.log('Push has been Recieved...');
	self.registration.showNotification(data.title, {
		body: 'A snow Emergency has been annnounced!',
		icon: 'https://www.stpaul.gov/sites/default/files/Media%20Root/social-logos/StP_print.png',
	});
});
