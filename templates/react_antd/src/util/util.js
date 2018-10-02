import config from '@/config/conf'
let {tokenKey, userIdKey, userInfo} = config.localStorage

let util = {}

util.title = function (title) {
    title = title ? title : '后台管理系统'
    window.document.title = title;
}

util.get_access_token = () => window.localStorage.getItem(tokenKey)
util.save_access_token = token => window.localStorage.setItem(tokenKey, token)
util.clear_access_token = () => window.localStorage.removeItem(tokenKey)
util.type = _ => Object.prototype.toString.call(_).replace(/\[object\s|\]/g, "")

export default util
