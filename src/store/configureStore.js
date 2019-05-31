import { createStore, combineReducers, applyMiddleware } from "redux"
import { createStackNavigator } from "react-navigation"
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers"
import Routes from "../config/routes"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { connect } from "react-redux"

// import reducers
import currencyReducer from "./reducers/currencyReducer"
import calculatorReducer from "./reducers/calculatorReducer"
import settingReducer from "./reducers/settingReducer"

// rootstack created with config routes
const RootStack = createStackNavigator(Routes, { initialRouteName: "Home" })
const navReducer = createNavigationReducer(RootStack)

const rootReducer = combineReducers({
  nav: navReducer,
  currency: currencyReducer,
  calculator: calculatorReducer,
  setting: settingReducer
})

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav)
const App = createReduxContainer(RootStack)
const mapStateToProps = state => ({
  state: state.nav
})
export const AppWithNavigationState = connect(mapStateToProps)(App)

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger, navMiddleware))
}

export default configureStore
