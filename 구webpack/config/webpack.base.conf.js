const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';
let rules = [];

rules = [
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		exclude: /node_modules/,
		options: {
			cssSourceMap: isProduction,
			preserveWhitespace: true,
			loaders: {
				// css: createStyleLoader(false, true),
				// less: createStyleLoader('less', true)
			},
			transformToRequire: {
				img: 'src',
				image: 'xlink:href',
				video: 'src'
			}
		}
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