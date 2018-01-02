const path = require('path');
const staticPath = path.resolve(__dirname, '..', 'static');

module.exports = (() => {
	return {
		server: {
			port: 80,
			middlewares: {
				webpack: {
					entry: {
						main: path.join(__dirname, '..', 'assets', 'index.js')
					},
					publicPath: '/static',
					staticPath: staticPath,
					layouts: path.join(__dirname, '..', 'assets', 'layout')
				}
			}
		}
	};
})();