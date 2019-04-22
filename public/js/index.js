var socket = io();

socket.on('connect' , function() {
	console.log('connected to the server');
});

socket.on('disconnect' , function() {
	console.log('disconnected from the server')
});

socket.on('newMessage' , function(message) {
	console.log('new message' , message);
	var li = $('<li></li>');
	li.text(`${message.from} :  ${message.body}`);
	$('#messages').append(li); 
});

socket.on('newLocationMessage' , function(message) {
	var li =$('<li></li>');
	var a =$('<a target ="_blank">My current location</a>');
	li.text(`${message.from} : `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li); 
}); 

$("#message-form").on("submit",  function(e) {
  e.preventDefault();

  socket.emit('createMessage' , {
		from : 'User',
		body : $('[name=message]').val()
	} , function () {
		$('[name=message]').val('')
	});

});


var locationButton = $('#send-location');

locationButton.on( "click", function() {

if (!navigator.geolocation) {
	return alert('geolocation not supported.')
	}

	locationButton.attr('disabled' , 'disabled').text('Sending location...');

navigator.geolocation.getCurrentPosition( function (position) {
	locationButton.removeAttr('disabled').text('Send location');
	socket.emit('createLocation' , {
		longitude : position.coords.longitude,
		latitude : position.coords.latitude
	});
 } , function() {
 		locationButton.removeAttr('disabled').text('Send location');
		alert('unable to fetch location madarchod.')
	});
});


 


	