const express = require('express');
const cors = require('cors');
const app = express();
const mqtt = require('mqtt');

const brokerAddress = "65.2.135.170";
const port = 1883;
const topic = "JM/Sensor1";
const message = { "doorposition": 1 };

// Create an MQTT client
const client  = mqtt.connect(`mqtt://${brokerAddress}:${port}`);

// When connected to the MQTT broker
client.on('connect', function () {
    console.log('Connected to MQTT broker');
});

app.use(cors()); // Add this line to enable CORS for all routes

app.get('/sendData', (req, res) => {
    // Publish the JSON message to the topic
    client.publish(topic, JSON.stringify(message), function (err) {
        if (err) {
            console.error('Error occurred while publishing the message:', err);
            res.status(500).send('Error occurred while publishing the message');
        } else {
            console.log('Message published successfully');
            res.status(200).send('Message published successfully');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
