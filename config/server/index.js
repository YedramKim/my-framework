const
path = require('path'),
middleware = (name, config) => ({name, config}),
staticRoot = path.resolve(__dirname, '..', '..', 'static');

module.exports = (() => {
return {
	port: 80,
	middlewares: [
		middleware('webpack', {
			staticPath: '/static',
			entry: {
				app: path.resolve(__dirname, '..', '..', 'assets', 'index.js')
			},
			output: {
				path: staticRoot,
				filename: '[name].js',
				publicPath: '/static/'
			},
			htmlTemplate: path.resolve(__dirname, '..', '..', 'assets', 'html', 'template.html'),
			htmlFileName: 'page.html'
		})
	]
};
})();