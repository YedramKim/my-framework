const
	webpack = require('webpack'),
	isProduction = process.env.NODE_ENV === 'production';

module.exports = (() => ({
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					cssSourceMap: isProduction,
					preserveWhitespace: true,
					loaders: {
						less: ['vue-style-loader', 'less-loader']
					},
					transformToRequire: {
						img: 'src',
						image: 'xlink:href',
						video: 'src'
					}
				}
			}
		]
	}
}))();