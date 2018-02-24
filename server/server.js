const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs-extra');

module.exports = class Server {
	constructor (config) {
		this.app = express();
		this.config = {
			middlewares: {},
			...config
		};
	}

	setStatic(url, staticPath) {
		this.app.use(url, express.static(staticPath));
	}

	async start() {
		this._setPreMiddlewares();
		await this._setRoutes();
		this._setPostMiddlewares();
		this._setExecption();

		const httpServer = new Promise(res => {
			const server = http.createServer(this.app);
			server.listen(80, res);
		});
		await Promise.all([httpServer]);

		return this;
	}

	_setPreMiddlewares() {
		const preMiddlewares = this.config.middlewares.pre || [];
		preMiddlewares.forEach(middlewareData => this.app.use(this._getMiddleware(middlewareData)));
	}

	async _setRoutes () {
		const routesPath = path.join(__dirname, 'routes');
		const routeFolders = await fs.readdir(routesPath);
		const disable404Handler = (req, res, next) => {
			req.not404 = true;
			next();
		};
		const extReg = /\.js$/;

		await Promise.all(routeFolders.map(async routeFolder => {
			const routeFiles = await fs.readdir(path.join(routesPath, routeFolder));

			routeFiles.forEach(routeFile => {
				if (!extReg.test(routeFile)) {
					return;
				}

				const {
					method,
					url,
					pre,
					post,
					route
				} = require(`./routes/${routeFolder}/${routeFile}`);
				const preMiddlewares = (pre || []).map(middlewareData => this._getMiddleware(middlewareData));
				const postMiddlewares = (post || []).map(middlewareData => this._getMiddleware(middlewareData));

				this.app[method](url, ...[...preMiddlewares, route, ...postMiddlewares, disable404Handler]);
			});
		}));
	}

	_setPostMiddlewares() {
		const postMiddlewares = this.config.middlewares.post || [];
		postMiddlewares.forEach(middlewareData => this.app.use(this._getMiddleware(middlewareData)));
	}

	_getMiddleware (middlewareData) {
		if (typeof middlewareData === 'object') {
			return require(`./middlewares/${middlewareData.name}`)(middlewareData.option);
		} else {
			return require(`./middlewares/${middlewareData}`);
		}
	}

	_setExecption () {
		this.app.use((req, res) => {
			if (!req.not404) {
				res.send('404....');
			}
		});

		this.app.use((error, req, res, next) => {
			console.log(error);
			res.send(error);
		});
	}
};