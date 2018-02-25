const path = require('path');
const staticPath = path.resolve(__dirname, '..', 'static');

module.exports = (() => {
	const baseConfig = {
		server: {
			middlewares: {
				pre: [
					{
						name: 'session',
						options: {
							mode: 'cookie',
							sessionOptions: {}
						}
					}
				]
			}
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

	return process.env.NODE_ENV !== 'production' ? baseConfig : {...baseConfig};
});