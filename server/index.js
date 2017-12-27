const path = require('path');
const express = require('express');
const lodash = require('lodash');
const fs = require('fs-extra');
const middlewares = require('./middlewares');

module.exports = class Server {
	constructor (config) {
		const app = this.app = express();
		this.config = config;
	}

	async start() {
		await this._setMiddlewares();
		await this._setRoutes();
		return new Promise((res) => {
			this.app.listen(this.config.port, _ => res(this));
		});
	}

	async _setMiddlewares () {
		const middlewares = this.config.middlewares;
		for (let middleware in middlewares) {
			require(path.join(__dirname, 'middlewares', middleware, middleware))(this.app, middlewares[middleware]);
		}
	}

	async _setRoutes () {
		const routesPath = path.join(__dirname, 'routes');
		const routeFolders = await fs.readdir(routesPath);
		const extReg = /\.js$/;

		await Promise.all(routeFolders.map(async routeFolder => {
			const folderPath = path.join(routesPath, routeFolder);
			const routeFiles = await fs.readdir(folderPath);

			routeFiles.forEach(routeFile => {
				if (!extReg.test(routeFile)) {
					return;
				}

				const {
					method,
					url,
					route
				} = require(path.join(folderPath, routeFile));
				this.app[method](url, route);
			});
		}));
	}
};