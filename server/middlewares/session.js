module.exports = ({ mode, sessionOptions, redisOptions }) => {
	const session = require('express-session');

	if (mode === 'cookie') {
		return session(sessionOptions);
	} else if (mode === 'redis') {
		return session({
			...sessionOptions,
			store: new (require('connect-redis')(session))(redisOptions)
		});
	}
};