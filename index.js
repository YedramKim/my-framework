if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}

const
	Server = require('./server'),
	config = require('./config');

(() => {
	const
		server = new Server(config.server);

	server.addMiddleware((req, res, next) => {
		res.send('첫 노가다 작품');
	});

	server.listen().then(() => {
		console.log('서버가 실행되었습니다.');
	});
})();