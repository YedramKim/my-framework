class Scheduler {
	constructor (props) {
		this.props;
	}

	async onScheduler () {
		const path = require('path');
		const fse = require('fs-extra');
		const schedulesPath = path.join(__dirname, 'schedules', process.env.PRODUCT);
		const schedules = (await fse.readdir(schedulesPath)).filter(schedule => /\.js$/.test(schedule)).map(schedule => require(`${schedulesPath}/${schedule}`));

		console.log(schedules[0]);
	}
}

module.exports = Scheduler;