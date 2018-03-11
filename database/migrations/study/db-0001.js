module.exports = {
	async up (queryInterface, database, types) {
		await queryInterface.createTable('items', {
			id: {
				type: types.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			createAt: {
				type: types.DATE,
				defaultValue: types.NOW
			},
			updateAt: {
				type: types.DATE,
				defaultValue: types.NOW
			},
			removeAt: {
				type: types.DATE,
				defaultValue: null
			},
			gold: {
				type: types.INTEGER
			}
		});
	},
	async down () {}
};