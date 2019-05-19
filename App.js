/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"
import { fetchCurrencyData } from "./src/store/actions/index"
import DeviceInfo from "react-native-device-info"

class App extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{DeviceInfo.getUniqueID()}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCurrencyData: () => dispatch(fetchCurrencyData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
