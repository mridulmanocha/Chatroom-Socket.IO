const moment = require('moment');

var generateMessage = (from , body ) => {
	return {
		from,
		body,
		createdAt : moment().valueOf()
	};
};

var generateLocationMessage = (from , long , lat) => {
	return {
		from,
		url : `http://www.google.com/maps?q=${lat},${long}`,
		createdAt : moment().valueOf()
	};
};
	


module.exports = {
	generateMessage,
	generateLocationMessage
}