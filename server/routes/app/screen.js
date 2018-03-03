const path = require('path');
const route = module.exports = {};

route.method = 'get';

route.url = /app/;

route.route = (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', '..', '..', 'static', 'main.html'));
	next();
};
