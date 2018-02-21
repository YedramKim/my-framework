const path = require('path');
const staticPath = path.resolve(__dirname, '..', 'static');

module.exports = (() => {
	return {
		server: {
		},
		webpack: {
			entry: {
				main: path.join(__dirname, '..', 'assets', 'index.ts')
			},
			publicPath: '/static',
			staticPath: staticPath,
			layoutPath: path.join(__dirname, '..', 'assets', 'layout', 'app.html')
		}
	};
})();