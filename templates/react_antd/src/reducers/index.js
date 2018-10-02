import {combineReducers} from 'redux'
import * as increase from './increase.js'
import * as spin from './spin'

export default combineReducers(Object.assign(
	increase,
	spin
))
