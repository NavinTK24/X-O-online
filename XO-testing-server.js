const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'XO-testing.html'));
});

//let count = 0;

io.on('connection', (socket) => {
    console.log("Player connected: "+socket.id);

    socket.on('Xplayer', (data) => {
        count++;
        io.emit('Xplayer', {id: data.id, count: count, value: data.value});
    });
    socket.on('Oplayer', (data) => {
        count++;
        io.emit('Oplayer', {id: data.id, count: count, value: data.value});
    });
});

http.listen(3004, () => {
    console.log("Server running at localhost:3004");
});
