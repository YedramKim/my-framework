const
	webpack = require('webpack'),
	isProduction = process.env.NODE_ENV === 'production';
let rules = [];
if (process.env.CLIENT_LIBRARY === 'vue') {
	rules = require('./webpack.vue.conf');
} else if (process.env.CLIENT_LIBRARY === 'react') {
	rules = require('./webpack.react.conf');
}

rules = [
	...rules,
	{
		test: /\.(png|jpg|gif|svg)$/,
		loader: 'file-loader',
		options: {
			name: '[name].[ext]'
		}
	},
	{
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: /node_modules/
	}
];

module.exports = (() => ({
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
				'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules
	}
}))();