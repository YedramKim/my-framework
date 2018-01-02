const webpack = require('webpack');

module.exports = function(app, config) {
	if(process.env.NODE_ENV === 'production') {
		return _webpackProductionCompile(app, config);
	} else {
		return _webpackDevCompile(app, config);
	}
};

async function _webpackProductionCompile(app, config) {
	const webpackConfig = await (require('./config/webpack.prod.conf')(config));
	const compile = webpack(webpackConfig);

	return new Promise((res, rej) => {
		compile.run((err, stats) => {
			if (err) {
				console.error('webpack compile error');
				rej(err);
			} else if (stats.hasErrors()) {
				console.error('webpack compile error');
				rej(stats.toString({
					colors: true,
					reasons: true
				}));
			} else {
				console.log('webpack compile complete');
			}
		});
	});
}

async function _webpackDevCompile(app, config) {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	const webpackConfig = await (require('./config/webpack.dev.conf')(config));
	const compile = webpack(webpackConfig);

	app.use(webpackDevMiddleware(compile, {
		noInfo: true,
		publicPath: config.staticPath,
		stats: {
			colors: true
		}
	}));

	app.use(webpackHotMiddleware(compile, {
		heartbeat: 2000,
		log: console.log
	}));

	return Promise.resolve(true);
}