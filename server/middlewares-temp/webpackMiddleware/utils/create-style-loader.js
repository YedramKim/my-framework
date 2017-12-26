const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (language, isVue, options) => {
	const isProduction = process.env.NODE_ENV === 'production';
	if (options) {
		options = {
			sourcemMap: isProduction
		};
	}
	const styleLoader = isVue ? 'vue-style-loader' : 'style-loader';
	const cssLoader = {
		loader: 'css-loader',
		options: {
			minimize: isProduction,
			sourcemMap: isProduction
		}
	};
	const loaders = [cssLoader];
	if (language) {
		loaders.push({
			loader: `${language}-loader`,
			options
		});
	}

	if (isProduction) {
		return ExtractTextPlugin.extract({
			use: loaders,
			fallback: styleLoader
		});
	} else {
		return [styleLoader, ...loaders];
	}
};