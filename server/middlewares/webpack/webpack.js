const webpack = require('webpack');

module.exports = function(app, config) {
	if(process.env.NODE_ENV === 'production') {
		return _webpackProductionCompile(app, config);
	} else {
		console.log('개발용 시작');
		return _webpackDevCompile(app, config);
	}
};

function _webpackProductionCompile(app, config) {
	const webpackConfig = require('./config/webpack.prod.conf')(config);
	const compile = webpack(webpackConfig);

	return new Promise((res, rej) => {
		compile.run((err, stats) => {
			if (err) {
				console.log('webpack compile error');
				rej(err);
			} else if (stats.hasErrors()) {
				console.log('webpack compile error');
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

function _webpackDevCompile(app, config) {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	const webpackConfig = require('./config/webpack.dev.conf')(config);
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