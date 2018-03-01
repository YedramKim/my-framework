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
		this.sequelize = new Sequelize(database, user, password, {
			host,
			dialect: 'mysql',
			port: 3306
		});
	}

	async sync () {
		this.schemas = await this._getSchemas();
		await this._migrations();
	}

	async _getSchemas () {
		const regExp = /\.js$/;
		return (await fse.readdir(path.join(__dirname, 'schemas'))).filter(schema => regExp.test(schema));
	}

	async _migrations () {
		const version = require('../package.json').version;
		console.log(version);
	}
}

module.exports = Database;