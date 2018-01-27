const htmlPlugin = require('html-webpack-plugin');

module.exports = config => {
	const baseConfig = require('./webpack.base.conf');
	const prodConfig = {
		entry: config.entry,
		output: {
			filename: '[name].js',
			path: config.staticPath,
			publicPath: config.publicPath
		},
		devtool: 'source-map',
		plugins: [
			new htmlPlugin({
				template: config.layoutPath,
				filename: 'index.html',
				minify: {
					minifyCSS: true,
					minifyJS: true
				}
			}),
			require('../utils/create-style-loader').extract
		]
	};
	const merge = require('webpack-merge');
	const mergeConfig = merge(baseConfig, prodConfig);

	return mergeConfig;
};