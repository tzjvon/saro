import React from "react"
import {
	Route,
	HashRouter,
	Switch,
	Redirect,
} from "react-router-dom"
import {iterator_routes} from "@/util/tool.js"
import config_routes from "@/config/routes/"
const {app} = config_routes

const App = () => (iterator_routes(app))


export default () =>
	<HashRouter>
		<div>
			<Switch>
				<Redirect exact path="/" to="/app"/>
				<Route path="/app" component={App} />

				<Route render={ () => <h1>page is not found!</h1>} />
			</Switch>
		</div>
	</HashRouter>
