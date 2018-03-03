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
		this._setPreMiddlewares();
	}

	setStatic(url, staticRoot) {
		this.app.use(url, express.static(staticRoot));
	}

	useMiddleware(...middlewares) {
		this.app.use(...middlewares);
	}

	setDataToServer(name, data) {
		this.app.set(name, data);
	}

	getDataFromServer(name) {
		this.app.get(name);
	}

	async start() {
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
		const routesPath = path.join(__dirname, 'routes', process.env.PRODUCT);
		const routeFolders = await fs.readdir(routesPath);
		const dontGo404Exeption = () => {};
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
				} = require(`./routes/${process.env.PRODUCT}/${routeFolder}/${routeFile}`);
				const preMiddlewares = (pre || []).map(middlewareData => this._getMiddleware(middlewareData));
				const postMiddlewares = (post || []).map(middlewareData => this._getMiddleware(middlewareData));

				this.app[method](url, ...[...preMiddlewares, route, ...postMiddlewares, dontGo404Exeption]);
			});
		}));
	}

	_setPostMiddlewares() {
		const postMiddlewares = this.config.middlewares.post || [];
		postMiddlewares.forEach(middlewareData => this.app.use(this._getMiddleware(middlewareData)));
	}

	_getMiddleware (middlewareData) {
		if (typeof middlewareData === 'object') {
			return require(`./middlewares/${middlewareData.name}`)(middlewareData.options);
		} else {
			return require(`./middlewares/${middlewareData}`);
		}
	}

	_setExecption () {
		this.app.use((req, res) => {
			res.send('404....');
		});

		this.app.use((error, req, res) => {
			console.log(error);
			res.send(error);
		});
	}
};