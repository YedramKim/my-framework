module.exports = config => {
	const webpack = require('webpack');
	const merge = require('webpack-merge');
	const baseConfig = require('./webpack.base.conf')(config);
	const Jarvis = require('webpack-jarvis');

	const devConfig = merge(baseConfig, {
		mode: 'development',
		// devtool: 'cheap-module-eval-source-map',
		devtool: 'inline-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new Jarvis({
				port: 1337
			})
		]
	});
	devConfig.entry = setHotModule(devConfig.entry);

	return devConfig;
};

const setHotModule = entry => {
	const entryType = typeof entry;
	const hotModule = 'webpack-hot-middleware/client?noInfo=true&reload=true';

	if (Array.isArray(entryType)) {
		return [hotModule, ...entry];
	} else if (entryType === 'object') {
		const newEntry = {};
		for (let file in entry) {
			newEntry[file] = setHotModule(entry[file]);
		}
		return newEntry;
	} else {
		return [hotModule, entry];
	}
};