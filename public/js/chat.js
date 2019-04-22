
var socket = io();

socket.on('connect' , function() {
	console.log('connected to the server');
});

socket.on('disconnect' , function() {
	console.log('disconnected from the server')
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.body,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
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

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var object = JSON.parse(xhr.responseText);
        socket.emit('createLocation' , {
		longitude : object.longitude,
		latitude : object.latitude
	});
    }
}
xhr.open('GET', 'https://ipapi.co/json', true);
xhr.send(null);


});







 


	