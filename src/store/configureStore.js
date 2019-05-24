import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// import reducers
import currencyReducer from "./reducers/currencyReducer"
import calculatorReducer from "./reducers/calculatorReducer"
import settingReducer from "./reducers/settingReducer"

const rootReducer = combineReducers({
  currency: currencyReducer,
  calculator: calculatorReducer,
  setting: settingReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore
