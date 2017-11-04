const
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	baseConfig = require('./webpack.base.conf');

baseConfig.module.rules.push({
	test: /\.(vue|js)$/,
	loader: 'babel-loader',
	exclude: /node_modules/
});
module.exports = merge(baseConfig, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			test: /\.(js)$/
		})
	]
});