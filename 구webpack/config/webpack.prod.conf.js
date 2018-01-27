const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlPlugin = require('html-webpack-plugin');

module.exports = async config => {
	const webpackConfig = merge(require('./webpack.base.conf'), {
		entry: config.entry,
		output: {
			filename: '[name].js',
			path: config.staticPath,
			publicPath: config.publicPath
		},
		devtool: 'source-map'
	});

	const plugins = webpackConfig.plugins = webpackConfig.plugins || [];

	const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		test: /\.(js)$/,
		compress: {
			warnings: false
		},
		uglifyOptions: {
			ecma: 8
		}
	});
	plugins.push(uglifyJSPlugin);

	return fs.readdir(config.layouts).then(templates => {
		const regExp = /\.html$/;
		templates.forEach(template => {
			if (!regExp.test(template)) {
				return;
			}

			plugins.push(new htmlPlugin({
				template: path.join(config.layouts, template),
				name: template,
				minify: {
					minifyCSS: true,
					minifyJS: true
				}
			}));
		});

		return webpackConfig;
	});
};
