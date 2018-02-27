const path = require('path');
const fse = require('fs-extra');

class Database {
	constructor (config) {
		const Sequelize = require('sequelize');
		const {
			database,
			user,
			password,
			host
		} = this.config = config;
		this.sequelize = new Sequelize(database, username, password, {
			host,
			dialect: 'mysql',
			port: 3306
		});
	}

	async sync () {
		this.models = await this._getModels();
		await this._migrations();
	}

	async _getModels () {
		const regExp = /\.js$/;
		this.models =  (await fse.readdir(path.join(__dirname, 'models'))).filter(model => regExp.test(models));
	}

	async _migrations () {
		const version = require('../package.json').version;
	}
};

module.exports = Database;