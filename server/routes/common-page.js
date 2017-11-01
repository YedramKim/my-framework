const path = require('path');
const route = module.exports = {};

route.method = 'get';

route.url = '*';

route.route = (req, res) => {
	if (process.env.NODE_ENV !== 'production') {
		res.sendFile(path.resolve(__dirname, '..', 'dev.html'));
	} else {
		res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'page.html'));
	}
};