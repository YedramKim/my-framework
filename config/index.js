const path = require('path');
const staticPath = path.resolve(__dirname, '..', '..', 'static');

module.exports = (() => {
	return {
		server: {
			port: 80,
			middlewares: {
				webpack: {
					entry: path.join(__dirname, '..', 'assets', 'index.js'),
					staticPath: staticPath
				}
			}
		}
	};
})();