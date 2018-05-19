const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugin = new MiniCssExtractPlugin({
	filename: 'style.css'
});

module.exports = {
	stack(lang, options = {}) {
		const isProduction = process.env.NODE_ENV === 'production';
		options = {
			...options,
			sourceMap: isProduction
		};

		const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader';
		const loaders = [
			{
				loader: 'css-loader',
				options: {
					sourcemMap: isProduction
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: [
						require('postcss-cssnext')({
							warnForDuplicates: false
						})
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

		return [styleLoader, ...loaders];
	},
	plugin
};