const moment = require('moment-timezone');
const {
	report
} = require('../utils');

class Scheduler {
	constructor (config, props) {
		this.config = config;
		this.props = props;
	}

	async onScheduler () {
		const path = require('path');
		const fse = require('fs-extra');

		const schedulesPath = path.join(__dirname, 'schedules');

		this.schedules = (await fse.readdir(schedulesPath)).filter(schedule => /\.js$/.test(schedule)).map(schedule => require(`${schedulesPath}/${schedule}`));

		this.scheduleWorkers = this.schedules.map(schedule => new ScheduleWorker(schedule, this.props));

		this.scheduleWorkers.forEach(scheduleWorker => scheduleWorker.startSchedule(this.config));
	}
}

class ScheduleWorker {
	constructor (schedule, props) {
		this.scheduleData = schedule;
		this.work = schedule.work;
		this.props = props;
		
		this.interval = schedule.baseFromZeroTime ? 24 : schedule.interval;
	}

	async startSchedule(schedulerConfig) {
		const targetDate = moment.tz(schedulerConfig.local).hour(this.scheduleData.interval).toDate();
		let timeoutTime;

		await this.launchWork();

		if (this.scheduleData.baseFromZeroTime) {
			let currentTime = Date.now();
			if (targetDate.getTime() < currentTime) {
				targetDate.setDate(targetDate.getDate() + 1);
			}
			timeoutTime = targetDate.getTime() - Date.now();
		} else {
			timeoutTime = this.interval * 60 * 60 * 1000;
		}

		setTimeout(() => {
			this.timer = setInterval(() => {
				this.launchWork();
			}, this.interval);
		}, timeoutTime);
		let check = new Date();
		check.setTime(check.getTime() + timeoutTime);
	}

	async launchWork () {
		try {
			await this.work(this.props);
		} catch (err) {
			report('스케쥴 에러 발생');
			report(err);
		}
	}
}
module.exports = Scheduler;