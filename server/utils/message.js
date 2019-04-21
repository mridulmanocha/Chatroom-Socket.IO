var generateMessage = (from , body ) => {
	return {
		from,
		body,
		createdAt : new Date().getTime()
	};
};

var generateLocationMessage = (from , long , lat) => {
	return {
		from,
		url : `http://www.google.com/maps?q=${lat},${long}`
	};
};
	


module.exports = {
	generateMessage,
	generateLocationMessage
}