import React from 'react'
import {Switch, Route, NavLink} from 'react-router-dom'
import {
	Menu,
	Icon
} from 'antd'
const SubMenu = Menu.SubMenu

export const _routes = (_rs) => {
	return () =>
		<Switch>
				{
				_rs.map(({name, path, exact = true, component}) => (
					<Route path={path} component={component} exact={exact} key={name} />
				))
			}
		</Switch>
}



/**
 * 遍历对象数组给数组中每一个对象（包括嵌套的）添加一个唯一的key
 * @param  {Array} arr 数组
 * @param  {String} key [默认key的前缀]
 * @return {Array}     返回新的数组
 */
export const iteration_key_increase = (arr, key) => {
	function _(obj, key) {
		obj.title = obj.name
		obj.value = obj.id
		obj.key = key
		if (obj.children && obj.children.length > 0) {
			_arr(obj.children, `${key}`)
		}
	}

	function _arr(arr, key) {
		for (let i = 0; i < arr.length; i++) {
			if (key) {
				_(arr[i], `${key}-${i}`)
			}else {
				_(arr[i], `${i}`)
			}
		}
	}

	_arr(arr, key)
	return arr
}

/**
 * 遍历并生成菜单
 */
export const iterator_menus = (menus) => {
	let newMenus = iteration_key_increase(menus)

	const iteration = (arr) => {
		return arr.map(item => {
			if (item.children) {
				return (
					<SubMenu key={item.key} title={<span>
						{ item.icon ? <Icon type={item.icon} /> : null}
						<span>{item.title}</span></span>} >
						{ iteration(item.children) }
					</SubMenu>
				)
			}

			return (
				<Menu.Item key={item.key}> <NavLink to={item.url} >{item.title}</NavLink> </Menu.Item>
			)

		})
	}

	return iteration(newMenus)
}

/**
 * 遍历并生成路由
 */
export const iterator_routes = (arr, prePath) => {
	let newArr = iteration_key_increase(arr)

	const iteration = (arr, prePath) => {
		if (!prePath) {prePath = ""}
		return arr.map((item) => {
			if (item.children && item.children.length) {
				if (item.component) {
					return [
						<Route path={`${prePath}${item.path}`} exact component={item.component} key={`exact${item.key}`} />,
						<Route path={`${prePath}${item.path}`} key={item.key} >
							<Switch>
								{iterator_routes(item.children, `${prePath}${item.path}`) }
							</Switch>
						</Route>
					]
				}

				return <Route path={`${prePath}${item.path}`} key={item.key} >
					<Switch>
						{iterator_routes(item.children, `${prePath}${item.path}`) }
					</Switch>
				</Route>

			}

			return <Route
				path={`${prePath}${item.path}`}
				exact
				component={item.component}
				key={item.key}
			/>
		})
	}

	return iteration(newArr, prePath)
}

