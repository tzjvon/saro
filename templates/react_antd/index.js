const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const shelljs = require('shelljs')
const ora = require('ora')

module.exports = function (creater, params, helper, cb) {
	const { projectName, description, template, typescript, date, src, css } = params
	const configDirName = 'config'
	const cwd = process.cwd()
	const projectPath = path.join(cwd, projectName)
	const sourceDir = path.join(projectPath, src)
	const configDir = path.join(projectPath, configDirName)
	const version = helper.getPkgVersion()
	const yarnLockfilePath = path.join('yarn-lockfiles', `${version}-yarn.lock`)
	const shouldUseYarn = helper.shouldUseYarn()
	const useNpmrc = shouldUseYarn === false
	const useYarnLock = shouldUseYarn && fs.existsSync(creater.templatePath(template, yarnLockfilePath))
	let appCSSName
	let pageCSSName
	const styleExtMap = {
		sass: 'scss',
		less: 'less',
		stylus: 'styl',
		none: 'css'
	}
	const currentStyleExt = styleExtMap[css] || 'css'

	fs.mkdirSync(projectPath)
	fs.mkdirSync(sourceDir)
	fs.mkdirSync(configDir)
	fs.mkdirSync(path.join(sourceDir, 'pages'))
	fs.mkdirSync(path.join(sourceDir, 'components'))

	creater.template(template, 'pkg', path.join(projectPath, 'package.json'), {
		description,
		projectName,
		version,
		css,
		typescript
	})
	// creater.template(template, 'project', path.join(projectPath, 'project.config.json'), {
	// 	description,
	// 	projectName
	// })
	creater.template(template, 'gitignore', path.join(projectPath, '.gitignore'))
	creater.template(template, 'babelrc', path.join(projectPath, '.babelrc'))
	creater.template(template, 'eslintrcjs', path.join(projectPath, '.eslintrc.js'))
	creater.template(template, 'eslintignore', path.join(projectPath, '.eslintignore'))
	creater.template(template, 'editorconfig', path.join(projectPath, '.editorconfig'))
	creater.template(template, 'scss-lint', path.join(projectPath, '.scss-lint.yml'))
	creater.template(template, 'csscomb', path.join(projectPath, '.csscomb.json'))
	creater.template(template, 'lintstagedrc', path.join(projectPath, '.lintstagedrc'))

	creater.template(template, 'indexhtml', path.join(sourceDir, 'index.html'))
	creater.template(template, 'mainjs', path.join(sourceDir, 'main.js'))
	creater.template(template, 'bundle', path.join(sourceDir, 'bundle.js'))

	creater.template(template, 'src/reducers/index.js', path.join(sourceDir, 'reducers', 'index.js'))
	creater.template(template, 'src/reducers/spin.js', path.join(sourceDir, 'reducers', 'spin.js'))
	creater.template(template, 'src/reducers/increase.js', path.join(sourceDir, 'reducers', 'increase.js'))

	// creater.template(template, 'src/pages/index/index.js', path.join(sourceDir, 'pages', 'index', 'index.js'))
	// creater.template(template, 'src/pages/index/index.scss', path.join(sourceDir, 'pages', 'index', 'index.scss'))

	creater.template(template, 'src/config/routes/index.js', path.join(sourceDir, 'config', 'routes', 'index.js'))
	creater.template(template, 'src/config/conf/index.js', path.join(sourceDir, 'config', 'conf', 'index.js'))

	creater.template(template, 'src/routes/index.js', path.join(sourceDir, 'routes', 'index.js'))

	creater.template(template, 'src/util/request.js', path.join(sourceDir, 'util', 'request.js'))
	creater.template(template, 'src/util/tool.js', path.join(sourceDir, 'util', 'tool.js'))
	creater.template(template, 'src/util/util.js', path.join(sourceDir, 'util', 'util.js'))

	creater.template(template, 'src/store/index.js', path.join(sourceDir, 'store', 'index.js'))

	creater.template(template, 'src/sagas/index.js', path.join(sourceDir, 'sagas', 'index.js'))

	// add by myself
	creater.template(template, 'postcssconfigjs', path.join(projectPath, 'postcss.config.js'))
	creater.template(template, 'pkglock', path.join(projectPath, 'package-lock.json'))
	creater.template(template, 'src/actions/index', path.join(sourceDir, 'actions', 'index.js'))
	creater.template(template, 'build/logo.png', path.join(projectPath, 'build', 'logo.png'))
	creater.template(template, 'build/utils.js', path.join(projectPath, 'build', 'utils.js'))
	creater.template(template, 'build/webpack.dev.js', path.join(projectPath, 'build', 'webpack.dev.js'))
	creater.template(template, 'build/webpack.production.config.js', path.join(projectPath, 'build', 'webpack.production.config.js'))
	creater.template(template, 'build/webpack.prod.conf.js', path.join(projectPath, 'build', 'webpack.prod.conf.js'))
	creater.template(template, 'build/config.js', path.join(projectPath, 'build', 'config.js'))
	creater.template(template, 'build/webpack.base.conf.js', path.join(projectPath, 'build', 'webpack.base.conf.js'))
	creater.template(template, 'build/build.js', path.join(projectPath, 'build', 'build.js'))
	creater.template(template, 'build/check-version.js', path.join(projectPath, 'build', 'check-version.js'))



	// typescript
	if (typescript) {
		creater.template(template, 'appjs', path.join(sourceDir, 'app.tsx'), {
			css: currentStyleExt,
			typescript: true
		})
		creater.template(template, 'tsconfigjson', path.join(projectPath, 'tsconfig.json'))
		creater.template(template, 'globaldts', path.join(projectPath, 'global.d.ts'))
	} else {
		creater.template(template, 'appjs', path.join(sourceDir, 'app.js'), {
			css: currentStyleExt
		})
	}
	switch (css) {
		case 'sass':
			appCSSName = 'app.scss'
			pageCSSName = 'index.scss'
			break
		case 'less':
			appCSSName = 'app.less'
			pageCSSName = 'index.less'
			break
		case 'stylus':
			appCSSName = 'app.styl'
			pageCSSName = 'index.styl'
			break
		default:
			appCSSName = 'app.css'
			pageCSSName = 'index.css'
			break
	}

	creater.template(template, 'scss', path.join(sourceDir, appCSSName))
	creater.template(template, 'scss', path.join(sourceDir, 'pages', 'index', pageCSSName))


	if (typescript) {
		creater.template(template, 'pagejs', path.join(sourceDir, 'pages', 'index', 'index.tsx'), {
			css: currentStyleExt,
			typescript: true
		})
	} else {
		creater.template(template, 'pagejs', path.join(sourceDir, 'pages', 'index', 'index.jsx'), {
			css: currentStyleExt
		})
	}
	if (useNpmrc) creater.template(template, 'npmrc', path.join(projectPath, '.npmrc'))
	if (useYarnLock) creater.template(template, yarnLockfilePath, path.join(projectPath, 'yarn.lock'))
	creater.fs.commit(() => {
		console.log()
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建项目: ${chalk.grey.bold(projectName)}`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建配置目录: ${projectName}/${configDirName}`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建源码目录: ${projectName}/${src}`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/actions`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/config`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/pages`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/reducers`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/routes`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/sagas`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/store`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${projectName}/${src}/util`)}`)
		if (typescript) {
			console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面 JS 文件: ${projectName}/${src}/pages/index/index.tsx`)}`)
		} else {
			console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面 JS 文件: ${projectName}/${src}/pages/index/index.js`)}`)
		}
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建页面 ${currentStyleExt.toLocaleUpperCase()} 文件: ${projectName}/${src}/pages/index/${pageCSSName}`)}`)
		if (typescript) {
			console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${src}/app.tsx`)}`)
		} else {
			console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${src}/app.js`)}`)
		}
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${src}/${appCSSName}`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${src}/index.html`)}`)
		// console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${configDirName}/index.js`)}`)
		// console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${configDirName}/dev.js`)}`)
		// console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/${configDirName}/prod.js`)}`)
		// console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.editorconfig`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.gitignore`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/package.json`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.eslintrc.js`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.eslintignore`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/project.config.json`)}`)
		console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/package-lock.json`)}`)
		if (useNpmrc) console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/.npmrc`)}`)
		if (useYarnLock) console.log(`${chalk.green('✔ ')}${chalk.grey(`创建文件: ${projectName}/yarn.lock`)}`)
		console.log()
		const gitInitSpinner = ora(`cd ${chalk.cyan.bold(projectName)}, 执行 ${chalk.cyan.bold('git init')}`).start()
		process.chdir(projectName)
		const gitInit = shelljs.exec('git init', { silent: true })
		if (gitInit.code === 0) {
			gitInitSpinner.color = 'green'
			gitInitSpinner.succeed(gitInit.stdout)
		} else {
			gitInitSpinner.color = 'red'
			gitInitSpinner.fail(gitInit.stderr)
		}
		// install
		let command
		if (shouldUseYarn) {
			command = 'yarn install'
		} else if (helper.shouldUseCnpm()) {
			command = 'cnpm install'
		} else {
			command = 'npm install'
		}
		const installSpinner = ora(`执行安装项目依赖 ${chalk.cyan.bold(command)}, 需要一会儿...`).start()
		const install = shelljs.exec(command, { silent: true })
		if (install.code === 0) {
			installSpinner.color = 'green'
			installSpinner.succeed('安装成功')
			console.log(`${install.stderr}${install.stdout}`)
		} else {
			installSpinner.color = 'red'
			installSpinner.fail(chalk.red('安装项目依赖失败，请自行重新安装！'))
			console.log(`${install.stderr}${install.stdout}`)
		}
		console.log(chalk.green(`创建项目 ${chalk.green.bold(projectName)} 成功！`))
		console.log(chalk.green(`👉接下来请开始你的表演！🐒`))
		if (typeof cb === 'function') {
			cb()
		}
	})


}
