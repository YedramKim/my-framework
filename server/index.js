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
		await this._setMiddleware();
		await this._setRoutes();
		return new Promise((res) => {
			this.app.listen(this.config.port, _ => res(this));
		});
	}

	async _setMiddleware () {}

	async _setRoutes () {
		const routePath = path.join(__dirname, 'routes');
		const routeFolders = await fs.readdir(routePath);
		let routeFiles = await Promise.all(routeFolders.map(routeFolder => fs.readdir(path.join(routePath, routeFolder))));
		routeFiles = lodash.flatten(routeFiles);
		console.log(routeFiles);
	}
};