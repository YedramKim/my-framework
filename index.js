if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

if (!process.env.PRODUCT) {
	process.env.PRODUCT = 'study';
}

(async () => {
	try {
		const Server = require('./server/server');
		const Database = require('./database/database');
		const Scheduler = require('./scheduler/scheduler');
		const Webpack = require('./webpack/webpack');

		const config = require(`./config/${process.env.PRODUCT}/config`)();
		const server = new Server(config.server);

		const database = new Database(config.database);
		await database.sync();
		server.setDataToServer('database', database);

		const bundler = new Webpack(config.webpack);
		await bundler.webpackCompile(server);

		const scheduler = new Scheduler({
			server,
			database
		});
		await scheduler.onScheduler();
	
		await server.start();
		console.log('서버가 실행되었습니다.');
	} catch (err) {
		console.log('에러 발생. 아 왜~~~~!');
		console.log(err);
		process.exit(1);
	}
})();