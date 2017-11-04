const path = require('path');
const route = {};

route.method = 'get';

route.url = '*';

if (process.env.NODE_ENV !== 'production') {
	route.route = (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', 'dev.html'));
	}
} else {
	route.route = (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'page.html'));
	}
}
module.exports = route;