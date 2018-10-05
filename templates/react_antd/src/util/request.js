import axios from 'axios'
import config from '@/config/conf/'
const {domain} = config

axios.defaults.baseURL = domain
axios.default.timeout = 2000

class Api {
	constructor() {


	}
}

export default new Api
