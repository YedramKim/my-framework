
module.exports = config => {
	const webpack = require('webpack');
	const baseConfig = require('./webpack.base.conf');
	const devConfig = {
		entry: setHotModule(config.entry),
		output: {
			filename: '[name].js',
			path: config.staticPath,
			publicPath: config.publicPath
		},
		devtool: 'cheap-module-eval-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	};
	const merge = require('webpack-merge');
	const mergeConfig = merge(baseConfig, devConfig);

	return mergeConfig;
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