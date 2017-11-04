const createStyleLoader = require('../utils/create-style-loader');

module.exports = [
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		exclude: /node_modules/,
		options: {
			cssSourceMap: process.env.NODE_ENV === 'production',
			preserveWhitespace: true,
			loaders: {
				css: createStyleLoader(false, true),
				less: createStyleLoader('less', true)
			},
			transformToRequire: {
				img: 'src',
				image: 'xlink:href',
				video: 'src'
			}
		}
	}
];