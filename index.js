/**
 * @format
 */

import React from "react"
import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"
import { Provider } from "react-redux"
import configureStore from "./src/store/configureStore"

import {
  fetchCurrencyHistoricalData,
  fetchCurrencyLatestData,
  fechDeviceSettingsFromFirebase
} from "./src/store/actions/index"

fechDeviceSettingsFromFirebase()
const store = configureStore()

// fetch device settings if there is,
store.dispatch(fechDeviceSettingsFromFirebase())
// fetch latest currency data
store.dispatch(fetchCurrencyLatestData("AUD"))
// fetch historycal currency data
store.dispatch(fetchCurrencyHistoricalData("AUD", "JPY"))

// warpping by RNRRedux element to pass store
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux)
