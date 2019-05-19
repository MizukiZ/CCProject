import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// import reducers
import currencyReducer from "./reducers/currencyReducer"
import calculatorReducer from "./reducers/calculatorReducer"

const rootReducer = combineReducers({
  currency: currencyReducer,
  calculator: calculatorReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore
