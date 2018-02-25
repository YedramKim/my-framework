const path = require('path');
const staticPath = path.resolve(__dirname, '..', 'static');

module.exports = (() => {
	const baseConfig = {
		server: {
			middlewares: {
				pre: [
					{
						name: 'session',
						options: {
							mode: 'redis',
							sessionOptions: {
								secret: 'yedarmkim',
								cookie: {
									secure: false,
									httpOnly: false,
									maxAge: 60 * 60 * 1000,
									domain: false
								},
								resave: true,
								rolling: true,
								saveUninitialized: true
							},
							redisOptions: {
								host: '127.0.0.1',
								port: 6379,
								db: 7,
								logError: true
							}
						}
					}
				]
			}
		},
		webpack: {
			entry: {
				main: path.join(__dirname, '..', 'assets', 'index.ts')
			},
			publicPath: '/static',
			staticPath: staticPath,
			layoutPath: path.join(__dirname, '..', 'assets', 'layout', 'app.html')
		}
	};

	if (process.env.NODE_ENV !== 'production') {
		return baseConfig;
	} else {
		return {...baseConfig};
	};
});