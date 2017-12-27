const
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	baseConfig = require('./webpack.base.conf');

module.exports = (() => {
	const productConfig = {
		devtool: '#source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"development"'
				}
			})
		]
	};
	return merge(baseConfig, productConfig);
})();