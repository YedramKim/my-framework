const schedule = module.exports = {};

schedule.interval = 23;

// 이것을 사용하면 0시 이후를 간격으로 돌게 한다.
schedule.baseFromZeroTime = true;

schedule.work = async (/*props*/) => {
	console.log('지금은 23시 입니다');
};