module.exports = {
	"parserOptions": {
		"ecmaVersion": 9,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true,
			"experimentalObjectRestSpread": true,
			"experimentalDecorators": true
		}
	},
	"rules": {
		"no-console": 0,
		"semi": [
			2,
			"always"
		],
		"quotes": [
			2,
			"single"
		],
		"linebreak-style": [
			2,
			"unix"
		]
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/recommended"
	],
	"globals": {
		"process": true,
		"console": true
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"plugins": [
		"html",
		"vue"
	]
};