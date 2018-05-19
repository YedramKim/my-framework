module.exports = config => {
	const merge = require('webpack-merge');
	const createStyleLoader = require('../utils/create-style-loader');

	const baseConfig = require('./webpack.base.conf')(config);

	const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
	const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

	return merge(baseConfig, {
		mode: 'production',
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					sourceMap: true,
					test: /\.(js)$/,
					uglifyOptions: {
						ecma: 8,
						compress: {
							warnings: false
						}
					}
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},
		plugins: [
			createStyleLoader.plugin
		]
	});
};