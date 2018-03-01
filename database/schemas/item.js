const Sequelize = require('sequelize');
const schema = module.exports = {
	name: 'item'
};

schema.model = {
	gold: {
		type: Sequelize.INTEGER
	}
};

schema.associations = [
	{
		target: 'user',
		relation: 'belongsTo'
	}
];
