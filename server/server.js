const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const https = require('https');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var count = 0;

var $ipsConnected = [];



io.on('connection', function (socket) {



//   var $ipAddress = socket.handshake.address;

//   if (!$ipsConnected.hasOwnProperty($ipAddress)) {

//   	$ipsConnected[$ipAddress] = 1;

//   	count++;

//   	socket.emit('counter', {count:count});

//   }

	count++;

  	socket.emit('counter', {count:count});



  console.log("client is connected");



  /* Disconnect socket */

  socket.on('disconnect', function() {

  	// if ($ipsConnected.hasOwnProperty($ipAddress)) {

  	// 	delete $ipsConnected[$ipAddress];

	//     count--;

	//     socket.emit('counter', {count:count});

  	// }

	  count--;

	    socket.emit('counter', {count:count});

		console.log("client is disconnected");

  });



});

app.use(express.static(publicPath));


server.listen(3000,()=>{
	console.log('listening at 3000')
});
