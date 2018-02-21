const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs-extra');
const middlewares = require('./middlewares'); // eslint-disable-line

module.exports = class Server {
	constructor (config) {
		this.app = express();
		this.config = config;
	}

	setStatic(url, staticPath) {
		this.app.use(url, express.static(staticPath));
	}

	async start() {
		await this._setMiddlewares();
		await this._setRoutes();
		this.app.use((req, res) => {
			res.send('404....');
		});

		const httpServer = new Promise(res => {
			const server = http.createServer(this.app);
			server.listen(80, res);
		});
		await Promise.all([httpServer]);

		return this;
	}

	async _setMiddlewares () {
		
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