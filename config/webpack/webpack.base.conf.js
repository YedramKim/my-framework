const
	webpack = require('webpack'),
	isProduction = process.env.NODE_ENV === 'production';
let rules = [];
if (process.env.CLIENT_LIBRARY === 'vue') {
	rules = require('./webpack.vue.conf');
} else if (process.env.CLIENT_LIBRARY === 'react') {
	rules = require('./webpack.react.conf');
}

module.exports = (() => ({
	module: {
		rules
	}
}))();