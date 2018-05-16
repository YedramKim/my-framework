module.exports = config => {
	const path = require('path');
	const webpack = require('webpack');
	const createStyleLoader = require('../utils/create-style-loader');
	const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
				// {
				// 	test: /\.(vue|js)$/,
				// 	enforce: 'pre',
				// 	exclude: /node_modules/,
				// 	loader: 'eslint-loader',
				// 	options: {
				// 		configFile: path.join(__dirname, '..', '.eslintrc.js')
				// 	}
				// },
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					exclude: /node_modules/,
					options: {
						compilerOptions: {
							preserveWhitespace: false
						},
						transformToRequire: {
							img: 'src',
							image: 'xlink:href',
							video: 'src'
						}
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
					exclude: file => (
						/node_modules/.test(file) &&
						!/\.vue\.js/.test(file)
					)
					// exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: createStyleLoader.stack('css')
				},
				{
					test: /\.less$/,
					use: createStyleLoader.stack('less')
				},
				{
					test: /\.scss$/,
					use: createStyleLoader.stack('sass')
				}
			]
		},
		plugins: [
			new VueLoaderPlugin(),
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
				'@asset': path.resolve(__dirname, '..', '..', 'assets')
			}
		}
	};
};
