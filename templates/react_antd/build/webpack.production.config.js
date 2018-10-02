var path = require("path")
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const utils = require('./utils.js')

module.exports = {
	entry: {
		// app: path.resolve(__dirname, "../src/index.js"),
		app: utils.rootPathSrc + '/index.js',
		// 将 第三方依赖 单独打包
		vendor: [
			"react",
			"react-dom",
			"react-redux",
			"react-router-dom",
			"redux",
			"es6-promise",
			"moment",
			"classnames",
			"antd",
			"whatwg-fetch",
			"immutable"
		]
	},
	output: {
		// path: __dirname + "../dist",
		path: utils.rootPath + '/dist',
		filename: "[name].[chunkhash:8].js",
		// publicPath: "/"
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			// '@': resolve('../src'),
			'@': utils.rootPathSrc,
		}
	},

	module: {
		rules: [{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			use: [{
				loader: "babel-loader",
			}]
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							minimize: false,
							modules: true,
							localIndentName: "[local]_[hash:base64:5]"
						}
					}, {
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: "postcss.config.js"
							}
						}
					}, {
						loader: "less-loader",
						options: {
							sourceMap: true
						}
					}
				]
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							minimize: false,
							modules: true,
							localIndentName: "[local]_[hash:base64:5]"
						}
					}, {
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: "postcss.config.js"
							}
						}
					}, {
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			})
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader"]
			})
		}, {
			test: /\.(png|gif|jpg|jpeg|bmp)$/,
			loader: "url-loader?limit=5000"
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			loader: "file-loader"
		}]
	},

	plugins: [
		new webpack.BannerPlugin("Copyright by your company info"),

		// html 模板插件
		new HtmlWebpackPlugin({
			// template: "./src/index.html"
			template: utils.rootPathSrc + '/index.html'
		}),

		// 定义为生产环境，编译 React 时压缩到最小
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify(process.env.NODE_ENV),
				// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
				__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == "dev") || "false"))
			}
		}),

		// 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
		// new webpack.optimize.OccurenceOrderPlugin(),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				//supresses warnings, usually from module minification
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),

		// 分离CSS和JS文件
		new ExtractTextPlugin("[name].[chunkhash:8].css"),

		// 提供公共代码
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "[name].[chunkhash:8].js"
		}),

	]
}
