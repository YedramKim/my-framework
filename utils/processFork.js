const cluster = require('cluster');
const report = require('./report');
let workers = [];

module.exports = async forkData => {
	try {
		forkData = {
			forkNum: require('os').cpus().length,
			async createdWorker () {},
			async master () {},
			async worker () {},
			...forkData
		};
	
		if (cluster.isMaster) {
			await masterWork(forkData);
		} else if (cluster.isWorker) {
			await workerWork(forkData);
		}
	} catch (err) {
		report(err);
		process.exit(1);
	}
};

const masterWork = async forkData => {
	cluster.on('online', worker => {
		report(`워커가 생성되었습니다. ID: ${worker.process.pid}`);
	});

	cluster.on('exit',(worker, code, signal) => {
		report(`워커가 죽었습니다. ㅠㅠ ID: ${worker.process.pid}`);
		report(`CODE: ${code}`);
		report(`SIGNAL: ${signal}`);
	});

	const data = await forkData.master();
	for (let i = 0; i < forkData.forkNum; ++i) {
		let worker = cluster.fork();
		workers.push(worker);
		await forkData.createdWorker(worker);
		worker.on('message', message => {
			if (message.type === 'ready') {
				worker.send({
					config: data.config
				});
			}
		});
	}
};

const workerWork = async forkData => {
	process.on('message', data => {
		forkData.worker(data);
	});

	process.send({
		type: 'ready'
	});
};