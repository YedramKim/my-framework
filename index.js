if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

const {
	processFork,
	report
} = require('./utils');

processFork({
	forkNum: 1,
	async createdWorker () {},
	async master () {
		try {
			const config = require('./config/config')();

			const Webpack = require('./webpack/webpack');
			if (['production', 'beta'].indexOf(process.env.NODE_ENV) !== -1) {
				const bundler = new Webpack(config.webpack);
				await bundler.build();
			}

			// const Database = require('./database/database');
			// const Scheduler = require('./scheduler/scheduler');

			// const database = new Database(config.database);
			// await database.migrations();

			// const scheduler = new Scheduler(config.scheduler, {
			// 	database
			// });
			// await scheduler.onScheduler();

			return {
				config
			};
		} catch (err) {
			report('master 에러 발생. 아 왜~~~~!');
			report(err);
			process.exit(1);
		}
	},
	async worker (data) {
		try {
			const {
				config
			} = data;

			const Server = require('./server/server');

			const server = new Server(config.server);

			// 데이터베이스 생성
			const Database = require('./database/database');
			const database = new Database(config.database);
			await database.sync();
			server.setDataToServer('database', database);

			// 웹팩 관련 서버에 적용 (static 혹은 미들웨어)
			const Webpack = require('./webpack/webpack');
			const bundler = new Webpack(config.webpack);
			await bundler.webpackCompile(server);

			await server.start();
			report('서버가 실행되었습니다.');
		} catch (err) {
			report('child 에러 발생. 아 왜~~~~!');
			report(err);
			process.exit(1);
		}
	}
});