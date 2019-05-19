import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import currencyReducer from "./reducers/currencyReducer"

const rootReducer = combineReducers({
  currency: currencyReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore
