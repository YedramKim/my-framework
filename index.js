if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

if (!process.env.PRODUCT) {
	process.env.PRODUCT = 'study';
}

const {
	processFork
} = require('./utils');

processFork({
	forkNum: 1,
	async createdWorker () {},
	async master () {
		try {
			const config = require(`./config/${process.env.PRODUCT}/config`)();

			const Webpack = require('./webpack/webpack');
			const Database = require('./database/database');
			const Scheduler = require('./scheduler/scheduler');

			if (['production', 'beta'].indexOf(process.env.NODE_ENV) !== -1) {
				const bundler = new Webpack(config.webpack);
				await bundler.build();
			}

			const database = new Database(config.database);
			await database.migrations();

			const scheduler = new Scheduler(config.scheduler, {
				database
			});
			await scheduler.onScheduler();

			return {
				config
			};
		} catch (err) {
			console.log('master 에러 발생. 아 왜~~~~!');
			console.log(err);
			process.exit(1);
		}
	},
	async worker (data) {
		try {
			const {
				config
			} = data;
	
			const Server = require('./server/server');
			const Database = require('./database/database');
			const Webpack = require('./webpack/webpack');
	
			const server = new Server(config.server);
	
			const database = new Database(config.database);
			await database.sync();
			server.setDataToServer('database', database);
	
			const bundler = new Webpack(config.webpack);
			await bundler.webpackCompile(server);
	
			await server.start();
			console.log('서버가 실행되었습니다.');
		} catch (err) {
			console.log('child 에러 발생. 아 왜~~~~!');
			console.log(err);
			process.exit(1);
		}
	}
});