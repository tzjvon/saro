import axios from 'axios'
import util from '@/utils/util'
import config from '@/config/conf/'
const {domain} = config

axios.defaults.baseURL = domain
axios.default.timeout = 2000

const checkErrorCode = (res) => {
	switch (res.errorCode) {
		case 1:

			break;
		case 2:

			break;
		case 3: // 登录信息过期
			message.warning("请重新登录！")
			window.location.href = "#/auth/login"
			break;
		default:

			break;
	}
}

class Api {
	constructor() {
		this.post = (url, body) => {
			return fetch(domain+url, {
				method: "POST",
				headers: {'Content-Type': 'application/json', },
				body: JSON.stringify(body)
			}).then(res => {
				checkErrorCode(res)
				return res.json()
			})
		}
		this.get = (url, body) => {
			return fetch(domain+url, {
				method: "GET",
				headers: {'Content-Type': 'application/json', },
				body: JSON.stringify(body)
			}).then(res => {
				checkErrorCode(res)
				return res.json()
			})
		}
		this.uploadFile = (url, fileList) => {
			let param = new FormData()
			let len = fileList.length
			// console.log(fileList[0])
			param.append("file", fileList[0], fileList[0].name)
			// for (let i = 0; i < len; i++) {
			// 	let file = fileList[i]
			// 	param.append(i, file, file.name)
			// }
			return fetch(domain + url, {
				method: "post",
				// headers: {"Content-Type": "multipart/form-data"},
				body: param
			})
		}

		this._get = (url, opts) => {
			return fetch(url, {
				method: "GET",
				...opts
			})
		}

		this._post = (url, opts) => {
			return fetch(url, {
				method: "POST",
				...opts
			})
		}
	}
}

export default new Api
