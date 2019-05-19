/**
 * @format
 */

import React from "react"
import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"
import { Provider } from "react-redux"
import configureStore from "./src/store/configureStore"
import { fetchCurrencyData } from "./src/store/actions/currencies"

const store = configureStore()
// fetch historycal currency data
store.dispatch(fetchCurrencyData())

// warpping by RNRRedux element to pass store
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux)
