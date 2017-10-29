const
	fs = require('fs-extra'),
	path = require('path'),
	express = require('express');

class Server {
	constructor ({ port, middlewares }) {
		this.port = port;
		this.app = express();
		this.commonMiddlewares = [];
		this.routeMiddlewares = {};
		this._setMiddlewares(middlewares);
	}
	_setMiddlewares (middlewares) {
		middlewares.forEach(({name, config}) => {
			let middleware;
			try {
				middleware = require(`./middlewares/${name}Middleware`);
				if (middleware.routeMiddleware) {
					this.routeMiddlewares[middleware.name] = middleware;
				} else {
					this.commonMiddlewares.push({ middleware, config });
				}
			} catch (err) {
				console.log(err);
			}
		});
	}
	addStaticMiddleware (middleware) {
		this.app.use(middleware);
	}
	async listen () {
		try {
			await this._applyCommonMiddlewares();
			return new Promise((res, rej) => {
				this.app.listen(this.port, function() {
					res(this.app);
				});
			});
		} catch (err) {
			return Promise.reject(err);
		}
	}
	async _applyCommonMiddlewares () {
		const isProduction = process.env.NODE_ENV === 'production',
			promises = this.commonMiddlewares.map(({middleware, config}) => {
				if (middleware.meta.separateProduction && isProduction) {
					return middleware.productionProcess(this.app, config, this);
				} else {
					return middleware.process(this.app, config, this);
				}
			});

		return Promise.all(promises);
	}
}

module.exports = Server;