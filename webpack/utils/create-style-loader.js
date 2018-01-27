const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extract = new ExtractTextPlugin({
	filename: 'style.css'
});

module.exports = {
	stack(lang, isVue, options = {}) {
		const isProduction = process.env.NODE_ENV === 'production';
		options = Object.assign({
			sourceMap: isProduction
		});

		const styleLoader = isVue ? 'vue-style-loader' : 'style-loader';
		const cssLoader = {
			loader: 'css-loader',
			options: {
				minimize: isProduction,
				sourcemMap: isProduction
			}
		};
		const loaders = [cssLoader];
		if (lang) {
			loaders.push({
				loader: `${lang}-loader`,
				options
			});
		}

		if (isProduction) {
			return extract.extract({
				use: loaders,
				fallback: styleLoader
			});
		} else {
			return [styleLoader, ...loaders];
		}
	},
	extract
};