const path = require('path');
const appRoot = path.join(__dirname, '..', '..', '..', 'static', 'index.html');
const route = module.exports = {};

route.method = 'get';

route.url = /app/;

route.route = (req, res) => {
	res.sendFile(appRoot);
};