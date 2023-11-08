const express = require('express');
const cors = require('cors');
const app = express();
const mqtt = require('mqtt');
const bodyParser = require('body-parser');

const brokerAddress = "65.2.135.170";
const port = 1883;
const topic = "JM/Sensor1";
const accessDID = "bafybmiefibde53eevu7seauw2gxlwwzvhkeh5sy52oroyjtoqomaphbiim";

// Create an MQTT client
const client = mqtt.connect(`mqtt://${brokerAddress}:${port}`);

// When connected to the MQTT broker
client.on('connect', function () {
    console.log('Connected to MQTT broker');
});

app.use(cors()); // Add this line to enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendData', (req, res) => {
    const employeeDID = req.body.employeeDID;
    const openmessage = { "EmployeeDID": employeeDID, "AccessDID": accessDID, "doorposition": 1 };
    // Publish the JSON message to the topic
    client.publish(topic, JSON.stringify(openmessage), function (err) {
        if (err) {
            console.error('Error occurred while publishing the message:', err);
            res.status(500).send('Error occurred while publishing the message');
        } else {
            console.log('Message published successfully');
            res.status(200).send('Message published successfully');
        }
    });
});

app.post('/closeData', (req, res) => {
    const employeeDID = req.body.employeeDID;
    const closeMessage = { "EmployeeDID": employeeDID, "AccessDID": accessDID, "doorposition": 0 };
    // Publish the JSON message to the topic
    client.publish(topic, JSON.stringify(closeMessage), function (err) {
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
