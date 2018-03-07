class Scheduler {
	constructor (config, props) {
		const moment = require('moment-timezone');
		this.config = {
			serviceLocalTimezone: moment.tz.zone(config.local),
			serverTimezone: (new Date()).getTimezoneOffset()
		};
		this.props = props;
	}

	async onScheduler () {
		const path = require('path');
		const fse = require('fs-extra');

		const schedulesPath = path.join(__dirname, 'schedules', process.env.PRODUCT);
		this.schedules = (await fse.readdir(schedulesPath)).filter(schedule => /\.js$/.test(schedule)).map(schedule => require(`${schedulesPath}/${schedule}`));

		await this._launchSchedules();

		this.scheduleWorkers = this.schedules.map(schedule => new ScheduleWorker(schedule, this.config, this.props));

		this.scheduleWorkers.forEach(scheduleWorker => {
			scheduleWorker.working();
		});
	}
}

class ScheduleWorker {
	constructor (schedule, config, props) {
	}

	async working() {
	}
}
module.exports = Scheduler;