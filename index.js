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

import { Root } from "native-base"

import {
  fechDeviceSettingsFromFirebase,
  fetchConvertHistoryFromFirebase
} from "./src/store/actions/index"

fechDeviceSettingsFromFirebase()
const store = configureStore()

// fetch device settings and convertion history if there is,
store.dispatch(fechDeviceSettingsFromFirebase())
store.dispatch(fetchConvertHistoryFromFirebase())

// warpping by RNRRedux element to pass store
const RNRedux = () => (
  <Provider store={store}>
    <Root>
      <AppWithNavigationState />
    </Root>
    <CCFooter />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux)
