const {
	resolve
} = require("path")
const webpack = require("webpack")
const OpenBrowserPlugin = require("open-browser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const HappyPack = require("happypack")
const os = require("os")
const HappyThreadPool = HappyPack.ThreadPool({
	size: os.cpus().length
})
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseConfig = require('./webpack.base.conf')
const utils = require('./utils.js')

let PORT = 5050

module.exports = {
	devtool: "cheap-module-eval-source-map",
	entry: [
		'babel-polyfill',
		"react-hot-loader/patch",
		"./src/main.js"
	],
	output: baseConfig.output,

	resolve: baseConfig.resolve,

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
		}, {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: "happypack/loader?id=jsx"
			}]
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: "url-loader?limit=8192"
		}, {
			test: /\.scss$/,
			use: [
				{loader: "style-loader"},
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
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			loader: "file-loader"
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	},

	devServer: {
		host: '0.0.0.0',
		overlay: {
			errors: true
		},
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				secure: false
			},
		},
		port: PORT,
		hot: true
	},

	plugins: [
		new OpenBrowserPlugin({
			url: "http://localhost:" + PORT
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),

		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			__DEV__: true
		}),
		new webpack.HotModuleReplacementPlugin(),

		new HappyPack({
			id: "jsx",
			cache: true,
			threadPool: HappyThreadPool,
			loaders: ["babel-loader"],
		}),
		// new BundleAnalyzerPlugin(),

		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: [`Your application is running here: http://`],
			},
			onErrors: utils.createNotifierCallback()
		})

	]
}
