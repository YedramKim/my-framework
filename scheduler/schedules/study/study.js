const schedule = module.exports = {};

schedule.hourInterval = 23;

// 이것을 사용하면 0시 이후를 간격으로 돌게 한다.
schedule.baseFromZeroTime = true;

schedule.schedule = async (props, timeData) => {
	console.log('지금은 23시 입니다');
};