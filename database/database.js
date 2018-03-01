const path = require('path');
const fse = require('fs-extra');

class Database {
	constructor (config) {
		const Sequelize = require('sequelize');
		const {
			database,
			username,
			password,
			host
		} = this.config = config;
		this.sequelize = new Sequelize(database, username, password, {
			host: 'localhost',
			port: 3306,
			dialect: 'mysql',
			define: {
				charset: 'utf8',
				timestamps: true
			}
		});
	}

	async sync () {
		await this.sequelize.authenticate();
		await this._getSchemas();
		await this._migrations();
		this._createModels();
		await this.sequelize.sync();
	}

	async _getSchemas () {
		const regExp = /\.js$/;
		const schemaRoots = path.join(__dirname, 'schemas');
		this.schemas = (await fse.readdir(schemaRoots)).filter(schema => regExp.test(schema)).map(schema => require(path.join(schemaRoots, schema)));
	}

	async _migrations () {
		const version = require('../package.json').version;
		console.log(version);
	}

	_createModels () {
		// model define
		this.schemas.forEach(({name, model, options = {}}) => {
			name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
			this.sequelize.define(name, model, {
				paranoid: true,
				...options
			});
		});
		this.models = this.sequelize.models;

		// set association
		this.schemas.filter((schema) => schema.associations).forEach(({name, associations}) => {
			const model = this.models[name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()];
			associations.forEach(({target, relation, ...options}) => {
				const targetModel = this.models[target.charAt(0).toUpperCase() + target.substr(1).toLowerCase()];
				model[relation](targetModel, {
					constraints: false,
					...options
				});
			});
		});
	}
}

module.exports = Database;