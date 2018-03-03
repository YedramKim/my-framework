const path = require('path');
const staticRoot = path.resolve(__dirname, '..', 'static');

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
								host: 'redis-13675.c17.us-east-1-4.ec2.cloud.redislabs.com',
								port: 13675,
								// db: 7,
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
			staticRoot,
			layouts: {
				main: path.join(__dirname, '..', 'assets', 'layout', 'main.html'),
				login: path.join(__dirname, '..', 'assets', 'layout', 'login.html')
			}
		},
		database: {
			host: 'localhost',
			database: 'test1',
			username: 'root',
			password: '1234'
		}
	};

	if (process.env.NODE_ENV !== 'production') {
		return baseConfig;
	} else {
		return {...baseConfig};
	}
});