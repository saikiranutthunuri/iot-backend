const express = require('express');
const mqtt = require('mqtt');

const app = express();

var options = {
    host: '531b08d79d8a40438886f427201e4e3d.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'saikiran',
    password: 'Sai@1106'
};

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
    // subscribe to topic 'my/test/topic'
    client.subscribe('my/test/topic', function (err) {
        if (err) {
            console.error('Error in subscribing to topic: ', err);
        }
    });
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});



// API endpoint for receiving message
app.get('/receive-message', (req, res) => {
    // Implement the logic for receiving and displaying the message
    client.on('message', function (topic, message) {
        // called each time a message is received
        if (topic === 'my/test/topic') {
            console.log('Received message:', message.toString());
            res.status(200).send('Message received successfully: ' + message.toString());
        }
    });
});



app.listen(400, () => {
    console.log('Server is running on port 3000');
});

