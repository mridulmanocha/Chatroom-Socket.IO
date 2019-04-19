const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection' , (socket) => {

	console.log('new user connected');

	socket.on('disconnect' , () => {
	console.log('user disconnected');
	});

	socket.emit('newMessage' , {
		from : 'mridul@gmail.com',
		body : 'hello',
		createdAt : 123	
	});

	socket.on('createMessage' , function(message) {
	console.log('create message' , message);
});

});



app.use(express.static(publicPath));

server.listen(port ,() => {
	console.log(`App is up and running on port ${port}.`);
});