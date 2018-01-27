const path = require('path');
const staticPath = path.resolve(__dirname, '..', 'static');

module.exports = (() => {
	return {
		server: {
			port: 80
		},
		webpack: {
			entry: {
				main: path.join(__dirname, '..', 'assets', 'index.js')
			},
			publicPath: '/static',
			staticPath: staticPath,
			layoutPath: path.join(__dirname, '..', 'assets', 'layout', 'app.html')
		}
	};
})();