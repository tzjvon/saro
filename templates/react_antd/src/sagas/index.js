import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

export function* increaseAsync() {
	yield delay(1000)
	yield put({
		type: 'INCREASE',
		num: parseInt(Math.random()*10)
	})
}

export default function* rootSaga() {
	yield takeEvery('INCREMENT_ASYNC', increaseAsync)
}

