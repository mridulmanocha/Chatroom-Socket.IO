const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');

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

	socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to chatroom'));

	socket.broadcast.emit('newMessage' , generateMessage('Admin' , 'New user joined'));

	socket.on('createMessage' , (message, callback) => {
	console.log('create message' , message);
	io.emit('newMessage' , generateMessage(message.from, message.body));

	callback('this is from server, message received.');

	// socket.broadcast.emit('newMessage' , {
	// 	from : message.from,
	// 	text : message.text,
	// 	createdAt : new Date().getTime()
	// });
});

});



app.use(express.static(publicPath));

server.listen(port ,() => {
	console.log(`App is up and running on port ${port}.`);
});