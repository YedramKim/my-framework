module.exports = config => {
	const merge = require('webpack-merge');
	const createStyleLoader = require('../utils/create-style-loader');

	const baseConfig = require('./webpack.base.conf')(config);
	const HtmlPlugin = require('html-webpack-plugin');
	const UglifyJs = require('uglifyjs-webpack-plugin');
	const layouts = (() => {
		const layouts = [];
		for (let layout in config.layouts) {
			layouts.push(new HtmlPlugin({
				template: config.layouts[layout],
				filename: `${layout}.html`,
				minify: {
					minifyCSS: true,
					minifyJS: true,
					collapseWhitespace: true
				}
			}));
		}
		return layouts;
	})();

	return merge(baseConfig, {
		plugins: [
			...layouts,
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
};