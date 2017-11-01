const middleware = module.exports = {};

// Server 객체에서 미들웨어 적용을 위해 사용할 데이터를 저장하는 객체
middleware.meta = {
	// true 일 경우 route 설정에서만 사용 가능한 미들웨어, name은 라우트에서 가져올 때 구분할 미들웨어의 이름
	routeMiddleware: false,
	name: '',
	// true일 경우 true 이고 production.env.NODE_ENV가 production일 때 productionProcess를 사용해야 함
	separateProduction: false,
	// true일 경우 별개의 라우트를 반환한다는 의미입니다.
	returnRoute: true
};

// 일반적으로 사용할 미들웨어 적용 메서드
// 매개변수
// => [1]: express 서버
// => [2]: 미들웨어에 사용할 config 객체
// => [3]: Server 객체
middleware.process = async (app) => {

};

// production.env.NODE_ENV가 production이고 separateProduction가 true일 때 사용하는 메서드
middleware.productionProcess = async (app) => {};