if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

console.log(process.env.NODE_ENV);
const Server = require('./server');
const Webpack = require('./webpack/webpack');

(async () => {
	try {
		const config = require('./config');
		const server = new Server(config.server);
		const bundler = new Webpack(config.webpack);
		server.setMiddleware(app => {
			const { dev, hot } = bundler.returnMiddleware();
			app.use(dev);
			app.use(hot);
		});
	
		await server.start();
		console.log('서버가 실행되었습니다.');
	} catch (err) {
		console.log('에러 발생. 아 왜~~~~!');
		console.log(err);
	}
})();