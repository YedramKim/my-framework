const webpack = require('webpack');

module.exports = (config) => {
	const webpackConfig = require('./webpack.base.conf');
	const plugins = webpackConfig.plugins = webpackConfig.plugins || [];

	webpackConfig.entry = setHotModule(config.entry);
	webpackConfig.devtool = '#source-map';
	plugins.push(new webpack.HotModuleReplacementPlugin());
	return webpackConfig;
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