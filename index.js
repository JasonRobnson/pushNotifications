const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Set statici path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe Route from client to this route

app.post('/subscribe', (req, res) => {
	//Get Subscription Obj
	const subscription = req.body;

	//Send back a status  201-resoure created with success
	res.status(201).json({});

	//Create payload
	const payload = JSON.stringify({
		title: 'Snow Emergency',
		body: 'This is the body of the push test',
	});

	//Pass object into sendNotification
	webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
