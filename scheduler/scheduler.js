class Scheduler {
	constructor (options, props) {
		this.options = options;
		this.props = props;
	}

	async onScheduler () {
		const path = require('path');
		const fse = require('fs-extra');

		const schedulesPath = path.join(__dirname, 'schedules', process.env.PRODUCT);
		this.schedules = (await fse.readdir(schedulesPath)).filter(schedule => /\.js$/.test(schedule)).map(schedule => require(`${schedulesPath}/${schedule}`));

		await this._launchSchedules();

		this.scheduleWorkers = this.schedules.map(schedule => new ScheduleWorker(schedule, this.options, this.props));

		this.scheduleWorkers.forEach(scheduleWorker => {
			scheduleWorker.startWork();
		});
	}

	async _launchSchedules () {
		let schedulePromises = this.schedules.map(schedule => {
			const result = schedule.work();
			if (result instanceof Promise) {
				return result;
			} else {
				return Promise.resolve(result);
			}
		});

		return Promise.all(schedulePromises);
	}
}

class ScheduleWorker {
	constructor (schedule, options, props) {
		this.hourInterval = schedule.hourInterval;
		this.setScheduler = schedule.baseFromZeroTime ? setTimerNextDay : setTimerNextHours;
		this.work = schedule.work;

		this.work();
	}

	async triggerWork() {
		if (this.scheduleTimer !== undefined) {
			clearInterval(this.scheduleTimer);
		}
	}
}

const setTimerNextDay = function() {
	this.scheduleTimer = setInterval(() => {
		this.working();
	}, 24 * 60 * 60 * 1000);
};

const setTimerNextHours = function() {
	this.scheduleTimer = setInterval(() => {
		this.working();
	}, schedule.hourInterval * 60 * 60 * 1000);
};

module.exports = Scheduler;