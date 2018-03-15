module.exports = config => {
	const path = require('path');
	const webpack = require('webpack');
	const createStyleLoader = require('../utils/create-style-loader');

	const isProduction = process.env.NODE_ENV === 'production';

	const tsLoaderConfig = {
		loader: 'ts-loader',
		options: {
			configFile: 'tsconfig.webpack.json',
			appendTsSuffixTo: [/\.vue$/]
		}
	};

	return {
		entry: config.entry,
		output: {
			filename: '[name].js',
			path: config.staticRoot,
			publicPath: config.publicPath
		},
		module: {
			rules: [
				{
					test: /\.(vue|js)$/,
					enforce: 'pre',
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						configFile: path.join(__dirname, '..', '.eslintrc.js')
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
						name: '[name].[ext]',
						publicPath: !isProduction ? config.publicPath : config.publicPath + '/'
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
				},
				{
					test: /\.css$/,
					use: createStyleLoader.stack('css', false)
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
				'vue$': 'vue/dist/vue.esm.js',
				'@asset': path.resolve(__dirname, '..', '..', 'assets', process.env.PRODUCT)
			}
		}
	};
};