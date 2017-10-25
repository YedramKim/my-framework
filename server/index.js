const
	express = require('express');

class Server {
	constructor (config) {
		this.config = config;
		this.app = express();
		this.middlewareWrappers = [];
	}
	addMiddleware (middleware) {
		this.app.use(middleware);
	}
	addMiddlewareWrapper (middlewareWrapper) {
		this.middlewareWrappers.push(middlewareWrapper);
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