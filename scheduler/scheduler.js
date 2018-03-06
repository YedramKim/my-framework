class Scheduler {
	constructor (props) {
		this.props = props;
	}

	async onScheduler () {
		const path = require('path');
		const fse = require('fs-extra');

		const schedulesPath = path.join(__dirname, 'schedules', process.env.PRODUCT);
		this.schedules = (await fse.readdir(schedulesPath)).filter(schedule => /\.js$/.test(schedule)).map(schedule => require(`${schedulesPath}/${schedule}`));

		await this._launchSchedules();
	}

	async _registSchedules () {
		let schedulePromises = this.schedules.map(schedule => {
			const result = schedule.schedule();
			if (result instanceof Promise) {
				return result;
			} else {
				return Promise.resolve(result);
			}
		});

		return Promise.all(schedulePromises);
	}
}

class ScheduleInstance {
	constructor (schedule) {
		this.hourInterval = schedule.hourInterval;
		this.baseFromZeroTime = schedule.baseFromZeroTime;
		this.schedule = schedule.schedule;
	}
}

module.exports = Scheduler;