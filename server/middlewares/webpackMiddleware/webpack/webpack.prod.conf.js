const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

baseConfig.module.rules.push({
	test: /\.(vue|js)$/,
	loader: 'babel-loader',
	exclude: /node_modules/
});

module.exports = merge(baseConfig, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			test: /\.(js)$/,
			compress: {
				warnings: false
			},
			uglifyOptions: {
				ecma: 8
			}
		})
	]
});