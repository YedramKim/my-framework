const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extract = new ExtractTextPlugin({
	filename: 'style.css'
});

module.exports = {
	stack(lang, isVue, options = {}) {
		const isProduction = process.env.NODE_ENV === 'production';
		options = {
			...options,
			sourceMap: isProduction
		};

		const styleLoader = isVue ? 'vue-style-loader' : 'style-loader';
		const loaders = [
			{
				loader: 'css-loader',
				options: {
					minimize: isProduction,
					sourcemMap: isProduction
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: [
						// require('postcss-cssnext')({
						// 	warnForDuplicates: false
						// }),
						// require('cssnano')()
					]
				}
			}
		];
		if (lang && lang !== 'css') {
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