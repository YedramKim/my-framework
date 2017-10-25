const
	merge = require('webpack-merge'),
	webpack = require('webpack'),
	isProduction = process.env.NODE_ENV === 'production',
	webpackConfig = process.env.NODE_ENV === 'production' ? require('../../../config/webpack/webpack.base.conf') :
	process.env.NODE_ENV === 'test' ? require('../../../config/webpack/webpack.dev.conf') :
	require('../../../config/webpack/webpack.dev.conf');

module.exports = ({ entry, output, htmlTemplate, htmlFileName}) => {
	const config = merge({
		entry: entry,
		output
	}, webpackConfig);

	if (isProduction === false) {
		config.entry = [config.entry, 'webpack-hot-middleware/client?timeout=2000&reload=true']
	}
};