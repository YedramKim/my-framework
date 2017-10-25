const
	path = require('path'),
	setMiddlewareOptions = (name, config) => ({name, config});

module.exports = (() => {
	return {
		port: 80,
		middlewares: [
			setMiddlewareOptions('webpack', {
				entry: path.resolve(__dirname, '..', '..', 'assets', 'index.js'),
				output: {
					output: path.resolve(__dirname, '..', '..', 'static'),
					fileName: '[name].js'
				},
				htmlTemplate: path.resolve(__dirname, '..', '..', 'assets', 'html', 'template.html'),
				htmlFileName: 'page.html'
			})
		]
	};
})();