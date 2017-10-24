const
	express = require('express');


class Server {
	constructor (config) {
		this.config = config;
		this.app = express();
	}
	addMiddleware (middleware) {
		this.app.use(middleware);
	}
	listen () {
		const {
			port
		} = this.config;
		return new Promise((res, rej) => {
			this.app.listen(port, function() {
				res(this.app);
			});
		});
	}
}

module.exports = Server;