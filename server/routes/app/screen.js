const route = module.exports = {};

route.method = 'get';

route.url = '/app';

route.route = (req, res) => {
	res.send('wow');
};