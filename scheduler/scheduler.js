class Scheduler {
	constructor (config, props) {
		this.config = config;
		this.props = props;
	}

	async onScheduler () {
		const moment = require('moment-timezone');
		const path = require('path');
		const fse = require('fs-extra');

		const timezoneOffsets = {
			serviceLocal: moment.tz.zone(config.local),
			server: (new Date()).getTimezoneOffset()
		};

		const schedulesPath = path.join(__dirname, 'schedules', process.env.PRODUCT);
		this.schedules = (await fse.readdir(schedulesPath)).filter(schedule => /\.js$/.test(schedule)).map(schedule => require(`${schedulesPath}/${schedule}`));

		await this._launchSchedules();

		this.scheduleWorkers = this.schedules.map(schedule => new ScheduleWorker(schedule, this.props, timezoneOffsets));

		this.scheduleWorkers.forEach(scheduleWorker => {
			scheduleWorker.startWorking(timezoneOffsets).catch((err) => {
				console.log('스케쥴러 시작 에러가 발생했습니다.');
			});
		});
	}
}

class ScheduleWorker {
	constructor (schedule, props, timezoneOffsets) {
		this.scheduleData = schedule;
		this.work = schedule.work;
		this.props = props;
		this.timezoneOffsets = timezoneOffsets;
	}

	async startWorking(timezoneOffsets) {
		if (schedule.baseFromZeroTime) {
			this.interval = schedule.interval;
		} else {
			this.interval = schedule.interval;
		}

		this.scheduleTimer = setTimeout(() => {
			this.working();
		}, this.interval);
		await this.work(this.props);
	}

	async working() {
		this._resetTimer();
	}

	_resetTimer () {
		if (this.baseFromZeroTime) {
			setTimeout(() => {
				this.working();
			}, 24 * 60 * 60 * 1000);
		} else {
			setTimeout(() => {
				this.working();
			}, this.interval);
		}
	}
}
module.exports = Scheduler;