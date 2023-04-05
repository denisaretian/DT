const io = require("socket.io");
const server = io.listen(8000);
let connectedClients = new Map();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve the socket.io.js file
app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});


server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    connectedClients.set(socket);

    socket.on("disconnect", () => {
        connectedClients.delete(socket);
        console.info(`Client [id=${socket.id}] disconnected` );
    });

    socket.on("message-from-client", (payload) => {
        sendMessageToAllOtherClients(socket, payload);
    });
});

function sendMessageToAllOtherClients(sender, message) {
    for (const [client, sequenceNumber] of connectedClients.entries()) {
        if (sender.id != client.id) {
            const payload = {
                sender: sender.id,
                message: message
            };
            client.emit("message-from-server", payload);
        }
    }
}