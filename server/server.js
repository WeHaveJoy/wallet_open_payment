const express = require('express');
const bodyParser = require('body-parser');
const TigerBeetle = require('./tigerbeetle');
const Interledger = require('./interledger');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const wss = new WebSocket.Server({ noServer: true });

app.use(bodyParser.json());

const { id } = require("tigerbeetle-node");
const { createClient } = require("tigerbeetle-node");

console.log("Import ok!");

// Handle payments from donors
app.post('/api/payment', async (req, res) => {
    const { amount, recipient } = req.body;
    try {
        const transactionId = await Interledger.initiatePayment(amount, recipient);
        await TigerBeetle.recordTransaction(transactionId, amount);
        res.json({ success: true, transactionId });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Charity notifies donor when money is spent
app.post('/api/notify-donor', (req, res) => {
    const { donorId, message } = req.body;

    // Send notification via WebSocket
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.donorId === donorId) {
            client.send(JSON.stringify({ message }));
        }
    });

    res.json({ message: 'Notification sent to donor' });
});

// WebSocket handling
app.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        ws.on('message', message => {
            // Attach donor ID on connection
            ws.donorId = JSON.parse(message).donorId;
        });
    });
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
