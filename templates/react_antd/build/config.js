const path = require('path')

module.exports = {
	dev: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		/**
		 * Source Maps
		 */

		productionSourceMap: true,
		devtool: '#source-map',

		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],

		bundleAnalyzerReport: process.env.npm_config_report
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		/**
		 * Source Maps
		 */

		productionSourceMap: true,
		devtool: '#source-map',

		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],

		bundleAnalyzerReport: process.env.npm_config_report
	}
}
