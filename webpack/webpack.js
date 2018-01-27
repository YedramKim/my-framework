const webpack = require('webpack');

class Bundler {
	constructor (config) {
		this.config = config;
	}

	_getconfigure (type) {
		switch (type) {
			case 'development':
				return require('./config/webpack.dev.conf')(this.config);
			case 'production':
				return require('./config/webpack.prod.conf')(this.config);
			case 'test':
				return require('./config/webpack.dev.conf')(this.config);
			default:
				return new Error(`올바른 타입이 아닙니다 (${type})`);
		} 
	}

	useMiddleware(app) {
		const webpackConfig = this._getconfigure('development');
		const compile = webpack(webpackConfig);
		app.use(require('webpack-dev-middleware')(compile, {
			noInfo: true,
			publicPath: this.config.publicPath,
			stats: {
				colors: true
			}
		}));
		app.use(require('webpack-hot-middleware')(compile, {
			heartbeat: 2000,
			log: console.log
		}));
	}

	async build() {
		const webpackConfig = this._getconfigure('production');
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
					res();
					console.log('webpack compile complete');
				}
			})
		});
	}
};

module.exports = Bundler;