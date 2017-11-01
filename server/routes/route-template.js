const path = require('path');
const route = module.exports = {};

//사용할 method
route.method = 'get';

// 사용할 url
route.url = '/aaa';

// 사용할 라우트 메서드
route.route = (req, res) => {
	res.send('라우트 템플릿입니다.');
};