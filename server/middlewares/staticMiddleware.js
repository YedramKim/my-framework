const middleware = module.exports = {};

middleware.meta = {
	// true 일 경우 route 설정에서만 사용 가능한 미들웨어, name은 라우트에서 가져올 때 구분할 미들웨어의 이름
	routeMiddleware: false,
	name: '',
	// true일 경우 true 이고 production.env.NODE_ENV가 production일 때 productionProcess를 사용해야 함
	separateProduction: true
};

// 일반적으로 사용할 미들웨어 적용 메서드
// 매개변수
// => [1]: express 서버
// => [2]: 미들웨어에 사용할 config 객체
// => [3]: Server 객체
middleware.process = async (app) => {
	app.use((req, res, next) => {
		res.send('첫 노가다 작품 미들웨어를 구현했다.');
		next();
	});

	return true;
};

middleware.productionProcess = async (app) => {
	app.use((req, res, next) => {
		res.send('첫 노가다 작품 상품이닷!!');
		next();
	});

	return true;
};