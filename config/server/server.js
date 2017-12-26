const
path = require('path'),
middleware = (name, config) => ({name, config}),
staticRoot = path.resolve(__dirname, '..', '..', 'static');

module.exports = (() => {
return {
	port: 8080,
	middlewares: {}
};
})();