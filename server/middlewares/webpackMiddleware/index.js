const
	path = require('path'),
	fs = require('fs-extra'),
	static = require('serve-static'),
	merge = require('webpack-merge'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HTMLWebpackPlugin = require('html-webpack-plugin'),
	webpackConfig = process.env.NODE_ENV === 'production' ? require('./webpack/webpack.prod.conf') :
	process.env.NODE_ENV === 'test' ? require('./webpack/webpack.dev.conf') :
	require('./webpack/webpack.dev.conf');

const middleware = module.exports = {};

// Server 객체에서 미들웨어 적용을 위해 사용할 데이터를 저장하는 객체
middleware.meta = {
	// true 일 경우 route 설정에서만 사용 가능한 미들웨어, name은 라우트에서 가져올 때 구분할 미들웨어의 이름
	routeMiddleware: false,
	name: '',
	separateProduction: true
};

middleware.process = async (app, { staticPath, entry, output, htmlTemplate, htmlFileName }) => {
	const
		config = merge({
			entry: setHotModule(entry),
			output
		}, webpackConfig),
		htmlPlugin = new HTMLWebpackPlugin({
			template: htmlTemplate,
			filename: path.join(staticPath, htmlFileName),
			minify: {
				minifyCSS: true,
				minifyJS: true,
				removeComments: true
			}
		});

	let compile = webpack(config);
	htmlPlugin.apply(compile);

	app.use(require('webpack-dev-middleware')(compile, {
		noInfo: true,
		publicPath: staticPath,
		stats: {
			colors: true
		}
	}));

	app.use(require('webpack-hot-middleware')(compile, {
		heartbeat: 2000,
		log: console.log
	}));

	return true;
};

middleware.productionProcess = async (app, { staticPath, entry, output, htmlTemplate, htmlFileName, cssFileName }) => {
	const
		config = merge({
			entry,
			output
		}, webpackConfig),
		compile = webpack(config),
		htmlPlugin = new HTMLWebpackPlugin({
			template: htmlTemplate,
			filename: htmlFileName,
			inject: true,
			minify: {
				minifyCSS: true,
				minifyJS: true,
				removeComments: true
			}
		}),
		extractTextPlugin = new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		});

	htmlPlugin.apply(compile);
	extractTextPlugin.apply(compile);
	await fs.emptyDir(output.path);
	await new Promise((res, rej) => {
		compile.run((err, stats) => {
			if (err) {
				console.log('webpack compile failed');
				rej(err);
			} else if (stats.hasErrors()) {
				console.log('webpack compile failed');
				rej(stats.toString({
					colors: true,
					reasons: true
				}));
			} else {
				console.log('webpack compile complete');
				res();
			}
		});
	});
	app.use('/static', static(output.path));
	app.use((req, res) => {
		res.sendFile(path.join(output.path, 'page.html'));
	});
};

const setHotModule = (entry) => {
	const
		entryType = typeof entry,
		hotModule = 'webpack-hot-middleware/client?noInfo=true&reload=true';
	if (Array.isArray(entryType)) {
		console.log('case 1', entry);
		return [hotModule, ...entry];
	} else if (entryType === 'object') {
		const newEntry = {};
		for (let file in entry) {
			newEntry[file] = [hotModule, entry[file]];
		}
		return newEntry;
	}	
};