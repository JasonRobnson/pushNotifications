const publicVapidKey =
	'BKHoJDaQ1nEMugIJpNzJxXTbyYEb9H2gaVuDF5yEESNh9-4ZC9ZLaTgSugW9R2R0SE7ZOEDjYi_r3zAC2XCNAuQ';

//Check for service workers
if ('serviceWorker' in navigator) {
	send().catch(err => console.log(err));
}

// Register SW, Register Push, Send Push

async function send() {
	console.log('Registering service worker...');

	//Registering Service Worker
	const register = await navigator.serviceWorker.register('/worker.js', {
		// Scope defines different urls where SW will apply
		scope: '/',
	});
	console.log('Service Worker Registered...');

	//Registering Push
	console.log('Registering Push...');
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
	});
	console.log('Push Registered');

	//Send Push Notifications
	console.log('Sending Push....');
	await fetch('/subscribe', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: {
			'content-type': 'application/json',
		},
	});
	console.log('Push Sent...');
}

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
