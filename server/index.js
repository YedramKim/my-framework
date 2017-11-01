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
			try {
				let middleware = require(`./middlewares/${name}Middleware`);
				if (middleware.meta.routeMiddleware) {
					this.routeMiddlewares[middleware.meta.name] = middleware.returnRouteMiddleware;
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
			// await this._setRouteMiddlewares(); // 제작 보류
			await this._setRoutes();
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

	async _setRouteMiddlewares () {
		const routeMiddlewares = this.routeMiddlewares;
		return 1;
	}

	async _setRoutes () {
		const routes = await fs.readdir(path.resolve(__dirname, 'routes'));
		const length = routes.length;
		const methods = ['all', 'get', 'post', 'put', 'delete'];
		let commonRoute = null;
		for (let i = 0; i < length; ++i) {
			const {
				method, url, route
			} = require(`./routes/${routes[i]}`);
			if (methods.includes(method)) {
				if (url === '*') {
					commonRoute = { method, url, route };
				} else {
					this.app[method](url, route);
				}
			}
		}

		if (commonRoute !== null) {
			this.app[commonRoute.method](commonRoute.url, commonRoute.route);
		}
	}
}

module.exports = Server;