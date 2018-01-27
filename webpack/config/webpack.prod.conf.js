
module.exports = config => {
	const baseConfig = require('./webpack.base.conf');
	const prodConfig = {
		entry: config.entry,
		output: {
			filename: '[name].js',
			path: config.staticPath,
			publicPath: config.publicPath
		},
		devtool: 'source-map'
	};
	const merge = require('webpack-merge');
	const mergeConfig = merge(baseConfig, prodConfig);

	return mergeConfig;
};