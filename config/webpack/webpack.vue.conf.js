module.exports = [
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		exclude: /node_modules/,
		options: {
			cssSourceMap: process.env.NODE_ENV === 'production',
			preserveWhitespace: true,
			loaders: {
				less: ['vue-style-loader', 'css-loader', 'less-loader']
			},
			transformToRequire: {
				img: 'src',
				image: 'xlink:href',
				video: 'src'
			}
		}
	}
];