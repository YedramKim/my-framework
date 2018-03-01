const Sequelize = require('sequelize');
const schema = module.exports = {
	name: 'user'
};

schema.model = {
	name: {
		type: Sequelize.STRING
	}
};

schema.associations = [
	{
		target: 'item',
		relation: 'hasMany'
	}
];
