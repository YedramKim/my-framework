
module.exports = config => {
	const baseConfig = require('./webpack.base.conf');
	const merge = require('webpack-merge');
	const config = require({
		entry: config.entry,
		output: {
			filename: '[name].js',
			path: config.staticPath,
			publicPath: config.publicPath
		},
		devtool: 'cheap-module-eval-source-map'
	});

	return config;
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