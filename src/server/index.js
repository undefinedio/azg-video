const express = require('express');
const os = require('os');

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer((request, response) => {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
    console.log(request, response);
});

server.listen(1337, () => {
});

// create the server
const wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', (request) => {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log(message)
        }
    });

    connection.on('close', (connection) => {
        // close user connection
        console.log(connection);
    });
});

const app = express();

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
    res.send({ username: os.userInfo().username });
});

app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
