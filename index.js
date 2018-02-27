if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

const Server = require('./server/server');
const Webpack = require('./webpack/webpack');

(async () => {
	try {
		const config = require('./config/config')();
		const server = new Server(config.server);

		const bundler = new Webpack(config.webpack);
		await bundler.webpackCompile(server);
	
		await server.start();
		console.log('서버가 실행되었습니다.');
	} catch (err) {
		console.log('에러 발생. 아 왜~~~~!');
		console.log(err);
		process.exit(1);
	}
})();