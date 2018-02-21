module.exports = {
	"parserOptions": {
		"parser": "babel-eslint",
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
		],
		"keyword-spacing": [
			2,
			{
				"before": true,
				"after": true
			}
		],
		"space-before-blocks": [
			2,
			"always"
		],
		"brace-style": [
			2,
			"1tbs"
		],
		"no-unused-vars": [
			"error"
		]
	},
	"plugins": [
		"html"
	],
	"globals": {
		"process": true,
		"console": true
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"jest": true
	},
	"extends": [
		"eslint:recommended"
	]
};