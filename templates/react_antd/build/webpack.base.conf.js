const path = require('path')
const config = require('./config')
const utils = require('./utils')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}


function resolve(dir) {
	return path.join(__dirname, '..', dir)
}


module.exports = {
	context: path.resolve(__dirname, '../'),
	output:{
		// path: __dirname + "/dist",
		// filename: "[name].[hash].js",
		// publicPath: '/'
		// chunkFilename: "[name]-[id].[chunkhash:8].bundle.js",
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[hash:8].js'),
		chunkFilename: utils.assetsPath('js/[id].[hash:8].js'),
		publicPath: config.build.assetsPublicPath
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': resolve('src'),
		}
	},

	dev: {
		module: {
			rules: [{
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src')],
				exclude: /node_modules/,
				options: {
					formatter: require('eslint-friendly-formatter'),
					emitWarning: true
				}
			}]
		}
	},

	build: {
		module: {
			rules: [{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader",
				}]
			}, {
				test: /\.(png|gif|jpg|jpeg|bmp)$/,
				loader: "url-loader?limit=5000"
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: "file-loader"
			}]
		}
	}
}
