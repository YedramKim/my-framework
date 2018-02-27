const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJs = require('uglifyjs-webpack-plugin');
const cheerio = require('cheerio');
const createStyleLoader = require('./utils/create-style-loader');
const fse = require('fs-extra');

class Bundler {
	constructor (config) {
		this.config = config;
	}

	_getconfigure (type) {
		switch (type) {
			case 'development':
			case 'test':
				return this._getDevelopmentConfigure();
			case 'production':
			return this._getProductionConfigure();
			default:
				return new Error(`올바른 타입이 아닙니다 (${type})`);
		} 
	}

	_getBaseConfigure () {
		const isProduction = process.env.NODE_ENV === 'production';
		const tsLoaderConfig = {
			loader: 'ts-loader',
			options: {
				configFile: 'tsconfig.webpack.json',
				appendTsSuffixTo: [/\.vue$/]
			}
		};
		return {
			entry: this.config.entry,
			output: {
				filename: '[name].js',
				path: this.config.staticRoot,
				publicPath: this.config.publicPath
			},
			module: {
				rules: [
					{
						test: /\.(vue|js)$/,
						enforce: 'pre',
						exclude: /node_modules/,
						loader: 'eslint-loader',
						options: {
							configFile: path.join(__dirname, '.eslintrc.js')
						}
					},
					{
						test: /\.vue$/,
						loader: 'vue-loader',
						exclude: /node_modules/,
						options: {
							cssSourceMap: isProduction,
							preserveWhitespace: true,
							extractCSS: isProduction,
							loaders: {
								css: createStyleLoader.stack('css', true),
								less: createStyleLoader.stack('less', true),
								ts: tsLoaderConfig
							},
							transformToRequire: {
								img: 'src',
								image: 'xlink:href',
								video: 'src'
							},
							postcss: [require('postcss-cssnext')()]
						}
					},
					{
						test: /\.(png|jpg|gif|svg|otf|ttf)$/,
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					},
					{
						test: /\.(ts)$/,
						exclude: /node_modules/,
						...tsLoaderConfig
					},
					{
						test: /\.(js)$/,
						loader: 'babel-loader',
						exclude: /node_modules/
					}
				]
			},
			plugins: [
				new webpack.DefinePlugin({
					'process.env': {
						NODE_ENV: JSON.stringify(process.env.NODE_ENV)
					}
				})
			],
			resolve: {
				extensions: ['.js', '.ts', '.vue', '.json'],
				alias: {
					'vue$': 'vue/dist/vue.esm.js'
				}
			}
		};
	}

	_getDevelopmentConfigure () {
		const baseConfig = this._getBaseConfigure();
		const devConfig = merge(baseConfig, {
			devtool: 'cheap-module-eval-source-map',
			plugins: [
				new webpack.HotModuleReplacementPlugin()
			]
		});
		devConfig.entry = this._setHotModule(devConfig.entry);

		return devConfig;
	}

	_setHotModule (entry) {
		const entryType = typeof entry;
		const hotModule = 'webpack-hot-middleware/client?noInfo=true&reload=true';
	
		if (Array.isArray(entryType)) {
			return [hotModule, ...entry];
		} else if (entryType === 'object') {
			const newEntry = {};
			for (let file in entry) {
				newEntry[file] = this._setHotModule(entry[file]);
			}
			return newEntry;
		} else {
			return [hotModule, entry];
		}
	}

	_getProductionConfigure () {
		const baseConfig = this._getBaseConfigure();
		const htmlPlugin = require('html-webpack-plugin');

		return merge(baseConfig, {
			plugins: [
				new htmlPlugin({
					template: this.config.layoutPath,
					filename: 'index.html',
					minify: {
						minifyCSS: true,
						minifyJS: true
					}
				}),
				new UglifyJs({
					sourceMap: true,
					test: /\.(js)$/,
					uglifyOptions: {
						ecma: 8,
						compress: {
							warnings: false
						}
					}
				}),
				createStyleLoader.extract
			]
		});
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

	async _buildHTML () {
		const { layoutPath, publicPath, staticRoot, entry } = this.config;
		console.log(layoutPath);
		const layout = await fse.readFile(layoutPath);
		const $ = cheerio.load(layout);
		const body = $('body');
		for (let js in entry) {
			body.append(`<script src="${publicPath}/${js}.js"></script>`);
		}

		await fse.ensureDir(staticRoot);
		await fse.writeFile(path.join(staticRoot, 'index.html'), $.html());
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
			});
		});
	}

	async webpackCompile (server) {
		switch (process.env.NODE_ENV) {
			case 'production':
				await this.build();
				server.setStatic(this.config.publicPath, this.config.staticRoot);
				break;
			case 'test':
				break;
			case 'development':
			default:
				await this.applyServer(server.app);
				break;
		}
	}
}

module.exports = Bundler;