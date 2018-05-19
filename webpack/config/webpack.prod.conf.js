module.exports = config => {
	const merge = require('webpack-merge');
	const createStyleLoader = require('../utils/create-style-loader');

	const baseConfig = require('./webpack.base.conf')(config);

	const HtmlPlugin = require('html-webpack-plugin');
	const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
	const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

	const layouts = (() => {
		const layouts = [];
		for (let layout in config.layouts) {
			layouts.push(new HtmlPlugin({
				inject: true,
				template: config.layouts[layout],
				filename: `${layout}.html`,
				minify: {
					minifyCSS: true,
					minifyJS: true,
					collapseWhitespace: true,
					removeComments: true
				}
			}));
		}
		return layouts;
	})();

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
			...layouts,
			createStyleLoader.plugin
		]
	});
};