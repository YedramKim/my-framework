const
	Server = require('./server'),
	config = {
		port: 3000
	};

(() => {
	const server = new Server(config);

	server.addMiddleware((req, res, next) => {
		res.send('첫 노가다 작품');
	});
	server.listen().then(() => {
		console.log('서버가 실행되었습니다.');
	});
})();