const path = require('path')
const packageInfo = require('../package.json')
const config = require('./config')

exports.createNotifierCallback = () => {
	const notifier = require('node-notifier')

	return (severity, errors) => {
		if (severity !== 'error') return

		const error = errors[0]
		const filename = error.file && error.file.split('!').pop()

		notifier.notify({
			title: packageInfo.name,
			message: severity + ': ' + error.name,
			subtitle: filename || '',
			icon: path.join(__dirname, 'logo.png')
		})
	}
}

exports.assetsPath = function(_path) {
	const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
		config.build.assetsSubDirectory :
		config.dev.assetsSubDirectory

	return path.posix.join(assetsSubDirectory, _path)
}

exports.rootPathSrc = path.join(__dirname, '../src')
exports.rootPath = path.join(__dirname, '../')
