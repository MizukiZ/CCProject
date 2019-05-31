/**
 * @format
 */

import React from "react"
import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"
import { Provider } from "react-redux"
import configureStore, {
  AppWithNavigationState
} from "./src/store/configureStore"
import CCFooter from "./src/components/Footer"

import { fechDeviceSettingsFromFirebase } from "./src/store/actions/index"

fechDeviceSettingsFromFirebase()
const store = configureStore()

// fetch device settings if there is,
store.dispatch(fechDeviceSettingsFromFirebase())

// warpping by RNRRedux element to pass store
const RNRedux = () => (
  <Provider store={store}>
    <AppWithNavigationState />
    <CCFooter />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux)
