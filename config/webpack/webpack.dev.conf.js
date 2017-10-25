const
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	baseConfig = require('./webpack.base.conf');

module.exports = (() => {
	const productConfig = {
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: process.env.NODE_ENV
				}
			})
		]
	};
	return merge(baseConfig, productConfig);
})();