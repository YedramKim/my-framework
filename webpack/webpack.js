const path = require('path');
const webpack = require('webpack');
const cheerio = require('cheerio');
const fse = require('fs-extra');

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

	async _buildHTML () {
		const { layoutPath, publicPath, staticPath, entry } = this.config;
		console.log(layoutPath);
		const layout = await fse.readFile(layoutPath);
		const $ = cheerio.load(layout);
		const body = $('body');
		for (let js in entry) {
			body.append(`<script src="${publicPath}/${js}.js"></script>`);
		}

		await fse.ensureDir(staticPath);
		await fse.writeFile(path.join(staticPath, 'index.html'), $.html());
	}

	async applyServer(app) {
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
			heartbeat: 500,
			log: console.log
		}));

		await this._buildHTML();
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