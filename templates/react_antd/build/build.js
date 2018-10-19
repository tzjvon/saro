require('./check-version')()

process.env.NODE_ENV = 'production'

const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(config.build.assetsRoot, err => {
	if (err) throw err
	webpack(webpackConfig, (err, stats) => {
		spinner.stop()
		process.stdout.write(stats.toString({
			color: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n')

		if (stats.hasErrors()) {
			console.log(chalk.red('  Build failed with errors. \n'))
			process.exit(1)
		}

		console.log(chalk.cyan('  Build complete. \n'))
		console.log(chalk.yellow(
			' Tip: built files are meant to be served over on HTTP server. \n' +
			'  Opening index.html over file:// won\'t work. \n '
		))
	})
})
