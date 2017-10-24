const
	webpack = require('webpack');

class Builder {
	constructor ({
		nodeENV,
		config
	}) {
		this.nodeENV = nodeENV;
		this.compiler = webpack(config);
		if (nodeENV === 'development') {
			
		}
	}
}
module.exports = Builder
