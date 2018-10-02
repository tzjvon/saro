import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from 'redux-saga'

import reducers from "@/reducers/"
import mySaga from '@/sagas'


// create the saga middleware
const sagaMiddleware = createSagaMiddleware(mySaga)
const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(mySaga)

export default store

