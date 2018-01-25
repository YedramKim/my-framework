const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlPlugin = require('html-webpack-plugin');

module.exports = config => {
	const webpackConfig = merge(require('./webpack.base.conf'), {
		entry: setHotModule(config.entry),
		output: {
			filename: '[name].js',
			path: config.staticPath,
			publicPath: config.publicPath
		},
		devtool: 'cheap-module-eval-source-map'
	});

	const plugins = webpackConfig.plugins = webpackConfig.plugins || [];
	plugins.push(new webpack.HotModuleReplacementPlugin());

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

const setHotModule = (entry) => {
	const entryType = typeof entry;
	const hotModule = 'webpack-hot-middleware/client?noInfo=true&reload=true';

	if (Array.isArray(entryType)) {
		return [hotModule, ...entry];
	} else if (entryType === 'object') {
		const newEntry = {};
		for (let file in entry) {
			newEntry[file] = [hotModule, entry[file]];
		}
		return newEntry;
	} else {
		return [hotModule, entry];
	}
};