class Bundler {
	constructor (config) {
		this.config = config;
		this.webpack = require('webpack');
	}
	returnMiddleware() {
		const webpackConfig = this._getconfigure('development');
		const compile = this.webpack(webpackConfig);
		const webpackDevMiddleware = require('webpack-dev-middleware')(compile, {
			noInfo: true,
			publicPath: this.config.staticPath,
			stats: {
				colors: true
			}
		});
		const webpackHotMiddleware = require('webpack-hot-middleware')(compile, {
			heartbeat: 2000,
			log: console.log
		});

		return {
			dev: webpackDevMiddleware,
			hot: webpackHotMiddleware
		};
	}
	_getconfigure (type) {
		switch (type) {
			case 'development':
				return require('./config/webpack.dev.donf')(this.config);
			case 'production':
				return {};
			case 'test':
				return {};
			default:
				return new Error(`올바른 타입이 아닙니다 (${type})`);
		} 
	}
};

module.exports = Bundler;