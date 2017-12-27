const
	webpack = require('webpack'),
	vueRule = require('./webpack.vue.conf'),
	isProduction = process.env.NODE_ENV === 'production';
let rules = [];

rules = [
	vueRule,
	{
		test: /\.(vue)$/,
		enforce: 'post',
		loader: 'babel-loader',
		exclude: /node_modules/
	},
	{
		test: /\.(png|jpg|gif|svg|otf|ttf)$/,
		loader: 'file-loader',
		options: {
			name: '[name].[ext]'
		}
	},
	{
		test: /\.(js)$/,
		loader: 'babel-loader',
		exclude: /node_modules/
	}
];

module.exports = (() => ({
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
}))();