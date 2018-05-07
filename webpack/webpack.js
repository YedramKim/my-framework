const path = require('path');
const webpack = require('webpack');
const {
	report
} = require('../utils');

class Bundler {
	constructor (config) {
		this.config = config;
	}

	_getconfigure (type) {
		switch (type) {
			case 'development':
			case 'test':
				return require('./config/webpack.dev.conf')(this.config);
			case 'production':
			case 'beta':
				return require('./config/webpack.prod.conf')(this.config);
			default:
				return new Error(`올바른 타입이 아닙니다 (${type})`);
		} 
	}

	async applyServer(server) {
		const webpackConfig = this._getconfigure('development');
		const compile = webpack(webpackConfig);

		server.useMiddleware(require('webpack-dev-middleware')(compile, {
			noInfo: true,
			publicPath: this.config.publicPath,
			stats: {
				colors: true
			}
		}));

		server.useMiddleware(require('webpack-hot-middleware')(compile, {
			heartbeat: 500,
			log: report
		}));

		await this._buildHTML();
	}

	async _buildHTML () {
		const fse = require('fs-extra');
		const cheerio = require('cheerio');

		const { layouts, publicPath, staticRoot, entry } = this.config;
		for (let layout in layouts) {
			const layoutFile = await fse.readFile(layouts[layout]);
			const $ = cheerio.load(layoutFile);
			const body = $('body');
			for (let js in entry) {
				body.append(`<script src="${publicPath}/${js}.js"></script>`);
			}
	
			await fse.ensureDir(staticRoot);
			await fse.writeFile(path.join(staticRoot, `${layout}.html`), $.html());
		}
	}

	async build() {
		const webpackConfig = this._getconfigure('production');
		const compile = webpack(webpackConfig);
		return new Promise((res, rej) => {
			compile.run((err, stats) => {
				if (err) {
					report.error('webpack compile error');
					rej(err);
				} else if (stats.hasErrors()) {
					report.error('webpack compile error');
					rej(stats.toString({
						colors: true,
						reasons: true
					}));
				} else {
					res();
					report('webpack compile complete');
				}
			});
		});
	}

	async webpackCompile (server) {
		switch (process.env.NODE_ENV) {
			case 'production':
			case 'beta':
				server.setStatic(this.config.publicPath, this.config.staticRoot);
				break;
			case 'test':
				break;
			case 'development':
			default:
				await this.applyServer(server);
				break;
		}
	}
}

module.exports = Bundler;