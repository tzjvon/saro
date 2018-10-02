import React from "react"
import B from "@/bundle.js"
const Index = props => <B load={require("bundle-loader?lazy!@/pages/index/index")}>{(C) => <C {...props}/>}</B>

export default {
	app: [
		{name: "index", path: "/app", component: Index},
	]
}

