const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const OpenBrowserPlugin = require("open-browser-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils.js')
const config = require('./config')
const baseConfig = require('./webpack.base.conf')


module.exports = {
	entry: './src/main.js',
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[hash:8].js'),
		chunkFilename: utils.assetsPath('js/[id].[hash:8].js'),
		publicPath: config.build.assetsPublicPath
	},

	resolve: baseConfig.resolve,

	module: {
		rules: [...baseConfig.build.module.rules, {
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
		}]
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify('production')
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: config.build.productionSourceMap,
			parallel: true
		}),

		new ExtractTextPlugin({
			filename: utils.assetsPath("css/[name].[chunkhash:8].css"),
			allChunks: true,
		}),

		new OptimizeCSSPlugin({
			// assetNameRegExp: /\.optimize\.css$/g,
			// cssProcessor: require('cssnano'),
			cssProcessorOptions: {safe: true},
			canPrint: true
		}),

		// // generate dist index.html with correct asset hash for caching.
		// // you can customize output by editing /index.html
		// // see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: "./src/index.html",
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),

		// keep module.id stable when vendor modules does not change
		new webpack.HashedModuleIdsPlugin(),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				//supresses warnings, usually from module minification
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		// enable scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			minChunks(module) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		// This instance extracts shared chunks from code splitted chunks and bundles them
		// in a separate chunk, similar to the vendor chunk
		// see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			async: 'vendor-async',
			children: true,
			minChunks: 3
		}),
	]
}
